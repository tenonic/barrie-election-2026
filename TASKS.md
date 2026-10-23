# Tasks

Internal task list. **Not published on the site.** Decisions and overall status live in `PROJECT_NOTES.md`.

## Timeline (set 2026-10-23)

Voting is already open: online and by phone, 24/7, from October 16 until 8pm on Monday, October 26. There are no paper ballots or polling stations. Every day the site is incomplete, people are voting without it, so all work finishes **today (Fri Oct 23) or tomorrow (Sat Oct 24)**. From Saturday evening the site is frozen except for corrections.

**Friday, October 23**

1. [ ] **How to vote box** on the home page (Claude, about 15 minutes; owner reviews before publishing). Sourced to the City of Barrie "Information for Voters" page:
    - Online (barrie.elections.vote) or by phone (1-833-969-4572), 24/7 until 8pm on October 26. No paper ballots or polling stations.
    - Voter Assistance Centres for in-person help with the digital platform, the voters list or a replacement PIN (bring ID): Allandale Recreation Centre, City Hall, East Bayfield Community Centre, Parkview Centre, Peggy Hill Team Community Centre, Surface Water Treatment Plant. Open Oct 22-23 10am-8pm, Oct 24 10am-6pm, closed Oct 25, Oct 26 10am-8pm. (The City page lists six centres; one FAQ says five.)
    - Ward 10: the first voter letters had the wrong ward; those PINs are deactivated. Use the yellow "Updated Voter Information" letter.
    - Also update home-page wording that assumes voting only happens on October 26.
2. [ ] **Corrections channel** (owner decides), then a Corrections page with the two waiting entries (Claude, about 30 minutes).
3. [ ] **Finish the sourcing** (Claude, about 1 hour): see "Every claim sourced" below.
4. [ ] **Owner: BarrieToday checks, single-source entries first:** S116 (Nader) and S159 (Cadeau), then the candidate profiles.

**Saturday, October 24**

5. [ ] **Owner: remaining BarrieToday checks.** Claude applies any fixes the same day.
6. [ ] **Final review** by the owner, then freeze by Saturday evening.

**Sunday, October 25 to Monday, October 26:** corrections only.

**Cut from this election:** the public record pass. There isn't time to do it equally for all 41 candidates, so the site keeps showing "Not yet reviewed" and says so plainly.

## Owner: manual source opening

BarrieToday blocks automated access, so Claude cannot open its pages. The owner opens each page in a browser and pastes the full text into the chat. Claude then updates the data and marks the source as verified.

### Plan: verify BarrieToday articles with Claude desktop (owner will run this)

The owner will run this check in the Claude desktop app, where Claude can read pages through a real browser (the built-in browser pane or Claude in Chrome). Instructions for Claude desktop:

1. Work on a new branch (for example `verify-barrietoday`), never directly on `main`.
2. Go through the BarrieToday tables below in this order: single-source entries first (S116 Nader, S159 Cadeau), then S026 (cited for all Ward 1 candidates), then the candidate profiles, then the rest, then the budget articles (S020-S022).
3. For each article, open its URL from `data/sources.csv` in the browser. If the page doesn't load or is paywalled, mark the row "Could not open" and move on. Never guess its content.
4. Find every row that cites the source ID: `data/positions.csv` (`source_ids` and `note_source_ids`) and `data/candidates.csv` (`source_ids`, which covers background and priorities). Compare each summary with the article:
    - Matches: no change.
    - Wrong or overstated: rewrite the paraphrase from the article. If the wrong version was already live, add an entry to the corrections list under "Next" below.
    - The article states a position we show as `none_found`: add it as `stated`, citing the source.
    - Follow the fairness rules in `PROJECT_NOTES.md`: paraphrase the candidate's own words, neutral tone, no new claims beyond the article.
5. In `data/sources.csv`, `access_note` is shown on the site and `internal_note` is not. For a verified source: remove "Found via BarrieVotes.ca" from `access_note` (keep "Candidate-submitted profile" for profiles), and set `internal_note` to "Verified in browser by Claude, YYYY-MM-DD" (or "Verified by the owner, YYYY-MM-DD").
6. Mark the row "Done" in the tables below (and in the profile table for profiles).
7. Run `npm run check:data`, commit in small batches, and give the owner a short summary of every change. The owner reviews before merging to `main`; merging publishes the site.

### BarrieToday candidate profiles

BarrieToday asked every candidate for a self-written profile. Collect one for each candidate so every race uses the same source (fairness rule 1). Write "none" if a candidate has no profile.

