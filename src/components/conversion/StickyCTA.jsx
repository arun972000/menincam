import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Button, { ArrowIcon } from '../ui/Button';
import { openDateChecker } from '../../lib/bus';

/**
 * Scroll-triggered bottom CTA bar (desktop only — mobile has the tab bar's
 * Book action instead). Appears after the visitor scrolls past the hero and
 * opens the "Check your date" flow. Dismissible, and hidden on the Contact
 * page (where the form already lives).
 */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.9;
      // Hide again near the very bottom so it doesn't cover the footer CTA.
      const nearBottom =
        window.innerHeight + window.scrollY > document.body.scrollHeight - 320;
      setVisible(past && !nearBottom);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hide = dismissed || pathname === '/contact';

  return (
    <AnimatePresence>
      {visible && !hide && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-30 hidden lg:block"
        >
          <div className="container-x pb-4">
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface/95 px-6 py-4 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.25)] backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="hidden h-10 w-10 place-items-center rounded-full bg-gold/15 text-gold md:grid">✦</span>
                <p className="text-sm text-ivory sm:text-base">
                  <span className="font-display text-lg font-bold text-ivory">Dates fill fast.</span>{' '}
                  Check if we’re free for your event.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={() => openDateChecker('sticky_cta')}>
                  Check your date <ArrowIcon />
                </Button>
                <button
                  type="button"
                  onClick={() => setDismissed(true)}
                  aria-label="Dismiss"
                  className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:text-ivory"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
