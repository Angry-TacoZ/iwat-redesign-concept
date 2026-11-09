const teamPage = { label: 'iWAT team page', url: 'https://www.iwatllc.com/about/#:~:text=iWAT%20Team%20Members' };
const directory = { label: 'Third-party iWAT directory', url: 'https://www.signalhire.com/companies/iwat' };

// Evidence is self-reported experience, not a verified project assignment.
const clint = { name: 'Clint Walker', detail: 'Describes client software and web development with PHP and JavaScript.', url: 'https://www.linkedin.com/in/clintjameswalker/' };
const kylie = { name: 'Kylie Wilson', detail: 'Describes web design and development, including WordPress sites.', url: 'https://www.linkedin.com/in/kyrwilson/' };
export const services = {
  'Custom Application Development': [clint],
  'Web Design & Development': [kylie, clint],
  'Managed IT Services': [],
  'Network Infrastructure Installation and Services': [],
  'Cloud Backups': [],
  'EDR Software': [],
  'System Cleanup': [],
  'IT Technical Support': [],
  'VoIP': [],
  'Cabling': [],
  'Hardware & Software Procurement Services': [],
  'Technology Training and Learning Center': [],
  'IT Consulting / Virtual CIO Services': [],
  'AI Consulting': [],
  'Custom PC Builds': []
};

export const people = [
  { name: 'Rob Fulcher', role: 'Sr. Solutions Architect, CEO' },
  { name: 'Dan McCleary', role: 'Sr. Solutions Architect' },
  { name: 'James Butts', role: 'Sr. Solutions Architect' },
  { name: 'Clint Walker', role: 'Solutions Architect Manager' },
  { name: 'Kylie Wilson', role: 'Solutions Architect' },
  { name: 'Brandon Fulcher', role: 'Solutions Architect' },
  { name: 'Brandon Lamer-Connolly', role: 'Solutions Architect' },
  { name: 'Travis Durf', role: 'Technology Services Manager' },
  { name: 'Tanner Wetzel', role: 'Technical Architect' },
  { name: 'Logan Zeigler', role: 'Technical Architect' },
  { name: 'Greg Johnston', role: 'Technical Architect' },
  { name: 'Ethan Fix', role: 'Technical Architect' },
  { name: 'Kathy Pross', role: 'Office Manager' },
  { name: 'Owen Bernecker', role: 'Operations Manager' },
].map(person => ({ ...person, source: teamPage }));

// Kept for research only; not included in the roster or service highlights.
export const unverifiedListings = [
  { name: 'Patrick Hicks', source: directory, note: 'Directory lists a solutions architect; a supplied profile mentions software engineering. Current employment and responsibilities unconfirmed.' },
  { name: 'Cameron Leib', source: directory, note: 'Directory lists an information technology contractor. Current employment and responsibilities unconfirmed.' }
];

export function orderPeople(service) {
  const matches = services[service] || [];
  return [...people].sort((a, b) => {
    const ai = matches.findIndex(match => match.name === a.name), bi = matches.findIndex(match => match.name === b.name);
    return (ai < 0 ? Infinity : ai) - (bi < 0 ? Infinity : bi);
  });
}
