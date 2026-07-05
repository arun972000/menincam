import Section, { SectionHeading } from '../ui/Section';
import Icon from '../ui/Icon';
import { RevealGroup, RevealItem } from '../ui/Reveal';
import { whyUs } from '../../data/studio';

/** Value-prop grid: the reasons people choose Men in Cam. */
export default function WhyUs() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Why Men in Cam"
        title="Why people choose us"
        intro="Good photos are just the start. People come back to us because we make the whole thing easy, calm and stress-free."
        align="center"
        className="mx-auto"
      />

      <RevealGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {whyUs.map((item, i) => (
          <RevealItem
            key={item.title}
            className="group panel relative overflow-hidden p-7 transition-all duration-300 ease-snap hover:-translate-y-1 hover:border-gold/40 hover:shadow-lift"
          >
            {/* Faint index numeral */}
            <span className="index-numeral absolute -right-1 -top-3 font-display text-7xl font-extrabold transition-colors duration-500 group-hover:text-gold/15">
              {String(i + 1).padStart(2, '0')}
            </span>

            <span className="relative inline-grid h-12 w-12 place-items-center rounded-2xl bg-gold/12 text-gold ring-1 ring-gold/15 transition-transform duration-300 ease-snap group-hover:scale-110">
              <Icon name={item.icon} className="h-6 w-6" />
            </span>
            <h3 className="relative mt-5 font-display text-xl font-bold text-ivory">{item.title}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
