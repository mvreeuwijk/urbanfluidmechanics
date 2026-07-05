// Site-wide constants: identity, navigation, contacts, external links.

export const SITE = {
  name: 'Urban Fluid Mechanics',
  sub: 'Special Interest Group',
  domain: 'urbanfluidmechanics.org',
  description:
    'An open research community on the fluid mechanics of the urban environment — the ' +
    'turbulent transport of momentum, heat and pollutants across every scale of the city.',
} as const;

export const NAV: { label: string; href: string }[] = [
  { label: 'Research', href: '/research' },
  { label: 'Members', href: '/members' },
  { label: 'Meetings', href: '/meetings' },
  { label: 'Data Portal', href: '/data-portal' },
  { label: 'About', href: '/about' },
];

// Mailchimp signup (from crawl of the current site).
export const MAILING_LIST_URL = 'https://eepurl.com/hVx9Af';

export const CONTACTS: { name: string; institution: string; email: string }[] = [
  { name: 'Maarten van Reeuwijk', institution: 'Imperial College London', email: 'm.vanreeuwijk@imperial.ac.uk' },
  { name: 'Christina Vanderwel', institution: 'University of Southampton', email: 'c.m.vanderwel@soton.ac.uk' },
  { name: 'Marco Placidi', institution: 'University of Surrey', email: 'm.placidi@surrey.ac.uk' },
];
