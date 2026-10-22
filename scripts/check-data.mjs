// Checks data/ on its own, and data/ merged with data-mock/ when that folder exists.
import { existsSync } from 'node:fs';
import { readDir, mergeMock, checkData } from '../src/lib/load.mjs';

const real = readDir('data');
const runs = [['data/', real]];
if (existsSync('data-mock')) runs.push(['data/ + data-mock/', mergeMock(real, readDir('data-mock'))]);

let failed = false;
for (const [label, d] of runs) {
  const errors = checkData(d);
  if (errors.length) {
    failed = true;
    console.error(`✗ ${label}: ${errors.length} problem(s)`);
    for (const e of errors) console.error(`  - ${e}`);
  } else {
    console.log(`✓ ${label}: ${d.candidates.length} candidates, ${d.positions.length} positions, ${d.sources.length} sources`);
  }
}
process.exit(failed ? 1 : 0);
