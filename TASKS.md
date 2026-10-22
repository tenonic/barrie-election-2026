# Tasks

Internal task list. **Not published on the site.** Decisions and overall status live in `PROJECT_NOTES.md`.

## Owner: manual source opening

BarrieToday blocks automated access, so Claude cannot open its pages. The owner opens each page in a browser and pastes the full text into the chat. Claude then updates the data and marks the source as verified.

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

- [ ] Fact-check notes (`positions.note`) have no sources of their own. Four notes cite city housing figures, tax-increase figures and Statistics Canada figures that aren't in `sources.csv`. Add a `note_source_ids` column and find the sources.
- [ ] Candidate background and priorities share one source list for the whole card. Split them into separate statements, each with its own sources (for example a `candidate_facts` table: candidate_id, field, text, source_ids).
- [ ] Incumbent tag, contact details and nomination status: source to the City's certified list (S001) or the campaign site.
- [ ] Race facts (candidate count, "Acclaimed") and home-page facts (election date, new ward boundaries): source to City of Barrie pages.
- [ ] Extend the data check so the build fails on any statement shown without a source.

### Next

- [ ] Owner reviews the mock preview; collect layout changes.
- [x] Merged `site-build` into `main` and deleted the branch (2026-10-22).
- [x] GitHub Actions deploys `main` to GitHub Pages (2026-10-22). Live: https://tenonic.github.io/barrie-election-2026/
- [ ] Corrections page and channel, once the owner decides on it (see Open questions in `PROJECT_NOTES.md`).
