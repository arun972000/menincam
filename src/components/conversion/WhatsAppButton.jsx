import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { whatsappLink } from '../../data/site';
import Icon from '../ui/Icon';
import { track } from '../../lib/track';
import { usePreferences } from '../../context/PreferencesContext';

/**
 * Floating WhatsApp button, desktop only (essential for the Indian market).
 * On mobile the app chrome covers this: WhatsApp lives in the top bar, the
 * Book flow and the More sheet. Opens a pre-filled chat.
 *
 * Nudge: after ~12s the button "speaks" — a small chat bubble pops out
 * ("Planning something? 👋"). Once per session, dismissible, and clicking the
 * bubble opens the chat. A proven, human-feeling conversion lift.
 */
const NUDGE_KEY = 'mic:wa-nudge:v1';

export default function WhatsAppButton() {
  const { calm } = usePreferences();
  const [nudge, setNudge] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(NUDGE_KEY) === '1';
    } catch {
      /* private mode */
    }
    if (seen) return undefined;
    const t = setTimeout(() => {
      setNudge(true);
      try {
        sessionStorage.setItem(NUDGE_KEY, '1');
      } catch {
        /* ignore */
      }
      track('wa_nudge_shown');
    }, 12000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = (e) => {
    // The close button lives inside the anchor — don't open the chat.
    e.preventDefault();
    e.stopPropagation();
    setNudge(false);
  };

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Men in Cam on WhatsApp"
      onClick={() => track('whatsapp_click', { source: nudge ? 'float_nudge' : 'float' })}
      className="group fixed bottom-5 right-5 z-40 hidden items-center justify-end sm:bottom-6 sm:right-6 lg:flex"
    >
      {/* Hover tooltip (hidden while the nudge bubble is open) */}
      {!nudge && (
        <span className="pointer-events-none absolute right-[4.5rem] hidden whitespace-nowrap rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ivory opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 sm:block">
          Chat on WhatsApp
        </span>
      )}

      {/* Session-once nudge bubble */}
      <AnimatePresence>
        {nudge && (
          <motion.span
            initial={calm ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.9 }}
            animate={calm ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={calm ? { duration: 0.2 } : { type: 'spring', stiffness: 320, damping: 22 }}
            className="absolute bottom-1 right-[4.5rem] w-60 origin-bottom-right rounded-2xl rounded-br-md border border-line bg-surface p-4 text-left shadow-lift"
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss message"
              className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full border border-line bg-surface text-xs text-muted transition-colors hover:text-ivory"
            >
              ✕
            </button>
            <p className="font-display text-sm font-bold text-ivory">Planning something? 👋</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Tell us your date — we reply within minutes on WhatsApp.
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-teal">
              Chat now
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </motion.span>
        )}
      </AnimatePresence>

      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)] transition-transform duration-300 group-hover:scale-105">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
        <Icon name="whatsapp" filled className="relative h-7 w-7 text-white" />
      </span>
    </a>
  );
}
