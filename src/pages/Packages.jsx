import Seo from '../components/Seo';
import PageHeader from '../components/sections/PageHeader';
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal';
import Button, { ArrowIcon } from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import InquiryForm from '../components/forms/InquiryForm';
import CTABand from '../components/sections/CTABand';
import { collections, quoteAssurances, quoteCta } from '../data/packages';

function CollectionCard({ c }) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-500 ease-cinema hover:-translate-y-1 ${
        c.highlighted
          ? 'border-gold/60 bg-gradient-to-b from-gold/10 to-surface/40 shadow-[0_20px_60px_-30px_rgb(var(--c-gold)/0.6)]'
          : 'border-line/60 bg-surface/40 hover:border-gold/40'
      }`}
    >
      {c.ribbon && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-semibold uppercase tracking-widest2 text-white">
          {c.ribbon}
        </span>
      )}

      <div className="text-center">
        <h3 className="font-serif text-3xl text-ivory">{c.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-widest2 text-gold">{c.bestFor}</p>
        <p className="mt-4 text-sm text-muted">{c.blurb}</p>
      </div>

      <ul className="mt-7 flex-1 space-y-3 border-t border-line/50 pt-7">
        {c.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-ivory/90">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* No price — a curiosity-driven CTA instead. */}
      <div className="mt-8">
        <Button
          href="#get-quote"
          variant={c.highlighted ? 'primary' : 'outline'}
          className="w-full"
        >
          Get {c.name} pricing <ArrowIcon />
        </Button>
      </div>
    </div>
  );
}

export default function Packages() {
  return (
    <>
      <Seo
        title="Packages & Pricing"
        description="Simple photo and video packages for any event — weddings, birthdays, parties and more. Send your date and get a clear quote from Men in Cam within 24 hours."
        path="/packages"
      />
      <PageHeader
        eyebrow="Packages"
        title="Simple packages, made to fit your event"
        intro="Pick the one closest to your event, then send us your date. We’ll reply with a clear price within 24 hours — no hidden charges."
        image="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=60"
      />

      {/* Collections (no prices) */}
      <section className="pb-16">
        <RevealGroup className="container-x grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {collections.map((c) => (
            <RevealItem key={c.id} className="h-full">
              <CollectionCard c={c} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Why no price list — reassurance + lead form */}
      <section id="get-quote" className="scroll-mt-24 border-t border-line/60 bg-surface/30 py-20">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-5">
              <span className="rule-gold" /> {quoteCta.eyebrow}
            </p>
            <h2 className="font-serif text-3xl leading-tight text-ivory sm:text-4xl">{quoteCta.title}</h2>
            <p className="mt-5 leading-relaxed text-muted">{quoteCta.body}</p>

            <ul className="mt-8 space-y-4">
              {quoteAssurances.map((a) => (
                <li key={a.label} className="flex items-start gap-3 text-ivory/90">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                    <Icon name={a.icon} className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-relaxed">{a.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-gold/30 bg-gold/[0.06] p-6">
              <p className="font-serif text-xl text-ivory">Dates fill up fast.</p>
              <p className="mt-1 text-sm text-muted">
                Send your date now and we’ll hold a tentative slot while you decide. No payment needed to ask.
              </p>
            </div>
          </Reveal>

          {/* Embedded quote form — captures the lead right here */}
          <Reveal delay={0.1}>
            <h3 className="mb-5 font-serif text-2xl text-ivory">Get your price</h3>
            <InquiryForm />
          </Reveal>
        </div>
      </section>

      <CTABand
        eyebrow="No obligation"
        title="Not sure which package fits?"
        body="Tell us about your event and we’ll suggest the right option and a clear price — within 24 hours."
      />
    </>
  );
}
