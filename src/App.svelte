<script>
  import { onMount } from 'svelte';
  import { particleField } from './particles.js';
  import iwatLogo from './assets/iwat-logo.webp';
  import PennsylvaniaMap from './PennsylvaniaMap.svelte';
  import { people, services, orderPeople } from './team.js';
  let objective = 'A smoother way for the team to handle requests.';
  let cue = '', page = 'home', scenario = 'Full Team', path = 'Workflow', steps = [{title:'Receive a request', owner:'Office team', friction:'Information arrives in several places'}];
  // Headings and descriptions are taken from the linked iWAT pages.
  const areas = [
    {name:'Build', route:'build', number:'01', headline:['We Create the Solutions', 'to Your Technology', 'Problems'], title:'Our Services', text:"From managed IT services to custom application development, we deliver technology solutions that help your business save money, improve performance, and work more efficiently.", items:['Custom Application Development','Web Design & Development','Custom PC Builds']},
    {name:'Connect', route:'connect', number:'02', headline:['Network Infrastructure', 'Installation and', 'Services'], title:'Network Infrastructure', text:'Our team of tech-savvy IT experts has years of experience when it comes to setting up network infrastructure.', items:['Network Infrastructure Installation and Services','Cabling','VoIP']},
    {name:'Protect', route:'protect', number:'03', headline:['Managed', 'IT', 'Services'], title:'Managed IT Services', text:'We start by identifying your business needs and then create tailored IT solutions that help you improve performance, save money, and increase efficiency.', items:['Managed IT Services','Cloud Backups','EDR Software','IT Technical Support','System Cleanup']},
    {name:'Advise', route:'advise', number:'04', headline:['IT Consulting /', 'Virtual CIO', 'Services'], title:'The Benefits Of vCIO Services', text:'If you are a small-to-midsize business, or an enterprise company looking for input and strategic help in the world of IT, vCIO services from iWAT are an ideal solution.', items:['AI Consulting','IT Consulting / Virtual CIO Services','Technology Training and Learning Center','Hardware & Software Procurement Services']},
    {name:'Services', route:'services', number:'05', headline:['Our', 'Services', ''], title:'Our Services', text:'We offer deep industry expertise and follow a collaborative approach to deliver high-performance technology solutions.', items:['Custom Application Development','Web Design & Development','Managed IT Services','Network Infrastructure Installation and Services','Cloud Backups','EDR Software']}
  ];
  const wheelLinks = [
    { name: 'About Us', route: 'about' },
    { name: 'Services', route: 'services' },
    { name: 'Solutions', route: 'solutions' },
    { name: 'Blog', href: 'https://www.iwatllc.com/blogs/' },
    { name: 'Ask AI', href: 'https://www.iwatllc.com/ai/' },
    { name: 'Contact Us', href: 'https://www.iwatllc.com/contact/' }
  ];
  const serviceLinks = {
    'Custom Application Development':'/application-development/', 'Web Design & Development':'/web-design-and-development/',
    'Managed IT Services':'/managed-it/', 'Network Infrastructure Installation and Services':'/network-infrastructure/',
    'Cloud Backups':'/cloud-backups/', 'EDR Software':'/edr-software/', 'System Cleanup':'/system-cleanup/',
    'IT Technical Support':'/it-technical-support/', 'VoIP':'/telephones/', 'Cabling':'/cabling/',
    'Hardware & Software Procurement Services':'/hardware-software-procurement-services/',
    'Technology Training and Learning Center':'/technology-training-learning-center/',
    'IT Consulting / Virtual CIO Services':'/it-consulting-virtual-cio-services/', 'AI Consulting':'/ai-consulting/',
    'Custom PC Builds':'/custom-system-builds/'
  };
  const serviceDescriptions = {
    'Custom Application Development': "At our full-service IT firm, we're an ideal choice for all of your custom application development needs.",
    'Web Design & Development': 'Our designers can create a totally custom, professional look and feel for your website or media channel.',
    'Managed IT Services': 'We start by identifying your business needs and then create tailored IT solutions that help you improve performance, save money, and increase efficiency.',
    'Network Infrastructure Installation and Services': 'Our team of tech-savvy IT experts has years of experience when it comes to setting up network infrastructure.',
    'Cloud Backups': 'Protect Yourself From The Unexpected', 'EDR Software': 'Endpoint Detection and Response',
    'System Cleanup': 'What Is A System Cleanup?', 'IT Technical Support': 'Our IT Technical Support Services',
    'VoIP': "Our communication solutions in today's remote work environment will create the unified experience your business needs to succeed.",
    'Cabling': 'iWAT Cabling Services', 'Hardware & Software Procurement Services': 'Our Procurement Process',
    'Technology Training and Learning Center': 'Learn More About Our Training And Education Programs',
    'IT Consulting / Virtual CIO Services': 'The Benefits Of vCIO Services',
    'AI Consulting': 'True AI success starts long before tools and copilots. It starts with data discipline.',
    'Custom PC Builds': 'Benefits to Custom Building a Computer'
  };
  const locations = [
    { city:'Chambersburg', label:'Headquarters', address:'760 E Washington St, Chambersburg, PA 17201', query:'760 E Washington St, Chambersburg, PA 17201' },
    { city:'Lancaster', label:'Lancaster area', address:'Street address not published', query:'Lancaster, PA' },
    { city:'York', label:'York area', address:'Street address not published', query:'York, PA' }
  ];
  $: orderedPeople = orderPeople(scenario);
  function go(p) { page=p; cue=''; location.hash=p==='home'?'':p; window.scrollTo(0,0); }
  onMount(() => { const sync=()=>{const h=location.hash.slice(1); page=['build','connect','protect','advise','services','team','discover','about','solutions'].includes(h)?h:'home'}; sync(); window.addEventListener('hashchange',sync); return ()=>window.removeEventListener('hashchange',sync); });
