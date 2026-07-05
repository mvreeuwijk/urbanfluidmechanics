# Content editing & data backend — design plan

**Date:** 2026-07-05
**Owner:** Maarten van Reeuwijk
**Status:** design approved; implementation deferred (plan only).
**Relates to:** [2026-07-05-ufm-website-design.md](./2026-07-05-ufm-website-design.md)

## 1. Goal

The site is a static Astro build on GitHub Pages (no server, free). Content currently lives in the
repo (meetings as Markdown, datasets as JSON, etc.) and is edited via Git. We want to **edit content
without Git**, and to set datasets up for **automated population** from data repositories — while
staying free, serverless and low-maintenance.

## 2. Constraints (what shapes every choice below)

- **Free & serverless.** Keep the static-on-GitHub-Pages model. No database, no always-on server.
- **Editors may not use GitHub.** This rules out Git-based CMSs (Decap/Sveltia/Tina/Pages CMS), which
  require each editor to authenticate with a GitHub account. Editors do have Google accounts.
- **Low maintenance.** Prefer tools with nothing to run or patch.
- **Two very different content types.** Meetings are *nested* (a meeting has a variable-length
  programme of talks / breaks / session headers). Datasets are *tabular* and, long-term, *machine-populated*.

Because editors may not have GitHub, **Google Sheets is the only free, no-server, no-GitHub editing
surface** available — so it anchors the plan.

## 3. Decision summary

| Content | Editing surface | Source of truth | Notes |
|---|---|---|---|
| **Meetings** | Google Sheets (2 tabs) — *recommended*; Markdown-in-repo remains a viable fallback | The Sheet (built in) | See §4 and the open decision in §7 |
| **Datasets** | Ingestion pipeline (staged), with a curation gate | Repo data, produced by the pipeline | See §5 |
| **Members, pages, research** | Unchanged (repo files) | Repo | Out of scope for this plan |

Publishing for both: nightly rebuild **plus** a one-click "Publish now" trigger (§6).

## 4. Meetings → Google Sheets

### Model — two tabs
- **`Meetings` tab** — one row per meeting: `slug, number, label, theme, start, end, host, location,
  venue, online, registrationUrl, description`.
- **`Programme` tab** — one row per agenda item, rows grouped contiguously under their meeting and kept
  in the intended display order (the build preserves sheet row order, so no manual `order` column):
  `meeting_slug, kind (talk|note|header), time, title, speaker, affiliation, slides, session, keynote`.

### Build
A build step fetches both tabs (published-CSV or Sheets API), joins `Programme` rows to their meeting by
`meeting_slug`, and emits the same in-memory shape the site already renders (`src/content/meetings` /
the `programme` array). The per-meeting page, archive index, homepage and next/last-meeting banner are
unchanged — only the data *source* changes.

### Migration
The 13 existing Markdown meetings are exported once to seed the two tabs (a small script converts the
current `programme` arrays to `Programme` rows), so nothing is lost.

### Trade-offs (honest)
- **Gains:** no GitHub for editors; familiar; "paste a slide link after the event" = find the talk row,
  paste the URL.
- **Costs vs the current Markdown:** no live preview; no schema validation (a typo in `kind` or a
  malformed date only shows at build — mitigate with Sheets data-validation dropdowns for `kind`,
  `online`, and a date column format); the nested programme spans two tabs, which is conceptually
  fiddlier than one file per meeting.

## 5. Datasets → ingestion pipeline (staged)

Long-term the datasets are **auto-populated from data repositories**, not hand-typed. Design for that now.

### Loader abstraction (already in place)
`src/lib/datasets.ts` exposes a single `loadRaw()` seam. Every stage below swaps only that function; the
table, map and papers views never change.

### Stages
1. **Now (interim):** synthetic seed (`datasets.synthetic.json`) — already built. Optionally a small
   curated source (a Sheet or a hand-list) for a handful of real datasets before automation exists.
2. **Automated ingestion (the goal):** a scheduled GitHub Action runs an ingestion script that, per
   configured **repository adapter**, queries a data repository's API, normalises each record to the
   dataset schema, dedupes (by DOI), and writes the portal's dataset data into the repo (then the site
   rebuilds).

### Repository adapters (pluggable)
One small module per source, each implementing `search() → RawRecord[]` and `map(RawRecord) → Dataset`.
Candidate sources (to be chosen later): **CEDA**, **Zenodo** (by community/keyword), **PANGAEA**,
**Figshare**, **B2SHARE**, institutional data repositories (ORDAs). Selection of sources is deferred to
the user.

### The hard part — UFM facets aren't in repository metadata
Repository records give title, authors, DOI, description, sometimes location — but **not** the
UFM-specific facets the portal filters on (`method`, `morphology`, `quantities`). So ingestion:
- Auto-fills the objective fields (name, description, authors, DOI/links, institution, and — via
  geocoding, e.g. Nominatim — `lat/lng` from place names).
- Leaves the subjective facets for a **curation gate**: fetched candidates land in a "pending" area
  (a review Sheet or a `pending/` data file) where a human tags method/morphology/quantities and
  approves; only approved records are published. This keeps auto-ingested junk off the live portal.

### Data flow
```
repository APIs → adapters → normalise + geocode → dedupe → PENDING (curation: add facets, approve)
   → APPROVED dataset data in repo → build → table / map / papers
```

## 6. Publishing — nightly + "Publish now"

- Keep the existing **nightly** scheduled rebuild (already implemented) so Sheet/pipeline changes appear
  within a day.
- Add a **"Publish now"** manual trigger: the deploy workflow already supports `workflow_dispatch`; expose
  a one-click way to fire it (a bookmarkable link that calls the GitHub API to dispatch the workflow, or
  a tiny password-gated page/Cloudflare Worker that does so) so an editor can push a build on demand
  without waiting for nightly and without the Actions UI.

## 7. Open decisions (deferred, non-blocking)

1. **Meetings: Sheets vs keep-Markdown.** Recommended: **Sheets**, because non-GitHub editors is the
   deciding constraint. *But* if in practice only Maarten edits meetings, editing the Markdown files
   through GitHub's **web UI** (no local Git) is even simpler and keeps validation + preview — so the
   Markdown collection stays a valid choice. Decide based on who actually edits.
2. **Dataset repositories** to ingest from, and the curation surface (review Sheet vs `pending/` files).
3. **"Publish now" mechanism:** bookmarkable API link vs a small gated trigger page.

## 8. What stays the same

Static Astro on GitHub Pages; the whole site's rendering; members/pages/research content; the design
system; the deploy pipeline (extended, not replaced). No server, no database, still free.

## 9. Rollout (suggested order)

1. **Publish-now trigger** — small, immediately useful for the current repo/Markdown workflow.
2. **Meetings on Sheets** — two tabs + build fetch + one-time export of the 13 meetings (only if the
   Sheets route is chosen over Markdown).
3. **Dataset ingestion** — start with one repository adapter + the curation gate, then add sources.

Each rollout item is independently shippable and can become its own implementation plan.
