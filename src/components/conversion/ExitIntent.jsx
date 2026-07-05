import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useIsMobile } from '../../hooks/useMediaQuery';
import Button, { ArrowIcon } from '../ui/Button';
import Icon from '../ui/Icon';
import Stars from '../ui/Stars';
import { whatsappLink } from '../../data/site';

/**
 * Gentle exit-intent capture. On desktop, fires once per session when the
 * cursor leaves the top of the viewport. On mobile (no mouseleave), it falls
 * back to firing once the visitor has scrolled ~75% down the page. Stored in
 * sessionStorage so it never nags.
 *
 * Presented as a premium split-image modal with social proof + soft urgency to
 * lift conversion at the moment of leaving.
 */
const SEEN_KEY = 'menincam_exit_seen';

// TODO: replace with a real Men in Cam frame.
const MODAL_IMAGE =
  'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&fm=webp&q=70&w=900';

export default function ExitIntent() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) return;

    const fire = () => {
      if (sessionStorage.getItem(SEEN_KEY)) return;
      sessionStorage.setItem(SEEN_KEY, '1');
      setOpen(true);
    };

    if (isMobile) {
      // End-of-scroll trigger on mobile.
      const onScroll = () => {
        const ratio = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
        if (ratio > 0.75) {
          fire();
          window.removeEventListener('scroll', onScroll);
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }

    // Desktop: pointer leaves toward the top (closing tab / address bar).
    const onLeave = (e) => {
      if (e.clientY <= 0) fire();
    };
    document.addEventListener('mouseout', onLeave);
    return () => document.removeEventListener('mouseout', onLeave);
  }, [isMobile]);

  // Lock body scroll while open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [open]);

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={close}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-title"
            initial={{ scale: 0.94, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 24, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid w-full max-w-3xl overflow-hidden rounded-3xl border border-gold/30 bg-surface shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] md:grid-cols-2"
          >
            {/* Image side */}
            <div className="relative hidden min-h-[26rem] md:block">
              <img
                src={MODAL_IMAGE}
                alt="A couple sharing a tender candid moment"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <Icon name="quote" className="h-7 w-7 text-gold" />
                <p className="mt-2 font-display text-lg font-semibold leading-snug text-white">
                  “They captured our day perfectly — so many little moments we would have missed.”
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest2 text-gold">A happy client</p>
              </div>
            </div>

            {/* Content side */}
            <div className="relative flex flex-col justify-center p-8 sm:p-10">
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-gold hover:text-gold"
              >
                ✕
              </button>

              <p className="eyebrow mb-4">
                <span className="rule-gold" /> Before you go
              </p>
              <h3 id="exit-title" className="font-serif text-3xl leading-tight text-ivory sm:text-4xl">
                Planning an event?
                <span className="block text-gold-gradient">Get a free quote.</span>
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Tell us your date and we’ll send a simple price within 24 hours.
                No obligation — just a quick, friendly reply.
              </p>

              {/* Social proof */}
              <div className="mt-6 flex items-center gap-3 rounded-xl border border-line/60 bg-ink/40 px-4 py-3">
                <Stars rating={5} />
                <span className="text-xs text-muted">
                  Trusted by <span className="text-ivory">2,000+ happy clients</span>
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Button to="/contact" size="lg" onClick={close}>
                  Get a quote <ArrowIcon />
                </Button>
                <Button href={whatsappLink()} variant="outline" size="md">
                  <Icon name="whatsapp" filled className="h-5 w-5" /> Message us on WhatsApp
                </Button>
              </div>

              <p className="mt-4 flex items-center gap-2 text-xs text-muted">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                Popular dates fill up fast — send yours today.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
