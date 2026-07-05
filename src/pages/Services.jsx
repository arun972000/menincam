import Seo from '../components/Seo';
import PageHeader from '../components/sections/PageHeader';
import Reveal from '../components/ui/Reveal';
import LazyImage from '../components/ui/LazyImage';
import Icon from '../components/ui/Icon';
import Button, { ArrowIcon } from '../components/ui/Button';
import CTABand from '../components/sections/CTABand';
import { services } from '../data/services';

/** One simple, alternating block per event type. */
function ServiceBlock({ service, flip }) {
  return (
    <Reveal
      as="section"
      id={service.id}
      className="scroll-mt-28 border-b border-line/40 py-14 last:border-0 sm:py-20"
    >
      <div className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        {/* Image */}
        <LazyImage
          src={service.image}
          alt={service.alt}
          ratio={1.2}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="shadow-[0_18px_40px_-24px_rgba(0,0,0,0.18)]"
        />

        {/* Copy */}
        <div>
          <span className="mb-5 inline-grid h-12 w-12 place-items-center rounded-full bg-gold/10 text-gold ring-1 ring-gold/20">
            <Icon name={service.icon} className="h-6 w-6" />
          </span>
          <h2 className="font-serif text-3xl text-ivory sm:text-4xl">{service.title}</h2>
          <p className="mt-3 text-lg font-medium text-ivory">{service.short}</p>
          <p className="mt-4 leading-relaxed text-muted">{service.story}</p>

          <h3 className="mt-7 text-xs uppercase tracking-widest2 text-muted">What you get</h3>
          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {service.included.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ivory/90">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button to="/contact" variant="outline">
              Get a quote for {service.title} <ArrowIcon />
            </Button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Services() {
  return (
    <>
      <Seo
        title="What We Cover"
        description="Men in Cam covers weddings, birthdays, parties, corporate events, baby showers, concerts and more. Photos and video for every kind of event in Chennai and beyond."
        path="/services"
      />
      <PageHeader
        eyebrow="What we cover"
        title="Photos & video for any event"
        intro="Big or small, formal or fun — here’s everything we cover. Not sure which fits? Just message us and we’ll help."
        image="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=60"
      />

      {/* Quick-jump chips */}
      <div className="border-b border-line/60">
        <div className="container-x no-scrollbar flex gap-2 overflow-x-auto py-4">
          {services.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="whitespace-nowrap rounded-full border border-line px-4 py-2 text-xs text-muted transition-colors hover:border-gold/60 hover:text-ivory"
            >
              {s.title}
            </a>
          ))}
        </div>
      </div>

      <div className="container-x">
        {services.map((service, i) => (
          <ServiceBlock key={service.id} service={service} flip={i % 2 === 1} />
        ))}
      </div>

      <CTABand />
    </>
  );
}
