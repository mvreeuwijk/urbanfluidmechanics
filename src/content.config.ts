import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One Markdown file per meeting in src/content/meetings/.
// Frontmatter holds the metadata + programme; the body is a short description.
const meetings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/meetings' }),
  schema: z.object({
    number: z.number(),                 // 1 = kick-off
    label: z.string(),                  // e.g. "13th UFM Meeting"
    theme: z.string().optional(),       // optional meeting theme/subtitle
    start: z.coerce.date(),             // e.g. 2025-12-16
    end: z.coerce.date().optional(),    // for multi-day meetings
    host: z.string(),
    location: z.string(),
    venue: z.string().optional(),
    online: z.boolean().default(false),
    registrationUrl: z.string().url().optional(),
    // The full programme, in order. Each entry is one of:
    //  • a talk   — has `title` (+ optional speaker / affiliation / slides / keynote / time)
    //  • an item  — has `note` (breaks, lunch, dinner, discussion, registration…) (+ optional time)
    //  • a header — { header: true, session: "Day 2 — …" } to divide sessions/days
    programme: z
      .array(
        z.object({
          time: z.string().optional(),
          title: z.string().optional(),
          speaker: z.string().optional(),
          affiliation: z.string().optional(),
          slides: z.string().url().optional(),
          keynote: z.boolean().optional(),
          note: z.string().optional(),
          session: z.string().optional(),
          header: z.boolean().optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { meetings };
