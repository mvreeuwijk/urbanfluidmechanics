# urbanfluidmechanics.org

Website for the **Urban Fluid Mechanics** community — an open research group on the fluid mechanics of
the urban environment (the turbulent transport of momentum, heat and pollutants across every scale of the
city). Built with [Astro](https://astro.build/), deployed as a static site to GitHub Pages.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output -> dist/
npm run preview  # serve the built site
```

Requires Node 18+.

## Structure

```
src/
  pages/            routes (index, research, members, meetings, data-portal, about, 404)
    meetings/[slug] one page per meeting (from src/data/meetings.ts)
    data-portal/    datasets table, /map (Leaflet), /papers
  components/       SiteNav, SiteFooter, AnnouncementBar, PageHeader, PortalTabs, Logo
  layouts/Base.astro  shared shell (fonts, theming, head, nav, footer)
  data/             challenges.ts, meetings.ts, members.ts, datasets.synthetic.json
  lib/datasets.ts   dataset loader + derived facets / papers / map points
  styles/global.css design tokens (Direction A "Boundary Layer") + base styles
```

## Data portal — connecting the real Google Sheet

The datasets currently come from `src/data/datasets.synthetic.json` (synthetic sample data, same schema as
the live portal). To use the real data, edit **one function** — `loadRaw()` in `src/lib/datasets.ts` — to
fetch and parse the published Google Sheet CSV at build time. Nothing else changes; the table, map and
papers all derive from it. See `data-portal-schema.md` for the column mapping.

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages:

- on every push to `main`,
- **nightly** (03:00 UTC) so edits to the source Google Sheet appear within a day,
- and on manual dispatch.

The custom domain is set via `public/CNAME` (`urbanfluidmechanics.org`) and `site` in `astro.config.mjs`.
In the repo: **Settings → Pages → Source: GitHub Actions**, then point DNS at GitHub Pages.

## Design & content notes

- Visual direction: "Boundary Layer" — serif headlines, navy + streamline-teal, sparing CFD-orange.
- The logo (`src/components/Logo.astro`, `public/favicon.svg`) is a placeholder pending a proper mark.
- The hero uses a vector cityscape stand-in; real photography can replace it.
- Meeting programmes/slides currently link out to the archived site; they can be transcribed into
  `src/data/meetings.ts` over time.
