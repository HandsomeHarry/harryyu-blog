// Rain on the window in front of the car: beads land on the glass, the
// heavier ones break loose and run down, swallowing the beads in their path
// and leaving a beaded trail that slowly evaporates. Drawn on one canvas.

type Drop = {
  x: number;
  y: number;
  r: number;
  vy: number; // px per second; 0 while the bead clings to the glass
  life: number; // seconds until a trail bead evaporates (Infinity otherwise)
  wobble: number;
  lastTrail: number;
};

const SLIDE_RADIUS = 4; // beads this large overcome surface tension
const GRAVITY = 260; // px/s² once sliding
const MAX_SPEED = 420;
const FADE_MS = 300; // matches the .glass-layer opacity transition

export function initRain(canvas: HTMLCanvasElement, initiallyOn = false) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return { toggle() {} };
  let on = initiallyOn;
  let fadeTimer = 0;
  canvas.classList.toggle('is-on', on);
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let drops: Drop[] = [];
  let width = 0, height = 0, dpr = 1;
  let ink = '#5a4838', paper = '#fcd1b1';

  const readColors = () => {
    const style = getComputedStyle(canvas);
    ink = style.getPropertyValue('--ink-soft').trim() || ink;
    paper = style.getPropertyValue('--paper').trim() || paper;
  };
  const bead = (x: number, y: number, r: number): Drop =>
    ({ x, y, r, vy: 0, life: Infinity, wobble: Math.random() * 6.28, lastTrail: y });
  const scatter = () => bead(Math.random() * width, Math.random() * height,
    Math.random() < .75 ? 1.2 + Math.random() * 2 : 3.2 + Math.random() * 3);

  function resize() {
    dpr = Math.min(2, devicePixelRatio || 1);
    width = innerWidth;
    height = innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    const target = Math.round(width * height / 7000);
    drops = Array.from({ length: target }, scatter);
  }

  // A water bead: a faint lens tinted with the ink colour (so it reads on
  // both the peach and the night ground), a rim where it bends the light at
  // its lower edge, and a bright catch-light near the top.
  function drawDrop(d: Drop) {
    const fade = Number.isFinite(d.life) ? Math.min(1, d.life / 2) : 1;
    const stretch = d.vy > 0 ? 1 + Math.min(.9, d.vy / 300) : 1;
    ctx!.save();
    ctx!.translate(d.x, d.y);
    ctx!.scale(1, stretch);
    ctx!.globalAlpha = fade;
    ctx!.beginPath();
    ctx!.arc(0, 0, d.r, 0, Math.PI * 2);
    ctx!.fillStyle = paper;
    ctx!.globalAlpha = .35 * fade;
    ctx!.fill();
    ctx!.fillStyle = ink;
    ctx!.globalAlpha = .16 * fade;
    ctx!.fill();
    ctx!.beginPath();
    ctx!.arc(0, 0, d.r, .15 * Math.PI, .85 * Math.PI);
    ctx!.strokeStyle = ink;
    ctx!.lineWidth = Math.max(.8, d.r * .4);
    ctx!.globalAlpha = .7 * fade;
    ctx!.stroke();
    if (d.r > 1.4) {
      ctx!.beginPath();
      ctx!.arc(-d.r * .35, -d.r * .4, d.r * .28, 0, Math.PI * 2);
      ctx!.fillStyle = '#fffaf0';
      ctx!.globalAlpha = .85 * fade;
      ctx!.fill();
    }
    ctx!.restore();
  }

  let raf = 0, last = 0, colorTick = 0;
  function frame(now: number) {
    const dt = Math.min(.05, (now - last) / 1000);
    last = now;
    if (++colorTick % 30 === 0) readColors();

    // new rain landing on the glass
    const landings = width * height / 900000 * dt * 8;
    const count = Math.floor(landings) + (Math.random() < landings % 1 ? 1 : 0);
    for (let i = 0; i < count; i++) drops.push(scatter());

    const next: Drop[] = [];
    for (const d of drops) {
      if (d.vy === 0 && d.r >= SLIDE_RADIUS && Math.random() < dt * .35) d.vy = 20;
      if (d.vy > 0) {
        d.vy = Math.min(MAX_SPEED, d.vy + GRAVITY * dt);
        d.y += d.vy * dt;
        d.wobble += dt * 9;
        d.x += Math.sin(d.wobble) * .25;
        d.r = Math.max(2.4, d.r - dt * .3); // sheds water as it runs
        if (d.y - d.lastTrail > 6 + Math.random() * 10) {
          const t = bead(d.x + (Math.random() - .5) * 1.5, d.y - d.r * 1.2, .9 + Math.random() * 1.1);
          t.life = 4 + Math.random() * 6;
          next.push(t);
          d.lastTrail = d.y;
        }
      }
      if (Number.isFinite(d.life)) d.life -= dt;
      if (d.y - d.r > height || d.life <= 0) continue;
      next.push(d);
    }
    // a running drop swallows the still beads it passes through
    for (const d of next) {
      if (d.vy === 0) continue;
      for (const o of next) {
        if (o === d || o.vy !== 0 || o.r <= 0) continue;
        if (Math.abs(o.x - d.x) < d.r + o.r && Math.abs(o.y - d.y) < d.r + o.r) {
          d.r = Math.min(9, Math.hypot(d.r, o.r));
          o.r = 0;
        }
      }
    }
    drops = next.filter(d => d.r > 0);
    // keep the glass from flooding: the oldest still beads dry off first
    let excess = drops.length - Math.round(width * height / 4500);
    if (excess > 0) drops = drops.filter(d => d.vy > 0 || excess-- <= 0);

    ctx!.clearRect(0, 0, width, height);
    for (const d of drops) drawDrop(d);
    raf = requestAnimationFrame(frame);
  }

  function start() {
    cancelAnimationFrame(raf);
    if (!on) {
      ctx!.clearRect(0, 0, width, height);
      return;
    }
    readColors();
    if (reduceMotion.matches) {
      // a still, wet window: draw the beads once and stop
      ctx!.clearRect(0, 0, width, height);
      for (const d of drops) drawDrop(d);
      return;
    }
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  resize();
  start();
  addEventListener('resize', () => { resize(); start(); }, { passive: true });
  reduceMotion.addEventListener('change', start);
  new MutationObserver(() => { readColors(); if (on && reduceMotion.matches) start(); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  return {
    // a fresh shower each time it starts; it keeps falling while it fades
    // out, then stops and clears
    toggle() {
      const want = !canvas.classList.contains('is-on');
      clearTimeout(fadeTimer);
      canvas.classList.toggle('is-on', want);
      if (want) {
        if (on) return; // pressed again mid fade-out: just fade back in
        on = true;
        resize();
        start();
      } else {
        fadeTimer = window.setTimeout(() => {
          on = false;
          start();
        }, FADE_MS);
      }
    },
  };
}
