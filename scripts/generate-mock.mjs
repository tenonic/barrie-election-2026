// Writes fake candidates for wards 1-6 and 8-10 into data-mock/.
// Used only for the local preview (npm run dev:mock). Never real people.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'data-mock';
const ISSUES = ['taxes', 'housing', 'homelessness', 'safety', 'transit', 'strong-mayor', 'growth', 'addiction', 'jobs', 'ebikes', 'transparency', 'parks'];
// Candidates per ward. Ward 4 is acclaimed; wards 2, 5 and 9 have 3+ candidates.
const WARDS = { 1: 2, 2: 3, 3: 2, 4: 1, 5: 4, 6: 2, 8: 2, 9: 3, 10: 2 };
const LETTERS = 'ABCD';

const SHORT = 'Sample position for layout testing.';
const MEDIUM = 'Sample position of medium length, written to test how a typical paraphrased summary wraps inside a card and a table cell.';
const LONG = 'Sample position of longer length. It runs to several sentences so the layout can be checked with a detailed answer. It mentions a made-up figure of $1.5M and a made-up date of 2027 to test numbers in text.';

// Small deterministic generator so reruns produce the same files.
let seed = 7;
const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

const csvCell = (v) => (/[",\n]/.test(v) ? `"${String(v).replace(/"/g, '""')}"` : String(v));
const toCsv = (header, rows) => [header.join(','), ...rows.map((r) => header.map((h) => csvCell(r[h] ?? '')).join(','))].join('\n') + '\n';

const sources = [];
for (let i = 1; i <= 12; i++) {
  sources.push({
    source_id: `M${String(i).padStart(3, '0')}`,
    title: `Mock source ${i}`,
    outlet: i % 3 === 0 ? 'Example News' : i % 3 === 1 ? 'Example Campaign Site' : 'Example City Records',
    url: `https://example.com/mock-source-${i}`,
    date_accessed: '2026-10-22',
    access_note: 'Mock data for preview only',
  });
}
const pickSources = (n) => {
  const set = new Set();
  while (set.size < n) set.add(sources[Math.floor(rand() * sources.length)].source_id);
  return [...set].join(';');
};

const races = [];
const candidates = [];
const positions = [];
const publicRecord = [];

for (const [ward, count] of Object.entries(WARDS)) {
  races.push({ race_id: `ward-${ward}`, acclaimed: count === 1 ? 'yes' : 'no' });
  for (let k = 0; k < count; k++) {
    const id = `mock-w${ward}-${LETTERS[k].toLowerCase()}`;
    candidates.push({
      candidate_id: id,
      race_id: `ward-${ward}`,
      name: `Sample Candidate ${ward}${LETTERS[k]}`,
      incumbent: k === 0 && ward % 2 === 0 ? 'yes' : 'no',
      background: k % 2 ? 'Fictional candidate used to preview the layout. Not a real person.' : 'Fictional candidate used to preview the layout. Not a real person. This background is longer to test wrapping across several lines on a phone.',
      other_priorities: k === 1 ? '' : 'Sample ward priority one; sample ward priority two.',
      website: k === 2 ? '' : `https://example.com/candidate-${ward}${LETTERS[k].toLowerCase()}`,
      facebook: k % 2 ? 'Sample Candidate Page' : '',
      instagram: '',
      email: `candidate-${ward}${LETTERS[k].toLowerCase()}@example.com`,
      nomination_filed: '2026-08-01',
      status: 'certified',
      source_ids: pickSources(2),
    });
    for (const issue of ISSUES) {
      const r = rand();
      if (r < 0.3) {
        positions.push({ candidate_id: id, issue_id: issue, status: 'none_found' });
      } else {
        const hasNote = rand() < 0.1;
        positions.push({
          candidate_id: id,
          issue_id: issue,
          status: 'stated',
          summary: r < 0.6 ? SHORT : r < 0.9 ? MEDIUM : LONG,
          note: hasNote ? 'Sample fact-check context: made-up city figures differ from the figure the candidate gave.' : '',
          note_source_ids: hasNote ? pickSources(1) : '',
          source_ids: pickSources(1 + Math.floor(rand() * 2)),
        });
      }
    }
    if (k === 0 && ward % 3 === 0) {
      publicRecord.push({
        record_id: `MR-${ward}`,
        candidate_id: id,
        date: '2025-06-15',
        summary: 'Sample public record item: a made-up council vote, reported by two sources.',
        candidate_response: ward === 6 ? 'Sample response from the candidate.' : '',
        source_ids: pickSources(2),
      });
    }
  }
}

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'races.csv'), toCsv(['race_id', 'acclaimed'], races));
writeFileSync(join(OUT, 'candidates.csv'), toCsv(['candidate_id', 'race_id', 'name', 'incumbent', 'background', 'other_priorities', 'website', 'facebook', 'instagram', 'email', 'nomination_filed', 'status', 'source_ids'], candidates));
writeFileSync(join(OUT, 'positions.csv'), toCsv(['candidate_id', 'issue_id', 'status', 'summary', 'note', 'note_source_ids', 'source_ids'], positions));
writeFileSync(join(OUT, 'public_record.csv'), toCsv(['record_id', 'candidate_id', 'date', 'summary', 'candidate_response', 'source_ids'], publicRecord));
writeFileSync(join(OUT, 'sources.csv'), toCsv(['source_id', 'title', 'outlet', 'url', 'date_accessed', 'access_note'], sources));
console.log(`Wrote ${candidates.length} mock candidates in ${races.length} wards to ${OUT}/`);
