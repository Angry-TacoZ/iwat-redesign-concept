<script>
  import { onMount } from 'svelte';
  import { particleField } from './particles.js';
  import iwatLogo from './assets/iwat-logo.webp';
  import PennsylvaniaMap from './PennsylvaniaMap.svelte';
  import { people, services, orderPeople } from './team.js';
  import { CodeXml, Globe, Server, Network, CloudUpload, ShieldCheck } from '@lucide/svelte';
  let objective = 'A smoother way for the team to handle requests.';
  let active = 0, cue = '', page = 'home', scenario = 'Full Team', path = 'Workflow', steps = [{title:'Receive a request', owner:'Office team', friction:'Information arrives in several places'}];
  const areas = [
    {name:'Build', route:'build', number:'01', headline:['Ideas move', 'further', 'together'], title:'Ideas, built for the way you work.', text:'From websites to custom applications, iWAT designs technology around your business.', items:['Application development','Web design & development','Custom system builds']},
    {name:'Connect', route:'connect', number:'02', headline:['Keep your business', 'connected', ''], title:'Everything works better connected.', text:'Build dependable foundations for your people, places, and systems.', items:['Network infrastructure','Cabling','Telephones & VoIP']},
    {name:'Protect', route:'protect', number:'03', headline:['Protect what', 'keeps you', 'moving'], title:'Confidence in every connection.', text:'Keep your business moving with managed support and practical protection.', items:['Managed IT','Cloud backups','Endpoint detection & response','Technical support','System cleanup']},
    {name:'Advise', route:'advise', number:'04', headline:['Turn your goals', 'into a', 'clear plan'], title:'A clearer way forward.', text:'Turn complex technology decisions into a plan that fits your business.', items:['AI consulting','Virtual CIO services','Technology training','Hardware & software procurement']},
    {name:'Services', route:'services', number:'05', headline:['Services', 'that work', ''], title:'Explore our services.', text:'Technology solutions built around your business.', items:['Application development','Web design','Managed IT','Network infrastructure','Cloud backups','EDR software']}
  ];
  const featuredServices = [
    {name:'Application development', icon:CodeXml}, {name:'Web design & development', icon:Globe},
    {name:'Managed IT', icon:Server}, {name:'Network infrastructure', icon:Network},
    {name:'Cloud backups', icon:CloudUpload}, {name:'EDR software', icon:ShieldCheck}
  ];
  const serviceSections = [...areas.slice(0, 4), {number:'05', name:'Solutions', title:'Solutions made for real work.', text:'Explore products and ideas developed to meet real business needs.', items:['Budge','Cartell','Seamless Connectivity']}];
  const locations = [
    { city:'Chambersburg', label:'Headquarters', address:'760 E Washington St, Chambersburg, PA 17201', query:'760 E Washington St, Chambersburg, PA 17201' },
    { city:'Lancaster', label:'Lancaster area', address:'Street address not published', query:'Lancaster, PA' },
    { city:'York', label:'York area', address:'Street address not published', query:'York, PA' }
  ];
  $: orderedPeople = orderPeople(scenario);
  function choose(i) { active=i; cue=`${areas[i].name} brings together ${areas[i].items.slice(0,2).join(' and ').toLowerCase()}.`; }
  function go(p) { page=p; cue=''; location.hash=p==='home'?'':p; window.scrollTo(0,0); }
  onMount(() => { const sync=()=>{const h=location.hash.slice(1); page=['build','connect','protect','advise','services','team','discover','about'].includes(h)?h:'home'}; sync(); window.addEventListener('hashchange',sync); return ()=>window.removeEventListener('hashchange',sync); });
