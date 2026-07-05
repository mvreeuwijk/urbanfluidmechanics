// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static site for GitHub Pages. Custom apex domain -> base '/'.
export default defineConfig({
  site: 'https://urbanfluidmechanics.org',
  integrations: [sitemap()],
  build: { format: 'directory' },
});
