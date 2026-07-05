import { stats } from '../../data/stats';
import Counter from '../ui/Counter';
import { RevealGroup, RevealItem } from '../ui/Reveal';

/** Animated social-proof counters as bento tiles. */
export default function TrustBar() {
  return (
    <section className="py-12 sm:py-16">
      <RevealGroup className="container-x grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <RevealItem key={s.label}>
            <div className="panel h-full p-6 text-center transition-transform duration-300 ease-snap hover:-translate-y-1">
              <div className="font-display text-4xl font-extrabold text-gold sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-xs font-medium uppercase tracking-widest2 text-muted sm:text-sm">{s.label}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
