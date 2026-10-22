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

### Immediate: site build with mock-data preview (step 3)

The owner wants to see the site working with mock data before the ward research (step 2). Do this first. Ask the owner before starting, per `CLAUDE.md`.

- [ ] Set up Astro in this repo (Node.js 24 is installed). Read CSVs from `data/` at build time.
- [ ] Pages: home (ward picker, mayor link, "How we stay neutral" box), one page per race (candidate cards, fairness banner, comparison table of candidates x issues), Standards (from `STANDARDS.md`), Sources, and a "last updated" date. See "Site structure" in `PROJECT_NOTES.md`.
- [ ] Cards: same layout for everyone, alphabetical by last name, no photos. Show "No stated position found" for `none_found` and "No items found" for empty public record. Show the `note` column as fact-check context, visually separate from the candidate's own position.
- [ ] Acclaimed wards show "Acclaimed" instead of a comparison.
- [ ] Mock data in a separate `data-mock/` folder, never mixed into `data/`:
    - Same CSV schema. Covers wards 1-6 and 8-10, with at least one acclaimed ward and one ward with 3+ candidates.
    - Obviously fake names only (for example "Sample Candidate A"), never real people. Mock sources point to `example.com`.
    - Real `data/` stays the source for the mayor and Ward 7.
- [ ] Mock data is used only in preview mode (for example, an environment variable such as `USE_MOCK=1`). A normal build ignores it. A "Mock data" banner shows on every page while it's active.
- [ ] Add the data check below and run it on both `data/` and `data-mock/`.
- [ ] Add `.claude/launch.json` (or an npm script) so the owner can start the local preview easily. Preview locally only; do not deploy to GitHub Pages yet.
- [ ] Update the Steps table in `PROJECT_NOTES.md` when done.

### Site build: data check

- [ ] Add a data check to the build that fails if any ID doesn't match its table: `race_id`, `candidate_id`, `issue_id`, and every entry in `source_ids`. Also flag duplicate IDs and candidates missing any of the 11 issue rows in `positions`.
