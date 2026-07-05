# Data Portal — inferred schema (from live Awesome Table)

Source: `https://view-awesome-table.com/-LMhFDOkAHrb3NlSTd9v/view` (the Awesome Table view embedded on
dataportal.urbanfluidmechanics.org/data-portal). Rendered directly and read on 2026-07-05.

**Record count in live portal:** 25 datasets (pager showed "1 – 11 / 25").
This is the real figure — the "148" used earlier in mockups was placeholder and has been removed.

## One record = one "dataset / project"

Columns inferred from the card layout (each card is one Sheet row):

| Field | Type | Notes / observed values |
|---|---|---|
| **Project Name** | text (title) | e.g. ACTUAL, CUBE, ClearfLo, DAPPLE-EPSRC, "CWE2000 cube flow validation (Silsoe)". Not unique — DAPPLE-EPSRC repeats across several rows. |
| **Description** | text (long) | 1–3 sentence summary. |
| **Method** | multi-value (comma-sep) | **Filter.** Observed: `Field experiment`, `Physical modelling`, `CFD`. Rows can combine, e.g. "Field experiment, Physical modelling, CFD". |
| **Morphology** | multi-value | **Filter.** Observed: `Realistic`, `3D: idealised`, `Semi realistic`, `Rough wall`. (Expect also 2D / smooth-wall variants.) |
| **Quantities** | multi-value | **Filter.** Observed: `Velocity`, `Concentration`, `Stability`, `Boundary layer depth`, `Temperature`, `Humidity`, `Solar radiation`, `Infiltration rate`, `Pressure`. |
| **Institution** | text/enum | **Filter.** Observed: Reading, Southampton, City (University of London), Birmingham, Leeds, Surrey. |
| **Corresponding Author** | name + email | **Searchable.** Rendered as mailto link (e.g. Janet Barlow → j.f.barlow@reading.ac.uk). |
| **Project URL** | url | May be blank. |
| **Data available from** | name+email OR repo link | Sometimes the author; sometimes a repository (CEDA catalogue UUID, DAPPLE Outputs page). |
| **Key article** | title + DOI/url + year | Feeds the **Papers** view. e.g. "Observations of wind speed profiles over Greater London…" → doi.org/10.1016/j.jweia.2013.07.019, 2013. |
| **Additional information** | text | Free notes; sometimes contains extra dataset URLs (e.g. CEDA uuid). |
| **Latitude / Longitude (or Location)** | geo | NOT shown in the table cards, but the **Map** view plots each dataset, so the Sheet must carry coordinates or a geocodable place. Confirm exact columns when real Sheet arrives. |

## Filters / search controls (from the Awesome Table filter bar)
1. Free-text search — **Project Name**
2. Dropdown — **Method**
3. Dropdown — **Morphology**
4. Dropdown — **Quantities**
5. Free-text search — **Corresponding Author**
6. Dropdown — **Institution**
7. Free-text search — **Search Paper**
8. Free-text search — **Search everything**
Behaviour: multiple criteria are AND-combined ("ALL must be met"); a clear-all control exists.

## Three views over the SAME rows
- **Data Portal** — card/table list with the filter bar above (this view).
- **Map** — same datasets plotted geographically (needs lat/long).
- **Papers** — the "Key article" of each dataset, listed chronologically by year.

## Build implications
- Model one collection `datasets` with the fields above; `method`, `morphology`, `quantities` are arrays (facet filters); `institution` is an enum/string facet; author/paper are free-text searchable.
- Derive the **Papers** page from `keyArticle` fields (sort by year desc).
- Derive the **Map** from lat/long; pin colour by primary `method` (Field / Lab / CFD), matching the homepage legend.
- Synthetic seed data should mirror these fields and realistic value sets so the real Sheet drops in with minimal mapping.
