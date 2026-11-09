const teamPage = { label: 'iWAT team page', url: 'https://www.iwatllc.com/about/' };
const directory = { label: 'Third-party iWAT directory', url: 'https://www.signalhire.com/companies/iwat' };

// Connections are provisional role-based suggestions, not verified assignments.
export const services = {
  'Custom Application Development': ['Clint Walker', 'Rob Fulcher', 'Dan McCleary', 'James Butts', 'Brandon Fulcher'],
  'Web Design & Development': ['Kylie Wilson', 'Clint Walker', 'Rob Fulcher', 'Brandon Fulcher', 'Patrick Hicks'],
  'Managed IT Services': ['Travis Durf', 'Cameron Leib', 'Tanner Wetzel', 'Logan Zeigler', 'Ethan Fix'],
  'Network Infrastructure Installation and Services': ['Travis Durf', 'Tanner Wetzel', 'Logan Zeigler', 'Greg Johnston', 'Ethan Fix'],
  'Cloud Backups': ['Travis Durf', 'Tanner Wetzel', 'Logan Zeigler', 'Greg Johnston', 'Ethan Fix'],
  'EDR Software': ['Travis Durf', 'Cameron Leib', 'Tanner Wetzel', 'Logan Zeigler', 'Ethan Fix'],
  'System Cleanup': ['Cameron Leib', 'Travis Durf', 'Tanner Wetzel', 'Logan Zeigler', 'Ethan Fix'],
  'IT Technical Support': ['Cameron Leib', 'Travis Durf', 'Tanner Wetzel', 'Logan Zeigler', 'Ethan Fix'],
  'VoIP': ['Travis Durf', 'Tanner Wetzel', 'Logan Zeigler', 'Greg Johnston', 'Ethan Fix'],
  'Cabling': ['Travis Durf', 'Tanner Wetzel', 'Logan Zeigler', 'Greg Johnston', 'Ethan Fix'],
  'Hardware & Software Procurement Services': ['Travis Durf', 'Owen Bernecker', 'Tanner Wetzel', 'Logan Zeigler', 'Ethan Fix'],
  'Technology Training and Learning Center': ['Rob Fulcher', 'Kylie Wilson', 'Clint Walker'],
  'IT Consulting / Virtual CIO Services': ['Rob Fulcher', 'Dan McCleary', 'James Butts', 'Clint Walker'],
  'AI Consulting': ['Rob Fulcher'],
  'Custom PC Builds': ['Travis Durf', 'Cameron Leib', 'Tanner Wetzel', 'Logan Zeigler', 'Ethan Fix']
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
  { name: 'Patrick Hicks', role: 'Solutions Architect (directory listing)', source: directory, note: 'A supplied profile also describes software engineering. Current role not confirmed.' },
  { name: 'Cameron Leib', role: 'Information Technology Contractor (directory listing)', source: directory, note: 'Current role not confirmed.' }
].map(person => ({ ...person, source: person.source || teamPage }));

export function orderPeople(service) {
  const matches = services[service] || [];
  return [...people].sort((a, b) => {
    const ai = matches.indexOf(a.name), bi = matches.indexOf(b.name);
    return (ai < 0 ? Infinity : ai) - (bi < 0 ? Infinity : bi);
  });
}