| Race | Candidate | Status |
| --- | --- | --- |
| Mayor | Alex Nuttall | To do |
| Mayor | Kay Sayer | To do |
| Mayor | Russell J. Tighe | To do |
| Mayor | Tanya Saari | To do |
| Ward 7 | Gary Harvey | To do |
| Ward 7 | Michael Lewis | Done 2026-10-22 (S015) |
| Wards 1-6, 8-10 | Added once those wards are researched | To do |

### BarrieToday articles cited in wards 1-10

These were cited through BarrieVotes.ca and not opened directly. For each one, check that the positions linked to it on the site match the article, then mark the source as verified. "Profile" means a candidate-submitted profile (it also covers the profile table above).

| Source | Article | Used for | Status |
| --- | --- | --- | --- |
| S025 | Ward 1 candidate says Barrie residents 'want action' on safety issues | Agostino | Done 2026-10-23 (profile) |
| S026 | Ward 1 candidates weigh in on how Barrie should develop 460 hectares of annexed land | All Ward 1 candidates | Done 2026-10-23 |
| S029 | Ainsworth running on safety, accountability in Ward 1 | Ainsworth | Done 2026-10-23 (profile) |
| S033 | Ward 1 candidate says communication, listening will guide campaign | Bowser | Done 2026-10-23 (profile) |
| S037 | Ward 1 candidate believes in 'giving back to the community' (profile) | Rahman | Done 2026-10-23 |
| S040 | Absentee landlords, speeding among top issues for Ward 1 hopeful (profile) | Stevenson | Done 2026-10-23 |
| S046 | Ward 2 candidates cite addiction crisis, downtown Barrie safety as key election issues | Nixon, Noushahi, Strohm | To do |
| S053 | Ward 2 candidate running on 'show up or hush up' principle (profile) | Casera | Done 2026-10-23 |
| S056 | Ward 2 candidate says affordability among 'defining issues' this election (profile) | Edwards | Done 2026-10-23 |
| S062 | 'Incredible' work being done to improve downtown, says Ward 2 incumbent (profile) | Nixon | Done 2026-10-23 |
| S064 | Barrie must find ways to generate more revenue, says Ward 2 candidate (profile) | Noushahi | Done 2026-10-23 |
| S068 | Change needed to fix downtown Barrie, says Ward 2 candidate (profile) | Strohm | Done 2026-10-23 |
| S069 | Election signs easy targets in Barrie campaign | Strohm (self-funding) | To do |
| S074 | Ward 3 candidate vows to be 'independent voice' on Barrie council (profile) | Courser | Done 2026-10-23 |
| S081 | Electrician hopes to bring 'practical, hands-on' approach to Ward 3 (profile) | Hughes | Done 2026-10-23 |
| S084 | Ward 3 candidate wants to keep Barrie 'a special city' (profile) | Jones | Done 2026-10-23 |
| S089 | Baseball helps shape Ward 3 candidate's attitude toward teamwork (profile) | Rijo | Done 2026-10-23 |
| S093 | Road safety, speeding among top issues in newly redrawn Ward 4 | Ahmad | To do |
| S096 | Ward 4 candidate hopes to bring people together, solve problems | Corbett | To do |
| S099 | Listening, problem-solving 'second nature' to Ward 4 candidate | Galeazza | To do |
| S103 | Former councillor eyes return to city hall in Ward 4 | Khan | To do |
| S109 | Ward 5 hopeful looks to bring 'new era of politics' to council (profile) | Da Silva | Done 2026-10-23 |
| S113 | Thomson looks to draw on experience in re-election bid | Thomson | To do |
| S116 | Ward 6 candidate hopes to 'bring residents together' in Barrie | Nader (only source for his positions) | Done 2026-10-23 (profile) |
| S120 | Ward 6 incumbent says approach rests on 'finding practical solutions' (profile) | Nigussie | Done 2026-10-23 |
| S125 | Traffic, transit, school zones among Ward 6 candidate's concerns | Pena | To do |
| S130 | Ward 8 candidate's career shaped by law, public policy and judicial work | Alim | To do |
| S133 | 'Harder questions' must be asked about Barrie's growth, says Ward 8 newcomer | Fellows | To do |
| S142 | Rising taxes, declining core services among top election issues, says Costello | Costello | To do |
| S144 | Ward 9 candidate hosting meet-and-greet Wednesday evening | Costello (housing) | To do |
| S147 | Ward 9 incumbent says local parks have seen 'historical investments' | Morales | To do |
| S153 | Ward 9 candidate wants 'meaningful' community consultation | Naveed | To do |
| S156 | Councillors have power to keep Barrie affordable, says Ward 9 candidate | Weingarten | To do |
| S159 | Military vet wants 'every resident's voice' to be heard in Ward 10 | Cadeau (only source for his positions) | Done 2026-10-23 (profile) |
| S162 | 'Smarter growth, safer neighbourhoods' among priorities for Ward 10 incumbent | Hamilton | To do |
| S166 | Ward 10 candidate wants more thought put into Barrie's rapid growth | Kapustin | To do |

