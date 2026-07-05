import Reveal from '../ui/Reveal';
import Button, { ArrowIcon } from '../ui/Button';
import Icon from '../ui/Icon';
import { whatsappLink } from '../../data/site';

/**
 * Bold full-width CTA band — a bright tangerine "tap here" moment that closes
 * every page. Reusable: pass custom copy or use the defaults.
 */
export default function CTABand({
  eyebrow = 'Ready to book?',
  title = 'Tell us about your event.',
  body = 'Send your date and what you’re planning. We’ll reply within 24 hours with a simple quote — no obligation.',
}) {
  return (
    <section className="relative overflow-hidden bg-gold">
      {/* Depth gradient built from overlays (not a second colour) so the band
          follows whichever accent the visitor picked in Settings. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/25" />
      {/* Soft light blooms for depth */}
      <div className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="container-x relative py-20 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-5 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest2 text-white">
            <span className="h-px w-12 bg-white/70" /> {eyebrow}
          </p>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">{body}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {/* Fixed dark text — the ink token flips to cream in Daylight and
                would vanish on this white button. */}
            <Button to="/contact" size="lg" className="!bg-white !text-[#1A1614] hover:!bg-white/90">
              Get a quote <ArrowIcon />
            </Button>
            <Button
              href={whatsappLink()}
              size="lg"
              className="!bg-transparent !border !border-white/70 !text-white hover:!bg-white/10"
            >
              <Icon name="whatsapp" filled className="h-5 w-5" /> Chat on WhatsApp
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
