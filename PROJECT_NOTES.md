# Barrie Election 2026: Project Notes

Internal working notes: decisions, plan and status. **Not published on the site.**
Last updated: 2026-10-23

## Goal

A public, neutral website that helps Barrie voters compare candidates before the **Monday, October 26, 2026** municipal election.

- **Audience:** any Barrie voter
- **Voting:** online or by phone only, 24/7 from October 16 until 8pm on October 26; no paper ballots. Voters are already voting, so the site must be complete as early as possible.
- **Live since:** 2026-10-22. **All work finished by Saturday, October 24**; corrections only after that (timeline in `TASKS.md`)
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
| 2026-10-22 | Git workflow: short-lived branches per piece of work (for example `site-build`), merged into `main` after owner review, then deleted. After go-live only `main` deploys (superseded 2026-10-23: always ask before pushing to `main`) |
| 2026-10-22 | Astro 7. The owner turned off Windows Smart App Control, which blocked Astro's native compiler; the WebAssembly workaround was removed |
| 2026-10-22 | Site palette is neutral (charcoal and muted brown); no colours associated with a political party |
| 2026-10-22 | Owner requirement: every claim, fact and quote shown on the site links to its source (see `TASKS.md`) |
| 2026-10-22 | Ward research method (same for every candidate): City certified list for contact details and filing dates; BarrieVotes.ca candidate page; the original campaign pages and news articles it cites, which are recorded as our sources. Every non-BarrieToday link is checked to open. BarrieToday articles are marked "cited via BarrieVotes.ca, not opened directly" |
| 2026-10-22 | "Incumbent" tag only for a councillor running in the ward they hold now (under the previous boundaries). A sitting councillor running in another ward has that role stated in their background instead |
| 2026-10-22 | Recorded council votes are left for the public record pass, so positions only reflect what candidates say |
| 2026-10-22 | Every candidate who cites "0% operating budget increases" (Nuttall, Harvey, Thomson, Nigussie) gets the same sourced context note on total tax increases |
| 2026-10-22 | The same rule applies to the "779 affordable units approved" claim (Harvey, Hamilton): both get the same sourced housing note |
| 2026-10-22 | Left out: a news report that a Ward 10 candidate was assaulted (personal matter, excluded by the public record rules), and a provincial run BarrieVotes attributes to Ben Hughes (identity not confirmed). Asmar Naveed's card notes his website says he has stepped back from campaigning, without health details |
| 2026-10-23 | New timeline: voting is already open online and by phone, so all work finishes Fri Oct 23 or Sat Oct 24, then the site is frozen except for corrections. Public record pass cut from this election; the site keeps "Not yet reviewed". Add a sourced "How to vote" box to the home page |
| 2026-10-23 | `sources.csv` gets an `internal_note` column the site never shows. Public notes only say what helps a reader: "Found via BarrieVotes.ca" for sources not yet read directly, "Candidate-submitted profile", and real caveats about a source |
| 2026-10-23 | Always ask the owner before anything goes live (any push or merge to `main`), including small fixes. Replaces the earlier "small fixes go straight to `main`" rule |
| 2026-10-23 | No feature branches: work directly on `main`, commit locally, show the change in the local preview, and push only after the owner says to publish |
| 2026-10-23 | Also ask before every commit, not only before pushing |
| 2026-10-22 | Race pages: candidate cards hold the profile (background, priorities, public record, contact); issue positions, sources and fact-check notes are in the comparison table |

## Data model (CSV)

| Table | Purpose | Key columns |
| --- | --- | --- |
| `races` | 11 rows: mayor + wards 1-10 | race_id, name, type (mayor/ward), acclaimed |
| `candidates` | One row per candidate | candidate_id, race_id, name, incumbent, background, ward_priorities, website, social links |
| `issues` | The fixed issue list | issue_id, name |
| `positions` | One row per candidate per issue | candidate_id, issue_id, status, summary, note, note_source_ids, source_ids |
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
| 2 | Research wards 1-6 and 8-10 | Done 2026-10-22 (35 candidates); merged and live 2026-10-23 |
| 3 | Build the Astro site, with a mock-data preview first | Built 2026-10-22 and merged into `main`; owner review of layout ongoing |
| 4 | Owner reviews, then the site goes live on GitHub Pages | Live early at the owner's request 2026-10-22: https://tenonic.github.io/barrie-election-2026/ (mayor and Ward 7 only; other wards "coming soon"). Every push to `main` redeploys |

## Open questions

- **Corrections channel:** probably email plus a GitHub issue; not decided yet
- **Public record:** not researched yet. It needs one dedicated pass applied equally to all candidates (fairness rule 1).
- **Uneven depth:** the Michael Lewis entry relies on one BarrieToday article (S015). The owner verified its full text on 2026-10-22 and the entry was updated from it. Still worth looking for a second source.
- **Candidate profiles:** BarrieToday is publishing a candidate-submitted profile for each candidate. These are a consistent source for every race, but the owner has to paste them in because the site blocks automated access.

## Existing research

- Claude doc with the mayor and Ward 7 candidates (created 2026-10-22): https://claude.ai/artifact/36zJMX9WtzGTaN5KVvCY84
- Main sources: the City of Barrie certified candidates list, BarrieVotes.ca (an unofficial tracker that compiles local news), CTV Barrie, Barrie 360, Bayshore Broadcasting, and campaign sites
- BarrieToday blocks automated access; its coverage comes through BarrieVotes.ca
