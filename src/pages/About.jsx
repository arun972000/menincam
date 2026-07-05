import Seo from '../components/Seo';
import PageHeader from '../components/sections/PageHeader';
import Section, { SectionHeading } from '../components/ui/Section';
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal';
import LazyImage from '../components/ui/LazyImage';
import Counter from '../components/ui/Counter';
import AvatarCharacter from '../components/ui/AvatarCharacter';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import CTABand from '../components/sections/CTABand';
import { founders, approach } from '../data/team';
import { awards } from '../data/press';
import { stats } from '../data/stats';
import { brand, contact } from '../data/site';
import { track } from '../lib/track';

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description={`Meet ${brand.name} — a friendly photo and video team in ${brand.city} covering all kinds of events. Natural photos, easy booking, quick delivery.`}
        path="/about"
      />
      <PageHeader
        eyebrow="About us"
        title="A friendly photo & video team"
        intro={`${brand.name} is a small, friendly team that covers all kinds of events. Our goal is simple — great photos and video, and an easy, stress-free experience for you.`}
        image="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=60"
      />

      {/* Founders' note */}
      <Section>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <LazyImage
              src="https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=1100&q=70"
              alt="The Men in Cam crew at work"
              ratio={0.85}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-5">
              <span className="rule-gold" /> A note from us
            </p>
            <blockquote className="font-serif text-xl leading-relaxed text-ivory/90 sm:text-2xl">
              {founders.note}
            </blockquote>
            <p className="mt-6 text-gold">{founders.signature}</p>
          </Reveal>
        </div>
      </Section>

      {/* Stats */}
      <section className="border-y border-line/60 bg-surface/40">
        <RevealGroup className="container-x grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
          {stats.map((s) => (
            <RevealItem key={s.label} className="text-center">
              <div className="font-serif text-4xl text-gold sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-xs uppercase tracking-widest2 text-muted">{s.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Philosophy */}
      <Section>
        <SectionHeading
          eyebrow="How we work"
          title="What you can expect"
          intro="Four simple things we promise at every event."
          align="center"
          className="mx-auto"
        />
        <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((a, i) => (
            <RevealItem key={a.title} className="rounded-2xl border border-line/60 bg-surface/40 p-6">
              <span className="font-serif text-4xl text-gold/40">0{i + 1}</span>
              <h3 className="mt-3 font-serif text-xl text-ivory">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{a.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Founders — the two of us handle every enquiry */}
      <Section className="bg-surface/30">
        <SectionHeading
          eyebrow="Leadership"
          title="Two founders, zero middlemen"
          intro="Every business enquiry comes straight to one of us — call, WhatsApp or email either founder directly, any hour of the day. (Psst — say hi to our avatars, they're friendly.)"
          align="center"
          className="mx-auto"
        />
        <RevealGroup className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {contact.people.map((p) => (
            <RevealItem key={p.id} className="panel flex flex-col items-center p-8 text-center">
              <AvatarCharacter variant={p.avatar} name={p.name} size={168} />
              <h3 className="mt-5 font-serif text-2xl text-ivory">{p.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-widest2 text-gold">{p.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.bio}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                <Button
                  href={`tel:${p.phoneE164}`}
                  size="sm"
                  onClick={() => track('call_click', { person: p.id })}
                >
                  <Icon name="phone" className="h-4 w-4" /> {p.phoneDisplay}
                </Button>
                <Button
                  href={`https://wa.me/${p.whatsapp}?text=${encodeURIComponent(`Hi ${p.name.split(' ')[0]}! I'd like to enquire about photos/video for my event.`)}`}
                  variant="whatsapp"
                  size="sm"
                  onClick={() => track('whatsapp_click', { source: 'about', person: p.id })}
                >
                  <Icon name="whatsapp" filled className="h-4 w-4" /> WhatsApp
                </Button>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-8 text-center text-sm text-muted">
          <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-teal align-middle" />
          {contact.hours} ·{' '}
          <a href={`mailto:${contact.email}`} className="text-gold transition-colors hover:underline">
            {contact.email}
          </a>
        </p>
      </Section>

      {/* Behind the scenes + awards */}
      <Section>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="grid grid-cols-2 gap-3">
              <LazyImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=70" alt="Behind the scenes — directing a shoot" ratio={0.8} className="row-span-2" />
              <LazyImage src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=700&q=70" alt="Behind the scenes — capturing a film" ratio={1.4} />
              <LazyImage src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=700&q=70" alt="Behind the scenes — golden hour setup" ratio={1.4} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-5">
              <span className="rule-gold" /> Reviews &amp; recognition
            </p>
            <h2 className="font-serif text-3xl text-ivory sm:text-4xl">Trusted by thousands of happy clients</h2>
            <ul className="mt-8 space-y-5">
              {awards.map((a) => (
                <li key={a.title} className="flex items-baseline gap-5 border-b border-line/50 pb-5">
                  <span className="font-serif text-2xl text-gold">{a.year}</span>
                  <span className="text-ivory/90">{a.title}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-muted">Placeholder accolades — replace with real recognitions.</p>
          </Reveal>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
