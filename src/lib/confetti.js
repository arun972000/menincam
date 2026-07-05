/**
 * Tiny dependency-free canvas confetti. Used for the form success celebration
 * and the Settings panel "Say cheese" easter egg. Draws on a throwaway
 * full-screen canvas (pointer-events: none) and removes it when done.
 * No-ops entirely when the user prefers reduced motion (OS setting or the
 * site's own "Calm" mode).
 */

function motionDisabled() {
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.dataset.motion === 'reduced'
  );
}

/** Read a theme token (space-separated RGB channels) as a canvas colour. */
function tokenColor(varName, fallback) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return raw ? `rgb(${raw})` : fallback;
}

export function confettiBurst({ count = 120, duration = 1800 } = {}) {
  if (typeof window === 'undefined' || motionDisabled()) return;

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:95;';
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const colors = [
    tokenColor('--c-gold', '#E01E2B'),
    tokenColor('--c-teal', '#2DD4BF'),
    tokenColor('--c-ivory', '#F3F1EC'),
    '#FFC53D', // a warm gold pop regardless of theme
  ];

  const W = window.innerWidth;
  const H = window.innerHeight;

  // Two side "cannons" firing up and inwards: reads as a celebration without
  // covering the content the user is looking at.
  const particles = Array.from({ length: count }, (_, i) => {
    const fromLeft = i % 2 === 0;
    const angle = fromLeft
      ? -Math.PI / 2 + (Math.random() * 0.9 - 0.1) // up-right-ish
      : -Math.PI / 2 - (Math.random() * 0.9 - 0.1); // up-left-ish
    const speed = 9 + Math.random() * 8;
    return {
      x: fromLeft ? W * 0.12 : W * 0.88,
      y: H * 0.85,
      vx: Math.cos(angle) * speed * (fromLeft ? 1 : 1),
      vy: Math.sin(angle) * speed,
      w: 5 + Math.random() * 5,
      h: 8 + Math.random() * 6,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: colors[i % colors.length],
      drag: 0.985 + Math.random() * 0.01,
    };
  });

  const start = performance.now();
  let rafId;

  const tick = (now) => {
    const t = now - start;
    ctx.clearRect(0, 0, W, H);
    const fade = Math.max(0, 1 - t / duration);

    for (const p of particles) {
      p.vx *= p.drag;
      p.vy = p.vy * p.drag + 0.32; // gravity
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;

      ctx.save();
      ctx.globalAlpha = fade;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    if (t < duration) rafId = requestAnimationFrame(tick);
    else canvas.remove();
  };
  rafId = requestAnimationFrame(tick);

  // Safety: clean up if the page navigates mid-animation.
  window.addEventListener(
    'pagehide',
    () => {
      cancelAnimationFrame(rafId);
      canvas.remove();
    },
    { once: true }
  );
}
