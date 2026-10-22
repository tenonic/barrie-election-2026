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

### Site build (step 3)

- [ ] Add a data check to the build that fails if any ID doesn't match its table: `race_id`, `candidate_id`, `issue_id`, and every entry in `source_ids`. Also flag duplicate IDs and candidates missing any of the 11 issue rows in `positions`.
