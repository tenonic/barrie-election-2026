// Loads the CSV tables and checks that every ID links up.
// Shared by the site build (src/lib/data.ts) and scripts/check-data.mjs.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'csv-parse/sync';

export const TABLES = ['races', 'candidates', 'issues', 'positions', 'public_record', 'sources'];

function readTable(dir, name) {
  const file = join(dir, `${name}.csv`);
  if (!existsSync(file)) return [];
  return parse(readFileSync(file, 'utf8'), { columns: true, skip_empty_lines: true, trim: true, bom: true });
}

export function readDir(dir) {
  return Object.fromEntries(TABLES.map((t) => [t, readTable(dir, t)]));
}

// Mock data only fills races that have no real candidates yet, so real data always wins.
export function mergeMock(real, mock) {
  const realRaceIds = new Set(real.candidates.map((c) => c.race_id));
  const races = real.races.map((r) => {
    const m = mock.races.find((x) => x.race_id === r.race_id);
    return m && !realRaceIds.has(r.race_id) ? { ...r, ...m } : r;
  });
  const mockCandidates = mock.candidates.filter((c) => !realRaceIds.has(c.race_id));
  const keep = new Set(mockCandidates.map((c) => c.candidate_id));
  return {
    races,
    candidates: [...real.candidates, ...mockCandidates],
    issues: real.issues,
    positions: [...real.positions, ...mock.positions.filter((p) => keep.has(p.candidate_id))],
    public_record: [...real.public_record, ...mock.public_record.filter((r) => keep.has(r.candidate_id))],
    sources: [...real.sources, ...mock.sources],
  };
}

export const splitIds = (s) => (s || '').split(';').map((x) => x.trim()).filter(Boolean);

export function checkData(d) {
  const errors = [];
  const ids = {};
  const keys = { races: 'race_id', candidates: 'candidate_id', issues: 'issue_id', sources: 'source_id', public_record: 'record_id' };

  for (const [table, key] of Object.entries(keys)) {
    ids[table] = new Set();
    for (const row of d[table]) {
      const id = row[key];
      if (!id) errors.push(`${table}: row with empty ${key}`);
      else if (ids[table].has(id)) errors.push(`${table}: duplicate ${key} "${id}"`);
      ids[table].add(id);
    }
  }

  const checkSources = (where, value) => {
    for (const s of splitIds(value)) if (!ids.sources.has(s)) errors.push(`${where}: unknown source_id "${s}"`);
  };

  for (const c of d.candidates) {
    if (!ids.races.has(c.race_id)) errors.push(`candidates/${c.candidate_id}: unknown race_id "${c.race_id}"`);
    checkSources(`candidates/${c.candidate_id}`, c.source_ids);
  }

  const seen = new Set();
  for (const p of d.positions) {
    const where = `positions/${p.candidate_id}/${p.issue_id}`;
    if (!ids.candidates.has(p.candidate_id)) errors.push(`${where}: unknown candidate_id`);
    if (!ids.issues.has(p.issue_id)) errors.push(`${where}: unknown issue_id`);
    if (seen.has(`${p.candidate_id}|${p.issue_id}`)) errors.push(`${where}: duplicate row`);
    seen.add(`${p.candidate_id}|${p.issue_id}`);
    if (p.status === 'stated') {
      if (!p.summary) errors.push(`${where}: stated but no summary`);
      if (!splitIds(p.source_ids).length) errors.push(`${where}: stated but no source_ids`);
    } else if (p.status === 'none_found') {
      if (p.summary) errors.push(`${where}: none_found but has a summary`);
    } else {
      errors.push(`${where}: status must be "stated" or "none_found", got "${p.status}"`);
    }
    checkSources(where, p.source_ids);
    if (p.note && !splitIds(p.note_source_ids).length) errors.push(`${where}: note but no note_source_ids`);
    checkSources(`${where} (note)`, p.note_source_ids);
  }

  for (const c of d.candidates) {
    for (const i of d.issues) {
      if (!seen.has(`${c.candidate_id}|${i.issue_id}`)) errors.push(`positions: ${c.candidate_id} is missing issue "${i.issue_id}"`);
    }
  }

  for (const r of d.public_record) {
    const where = `public_record/${r.record_id}`;
    if (!ids.candidates.has(r.candidate_id)) errors.push(`${where}: unknown candidate_id "${r.candidate_id}"`);
    if (splitIds(r.source_ids).length < 2) errors.push(`${where}: needs at least 2 sources`);
    checkSources(where, r.source_ids);
  }

  for (const r of d.races) {
    const n = d.candidates.filter((c) => c.race_id === r.race_id).length;
    if (r.acclaimed === 'yes' && n !== 1) errors.push(`races/${r.race_id}: acclaimed but has ${n} candidates`);
  }

  return errors;
}