Each source's link is on the site's Sources page, under its source ID.

### BarrieToday budget articles (tax fact-check note)

These back the property-tax figures in Alex Nuttall's tax note. Check that each article gives the figure shown. The 2024 figure has no other source yet.

| Source | Figure to check | Status |
| --- | --- | --- |
| S020 | 4.82% total increase, 2024 | To do |
| S021 | 4.31% total increase, 2025 | To do |
| S022 | 3.95% total increase, 2026 | To do |

## Claude

### Site build with mock-data preview (step 3): done 2026-10-22 on branch `site-build`

Built per the list below. Preview: `npm run dev:mock`, then open http://localhost:4321/barrie-election-2026/. Regenerate mock data with `npm run mock:generate`.

- [x] Set up Astro in this repo (Node.js 24 is installed). Read CSVs from `data/` at build time.
- [x] Pages: home (ward picker, mayor link, "How we stay neutral" box), one page per race (candidate cards, fairness banner, comparison table of candidates x issues), Standards (from `STANDARDS.md`), Sources, and a "last updated" date. See "Site structure" in `PROJECT_NOTES.md`.
- [x] Cards: same layout for everyone, alphabetical by last name, no photos. Show "No stated position found" for `none_found` and "No items found" for empty public record. Show the `note` column as fact-check context, visually separate from the candidate's own position.
- [x] Acclaimed wards show "Acclaimed" instead of a comparison.
- [x] Mock data in a separate `data-mock/` folder, never mixed into `data/`:
    - Same CSV schema. Covers wards 1-6 and 8-10, with at least one acclaimed ward and one ward with 3+ candidates.
    - Obviously fake names only (for example "Sample Candidate A"), never real people. Mock sources point to `example.com`.
    - Real `data/` stays the source for the mayor and Ward 7.
- [x] Mock data is used only in preview mode (for example, an environment variable such as `USE_MOCK=1`). A normal build ignores it. A "Mock data" banner shows on every page while it's active.
- [x] Add the data check below and run it on both `data/` and `data-mock/`.
- [x] Add `.claude/launch.json` (or an npm script) so the owner can start the local preview easily. Preview locally only; do not deploy to GitHub Pages yet.
- [x] Update the Steps table in `PROJECT_NOTES.md` when done.

### Site build: data check

- [x] Add a data check to the build that fails if any ID doesn't match its table: `race_id`, `candidate_id`, `issue_id`, and every entry in `source_ids`. Also flag duplicate IDs and candidates missing any of the 11 issue rows in `positions`.

### Every claim sourced (owner requirement, 2026-10-22)

Every claim, fact and quote on the site must link to its source. Gaps found in the audit:

- [x] Fact-check notes (`positions.note`) have no sources of their own. Four notes cite city housing figures, tax-increase figures and Statistics Canada figures that aren't in `sources.csv`. Add a `note_source_ids` column and find the sources. Done 2026-10-22: added `note_source_ids` and sources S016-S023; the build fails if a note has no source. Research found the tax note was wrong (see the corrections item below), and the jobs note now uses the latest Statistics Canada month.
- [ ] Candidate background and priorities share one source list for the whole card. Split them into separate statements, each with its own sources (for example a `candidate_facts` table: candidate_id, field, text, source_ids).
- [ ] Incumbent tag, contact details and nomination status: source to the City's certified list (S001) or the campaign site.
- [ ] Race facts (candidate count, "Acclaimed") and home-page facts (election date, new ward boundaries): source to City of Barrie pages.
- [ ] Extend the data check so the build fails on any statement shown without a source.

### Next

- [x] Owner reviewed the preview; all wards merged and live 2026-10-23.
- [x] Merged `site-build` into `main` and deleted the branch (2026-10-22).
- [x] GitHub Actions deploys `main` to GitHub Pages (2026-10-22). Live: https://tenonic.github.io/barrie-election-2026/
- [ ] Corrections page and channel, once the owner decides on it (see Open questions in `PROJECT_NOTES.md`).
- [ ] First entries for the public corrections log (fairness rule 7), both from 2026-10-22:
    - Alex Nuttall, property taxes, fact-check note: said total increases were 4.85% (2024), 4.28% (2025) and 4.80% (2026). Corrected to 4.82%, 4.31% and 3.95%; 4.80% was the proposed 2026 figure before council cuts. The note had no source of its own; sources added.
    - Gary Harvey, jobs, fact-check note: said unemployment eased to 7.0% by July 2026. Updated to the latest Statistics Canada figure, 6.4% for September 2026.
