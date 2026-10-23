// Builds the page-ready data from the CSV tables.
// Mock data from data-mock/ is merged in only when USE_MOCK=1 (npm run dev:mock).
import { readDir, mergeMock, checkData, splitIds, issueGroup } from './load.mjs';

export const USE_MOCK = process.env.USE_MOCK === '1';

// Set to true once the public record pass is done for every candidate.
// Until then, an empty public record shows "Not yet reviewed" instead of "No items found".
export const PUBLIC_RECORD_REVIEWED = false;

const raw = USE_MOCK ? mergeMock(readDir('data'), readDir('data-mock')) : readDir('data');
const errors = checkData(raw);
if (errors.length) throw new Error(`Data check failed:\n${errors.join('\n')}`);

export type Source = { source_id: string; title: string; outlet: string; url: string; date_accessed: string; access_note: string };
export type Issue = { issue_id: string; name: string };
export type Position = { issue: Issue; stated: boolean; summary: string; note: string; noteSources: Source[]; sources: Source[] };
export type RecordItem = { date: string; summary: string; candidate_response: string; sources: Source[] };
export type Candidate = {
  id: string; name: string; incumbent: boolean; background: string; priorities: string;
  website: string; facebook: string; instagram: string; email: string; sources: Source[];
  positions: Position[]; record: RecordItem[];
  // False when every position is "none found"; such candidates are left out of the comparison.
  hasStatements: boolean;
};
export type RaceType = 'mayor' | 'ward' | 'trustee';
export type Race = {
  id: string; name: string; type: RaceType; acclaimed: boolean; candidates: Candidate[];
  board: string; wards: string[]; areaNote: string;
};

export const sources: Source[] = raw.sources;
const sourceById = new Map(sources.map((s) => [s.source_id, s]));
const toSources = (ids: string) => splitIds(ids).map((id) => sourceById.get(id)!);

export const issues: Issue[] = [...raw.issues].sort((a, b) => Number(a.display_order) - Number(b.display_order));
const issuesFor = (type: RaceType) => issues.filter((i: any) => i.applies_to === issueGroup(type));

const lastName = (name: string) => name.trim().split(/\s+/).pop()!.toLowerCase();

function buildCandidate(c: any, type: RaceType): Candidate {
  const built = buildFields(c, type);
  return { ...built, hasStatements: built.positions.some((p) => p.stated) };
}

function buildFields(c: any, type: RaceType): Omit<Candidate, 'hasStatements'> {
  return {
    id: c.candidate_id,
    name: c.name,
    incumbent: c.incumbent === 'yes',
    background: c.background,
    priorities: c.other_priorities,
    website: c.website,
    facebook: c.facebook,
    instagram: c.instagram,
    email: c.email,
    sources: toSources(c.source_ids),
    positions: issuesFor(type).map((issue) => {
      const p = raw.positions.find((x: any) => x.candidate_id === c.candidate_id && x.issue_id === issue.issue_id);
      return { issue, stated: p.status === 'stated', summary: p.summary, note: p.note, noteSources: toSources(p.note_source_ids), sources: toSources(p.source_ids) };
    }),
    record: raw.public_record
      .filter((r: any) => r.candidate_id === c.candidate_id)
      .sort((a: any, b: any) => b.date.localeCompare(a.date))
      .map((r: any) => ({ date: r.date, summary: r.summary, candidate_response: r.candidate_response, sources: toSources(r.source_ids) })),
  };
}

export const races: Race[] = [...raw.races]
  .sort((a, b) => Number(a.display_order) - Number(b.display_order))
  .map((r) => ({
    id: r.race_id,
    name: r.name,
    type: r.type,
    acclaimed: r.acclaimed === 'yes',
    board: r.board || '',
    wards: splitIds(r.area_wards),
    areaNote: r.area_note || '',
    candidates: raw.candidates
      .filter((c: any) => c.race_id === r.race_id)
      .map((c: any) => buildCandidate(c, r.type))
      .sort((a: Candidate, b: Candidate) => lastName(a.name).localeCompare(lastName(b.name)) || a.name.localeCompare(b.name)),
  }));

export const lastUpdated = new Date().toLocaleDateString('en-CA', {
  timeZone: 'America/Toronto', year: 'numeric', month: 'long', day: 'numeric',
});

export const url = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
