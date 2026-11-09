import boundary from './assets/pennsylvania-boundary.json';

// Simplified state outline from PennDOT's public State Boundary layer (EPSG:4326).
// https://gis.penndot.gov/arcgis/rest/services/paprojects/paprojects/MapServer/26
export function project([longitude, latitude]) {
  return [30 + (longitude + 80.519) / (80.519 - 74.69) * 940,
    30 + (42.269 - latitude) / (42.269 - 39.72) * 520];
}

const polygon = boundary.map(project);
function inside(x, y) {
  let found = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i], [xj, yj] = polygon[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) found = !found;
  }
  return found;
}

export function particleMap(canvas, { onReveal = () => {} } = {}) {
  const ctx = canvas.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let seed = 47321, frame = null, startedAt = null, visible = false, finished = false, progress = 0, revealed = false;
  const random = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296);
  const dots = [];
  for (let y = 35; y < 560; y += 9) {
    for (let x = 32; x < 975; x += 9) {
      const px = x + (random() - .5) * 4, py = y + (random() - .5) * 4;
      if (inside(px, py)) dots.push({ x: px, y: py, fromX: 500 + (random() - .5) * 1300,
        fromY: 290 + (random() - .5) * 850, alpha: .35 + random() * .55, radius: .9 + random() * .65 });
    }
  }
  function render(progress) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(rect.width * dpr), h = Math.round(rect.height * dpr);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    ctx.setTransform(w / 1000, 0, 0, h / 670, 0, 0);
    ctx.clearRect(0, 0, 1000, 670);
    const ease = (1 - Math.cos(Math.PI * progress)) / 2;
    for (const dot of dots) {
      const x = dot.fromX + (dot.x - dot.fromX) * ease, y = dot.fromY + (dot.y - dot.fromY) * ease;
      ctx.fillStyle = `rgba(185, 238, 121, ${dot.alpha * (.4 + ease * .6)})`;
      ctx.beginPath(); ctx.arc(x, y, dot.radius, 0, Math.PI * 2); ctx.fill();
    }
    if (!revealed && progress >= .6) { revealed = true; onReveal(); }
  }
  function tick(time) {
    if (startedAt === null) startedAt = time - progress * 3600;
    progress = Math.min(1, (time - startedAt) / 3600);
    render(progress);
    if (progress < 1) frame = requestAnimationFrame(tick);
    else { finished = true; frame = null; }
  }
  function start() {
    if (reduce.matches || finished) { render(1); return; }
    if (!visible || frame !== null) return;
    startedAt = null;
    frame = requestAnimationFrame(tick);
  }
  function motion() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    if (reduce.matches) { progress = 1; finished = true; render(1); }
    else start();
  }
  function resized() { render(reduce.matches || finished ? 1 : progress); }
  const resizeObserver = new ResizeObserver(resized);
  resizeObserver.observe(canvas);
  const intersection = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) start();
    else if (frame !== null) { cancelAnimationFrame(frame); frame = null; startedAt = null; }
  }, { threshold: .1 });
  intersection.observe(canvas);
  reduce.addEventListener('change', motion);
  return { destroy() { if (frame !== null) cancelAnimationFrame(frame); resizeObserver.disconnect(); intersection.disconnect(); reduce.removeEventListener('change', motion); } };
}
