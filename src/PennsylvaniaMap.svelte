<script>
  import { particleMap, project } from './particle-map.js';
  export let locations = [];
  let selected = null;
  let citiesReady = false;
  function revealCities() { citiesReady = true; }
  const cities = [
    { name: 'Chambersburg', coordinates: [-77.6611, 39.9375], labelX: 360 },
    { name: 'York', coordinates: [-76.7281, 39.9628], labelX: 635 },
    { name: 'Lancaster', coordinates: [-76.3044, 40.0397], labelX: 850 }
  ].map(city => ({ ...city, point: project(city.coordinates) }));
  function show(city) { selected = locations.find(location => location.city === city.name); }
  function hover(event, city) { if (event.pointerType !== 'touch') show(city); }
</script>
<svelte:window onkeydown={(event) => { if (event.key === 'Escape') selected = null; }} />
<div class="pa-map" role="group" aria-label="Map of Pennsylvania. Select a city for location details.">
  <canvas use:particleMap={{ onReveal: revealCities }} aria-hidden="true"></canvas>
  <div class="map-cities" class:ready={citiesReady}>
  <svg viewBox="0 0 1000 670" aria-hidden="true">
    {#each cities as city}
      <path d={`M ${city.point[0]} ${city.point[1]} L ${city.labelX} 600`} class="map-leader" />
      <circle cx={city.point[0]} cy={city.point[1]} r="12" class="map-marker-glow" />
      <circle cx={city.point[0]} cy={city.point[1]} r="5" class="map-marker" />
    {/each}
  </svg>
  {#each cities as city}
    <button type="button" class="map-pin" style:left={`${city.point[0] / 10}%`} style:top={`${city.point[1] / 6.7}%`}
      aria-label={`Show ${city.name} details`} tabindex="-1" onpointerenter={(event) => hover(event, city)} onclick={() => show(city)}></button>
    <button type="button" class="map-city" class:active={selected?.city === city.name} style:left={`${city.labelX / 10}%`}
      aria-pressed={selected?.city === city.name} onpointerenter={(event) => hover(event, city)} onclick={() => show(city)}>{city.name}</button>
  {/each}
  </div>
  {#if selected}
    <aside class="location-card" aria-label={`${selected.city} location information`} aria-live="polite">
      <button class="location-close" aria-label="Close location details" onclick={() => selected = null}>×</button>
      <div class="index">{selected.label.toUpperCase()}</div>
      <h3>{selected.city}, PA</h3><p>{selected.address}</p>
      <p><span class="location-label">IWAT MAIN PHONE</span><br />(717) 264-2434</p>
      {#if selected.city !== 'Chambersburg'}<p class="location-note">A separate local number isn’t published on iWAT’s location page.</p>{/if}
      <a class="location-link" href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(selected.query)} target="_blank" rel="noopener noreferrer">{selected.city === 'Chambersburg' ? 'View headquarters on Google Maps' : 'View ' + selected.city + ' on Google Maps'} ↗</a>
    </aside>
  {/if}
</div>
