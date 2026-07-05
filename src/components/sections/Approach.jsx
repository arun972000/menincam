import Section, { SectionHeading } from '../ui/Section';
import LazyImage from '../ui/LazyImage';
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal';
import { approach } from '../../data/team';

/** "Our approach": natural, unobtrusive coverage. */
export default function Approach() {
  return (
    <Section>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="relative">
          <Reveal>
            <LazyImage
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1100&q=70"
              alt="Photographer capturing a natural moment at an event"
              ratio={0.82}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="rounded-card shadow-soft"
            />
          </Reveal>
          {/* Floating caption card */}
          <div className="absolute -bottom-6 -right-2 hidden max-w-[14rem] rounded-xl border border-line bg-surface p-5 shadow-xl sm:block">
            <p className="font-display text-2xl font-bold text-gold">Natural.</p>
            <p className="mt-1 text-sm text-muted">We capture real moments, not stiff poses.</p>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="How we work"
            title="Real moments, not stiff poses"
            intro="The best photos are the ones you didn’t even notice being taken. We stay out of the way and let your event happen naturally."
          />
          <RevealGroup className="mt-10 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
            {approach.map((a) => (
              <RevealItem key={a.title} className="border-l border-gold/40 pl-5">
                <h3 className="font-serif text-xl text-ivory">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
