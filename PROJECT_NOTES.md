# Barrie Election 2026: Project Notes

Internal working notes: decisions, plan and status. **Not published on the site.**
Last updated: 2026-10-22

## Goal

A public, neutral website that helps Barrie voters compare candidates before the **Monday, October 26, 2026** municipal election.

- **Audience:** any Barrie voter
- **Target go-live:** Saturday, October 24, 2026
- **Upkeep:** shared by the owner and Claude

## Scope

- **Mayor:** 1 city-wide race (4 candidates)
- **Ward councillor:** 10 races, one per ward (new ward boundaries in effect for 2026)
- Acclaimed wards are still listed, marked "Acclaimed"
- **Out of scope for now:** school board trustees (the structure should allow adding them later)

## Decisions

| Date | Decision |
| --- | --- |
| 2026-10-22 | Scope: mayor plus all 10 wards, no trustees |
| 2026-10-22 | Data stored as linked CSV tables (database-style) |
| 2026-10-22 | Website shows candidate cards; no photos for now |
| 2026-10-22 | Same fixed issue list for every candidate |
| 2026-10-22 | Add a "Public record" field (not "Controversies"), with strict rules |
| 2026-10-22 | Fairness standards shown prominently on the site |
| 2026-10-22 | Site built with Astro, hosted on GitHub Pages (public repo) |
| 2026-10-22 | GitHub account: `tenonic` |
| 2026-10-22 | Kept Astro after comparing plain HTML/JS, React and Angular |
| 2026-10-22 | Candidate field `other_priorities` holds ward-specific priorities (councillors) and other stated priorities (mayor) |
| 2026-10-22 | Positions use `status` (`stated` / `none_found`); fact-check context goes in a separate `note` column |
| 2026-10-22 | Internal notes (`PROJECT_NOTES.md`, `CLAUDE.md`) may be visible in the public repo, but must not appear on the site |
| 2026-10-22 | Public repo `tenonic/barrie-election-2026`, branch `main`; commits use the GitHub no-reply email |
| 2026-10-22 | Build the site with a mock-data preview (`data-mock/`, preview mode only) before the ward research; development continues in VS Code with Claude |
| 2026-10-22 | Git workflow: short-lived branches per piece of work (for example `site-build`), merged into `main` after owner review, then deleted. Small fixes go straight to `main`. After go-live only `main` deploys |
| 2026-10-22 | Astro 7. Windows Smart App Control blocks Astro's native compiler on the owner's PC, so local runs use Astro's official WebAssembly compiler (`scripts/ensure-wasm-compiler.mjs`); GitHub Actions (Linux) uses the native one |
| 2026-10-22 | Site palette is neutral (charcoal and muted brown); no colours associated with a political party |
| 2026-10-22 | Race pages: candidate cards hold the profile (background, priorities, public record, contact); issue positions, sources and fact-check notes are in the comparison table |

## Data model (CSV)

| Table | Purpose | Key columns |
| --- | --- | --- |
| `races` | 11 rows: mayor + wards 1-10 | race_id, name, type (mayor/ward), acclaimed |
| `candidates` | One row per candidate | candidate_id, race_id, name, incumbent, background, ward_priorities, website, social links |
| `issues` | The fixed issue list | issue_id, name |
| `positions` | One row per candidate per issue | candidate_id, issue_id, summary, source_ids |
| `public_record` | Verifiable record items | candidate_id, date, summary, candidate_response, source_ids |
| `sources` | Everything cited | source_id, title, outlet, url, date_accessed |

The website build converts the CSV files to JSON.

## Issue list (11)

1. Property taxes and budget
2. Housing affordability
3. Homelessness and encampments
4. Public safety and policing
5. Transit and roads
6. Strong-mayor powers (for councillors: their view on them)
7. Growth and development
8. Addiction and public drug use
9. Jobs and economic development
10. E-bikes and e-scooters
11. Transparency and council accountability

Councillors also get a "Ward-specific priorities" field.

## Fairness standards (display prominently on the site)

1. Same research method and depth for every candidate
2. Candidates listed alphabetically, with identical card layout
3. Positions paraphrased from the candidate's own words, always with a source
4. "No stated position" or "No items found" instead of leaving gaps
5. Public record limited to verifiable facts from at least 2 reputable sources, with the candidate's response where available
6. No endorsements, ratings or "pro/con" labels
7. Errors corrected quickly and logged publicly

### Public record rules

- **Include:** integrity commissioner findings, court or campaign finance rulings, key council votes and official decisions, and significant events reported by at least 2 reputable outlets
- **Exclude:** unproven allegations, rumours, social media disputes, personal or family matters, anything sourced only to opinion pieces or a single blog
- Factual tone, with date and source
- A methodology note explains that incumbents naturally have more public record

## Site structure

- **Home:** ward picker, mayor link, "How we stay neutral" box
- **Race pages:** neutral candidate cards, a fairness banner, and a comparison table (candidates x issues)
- **Standards** page, **Sources** page, "last updated" date
- **Corrections:** a channel and a public log

## Steps and status

| # | Step | Status |
| --- | --- | --- |
| 1 | Repo setup, data structure, migrate the mayor and Ward 7 research | Done 2026-10-22: https://github.com/tenonic/barrie-election-2026 |
| 2 | Research wards 1-6 and 8-10 | Not started (check in before starting) |
| 3 | Build the Astro site, with a mock-data preview first | Mock preview built 2026-10-22 on branch `site-build`; awaiting owner review (see `TASKS.md`) |
| 4 | Owner reviews, then the site goes live on GitHub Pages | Not started |

## Open questions

- **Corrections channel:** probably email plus a GitHub issue; not decided yet
- **Public record:** not researched yet. It needs one dedicated pass applied equally to all candidates (fairness rule 1).
- **Uneven depth:** the Michael Lewis entry relies on one BarrieToday article (S015). The owner verified its full text on 2026-10-22 and the entry was updated from it. Still worth looking for a second source.
- **Candidate profiles:** BarrieToday is publishing a candidate-submitted profile for each candidate. These are a consistent source for every race, but the owner has to paste them in because the site blocks automated access.

## Existing research

- Claude doc with the mayor and Ward 7 candidates (created 2026-10-22): https://claude.ai/artifact/36zJMX9WtzGTaN5KVvCY84
- Main sources: the City of Barrie certified candidates list, BarrieVotes.ca (an unofficial tracker that compiles local news), CTV Barrie, Barrie 360, Bayshore Broadcasting, and campaign sites
- BarrieToday blocks automated access; its coverage comes through BarrieVotes.ca