</script>
<svelte:head><title>iWAT | Technology, connected</title><meta name="description" content="An independent interactive redesign concept for iWAT." /></svelte:head>
<div class="notice">INDEPENDENT DESIGN PROTOTYPE · JAMES LANE <span> · No inquiries are sent from this site.</span> <a href="https://www.iwatllc.com/">Visit the live iWAT site ↗</a></div>
{#if page !== 'home'}<div class="ambient-background" aria-hidden="true"><canvas use:particleField={{variant:'ambient'}}></canvas></div>{/if}
<header><button class="brand" onclick={()=>go('home')} aria-label="iWAT concept home"><img class="brand-logo" src={iwatLogo} alt="" /><small>TECHNOLOGY SOLUTIONS</small></button><nav aria-label="Main navigation"><button onclick={()=>go('services')}>What we do</button><button onclick={()=>go('team')}>Our people</button><button onclick={()=>go('about')}>About</button><button class="navcta" onclick={()=>go('discover')}>Explore your needs <span>↗</span></button></nav></header>
{#if page==='home'}
<main><section class="hero" aria-label="Explore iWAT services">
<div class="wheel-area"><canvas use:particleField aria-hidden="true"></canvas>
<div class="wheel-intro"><span class="eyebrow"><i></i> TECHNOLOGY WITH PURPOSE</span><span>SELECT A POINT TO EXPLORE</span></div>
<div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>
<div class="wheel"><div class="cross cross-h"></div><div class="cross cross-v"></div>
<div class="core" class:services-core={active === 4} aria-live="polite"><img class="core-logo" src={iwatLogo} alt="" /><span>PEOPLE. PURPOSE. POSSIBILITY.</span><h1>{areas[active].headline[0]} <em>{areas[active].headline[1]}</em>{#if areas[active].headline[2]}{' '}{areas[active].headline[2]}{/if}<span class="period">.</span></h1><div class="core-rule"></div><div class="core-detail"><div class="index">{areas[active].number} / 05 &nbsp; — &nbsp; {areas[active].name.toUpperCase()}</div>{#if active === 4}<div class="featured-services" aria-label="Featured services">{#each featuredServices as service}<div class="featured-service"><service.icon size={18} strokeWidth={1.7} aria-hidden="true"/><span>{service.name}</span></div>{/each}</div>{:else}<h2>{areas[active].title}</h2><p>{areas[active].text}</p><div class="core-items">{#each areas[active].items as item}<span>{item}</span>{/each}</div>{/if}<button class="textlink" onclick={()=>go(areas[active].route)}>{active === 4 ? 'See all services' : 'Explore ' + areas[active].name} <span>↗</span></button></div></div>
{#each areas as area,i}<button class:chosen={i===active} class="node n{i}" onclick={()=>choose(i)} aria-pressed={i===active}><span>{area.number}</span><b>{area.name}</b><i>↗</i></button>{/each}</div>
<div class="wheel-caption"><span>✳ INTERACTIVE OVERVIEW</span><span>CHAMBERSBURG, PA &nbsp; / &nbsp; BUILT AROUND YOU</span></div></div></section><section class="statement"><p>TECHNOLOGY IS ONLY THE BEGINNING</p><h2>Better systems.<br/><em>Stronger possibilities.</em></h2><button class="textlink" onclick={()=>go('discover')}>Start exploring →</button></section></main>
{:else if ['build','connect','protect','advise'].includes(page)}
{@const category = areas.find(area => area.route === page)}
<main class="inside category-page"><button class="category-back" onclick={()=>go('home')}>← Back to the wheel</button><div class="eyebrow">{category.number} / {category.name.toUpperCase()}</div><h1>{category.headline[0]} <em>{category.headline[1]}</em>{#if category.headline[2]}{' '}{category.headline[2]}{/if}<span class="period">.</span></h1><p class="intro">{category.text}</p><section class="category-content"><div><div class="index">WHAT WE DO</div><h2>{category.title}</h2></div><div class="category-items">{#each category.items as item}<div>{item}</div>{/each}</div></section><div class="category-actions"><button class="textlink" onclick={()=>go('services')}>Explore all services <span>→</span></button><button class="textlink" onclick={()=>go('discover')}>Explore your needs <span>→</span></button></div></main>
{:else if page==='services'}<main class="inside"><div class="eyebrow">01 / WHAT WE DO</div><h1>Made to work<br/><em>better together.</em></h1><p class="intro">From the first conversation to ongoing support, explore the capabilities behind iWAT’s solutions.</p>{#each serviceSections as a}<section class="service-row"><div class="index">{a.number} / {a.name.toUpperCase()}</div><div><h2>{a.title}</h2><p>{a.text}</p></div><div class="selected-list">{#each a.items as item}<div>{item} <span>↗</span></div>{/each}</div></section>{/each}<a class="textlink" href="https://www.iwatllc.com/services/">View services on iWAT’s live site ↗</a></main>
{:else if page==='team'}
<main class="inside">
  <div class="eyebrow">02 / OUR PEOPLE</div><h1>Good work starts<br/><em>with people.</em></h1>
  <p class="intro">Explore the people behind iWAT and their publicly listed roles.</p>
  <div class="disclosure">DESIGN PROTOTYPE · The roster comes from iWAT’s team page. Highlights reflect documented, self-reported experience, not verified project assignments or a ranking of ability. An unhighlighted person may also contribute. <a href="https://www.iwatllc.com/services/">iWAT services ↗</a></div>
  <label class="scenario">Explore by service <select bind:value={scenario}><option>Full Team</option>{#each Object.keys(services) as service}<option>{service}</option>{/each}</select></label>
  <p class="team-explanation" aria-live="polite">{scenario === 'Full Team' ? 'Showing the full team in roster order.' : services[scenario].length ? `Showing documented relevant experience for ${scenario} first.` : 'No individual service connections could be established from available public evidence.'}</p>
  <div class="team-grid">
    {#each orderedPeople as person (person.name)}
      {@const evidence = (services[scenario] || []).find(match => match.name === person.name)}
      <article class="team-card" class:relevant={!!evidence} class:muted={scenario !== 'Full Team' && services[scenario].length > 0 && !evidence}>
        <div class="team-card-content">
          {#if evidence}<small>DOCUMENTED RELEVANT EXPERIENCE</small>{/if}
          <strong>{person.name}</strong><span>{person.role}</span>
          {#if evidence}<span>{evidence.detail}</span>{/if}
        </div>
        {#if evidence}<a href={evidence.url} target="_blank" rel="noopener noreferrer">Experience source ↗<span class="sr-only"> for {person.name}</span></a>{/if}
        <a href={person.source.url} target="_blank" rel="noopener noreferrer">{person.source.label} ↗<span class="sr-only"> for {person.name}</span></a>
      </article>
    {/each}
  </div>
</main>
{:else if page==='discover'}<main class="inside narrow"><div class="eyebrow">03 / DISCOVERY DEMO</div><h1>Let’s make the<br/><em>complex clear.</em></h1><p class="intro">Explore an example workflow or technology need. Edit the fictional example to see how your thinking takes shape.</p><div class="disclosure">DESIGN PROTOTYPE · Nothing is sent or saved. Please do not enter sensitive information. For a real inquiry, <a href="https://www.iwatllc.com/contact/">visit iWAT’s contact page ↗</a></div><div class="switch"><button class:chosen={path==='Workflow'} onclick={()=>{path='Workflow';cue='Map the handoffs and friction in a process, one step at a time.'}}>Map a workflow</button><button class:chosen={path==='IT need'} onclick={()=>{path='IT need';cue='Start with the technology outcome you want to improve.'}}>Describe an IT need</button></div><label>What are you trying to improve?<textarea bind:value={objective}></textarea></label><h2>{path==='Workflow'?'Map the steps':'Describe the need'}</h2>{#each steps as step,i}<div class="step"><div class="index">0{i+1} / DETAIL</div><label>{path==='Workflow'?'Step':'Technology need'}<input bind:value={step.title}/></label><label>Who is involved?<input bind:value={step.owner}/></label><label>Friction or challenge<textarea bind:value={step.friction}></textarea></label><button onclick={()=>steps=steps.filter((_,j)=>i!==j)} disabled={steps.length===1}>Remove</button></div>{/each}<button class="outline" onclick={()=>steps=[...steps,{title:'',owner:'',friction:''}]}>+ Add {path==='Workflow'?'step':'need'}</button><div class="summary"><div class="eyebrow">YOUR LOCAL SUMMARY</div><h2>A starting point, together.</h2>{#if objective.trim()}<p><strong>Objective:</strong> {objective}</p>{/if}{#each steps as step}<p><strong>{step.title || 'Untitled'}</strong> — {step.owner || 'Owner not specified'}{step.friction ? ': '+step.friction : ''}</p>{/each}<a class="textlink" href="https://www.iwatllc.com/contact/">Visit the real contact page ↗</a></div></main>
{:else}<main class="inside about-page"><div class="eyebrow">04 / ABOUT IWAT</div><h1>Technology is<br/><em>personal.</em></h1><p class="intro">iWAT’s mission is to deliver innovative, personalized, and value-driven technology solutions. Its vision is to empower businesses as their trusted technology partner.</p><button class="textlink" onclick={()=>go('team')}>Meet the team →</button><p><a href="https://www.iwatllc.com/blogs/">News & insights ↗</a>　<a href="https://www.iwatllc.com/about/">About iWAT ↗</a></p>
<section class="locations" aria-labelledby="locations-title"><div class="eyebrow">WHERE TO FIND IWAT</div><h2 id="locations-title">Here for your business.</h2><p class="locations-intro">Hover over or select a city to see iWAT’s contact details. Use iWAT’s live site for inquiries.</p>
<PennsylvaniaMap {locations} /><p class="map-note">City markers are approximate. Lancaster and York street addresses are not published on iWAT’s site.</p>

<p class="location-source">Location information: <a href="https://www.iwatllc.com/contact/">iWAT contact page</a>, <a href="https://www.iwatllc.com/contact/lancaster/">Lancaster</a>, and <a href="https://www.iwatllc.com/contact/york/">York</a>. State outline: <a href="https://gis.penndot.gov/arcgis/rest/services/paprojects/paprojects/MapServer/26">PennDOT</a>.</p></section></main>{/if}
{#if cue}<div class="cue" role="status"><small>✳ SIMULATED GUIDANCE</small><button onclick={()=>cue=''} aria-label="Dismiss guidance">×</button><p>{cue}</p></div>{/if}
<footer><div><img class="footer-logo" src={iwatLogo} alt="iWAT" /><p>People. Purpose. Possibility.</p></div><div>AN INDEPENDENT DESIGN CONCEPT<br/>Not affiliated with or endorsed by iWAT.</div><div><a href="https://www.iwatllc.com/">Live site ↗</a><a href="https://www.iwatllc.com/client-terms-conditions/">Terms ↗</a><a href="https://www.iwatllc.com/sms-privacy-policy/">Privacy ↗</a></div></footer>
