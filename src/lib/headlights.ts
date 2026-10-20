import { headlightFrame, pathData } from './headlight-geometry.mjs';

const NS = 'http://www.w3.org/2000/svg';
type Theme = 'day' | 'night';

export function initHeadlights() {
  const root = document.documentElement;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-lamp]')];
  const glows = [...document.querySelectorAll<HTMLElement>('.lamp-glow')];
  const units = [...document.querySelectorAll<SVGGElement>('.headlight-unit')].map((group, i) => {
    const faces = group.querySelector<SVGGElement>('.headlight-faces')!;
    const paths = new Map<string, SVGPathElement>();
    for (const name of ['lid', 'rear', 'side-inner', 'side-outer', 'bulb']) {
      let path = faces.querySelector<SVGPathElement>(`[data-face="${name}"]`);
      if (!path) {
        path = document.createElementNS(NS, 'path');
        path.dataset.face = name;
        path.setAttribute('class', `headlight-face face-${name}`);
        faces.append(path);
      }
      paths.set(name, path);
    }
    return {
      group, faces, paths, side: Number(group.dataset.side), glow: glows[i], button: buttons[i],
      details: group.querySelector<SVGGElement>('.bulb-details')!,
      lidInk: group.querySelector<SVGPathElement>('.lid-ink')!,
      clip: group.querySelector<SVGPathElement>('.bulb-clip')!,
      shadow: group.querySelector<SVGEllipseElement>('.headlight-shadow')!,
      bezel: group.querySelector<SVGPathElement>('.lamp-bezel')!,
      glass: group.querySelector<SVGPathElement>('.lamp-glass')!,
      emission: group.querySelector<SVGPathElement>('.lamp-emission')!,
      ring: group.querySelector<SVGPathElement>('.lamp-ring')!,
      flutes: group.querySelector<SVGPathElement>('.lamp-flutes')!,
      highlight: group.querySelector<SVGPathElement>('.lamp-highlight')!,
    };
  });
  const currentTheme = (): Theme => {
    const theme = root.dataset.theme;
    return theme === 'day' || theme === 'night' ? theme : systemTheme.matches ? 'night' : 'day';
  };
  let position = currentTheme() === 'night' ? 1 : 0;
  let frameId = 0;
  const ease = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

  function paint(progress: number) {
    // Illumination ramps up late, after the bulb clears the hood.
    const light = ease(Math.max(0, Math.min(1, (progress - .48) / .44)));
    for (const unit of units) {
      const frame = headlightFrame(progress, unit.side);
      unit.lidInk.setAttribute('d', pathData(frame.lidInk));
      const visible = new Set(frame.faces.map(face => face.name));
      for (const [name, path] of unit.paths) path.style.display = visible.has(name) ? '' : 'none';
      for (const face of frame.faces) {
        const path = unit.paths.get(face.name)!;
        path.setAttribute('d', pathData(face.points));
        // Painter's algorithm. All fills are opaque; no fading of geometry.
        unit.faces.append(path);
        if (face.name === 'lid') unit.faces.append(unit.lidInk);
        if (face.name === 'bulb') unit.faces.append(unit.details);
      }
      const bulb = frame.faces.find(face => face.name === 'bulb');
      unit.details.style.display = bulb ? '' : 'none';
      unit.clip.setAttribute('d', bulb ? pathData(bulb.points) : '');
      unit.bezel.setAttribute('d', pathData(frame.bezel));
      unit.glass.setAttribute('d', pathData(frame.lens));
      unit.emission.setAttribute('d', pathData(frame.lens));
      unit.emission.setAttribute('opacity', String(light));
      unit.ring.setAttribute('d', pathData(frame.innerRing));
      unit.flutes.setAttribute('d', frame.flutes.map(line => pathData(line, false)).join(''));
      unit.highlight.setAttribute('d', pathData(frame.highlight, false));
      unit.shadow.setAttribute('opacity', String(progress * .24));
      // Aura and hit targets follow the actual projected face, not a fixed box.
      const points = frame.faces.flatMap(face => face.points);
      const targetCenter = [0, 1].map(axis => (
        Math.min(...points.map(point => point[axis])) +
        Math.max(...points.map(point => point[axis]))
      ) / 2);
      unit.glow.style.left = `${frame.lensCenter[0] / 12}%`;
      unit.glow.style.top = `${frame.lensCenter[1] / 7.2}%`;
      unit.button.style.left = `${targetCenter[0] / 12}%`;
      unit.button.style.top = `${targetCenter[1] / 7.2}%`;
      unit.glow.style.opacity = String(light * .8);
      unit.glow.style.transform = `translate(-50%, -50%) scale(${.85 + light * .15})`;
    }
  }

  function animateTo(target: number) {
    cancelAnimationFrame(frameId);
    if (reduceMotion.matches || position === target) {
      position = target;
      paint(position);
      return;
    }
    const from = position;
    const duration = (target > from ? 1050 : 850) * Math.max(.35, Math.abs(target - from));
    const start = performance.now();
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      position = from + (target - from) * ease(t);
      paint(position);
      if (t < 1) frameId = requestAnimationFrame(tick);
    }
    frameId = requestAnimationFrame(tick);
  }

  function syncTheme() {
    const theme = currentTheme();
    for (const button of buttons) button.setAttribute('aria-pressed', String(theme === 'night'));
    animateTo(theme === 'night' ? 1 : 0);
  }
  function setTheme(theme: Theme) {
    root.dataset.theme = theme;
    try { localStorage.setItem('headlights', theme); } catch { /* Storage may be unavailable. */ }
    syncTheme();
  }
  for (const button of buttons) button.addEventListener('click', () => setTheme(currentTheme() === 'night' ? 'day' : 'night'));
  systemTheme.addEventListener('change', syncTheme);
  reduceMotion.addEventListener('change', syncTheme);
  syncTheme();
  return { currentTheme, setTheme };
}
