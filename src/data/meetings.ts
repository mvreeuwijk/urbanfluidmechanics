// Meeting archive. Seeded from the crawl of the current site (dates, hosts, slugs).
// Talk lists / slide links are filled in per-meeting during the Meetings build step.
// NOTE: `talksCount` values are placeholders until the real programmes are transcribed.

export interface Talk {
  title: string;
  speaker?: string;
  affiliation?: string;
  slidesUrl?: string;
}

export interface Meeting {
  number: number;          // 1 = kick-off
  label: string;           // e.g. "13th UFM Meeting" / "Kick-off Meeting"
  slug: string;
  start: string;           // ISO date
  end?: string;            // ISO date (multi-day)
  host: string;
  location: string;
  online?: boolean;
  talksCount?: number;     // placeholder until programmes transcribed
  talks?: Talk[];
}

export const MEETINGS: Meeting[] = [
  { number: 13, label: '13th UFM Meeting', slug: 'imperial-december-16-2025', start: '2025-12-16', host: 'Imperial College London', location: 'London, UK', talksCount: 1 },
  { number: 12, label: '12th UFM Meeting', slug: 'birmingham-april-28-2025', start: '2025-04-28', host: 'University of Birmingham', location: 'Birmingham, UK', talksCount: 9 },
  { number: 11, label: '11th UFM Meeting', slug: 'surrey-april-3-4-2023', start: '2023-04-03', end: '2023-04-04', host: 'University of Surrey', location: 'Guildford, UK', talksCount: 14 },
  { number: 10, label: '10th UFM Meeting', slug: 'metofficereading-sept-1-2-2022', start: '2022-09-01', end: '2022-09-02', host: 'University of Reading · Met Office', location: 'Reading, UK', talksCount: 12 },
  { number: 9, label: '9th UFM Meeting', slug: 'online-meeting-march-21-2022', start: '2022-03-21', host: 'Online — AI & data-driven approaches', location: 'Online', online: true, talksCount: 6 },
  { number: 8, label: '8th UFM Meeting', slug: 'online-meeting-march-29-2021', start: '2021-03-29', host: 'Online', location: 'Online', online: true, talksCount: 6 },
  { number: 7, label: '7th UFM Meeting', slug: 'online-meeting-june-29-2020', start: '2020-06-29', host: 'Online — Covid-19 workshop', location: 'Online', online: true, talksCount: 5 },
  { number: 6, label: '6th UFM Meeting', slug: 'reading-january-6-7-2020', start: '2020-01-06', end: '2020-01-07', host: 'University of Reading', location: 'Reading, UK', talksCount: 12 },
  { number: 5, label: '5th UFM Meeting', slug: 'surrey-june-27-28-2019', start: '2019-06-27', end: '2019-06-28', host: 'University of Surrey', location: 'Guildford, UK', talksCount: 14 },
  { number: 4, label: '4th UFM Meeting', slug: 'cambridge-december-17-18-2018', start: '2018-12-17', end: '2018-12-18', host: 'University of Cambridge', location: 'Cambridge, UK', talksCount: 14 },
  { number: 3, label: '3rd UFM Meeting', slug: 'birmingham-july-2-3-2018', start: '2018-07-02', end: '2018-07-03', host: 'University of Birmingham', location: 'Birmingham, UK', talksCount: 17 },
  { number: 2, label: '2nd UFM Meeting', slug: 'imperial-december-18-2017', start: '2017-12-18', host: 'Imperial College London', location: 'London, UK', talksCount: 7 },
  { number: 1, label: 'Kick-off Meeting', slug: 'kick-off-meeting-march-30-31-2017', start: '2017-03-30', end: '2017-03-31', host: 'University of Southampton', location: 'Southampton, UK', talksCount: 10 },
];

/** Meetings newest-first (already ordered that way, but be explicit). */
export const meetingsByDateDesc = [...MEETINGS].sort((a, b) => b.start.localeCompare(a.start));

/**
 * The meeting to feature in the top announcement bar.
 * If a meeting is today or in the future -> "next"; otherwise the most recent past -> "last".
 * `today` is passed in (build date) so the result is deterministic per build.
 */
export function featuredMeeting(today: Date): { meeting: Meeting; kind: 'next' | 'last' } | null {
  const iso = today.toISOString().slice(0, 10);
  const upcoming = [...MEETINGS]
    .filter((m) => (m.end ?? m.start) >= iso)
    .sort((a, b) => a.start.localeCompare(b.start));
  if (upcoming.length) return { meeting: upcoming[0], kind: 'next' };
  const past = meetingsByDateDesc;
  return past.length ? { meeting: past[0], kind: 'last' } : null;
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/** Human date range, e.g. "3–4 Apr 2023" or "16 Dec 2025". */
export function formatMeetingDate(m: Meeting): string {
  const s = new Date(m.start + 'T00:00:00');
  if (!m.end) return `${s.getUTCDate()} ${MONTHS[s.getUTCMonth()]} ${s.getUTCFullYear()}`;
  const e = new Date(m.end + 'T00:00:00');
  const sameMonth = s.getUTCMonth() === e.getUTCMonth() && s.getUTCFullYear() === e.getUTCFullYear();
  if (sameMonth) return `${s.getUTCDate()}–${e.getUTCDate()} ${MONTHS[s.getUTCMonth()]} ${s.getUTCFullYear()}`;
  return `${s.getUTCDate()} ${MONTHS[s.getUTCMonth()]} – ${e.getUTCDate()} ${MONTHS[e.getUTCMonth()]} ${e.getUTCFullYear()}`;
}
