import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal';
import Icon from '../ui/Icon';
import { press, awards, venues } from '../../data/press';

/**
 * Press / awards section. Simple text marks for review sites (no copyrighted
 * logo files shipped), award cards, and a "we cover events at" strip, for
 * friendly social proof.
 */
export default function PressWall() {
  return (
    <section className="border-y border-line/60 py-20">
      <div className="container-x">
        {/* Featured-in marks */}
        <Reveal className="text-center">
          <p className="eyebrow justify-center">
            <span className="rule-gold" /> Rated &amp; reviewed on
          </p>
        </Reveal>
        <Reveal className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 border-b border-line/50 pb-12">
          {press.map((name) => (
            <span
              key={name}
              className="font-display text-xl font-semibold tracking-wide text-muted transition-colors duration-300 hover:text-ivory sm:text-2xl"
            >
              {name}
            </span>
          ))}
        </Reveal>

        {/* Award cards */}
        <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {awards.map((a) => (
            <RevealItem
              key={a.title}
              className="panel flex items-start gap-4 p-6 transition-transform duration-300 ease-snap hover:-translate-y-1"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
                <Icon name="star" filled className="h-5 w-5" />
              </span>
              <div>
                <span className="font-display text-xl font-bold text-gold">{a.year}</span>
                <p className="mt-1 text-sm leading-snug text-ivory/90">{a.title}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Trusted at */}
        <Reveal className="mt-12 text-center">
          <p className="text-xs uppercase tracking-widest2 text-muted">We cover events at</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted">
            {venues.map((v, i) => (
              <span key={v} className="flex items-center gap-5">
                {v}
                {i < venues.length - 1 && <span className="text-gold/50" aria-hidden="true">✦</span>}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
