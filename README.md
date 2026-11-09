# iWAT redesign concept

An independent, unaffiliated redesign prototype for iWAT. The site is clearly labeled as a concept; inquiries are directed to the live iWAT website.

## Live concept

Explore the [public GitHub Pages concept](https://angry-tacoz.github.io/iwat-redesign-concept/). It is an independent prototype, not an official iWAT website.

## Explore

- A radial homepage with an interactive particle galaxy and contextual, scripted guidance.
- Grouped service pages and a local, example-driven discovery flow. No form data is sent or saved.
- A team directory using iWAT’s published roster, with service highlights only where self-reported experience is documented and linked.
- A particle map of Pennsylvania with approximate city markers, location cards, and Google Maps links. The state boundary is adapted from [PennDOT's State Boundary layer](https://gis.penndot.gov/arcgis/rest/services/paprojects/paprojects/MapServer/26).

## Run locally

```sh
npm ci
npm run dev
npm run build
npx playwright install chromium
npm test
npm run preview
```

The Vite build uses relative asset paths and hash navigation for static hosting beneath a GitHub Pages repository path. GitHub Pages publishes built files from the `gh-pages` branch. The current deployment was built from merge commit `de9bd8b`; subsequent source changes require a fresh build and publication to that branch.

## Prototype limits

Service content is summarized, not a complete audit. Most individual credentials and service assignments remain unverified. Guidance is deterministic; it makes no LLM calls. Rust/WebAssembly has not been benchmarked against the JavaScript particle simulation. A comprehensive accessibility and browser review remains outstanding. The Lancaster and York locations are approximate city markers, not verified office addresses; their listed number is iWAT's main line.

The logo and company information appear for demonstration. Confirm permission to reuse iWAT branding and copy before presenting or publishing a public-facing deployment.

## Design log

The concept evolved through a series of design decisions intended to show how a business website can communicate its services while remaining easy to explore. These entries describe the decisions made during the initial prototype; they are not claims about iWAT's business priorities or production results.

1. **Consolidate the experience.** Group related offerings into fewer destinations while keeping the major service, company, product, and contact information discoverable. The current copy is a representative summary; a complete content audit remains open.
2. **Make the homepage a wheel.** Use a radial navigation concept with iWAT's central message inside, surrounded by selectable concepts. Each selection updates the headline and preview, and links to its own category page; Services opens the full overview.
3. **Preserve iWAT's visual identity.** Evolve the existing dark-and-green palette and use iWAT's logo consistently in the header, wheel, and footer. This is an independent concept, not an official redesign.
4. **Explore motion with purpose.** Turn a mouse-responsive particle network into a multi-armed galaxy around the wheel. Increase inner density, keep the outside sparse, and slow the orbit toward the edges. Use a quieter non-spiral particle field across the other pages. Reduced-motion mode displays a still composition.
5. **Keep the interface readable.** Enlarge the navigation and supporting copy after comparing the prototype to iWAT's live site. Adjust mobile control placement so larger text and the guidance card do not cover the wheel controls.
6. **Put services in context.** Rename the former Explore node to Services and display the six services featured on iWAT's homepage with representative icons. Their order is not a claim of popularity.
7. **Show contextual guidance without a model.** Adapt the ambient-interaction idea from the Best Buy Blue concept: deliberate selections trigger scripted guidance. There are no LLM calls or stored visitor profiles.
8. **Make discovery tangible.** Adapt ideas from the James Lane AI process mapper into a local workflow/IT-needs example. Nothing is transmitted or persisted; the concept sends real inquiries to the official site.
9. **Make team comparisons evidence-led.** Adapt Delivery Composer's transparent comparison idea using published names and roles. Unknown credentials and capabilities remain explicitly unverified rather than being scored or described as weaknesses.
10. **Connect the map to the visual language.** Replace separate map previews and long location blocks with a particle map of Pennsylvania. A city selection reveals a location card, phone information, and a Google Maps link; city markers are approximate and missing local addresses and phone numbers are labeled. Enlarge the map and slow the assembly animation, revealing city names and markers once the state takes shape. For reduced motion, show the completed map and labels immediately. Support mouse, keyboard, and touch.

11. **Make local interactions dependable.** Keep a selected map location stable while keyboard users move to its map link, and include the discovery objective in the local summary. The objective stays in memory during in-app navigation and resets on reload; it is not saved or sent.

12. **Share a working concept.** Publish the initial prototype on GitHub Pages so reviewers can explore the wheel, discovery flow, and location map in a browser. The current publishing branch contains a static build and does not automatically update when source changes.

13. **Make project comparisons easier to explore.** Bring people with an illustrative role connection to the selected scenario to the front and visually distinguish them, while keeping other cards readable and selectable. Show the source for each role, label directory listings that may be outdated, and make clear that role-based connections are not verified skills or staffing decisions.

14. **Browse the full team by service.** Replace comparison with a Full Team default and 15 service filters. Keep iWAT’s published roster separate from unverified directory listings. Highlight only documented relevant experience, link its source, and show the whole roster when evidence is insufficient. Experience is self-reported and does not establish project assignments or a ranking of ability.

15. **Credit the concept creator.** Include James Lane in the independent prototype banner on every page.

16. **Remove empty grid space.** Let the page background show through unused team-grid cells instead of displaying a solid block.

**Technology decision:** Svelte and Vite were chosen for the static interactive prototype. Rust/WebAssembly was proposed for a possible particle simulation comparison; the benchmark has not been completed, so the current JavaScript implementation should not be presented as a measured performance decision.
