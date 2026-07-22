import { venues } from '../../data/press';

/**
 * "We cover events at" band — an honest, moving strip of venue TYPES (no
 * fabricated review-site marks or awards). Scrolls opposite to the promises
 * marquee higher up the page, so the two bands feel alive together.
 * Transform-only CSS animation; the global reduced-motion rule stops it.
 */
export default function PressWall() {
  const items = [...venues, ...venues];
  return (
    <section className="border-y border-line/60 bg-gold/[0.03] py-6">
      <p className="mb-4 text-center text-xs uppercase tracking-widest2 text-muted">We cover events at</p>
      <div className="flex overflow-hidden">
        {/* Two copies for a seamless loop; reversed direction vs the promises band */}
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? 'true' : undefined}
            className="flex shrink-0 animate-marquee items-center gap-10 pr-10 [animation-direction:reverse]"
          >
            {items.map((v, i) => (
              <li key={`${copy}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
                <span className="font-display text-lg font-bold text-ivory/70 sm:text-xl">{v}</span>
                <span className="text-gold" aria-hidden="true">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
