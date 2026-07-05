import { getCollection, type CollectionEntry } from 'astro:content';

export type MeetingEntry = CollectionEntry<'meetings'>;

/** All meetings, newest first. */
export async function getMeetings(): Promise<MeetingEntry[]> {
  const all = await getCollection('meetings');
  return all.sort((a, b) => b.data.start.getTime() - a.data.start.getTime());
}

/** Number of talks (programme entries with a title) in a meeting. */
export function talkCount(m: MeetingEntry): number {
  return m.data.programme.filter((p) => p.title).length;
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const d = (x: Date) => x.getUTCDate();
const mo = (x: Date) => MONTHS[x.getUTCMonth()];
const y = (x: Date) => x.getUTCFullYear();

/** Human date range, e.g. "3–4 Apr 2023", "16 Dec 2025", "31 Aug – 1 Sep 2022". */
export function formatMeetingDate(start: Date, end?: Date): string {
  if (!end) return `${d(start)} ${mo(start)} ${y(start)}`;
  if (start.getUTCMonth() === end.getUTCMonth() && y(start) === y(end))
    return `${d(start)}–${d(end)} ${mo(start)} ${y(start)}`;
  if (y(start) === y(end))
    return `${d(start)} ${mo(start)} – ${d(end)} ${mo(end)} ${y(start)}`;
  return `${d(start)} ${mo(start)} ${y(start)} – ${d(end)} ${mo(end)} ${y(end)}`;
}

/**
 * Meeting to feature in the announcement bar: the next upcoming one, or the most
 * recent past one once it has finished. `meetings` must be sorted newest-first.
 */
export function featuredMeeting(
  meetings: MeetingEntry[],
  today: Date,
): { meeting: MeetingEntry; kind: 'next' | 'last' } | null {
  const t = today.getTime();
  const endMs = (m: MeetingEntry) => (m.data.end ?? m.data.start).getTime() + 86_400_000; // include the day
  const upcoming = meetings
    .filter((m) => endMs(m) >= t)
    .sort((a, b) => a.data.start.getTime() - b.data.start.getTime());
  if (upcoming.length) return { meeting: upcoming[0], kind: 'next' };
  return meetings.length ? { meeting: meetings[0], kind: 'last' } : null;
}
