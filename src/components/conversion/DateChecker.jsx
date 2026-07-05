import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BottomSheet from '../ui/BottomSheet';
import Button, { ArrowIcon } from '../ui/Button';
import Icon from '../ui/Icon';
import { contact } from '../../data/site';
import { eventTypes } from '../../data/press';
import { EVENTS, onBus } from '../../lib/bus';
import { track } from '../../lib/track';
import { tap } from '../../lib/haptics';
import { confettiBurst } from '../../lib/confetti';

/**
 * "Check your date": a 3-step availability/booking flow no local competitor
 * offers: occasion → date → instant answer + WhatsApp handoff with everything
 * pre-filled. Bottom sheet on mobile, centered dialog on desktop. Mounted once
 * in Layout; open it from anywhere via openDateChecker(source).
 */

const OCCASION_EMOJI = {
  Wedding: '💍',
  'Birthday / Anniversary': '🎂',
  'Engagement / Reception': '💐',
  'Baby Shower / Maternity': '👶',
  'Corporate Event': '💼',
  'Concert / Stage Show': '🎤',
  'Pre-Wedding Shoot': '💞',
  Other: '✨',
};

const slide = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -32 },
  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
};

function prettyDate(iso) {
  if (!iso) return null;
  try {
    return new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function DateChecker() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [eventType, setEventType] = useState(null);
  const [date, setDate] = useState('');
  const [flexible, setFlexible] = useState(false);

  useEffect(
    () =>
      onBus(EVENTS.DATECHECKER, (e) => {
        setStep(0);
        setEventType(null);
        setDate('');
        setFlexible(false);
        setOpen(true);
        track('datechecker_open', { source: e.detail?.source });
      }),
    []
  );

  // Small celebration when the visitor reaches the "you're on!" step.
  useEffect(() => {
    if (open && step === 2) {
      confettiBurst({ count: 70, duration: 1400 });
      track('datechecker_done', { eventType, hasDate: Boolean(date) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, open]);

  const close = () => setOpen(false);

  const pickOccasion = (t) => {
    tap();
    setEventType(t);
    setStep(1);
  };

  const confirmDate = (flex) => {
    tap();
    setFlexible(flex);
    setStep(2);
  };

  const dateLabel = flexible ? 'a date you’ll fix soon' : prettyDate(date);
  const waMessage = `Hi Men in Cam! I'm planning a ${eventType ?? 'shoot'} ${
    flexible || !date ? '(date not fixed yet)' : `on ${prettyDate(date)}`
  }. Are you free to cover it?`;
  const waHref = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

  const today = new Date().toISOString().slice(0, 10);

  return (
    <BottomSheet open={open} onClose={close} label="Check your date">
      <div className="pb-2 pt-1">
        {/* Header: back + progress dots + close */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => (step === 0 ? close() : setStep((s) => s - 1))}
            aria-label={step === 0 ? 'Close' : 'Go back'}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-ivory"
          >
            {step === 0 ? '✕' : '←'}
          </button>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? 'w-6 bg-gold' : 'w-1.5 bg-line'
                }`}
              />
            ))}
          </div>
          <span className="w-9" aria-hidden="true" />
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="s0" {...slide}>
              <h2 className="mt-5 font-serif text-2xl text-ivory">What are we shooting?</h2>
              <p className="mt-1 text-sm text-muted">Pick the occasion. It takes 10 seconds.</p>
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {eventTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => pickOccasion(t)}
                    className="flex items-center gap-2.5 rounded-2xl border border-line bg-ink/40 px-3.5 py-3.5 text-left text-sm font-medium text-ivory transition-all duration-200 ease-snap hover:border-gold/50 active:scale-[0.97]"
                  >
                    <span className="text-xl" aria-hidden="true">
                      {OCCASION_EMOJI[t] ?? '✨'}
                    </span>
                    {t}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="s1" {...slide}>
              <h2 className="mt-5 font-serif text-2xl text-ivory">
                When’s the {eventType?.toLowerCase().split(' / ')[0] ?? 'event'}?
              </h2>
              <p className="mt-1 text-sm text-muted">We’ll check the calendar for you.</p>
              <input
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                aria-label="Event date"
                className="mt-5 w-full rounded-2xl border border-line bg-ink/40 px-4 py-4 text-lg text-ivory focus:border-gold focus-visible:ring-0"
              />
              <div className="mt-4 flex flex-col gap-2.5">
                <Button size="lg" disabled={!date} onClick={() => confirmDate(false)} className="w-full">
                  Check this date <ArrowIcon />
                </Button>
                <button
                  type="button"
                  onClick={() => confirmDate(true)}
                  className="py-2 text-sm font-medium text-muted transition-colors hover:text-gold"
                >
                  Date not fixed yet? That’s fine →
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" {...slide} className="pb-1 text-center">
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 14, stiffness: 260, delay: 0.05 }}
                className="mx-auto mt-6 grid h-16 w-16 place-items-center rounded-full bg-teal/15 text-teal"
              >
                <Icon name="check" className="h-8 w-8" />
              </motion.span>
              <h2 className="mt-4 font-serif text-2xl text-ivory">Great news, we’re taking bookings.</h2>
              <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
                {eventType} · {dateLabel}. Say hi and we’ll confirm your slot.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-teal/40 bg-teal/10 px-3.5 py-1.5 text-xs font-semibold text-teal">
                ⚡ We reply within 2 hours, 8 AM - 8 PM
              </span>
              <div className="mt-5 flex flex-col gap-2.5">
                <Button
                  href={waHref}
                  variant="whatsapp"
                  size="lg"
                  className="w-full"
                  onClick={() => track('whatsapp_click', { source: 'datechecker' })}
                >
                  <Icon name="whatsapp" filled className="h-5 w-5" /> Lock it in on WhatsApp
                </Button>
                <Button to="/contact" variant="outline" onClick={close} className="w-full">
                  Send a full enquiry instead
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BottomSheet>
  );
}
