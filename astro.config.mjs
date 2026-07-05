// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ── Deploy target ────────────────────────────────────────────────────────────
// CURRENT: GitHub Pages project site — served at https://mvreeuwijk.github.io/urbanfluidmechanics/
//   → site = 'https://mvreeuwijk.github.io', base = '/urbanfluidmechanics'
// TO GO LIVE ON THE CUSTOM DOMAIN (urbanfluidmechanics.org):
//   → set site = 'https://urbanfluidmechanics.org', base = '/', then in the repo
//     Settings → Pages, set the custom domain (public/CNAME is already in place).
// Internal links use withBase() (src/lib/url.ts), so this switch needs no other edits.
export default defineConfig({
  site: 'https://mvreeuwijk.github.io',
  base: '/urbanfluidmechanics',
  integrations: [sitemap()],
  build: { format: 'directory' },
});
