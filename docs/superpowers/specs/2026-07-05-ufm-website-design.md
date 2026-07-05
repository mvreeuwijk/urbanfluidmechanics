# urbanfluidmechanics.org — rebuild design spec

**Date:** 2026-07-05
**Owner:** Maarten van Reeuwijk (Imperial)
**Status:** approved design direction; building first version with synthetic portal data.

## 1. Goal & motivation

Replace the current site — two Google Sites (`www.urbanfluidmechanics.org` + the
`dataportal.` subdomain, whose tables/maps are Awesome Table embeds over a Google Sheet) — with a
single modern, self-owned website. Primary drivers, in order:

1. **Modern, distinctive design** (the current Google Sites look is dated).
2. **A better Data Portal** than Awesome Table (nicer table, filters, map, papers).
3. A **free** platform we control.

## 2. Tech stack & hosting

- **Astro**, static output (`output: 'static'`). Chosen over Docusaurus: this is a designed
  community site + one interactive data tool, where design freedom matters more than docs features
  (sidebar/versioning/search) that we don't need.
- **Hosting:** GitHub Pages, published by the official `withastro/action` GitHub Action.
- **Cost:** £0. Nothing needs SSR — all data is baked in at build time.
- **Custom domain:** `urbanfluidmechanics.org` (set `site`/`base` accordingly; `CNAME`).
- **Interactivity** via Astro islands only where needed (Data Portal filtering, map).
- **Map:** Leaflet + OpenStreetMap tiles (free, client-side).

## 3. Freshness model

The dataset is edited in a **Google Sheet** (kept as source of truth). The site fetches it **at build
time** and bakes datasets/map/papers into static pages. A **nightly scheduled GitHub Action**
rebuilds so Sheet edits appear within a day. (Instant/live-in-browser was considered and rejected in
favour of speed + robustness.) For the first version we build against **synthetic data** with the same
schema; the real Sheet drops in later behind a single loader module.

## 4. Information architecture

One unified site (the data portal becomes a section, not a separate site). Top nav:

- **Home** (`/`)
- **Research** (`/research`) — the five challenge areas (full descriptions)
- **Members** (`/members`) — institutions/companies grid + how to join
- **Meetings** (`/meetings`) — archive index + one page per meeting
- **Data Portal** (`/data-portal`) — datasets table/filters; sub-views **/map**, **/papers**
- **About** (`/about`) — history (incl. UK Fluids Network origin), organisation, contacts
- Utility: **Join the mailing list** (Mailchimp link), top **announcement bar** (next/last meeting).

`dataportal.urbanfluidmechanics.org` can later 301 to `/data-portal` (optional).

## 5. Visual design system — Direction A "Boundary Layer"

Approved mockup: scientific-editorial. (Artifacts: Direction A homepage.)

- **Palette (light):** ink navy `#112433`; streamline **teal** `#0d7c86` (primary); **CFD-orange**
  `#c65a2b` (secondary accent, sparing); cool paper `#f2f5f8`; hairline `#d7e0e7`. Dark theme defined
  via tokens (navy → `#0a121a`, teal → `#3bb3bd`). Full token set in the mockup CSS.
- **Type:** serif headlines (Georgia/"Iowan Old Style" fallback stack) over a system sans body; mono
  for data/labels. **Build task:** self-host a proper humanist sans + a text serif via `@font-face`
  (candidates: body *Public Sans*/*Source Sans*; display a text serif such as *Source Serif*/*Spectra*).
- **Components:** sticky masthead nav; full-bleed **city hero image** (real photography — source
  CC-licensed or supplied; the mockup uses a vector stand-in) with serif headline overlaid; slim
  **inline stat bar** (number beside label, dividers); editorial section headings with rule; bordered
  card rows; teal buttons/links; CFD-orange used only as a data accent (e.g. Field-experiment pins/chips).
- **Announcement bar** (top): shows the **next** upcoming meeting; once it has passed, automatically
  becomes **"Last meeting"** with a "view slides →" link. Computed at build from meeting dates;
  hidden if nothing to show. Dismissible.
- **Logo:** contained mark (building cluster + heat/flow streamlines). Placeholder — a proper logo pass
  is a separate task.
