const teamPage = { label: 'iWAT team page', url: 'https://www.iwatllc.com/about/' };
const directory = { label: 'Third-party iWAT directory', url: 'https://www.signalhire.com/companies/iwat' };

// Scenario connections are illustrative interpretations of role titles, not verified assignments.
export const needs = {
  Website: ['Discovery', 'Design', 'Web development'],
  'Managed IT': ['Support', 'Security', 'Ongoing operations'],
  'Network upgrade': ['Network design', 'Cabling', 'Implementation']
};

const solution = ['Website'];
const technical = ['Managed IT', 'Network upgrade'];
export const people = [
  { name: 'Rob Fulcher', role: 'Sr. Solutions Architect, CEO', scenarios: solution },
  { name: 'Dan McCleary', role: 'Sr. Solutions Architect', scenarios: solution },
  { name: 'James Butts', role: 'Sr. Solutions Architect', scenarios: solution },
  { name: 'Clint Walker', role: 'Solutions Architect Manager', scenarios: solution },
  { name: 'Kylie Wilson', role: 'Solutions Architect', scenarios: solution },
  { name: 'Brandon Fulcher', role: 'Solutions Architect', scenarios: solution },
  { name: 'Brandon Lamer-Connolly', role: 'Solutions Architect', scenarios: solution },
  { name: 'Travis Durf', role: 'Technology Services Manager', scenarios: technical },
  { name: 'Tanner Wetzel', role: 'Technical Architect', scenarios: technical },
  { name: 'Logan Zeigler', role: 'Technical Architect', scenarios: technical },
  { name: 'Greg Johnston', role: 'Technical Architect', scenarios: technical },
  { name: 'Ethan Fix', role: 'Technical Architect', scenarios: technical },
  { name: 'Kathy Pross', role: 'Office Manager', scenarios: [] },
  { name: 'Owen Bernecker', role: 'Operations Manager', scenarios: ['Managed IT'] },
  { name: 'Patrick Hicks', role: 'Solutions Architect (directory listing)', scenarios: solution, source: directory, note: 'A supplied profile also describes software engineering. Current role not confirmed.' },
  { name: 'Cameron Leib', role: 'Information Technology Contractor (directory listing)', scenarios: ['Managed IT'], source: directory, note: 'Current role not confirmed.' }
].map(person => ({ ...person, source: person.source || teamPage }));

export function orderPeople(scenario) {
  return [...people].sort((a, b) => Number(b.scenarios.includes(scenario)) - Number(a.scenarios.includes(scenario)));
}
