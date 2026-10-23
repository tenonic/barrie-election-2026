# Barrie Voter Guide 2026

A neutral, sourced guide to the candidates for **Mayor**, **Ward Councillor** and **School Board Trustee** in Barrie, Ontario's municipal election on **Monday, October 26, 2026**.

Not affiliated with the City of Barrie or any candidate or campaign.

## How the data is organized

All content lives in linked CSV tables in [`data/`](data/):

| File | Contents |
| --- | --- |
| `races.csv` | Mayor plus wards 1-10 |
| `candidates.csv` | One row per candidate: background, links, race |
| `issues.csv` | The 11 issues every candidate is compared on |
| `positions.csv` | One row per candidate per issue, with sources |
| `public_record.csv` | Verifiable public record items |
| `sources.csv` | Every source cited, with access date |

Tables link by ID (`race_id`, `candidate_id`, `issue_id`, `source_id`). Multiple source IDs are separated by `;`.

## Standards

All research follows [STANDARDS.md](STANDARDS.md).

## Status

- Mayor: 4 candidates entered
- Ward 7: 2 candidates entered
- Other wards: research in progress
- Website: not built yet
