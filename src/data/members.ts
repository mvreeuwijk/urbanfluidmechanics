// Member institutions & organisations.
// Affiliations were extracted from the group's mailing-list export (278 subscribers),
// normalised for typos / casing / encoding damage and non-official names
// (e.g. "Imperial", "Imperial colleges london" -> "Imperial College London";
//  "TU Delft" -> "Delft University of Technology"), deduplicated, then merged
// with the institutions already listed on the site. Each entry is tagged with a
// sector and the country it sits in.

export type MemberKind = 'academic' | 'industry' | 'government';

export interface Member {
  name: string;
  country: string;
  kind: MemberKind;
  url?: string;
}

// Total subscribers on the mailing list (not every subscriber gives an affiliation).
export const MEMBER_COUNT = 278;

export const MEMBERS: Member[] = [
  // ---- Universities & research institutes ----
  // United Kingdom
  { name: 'Imperial College London', country: 'United Kingdom', kind: 'academic', url: 'https://www.imperial.ac.uk/' },
  { name: 'University College London', country: 'United Kingdom', kind: 'academic', url: 'https://www.ucl.ac.uk/' },
  { name: 'University of Southampton', country: 'United Kingdom', kind: 'academic', url: 'https://www.southampton.ac.uk/' },
  { name: 'University of Surrey', country: 'United Kingdom', kind: 'academic', url: 'https://www.surrey.ac.uk/' },
  { name: 'University of Bristol', country: 'United Kingdom', kind: 'academic', url: 'https://www.bristol.ac.uk/' },
  { name: 'University of Reading', country: 'United Kingdom', kind: 'academic', url: 'https://www.reading.ac.uk/' },
  { name: 'University of Birmingham', country: 'United Kingdom', kind: 'academic', url: 'https://www.birmingham.ac.uk/' },
  { name: 'University of Manchester', country: 'United Kingdom', kind: 'academic', url: 'https://www.manchester.ac.uk/' },
  { name: 'University of Cambridge', country: 'United Kingdom', kind: 'academic', url: 'https://www.cam.ac.uk/' },
  { name: 'University of Edinburgh', country: 'United Kingdom', kind: 'academic', url: 'https://www.ed.ac.uk/' },
  { name: 'University of Glasgow', country: 'United Kingdom', kind: 'academic', url: 'https://www.gla.ac.uk/' },
  { name: 'University of Leeds', country: 'United Kingdom', kind: 'academic', url: 'https://www.leeds.ac.uk/' },
  { name: 'University of Nottingham', country: 'United Kingdom', kind: 'academic', url: 'https://www.nottingham.ac.uk/' },
  { name: 'University of Sheffield', country: 'United Kingdom', kind: 'academic', url: 'https://www.sheffield.ac.uk/' },
  { name: 'Newcastle University', country: 'United Kingdom', kind: 'academic', url: 'https://www.ncl.ac.uk/' },
  { name: 'Cardiff University', country: 'United Kingdom', kind: 'academic', url: 'https://www.cardiff.ac.uk/' },
  { name: 'Coventry University', country: 'United Kingdom', kind: 'academic', url: 'https://www.coventry.ac.uk/' },
  { name: 'Heriot-Watt University', country: 'United Kingdom', kind: 'academic', url: 'https://www.hw.ac.uk/' },
  { name: 'Teesside University', country: 'United Kingdom', kind: 'academic', url: 'https://www.tees.ac.uk/' },
  { name: 'University of Aberdeen', country: 'United Kingdom', kind: 'academic', url: 'https://www.abdn.ac.uk/' },
  { name: 'University of Bath', country: 'United Kingdom', kind: 'academic', url: 'https://www.bath.ac.uk/' },
  { name: 'University of Salford', country: 'United Kingdom', kind: 'academic', url: 'https://www.salford.ac.uk/' },
  { name: 'Loughborough University', country: 'United Kingdom', kind: 'academic', url: 'https://www.lboro.ac.uk/' },
  { name: 'City, University of London', country: 'United Kingdom', kind: 'academic', url: 'https://www.city.ac.uk/' },
  { name: 'Alan Turing Institute', country: 'United Kingdom', kind: 'academic', url: 'https://www.turing.ac.uk/' },
  { name: 'STFC Hartree Centre', country: 'United Kingdom', kind: 'academic', url: 'https://www.hartree.stfc.ac.uk/' },
  // Europe (non-UK)
  { name: 'Delft University of Technology', country: 'Netherlands', kind: 'academic', url: 'https://www.tudelft.nl/en/' },
  { name: 'École Centrale de Lyon', country: 'France', kind: 'academic', url: 'https://www.ec-lyon.fr/en' },
  { name: 'Arts et Métiers (ENSAM ParisTech)', country: 'France', kind: 'academic', url: 'https://artsetmetiers.fr/en' },
  { name: 'Université Savoie Mont Blanc', country: 'France', kind: 'academic', url: 'https://www.univ-smb.fr/en/' },
  { name: 'ETH Zürich', country: 'Switzerland', kind: 'academic', url: 'https://ethz.ch/en.html' },
  { name: 'Karlsruhe Institute of Technology', country: 'Germany', kind: 'academic', url: 'https://www.kit.edu/english/' },
  { name: 'Technical University of Dresden', country: 'Germany', kind: 'academic', url: 'https://tu-dresden.de/en' },
  { name: 'Ruhr University Bochum', country: 'Germany', kind: 'academic', url: 'https://www.ruhr-uni-bochum.de/en' },
  { name: 'Leibniz University Hannover', country: 'Germany', kind: 'academic', url: 'https://www.uni-hannover.de/en/' },
  { name: 'University of Hamburg', country: 'Germany', kind: 'academic', url: 'https://www.uni-hamburg.de/en.html' },
  { name: 'Politecnico di Milano', country: 'Italy', kind: 'academic', url: 'https://www.polimi.it/en' },
  { name: "University of L'Aquila", country: 'Italy', kind: 'academic', url: 'https://www.univaq.it/en/' },
  { name: 'Universidad Politécnica de Madrid', country: 'Spain', kind: 'academic', url: 'https://www.upm.es/internacional' },
  { name: 'Universitat Rovira i Virgili', country: 'Spain', kind: 'academic', url: 'https://www.urv.cat/en/' },
  { name: 'Université Libre de Bruxelles', country: 'Belgium', kind: 'academic', url: 'https://www.ulb.be/en' },
  { name: 'VITO', country: 'Belgium', kind: 'academic', url: 'https://vito.be/en' },
  { name: 'Aristotle University of Thessaloniki', country: 'Greece', kind: 'academic', url: 'https://www.auth.gr/en/' },
  { name: 'Politehnica University of Timișoara', country: 'Romania', kind: 'academic', url: 'https://www.upt.ro/english/' },
  { name: 'Charles University', country: 'Czech Republic', kind: 'academic', url: 'https://www.cuni.cz/UKEN-1.html' },
  // North America
  { name: 'Princeton University', country: 'United States', kind: 'academic', url: 'https://www.princeton.edu/' },
  { name: 'Florida State University', country: 'United States', kind: 'academic', url: 'https://www.fsu.edu/' },
  { name: 'Cleveland State University', country: 'United States', kind: 'academic', url: 'https://www.csuohio.edu/' },
  { name: 'University of Illinois Urbana-Champaign', country: 'United States', kind: 'academic', url: 'https://illinois.edu/' },
  { name: 'Western University', country: 'Canada', kind: 'academic', url: 'https://www.uwo.ca/' },
  { name: 'Ottawa Hospital Research Institute', country: 'Canada', kind: 'academic', url: 'https://www.ohri.ca/' },
  // Asia & Middle East
  { name: 'KAUST', country: 'Saudi Arabia', kind: 'academic', url: 'https://www.kaust.edu.sa/' },
  { name: 'Tel Aviv University', country: 'Israel', kind: 'academic', url: 'https://english.tau.ac.il/' },
  { name: 'The University of Hong Kong', country: 'Hong Kong', kind: 'academic', url: 'https://www.hku.hk/' },
  { name: 'City University of Hong Kong', country: 'Hong Kong', kind: 'academic', url: 'https://www.cityu.edu.hk/' },
  { name: 'Indian Institute of Science, Bengaluru', country: 'India', kind: 'academic', url: 'https://iisc.ac.in/' },
  { name: 'IIT Delhi', country: 'India', kind: 'academic', url: 'https://home.iitd.ac.in/' },
  { name: 'IIT Kanpur', country: 'India', kind: 'academic', url: 'https://www.iitk.ac.in/' },
  { name: 'IIT Madras', country: 'India', kind: 'academic', url: 'https://www.iitm.ac.in/' },
  { name: 'Nanjing University', country: 'China', kind: 'academic', url: 'https://www.nju.edu.cn/en/' },
  { name: 'Wuhan University', country: 'China', kind: 'academic', url: 'https://www.whu.edu.cn/english/' },
  { name: 'CRIEPI', country: 'Japan', kind: 'academic' },
  { name: 'Centre for Climate Research Singapore', country: 'Singapore', kind: 'academic' },
  // South America
  { name: 'Federal University of Espírito Santo', country: 'Brazil', kind: 'academic', url: 'https://www.ufes.br/' },

  // ---- Government & national laboratories ----
  { name: 'Met Office', country: 'United Kingdom', kind: 'government', url: 'https://www.metoffice.gov.uk/' },
  { name: 'Dstl', country: 'United Kingdom', kind: 'government', url: 'https://www.gov.uk/government/organisations/defence-science-and-technology-laboratory' },
  { name: 'AWE', country: 'United Kingdom', kind: 'government', url: 'https://www.awe.co.uk/' },
  { name: 'UK Health Security Agency', country: 'United Kingdom', kind: 'government', url: 'https://www.gov.uk/government/organisations/uk-health-security-agency' },
  { name: 'Health and Safety Executive', country: 'United Kingdom', kind: 'government', url: 'https://www.hse.gov.uk/' },
  { name: 'Los Alamos National Laboratory', country: 'United States', kind: 'government', url: 'https://www.lanl.gov/' },
  { name: 'FFI — Norwegian Defence Research Establishment', country: 'Norway', kind: 'government', url: 'https://www.ffi.no/en' },
  { name: 'FOI — Swedish Defence Research Agency', country: 'Sweden', kind: 'government', url: 'https://www.foi.se/en.html' },
  { name: 'SMHI — Swedish Meteorological and Hydrological Institute', country: 'Sweden', kind: 'government', url: 'https://www.smhi.se/en' },

  // ---- Industry & consultancy ----
  { name: 'Arup', country: 'United Kingdom', kind: 'industry', url: 'https://www.arup.com/' },
  { name: 'WSP', country: 'United Kingdom', kind: 'industry', url: 'https://www.wsp.com/' },
  { name: 'AECOM', country: 'United States', kind: 'industry', url: 'https://www.aecom.com/' },
  { name: 'Mott MacDonald', country: 'United Kingdom', kind: 'industry', url: 'https://www.mottmac.com/' },
  { name: 'Buro Happold', country: 'United Kingdom', kind: 'industry', url: 'https://www.burohappold.com/' },
  { name: 'Foster + Partners', country: 'United Kingdom', kind: 'industry', url: 'https://www.fosterandpartners.com/' },
  { name: 'AKT II', country: 'United Kingdom', kind: 'industry', url: 'https://www.akt-uk.com/' },
  { name: 'Hoare Lea', country: 'United Kingdom', kind: 'industry', url: 'https://www.hoarelea.com/' },
  { name: 'RWDI', country: 'Canada', kind: 'industry', url: 'https://www.rwdi.com/' },
  { name: 'CERC', country: 'United Kingdom', kind: 'industry', url: 'https://www.cerc.co.uk/' },
  { name: 'COWI', country: 'Denmark', kind: 'industry', url: 'https://www.cowi.com/' },
  { name: 'ESI-OpenCFD', country: 'United Kingdom', kind: 'industry', url: 'https://www.openfoam.com/' },
  { name: 'ICON Technology & Process Consulting', country: 'United Kingdom', kind: 'industry', url: 'https://www.iconcfd.com/' },
  { name: 'Wirth Research', country: 'United Kingdom', kind: 'industry', url: 'https://www.wirthresearch.com/' },
  { name: 'Wintech', country: 'United Kingdom', kind: 'industry', url: 'https://www.wintechgroup.co.uk/' },
  { name: 'Abercus', country: 'United Kingdom', kind: 'industry', url: 'https://www.abercus.com/' },
  { name: 'Actiflow', country: 'Netherlands', kind: 'industry', url: 'https://www.actiflow.com/' },
  { name: 'B-Fluid', country: 'France', kind: 'industry' },
  { name: 'Clean Air Fund', country: 'United Kingdom', kind: 'industry', url: 'https://www.cleanairfund.org/' },
];
