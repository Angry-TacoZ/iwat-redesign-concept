export function particleField(canvas, options = {}) {
  const ctx = canvas.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const container = canvas.parentElement;
  const ambient = options.variant === 'ambient';
  const wheel = ambient ? null : container.querySelector('.wheel');
  const pointerTarget = ambient ? window : container;
  const influenceRadius = 165;
  const arms = 4;
  let stars = [], frame = null, mouse = null, width = 0, height = 0;
  let centerX = 0, centerY = 0, galaxyRadius = 0, previousTime = null;

  function resize() {
    const box = canvas.getBoundingClientRect();
    width = box.width;
    height = box.height;
    if (!ambient) {
      const wheelBox = wheel.getBoundingClientRect();
      centerX = wheelBox.left + wheelBox.width / 2 - box.left;
      centerY = wheelBox.top + wheelBox.height / 2 - box.top;
      galaxyRadius = wheel.offsetWidth * 0.82;
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (ambient) {
      const count = Math.min(width < 700 ? 60 : 145, Math.max(30, Math.round(width * height / 9000)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10,
        size: 0.8 + Math.random() * 0.7, alpha: 0.25 + Math.random() * 0.22,
      }));
      if (reduce.matches) draw();
      return;
    }
    const armCount = width < 700 ? 1000 : 2200;
    const innerCount = width < 700 ? 500 : 1100;
    stars = Array.from({ length: armCount + innerCount }, (_, index) => {
      // A little scatter around each curved arm gives the galaxy a soft edge.
      const inner = index >= armCount;
      const outer = !inner && Math.random() < 0.03;
      const radius = inner ? 0.12 + Math.random() * 0.45 : outer ? 1.02 + Math.random() * 0.3 : 0.22 + Math.random() * 0.78;
      const arm = index % arms;
      const scatter = (Math.random() + Math.random() + Math.random() - 1.5) * 0.22;
      return {
        radius,
        angle: outer ? Math.random() * Math.PI * 2 : arm * Math.PI * 2 / arms + radius * 4.8 + scatter,
        size: 0.5 + Math.random() * 1.1,
        alpha: outer ? 0.12 + Math.random() * 0.22 : 0.17 + Math.random() * 0.53,
        offsetX: 0, offsetY: 0,
      };
    });
    if (reduce.matches) draw();
  }

  function draw(time = 0) {
    const elapsed = previousTime === null ? 0 : Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;
    ctx.clearRect(0, 0, width, height);

    if (ambient) {
      for (const star of stars) {
        if (!reduce.matches) {
          star.x = (star.x + star.vx * elapsed + width) % width;
          star.y = (star.y + star.vy * elapsed + height) % height;
        }
      }
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        for (let j = i + 1; j < stars.length; j++) {
          const next = stars[j];
          const distance = Math.hypot(next.x - star.x, next.y - star.y);
          if (distance < 105) {
            ctx.strokeStyle = `rgba(153, 220, 105, ${(1 - distance / 105) * 0.16})`;
            ctx.beginPath(); ctx.moveTo(star.x, star.y); ctx.lineTo(next.x, next.y); ctx.stroke();
          }
        }
        const distance = mouse ? Math.hypot(mouse.x - star.x, mouse.y - star.y) : Infinity;
        const glow = !reduce.matches && distance < influenceRadius ? 1 - distance / influenceRadius : 0;
        if (glow > 0) {
          ctx.strokeStyle = `rgba(185, 238, 121, ${glow * 0.15})`;
          ctx.beginPath(); ctx.moveTo(star.x, star.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = `rgba(185, 238, 121, ${star.alpha + glow * 0.2})`;
        ctx.beginPath(); ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduce.matches) frame = requestAnimationFrame(draw);
      return;
    }

    for (const star of stars) {
      // Outer stars have both slower angular rotation and less distance traveled.
      if (!reduce.matches) star.angle += elapsed * 0.014 / (star.radius * (1 + star.radius));
      const angle = star.angle;
      const x = centerX + Math.cos(angle) * star.radius * galaxyRadius;
      const y = centerY + Math.sin(angle) * star.radius * galaxyRadius;
      const dx = mouse ? mouse.x - x : 0, dy = mouse ? mouse.y - y : 0;
      const distance = mouse ? Math.hypot(dx, dy) : Infinity;
      const strength = !reduce.matches && distance < influenceRadius ? 1 - distance / influenceRadius : 0;
      // Mouse influence is temporary; stars return to their orbit when it leaves.
      const pointerPull = 0.16 / (1 + star.radius);
      const targetX = strength * dx * pointerPull, targetY = strength * dy * pointerPull;
      star.offsetX += (targetX - star.offsetX) * Math.min(1, elapsed * 3);
      star.offsetY += (targetY - star.offsetY) * Math.min(1, elapsed * 3);
      const px = x + star.offsetX, py = y + star.offsetY;
      const innerFade = star.radius < 0.47 ? 0.45 : 1;
      if (strength > 0.2 && star.size > 1.1) {
        ctx.strokeStyle = `rgba(185, 238, 121, ${strength * 0.2 * innerFade})`;
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
      ctx.fillStyle = `rgba(185, 238, 121, ${(star.alpha + strength * 0.25) * innerFade})`;
      ctx.beginPath(); ctx.arc(px, py, star.size + strength * 0.5, 0, Math.PI * 2); ctx.fill();
    }
    if (!reduce.matches) frame = requestAnimationFrame(draw);
  }

  function move(event) {
    if (event.pointerType === 'touch' || reduce.matches) return;
    const box = canvas.getBoundingClientRect();
    const x = event.clientX - box.left, y = event.clientY - box.top;
    mouse = x >= 0 && x <= width && y >= 0 && y <= height ? { x, y } : null;
  }
  function leave() { mouse = null; }
  function motion() {
    cancelAnimationFrame(frame);
    previousTime = null;
    mouse = null;
    draw();
  }

  resize();
  if (!reduce.matches) draw();
  pointerTarget.addEventListener('pointermove', move, { passive: true });
  pointerTarget.addEventListener('pointerleave', leave);
  window.addEventListener('resize', resize, { passive: true });
  reduce.addEventListener('change', motion);
  return { destroy() {
    cancelAnimationFrame(frame);
    pointerTarget.removeEventListener('pointermove', move);
    pointerTarget.removeEventListener('pointerleave', leave);
    window.removeEventListener('resize', resize);
    reduce.removeEventListener('change', motion);
  } };
}
