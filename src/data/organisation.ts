// Leadership & steering committee (from the current site's Organisation page).
export interface Person {
  name: string;
  institution: string;
  url?: string;   // staff profile
  email?: string;
}

export const LEADS: Person[] = [
  { name: 'Prof Maarten van Reeuwijk', institution: 'Imperial College London', url: 'https://profiles.imperial.ac.uk/m.vanreeuwijk', email: 'm.vanreeuwijk@imperial.ac.uk' },
  { name: 'Prof Christina Vanderwel', institution: 'University of Southampton', url: 'https://www.southampton.ac.uk/people/5xcpfb/professor-christina-vanderwel', email: 'c.m.vanderwel@soton.ac.uk' },
  { name: 'Dr Marco Placidi', institution: 'University of Surrey', url: 'https://www.surrey.ac.uk/people/marco-placidi', email: 'm.placidi@surrey.ac.uk' },
];

export const STEERING: Person[] = [
  { name: 'Prof Janet F. Barlow', institution: 'University of Reading', url: 'https://research.reading.ac.uk/meteorology/people/janet-barlow/' },
  { name: 'Dr Daniel Hackett', institution: 'RWDI' },
  { name: 'Dr Steven Herring', institution: 'AWE' },
  { name: 'Dr Humphrey Lean', institution: 'Met Office' },
  { name: 'Prof Andrew Quinn', institution: 'University of Birmingham', url: 'https://www.birmingham.ac.uk/staff/profiles/civil/quinn-andrew.aspx' },
];

export const FORMER: Person[] = [
  { name: 'Prof Chris Baker', institution: 'University of Birmingham', url: 'https://www.birmingham.ac.uk/staff/profiles/civil/baker-chris.aspx' },
  { name: 'Dr Tim Foat', institution: 'Dstl' },
  { name: 'Prof Sue Grimmond', institution: 'University of Reading', url: 'https://research.reading.ac.uk/meteorology/people/sue-grimmond/' },
  { name: 'Prof Paul Linden', institution: 'University of Cambridge', url: 'https://www.damtp.cam.ac.uk/person/pfl4' },
  { name: 'Prof Alan Robins', institution: 'University of Surrey', url: 'https://www.surrey.ac.uk/people/alan-robins' },
  { name: 'Dr Gabriel Rooney', institution: 'Met Office' },
];