</script>
<svelte:head><title>iWAT - Technology Solutions | Chambersburg, PA</title><meta name="description" content="An independent interactive redesign concept for iWAT." /></svelte:head>
<div class="notice">INDEPENDENT DESIGN PROTOTYPE · JAMES LANE <span> · No inquiries are sent from this site.</span> <a href="https://www.iwatllc.com/">Visit the live iWAT site ↗</a></div>
{#if page !== 'home'}<div class="ambient-background" aria-hidden="true"><canvas use:particleField={{variant:'ambient'}}></canvas></div>{/if}
<header><button class="brand" onclick={()=>go('home')} aria-label="iWAT concept home"><img class="brand-logo" src={iwatLogo} alt="" /><small>TECHNOLOGY SOLUTIONS</small></button></header>
{#if page==='home'}
<main><section class="hero" aria-label="Explore iWAT services">
<div class="wheel-area"><canvas use:particleField aria-hidden="true"></canvas>
<div class="wheel-intro"><span class="eyebrow"><i></i> iWAT TECHNOLOGY SOLUTIONS</span><span>SELECT A POINT TO EXPLORE</span></div>
<div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>
<div class="wheel"><div class="cross cross-h"></div><div class="cross cross-v"></div>
<div class="core"><img class="core-logo" src={iwatLogo} alt="" /><span>iWAT TECHNOLOGY SOLUTIONS</span><h1>We Create the Solutions <em>to Your Technology</em> Problems</h1><div class="core-rule"></div><div class="core-detail"><p>From managed IT services to custom application development, we deliver technology solutions that help your business save money, improve performance, and work more efficiently.</p></div></div>
{#each wheelLinks as link,i}
  {#if link.href}<a class="node n{i}" href={link.href}><span>0{i+1}</span><b>{link.name}</b><i>↗</i></a>
  {:else}<button class="node n{i}" onclick={()=>go(link.route)}><span>0{i+1}</span><b>{link.name}</b><i>↗</i></button>{/if}
{/each}</div>
<div class="wheel-caption"><span>✳ INTERACTIVE OVERVIEW</span><span>CHAMBERSBURG, PA</span></div></div></section><section class="statement"><p>WE'VE GOT IT COVERED</p><h2>Our team defines a solution by starting with your business needs.</h2><p class="statement-description">iWAT provides solution planning, implementation, and support services to help organizations share information, connect people, and respond to their evolving business requirements.</p><button class="textlink" onclick={()=>go('discover')}>Explore your needs →</button></section></main>
{:else if ['build','connect','protect','advise'].includes(page)}
{@const category = areas.find(area => area.route === page)}
<main class="inside category-page"><button class="category-back" onclick={()=>go('home')}>← Back to the wheel</button><div class="eyebrow">{category.number} / {category.name.toUpperCase()}</div><h1>{category.headline[0]} <em>{category.headline[1]}</em>{#if category.headline[2]}{' '}{category.headline[2]}{/if}</h1><p class="intro">{category.text}</p><section class="category-content"><div><div class="index">WHAT WE DO</div><h2>{category.title}</h2></div><div class="category-items">{#each category.items as item}<div><a href={'https://www.iwatllc.com' + serviceLinks[item]}>{item} ↗</a></div>{/each}</div></section><div class="category-actions"><button class="textlink" onclick={()=>go('services')}>Explore all services <span>→</span></button><button class="textlink" onclick={()=>go('discover')}>Explore your needs <span>→</span></button></div></main>
{:else if page==='services'}<main class="inside"><button class="category-back" onclick={()=>go('home')}>← Back to the wheel</button><div class="eyebrow">SERVICES</div><h1>Services</h1><p class="intro">Comprehensive technology services designed to keep your business running, growing, and ahead of the competition.</p><section class="service-row"><div class="index">OUR SERVICES</div><div><h2>Technology That Works for You</h2><p>Step into a world of tailored IT solutions. From application development and web design to managed IT services and network infrastructure, iWAT offers deep industry expertise and follows a collaborative approach to deliver high-performance technology solutions for your business.</p></div><div class="selected-list">{#each Object.keys(serviceLinks) as item}<div><a href={'https://www.iwatllc.com' + serviceLinks[item]}>{item} <span>↗</span></a><p>{serviceDescriptions[item]}</p></div>{/each}</div></section><a class="textlink" href="https://www.iwatllc.com/services/">View services on iWAT’s live site ↗</a></main>
{:else if page==='solutions'}
<main class="inside"><button class="category-back" onclick={()=>go('home')}>← Back to the wheel</button><div class="eyebrow">OUR SOLUTIONS</div><h1>Our <em>Solutions</em></h1><p class="intro">Our professionals combine proven services and capabilities to enable lasting business transformation with sustained results.</p>
<section class="service-row"><div class="index">01 / SOLUTIONS</div><div><h2>Website Design &amp; Development</h2><p>We design and develop responsive, modern websites that represent your brand, engage your audience, and drive measurable results.</p></div><div class="selected-list"><div>Business Websites</div><div>E-Commerce Platforms</div><div>Website Redesigns</div></div></section>
<section class="service-row"><div class="index">02 / SOLUTIONS</div><div><h2>Application Development</h2><p>We build custom applications that solve real business problems.</p></div><div class="selected-list"><div>Cartell App</div><div>Budge App</div><div>Custom Integrations</div></div></section>
<section class="service-row"><div class="index">03 / SOLUTIONS</div><div><h2>Custom System Builds</h2><p>We design and assemble custom workstations, servers, and systems tailored to your exact specifications and performance requirements.</p></div><div class="selected-list"><div>Custom Workstations</div><div>Server Solutions</div><div>Specialty Systems</div></div></section>
<section class="service-row"><div class="index">04 / SOLUTIONS</div><div><h2>Network Infrastructure</h2><p>A reliable network is the backbone of every modern business.</p></div><div class="selected-list"><div>Network Design</div><div>Wireless Solutions</div><div>Network Security</div></div></section>
<section class="service-row"><div class="index">05 / SOLUTIONS</div><div><h2>VoIP</h2><p>Modern business phone systems that improve communication, reduce costs, and scale with your organization.</p></div><div class="selected-list"><div>VoIP Phone Systems</div><div>Unified Communications</div><div>System Migrations</div></div></section>
<section class="service-row"><div class="index">06 / SOLUTIONS</div><div><h2>Cabling</h2><p>A well-structured cabling infrastructure is the foundation of every reliable network.</p></div><div class="selected-list"><div>Structured Cabling</div><div>New Construction</div><div>Cable Management</div></div></section><a class="textlink" href="https://www.iwatllc.com/solutions/">View Our Solutions ↗</a></main>
{:else if page==='team'}
<main class="inside">
  <button class="category-back" onclick={()=>go('home')}>← Back to the wheel</button>
  <div class="eyebrow">02 / OUR PEOPLE</div><h1>iWAT <em>Team Members</em></h1>
  <p class="intro">The dedicated professionals behind every solution we deliver.</p>
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
{:else if page==='discover'}<main class="inside narrow"><button class="category-back" onclick={()=>go('home')}>← Back to the wheel</button><div class="eyebrow">03 / DISCOVERY DEMO</div><h1>Discovery <em>Demo</em></h1><p class="intro">Explore an example workflow or technology need. Edit the fictional example to see how your thinking takes shape.</p><div class="disclosure">DESIGN PROTOTYPE · Nothing is sent or saved. Please do not enter sensitive information. For a real inquiry, <a href="https://www.iwatllc.com/contact/">visit iWAT’s contact page ↗</a></div><div class="switch"><button class:chosen={path==='Workflow'} onclick={()=>{path='Workflow';cue='Map the handoffs and friction in a process, one step at a time.'}}>Map a workflow</button><button class:chosen={path==='IT need'} onclick={()=>{path='IT need';cue='Start with the technology outcome you want to improve.'}}>Describe an IT need</button></div><label>What are you trying to improve?<textarea bind:value={objective}></textarea></label><h2>{path==='Workflow'?'Map the steps':'Describe the need'}</h2>{#each steps as step,i}<div class="step"><div class="index">0{i+1} / DETAIL</div><label>{path==='Workflow'?'Step':'Technology need'}<input bind:value={step.title}/></label><label>Who is involved?<input bind:value={step.owner}/></label><label>Friction or challenge<textarea bind:value={step.friction}></textarea></label><button onclick={()=>steps=steps.filter((_,j)=>i!==j)} disabled={steps.length===1}>Remove</button></div>{/each}<button class="outline" onclick={()=>steps=[...steps,{title:'',owner:'',friction:''}]}>+ Add {path==='Workflow'?'step':'need'}</button><div class="summary"><div class="eyebrow">YOUR LOCAL SUMMARY</div><h2>Your local summary</h2>{#if objective.trim()}<p><strong>Objective:</strong> {objective}</p>{/if}{#each steps as step}<p><strong>{step.title || 'Untitled'}</strong> — {step.owner || 'Owner not specified'}{step.friction ? ': '+step.friction : ''}</p>{/each}<a class="textlink" href="https://www.iwatllc.com/contact/">Visit the real contact page ↗</a></div></main>
{:else}<main class="inside about-page"><button class="category-back" onclick={()=>go('home')}>← Back to the wheel</button><div class="eyebrow">04 / ABOUT IWAT</div><h1>About <em>Us</em></h1><p class="intro">Delivering innovative, personalized, and value-driven technology solutions to help businesses thrive.</p><h2>Our Mission &amp; Vision</h2><p>Our MISSION is to deliver innovative, personalized, and value-driven technology solutions.</p><p>Our VISION is to empower businesses to achieve their fullest potential in the rapidly evolving digital landscape as their trusted technology partner.</p><button class="textlink" onclick={()=>go('team')}>Meet the team →</button><p><a href="https://www.iwatllc.com/blogs/">News & insights ↗</a>　<a href="https://www.iwatllc.com/about/">About iWAT ↗</a></p>
<section class="locations" aria-labelledby="locations-title"><div class="eyebrow">WHERE TO FIND IWAT</div><h2 id="locations-title">Locations</h2><p class="locations-intro">Hover over or select a city to see iWAT’s contact details. Use iWAT’s live site for inquiries.</p>
<PennsylvaniaMap {locations} /><p class="map-note">City markers are approximate. Lancaster and York street addresses are not published on iWAT’s site.</p>

<p class="location-source">Location information: <a href="https://www.iwatllc.com/contact/">iWAT contact page</a>, <a href="https://www.iwatllc.com/contact/lancaster/">Lancaster</a>, and <a href="https://www.iwatllc.com/contact/york/">York</a>. State outline: <a href="https://gis.penndot.gov/arcgis/rest/services/paprojects/paprojects/MapServer/26">PennDOT</a>.</p></section></main>{/if}
{#if cue}<div class="cue" role="status"><small>✳ SIMULATED GUIDANCE</small><button onclick={()=>cue=''} aria-label="Dismiss guidance">×</button><p>{cue}</p></div>{/if}
<footer><div><img class="footer-logo" src={iwatLogo} alt="iWAT" /><p>We create the solutions to your technology problems.</p></div><div>AN INDEPENDENT DESIGN CONCEPT<br/>Not affiliated with or endorsed by iWAT.</div><div><a href="https://www.iwatllc.com/">Live site ↗</a><a href="https://www.iwatllc.com/client-terms-conditions/">Terms ↗</a><a href="https://www.iwatllc.com/sms-privacy-policy/">Privacy ↗</a></div></footer>
