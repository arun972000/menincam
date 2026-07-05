import { useEffect, useRef, useState } from 'react';
import { promises } from '../../data/studio';

/**
 * Cinematic moving brand band. A single CSS marquee (transform-only, GPU-cheap)
 * that scrolls the studio's promises. Duplicated once for a seamless loop. The
 * animation respects reduced-motion via the global rule in index.css, and
 * PAUSES while off-screen (IntersectionObserver) so it never costs frames the
 * visitor can't see — matters on cheaper phones.
 */
export default function Marquee() {
  const items = [...promises, ...promises];
  const ref = useRef(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const play = { animationPlayState: inView ? 'running' : 'paused' };

  return (
    <section ref={ref} className="border-y border-line/60 bg-gold/[0.04] py-6">
      <div className="flex overflow-hidden">
        <ul style={play} className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {items.map((p, i) => (
            <li key={i} className="flex items-center gap-10 whitespace-nowrap">
              <span className="font-display text-xl font-bold text-ivory/80 sm:text-2xl">{p}</span>
              <span className="text-gold" aria-hidden="true">✦</span>
            </li>
          ))}
        </ul>
        {/* Second copy for seamless wrap */}
        <ul style={play} className="flex shrink-0 animate-marquee items-center gap-10 pr-10" aria-hidden="true">
          {items.map((p, i) => (
            <li key={i} className="flex items-center gap-10 whitespace-nowrap">
              <span className="font-display text-xl font-bold text-ivory/80 sm:text-2xl">{p}</span>
              <span className="text-gold">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