- **Theming:** token-based; support OS `prefers-color-scheme` and a manual toggle
  (`data-theme` on root) in both directions. Respect `prefers-reduced-motion` (streamline animation).
- **Accessibility:** visible focus states, semantic landmarks, alt text, colour-contrast checked in both themes.

## 6. Content model & data

### 6.1 Static content (migrated from crawl)
Source inventory: `content-inventory.md` (22 pages crawled). Notable:
- **Members:** ~40 institutions/companies (logos/links); "250+ members". Re-crawl raw HTML for the full
  institution list during build.
- **Research:** five 2025 challenge areas (C1–C5) — full text from `ChallengesAreas 2025.pptx`.
- **About/history:** founded as a UK Fluids Network SIG (EPSRC-funded); that grant has concluded; now
  **independent** and open. (Do **not** brand as current UK Fluids Network; no "founded 2017" tagline.)
  Confirm canonical UK Fluids URL (`ukfluids.net` vs `fluids.ac.uk`).

### 6.2 Meetings (from crawl)
- **13 meetings**, 2017–2025; slugs confirmed. Model a `meetings` collection:
  `number, title, date(s), host/location, programme, talks[] {title, speaker, affiliation, slidesUrl}`.
- **11/13 have slide decks** (mostly Google Drive/Google Slides; the 2017 Imperial meeting uses Dropbox
  PDFs; 2017 kick-off uses legacy Drive IDs — verify). Meetings & presentations are treated as **key
  outputs**: archive index + rich per-meeting pages listing talks with slide links.
- First version: **link out** to existing Drive/Dropbox slide URLs (don't rehost). Optionally rehost later.

### 6.3 Data Portal (from live Awesome Table — see `data-portal-schema.md`)
- **25 datasets** (real count). One `datasets` collection. Fields:
  `projectName, description, method[] (Field experiment|Physical modelling|CFD),
  morphology[] (Realistic|3D idealised|Semi realistic|Rough wall|…),
  quantities[] (Velocity|Concentration|Stability|Boundary-layer depth|Temperature|Humidity|Solar
  radiation|Infiltration rate|Pressure|…), institution, correspondingAuthor {name,email},
  projectUrl, dataAvailableFrom, keyArticle {title, doi/url, year}, additionalInfo, lat, lng`.
- **Filters:** free-text (Project Name, Corresponding Author, Paper, everything) + faceted dropdowns
  (Method, Morphology, Quantities, Institution); AND-combined; clear-all. Implement client-side over
  baked-in JSON (Astro island).
- **Map** (`/data-portal/map`): Leaflet + OSM; one pin per dataset; pin colour by primary method
  (Field=orange, Lab=teal, CFD=green), legend matches homepage.
- **Papers** (`/data-portal/papers`): derived from `keyArticle`, listed by year (desc), linking DOIs.
- **Synthetic data now:** generate ~25 realistic UFM datasets matching this schema (real-sounding
  projects, UK/EU cities with coordinates, plausible authors/DOIs) in `src/data/datasets.synthetic.json`.
  A single loader (`src/lib/datasets.ts`) returns synthetic now and the Google-Sheet CSV later — swapping
  the source is one module change.

## 7. Build & deploy pipeline

- Repo: **public** GitHub repo **`urbanfluidmechanics`** (created once functionality is in place).
- Two workflows: (a) build+deploy on push to `main`; (b) **scheduled nightly** rebuild (cron) to pick up
  Sheet edits. Both use `withastro/action` → Pages.
- `astro.config.mjs`: `site: 'https://urbanfluidmechanics.org'`, static; add `CNAME`.
- Requires `gh` authenticated as the site owner's GitHub account (handled at repo-creation step).

## 8. Non-goals (first version)

- No CMS/admin UI (content via repo + Google Sheet).
- No rehosting of slide decks (link out).
- No SSR, accounts, or search server (client-side filtering only).
- Final logo and real hero photography are follow-ups, not blockers.

## 9. To confirm with real inputs (later)

- Google Sheet link + exact columns (esp. location: lat/long vs place names; whether Papers is a
  separate tab).
- Full members/institutions list (raw-HTML re-crawl).
- Canonical UK Fluids URL; whether "Special Interest Group" naming is retained.
- Real slide-deck link integrity (2017 Dropbox/legacy Drive IDs).
