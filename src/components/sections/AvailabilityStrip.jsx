import Reveal from '../ui/Reveal';
import Button, { ArrowIcon } from '../ui/Button';
import { openDateChecker } from '../../lib/bus';

/**
 * Honest urgency band — no fabricated counts or fake calendars. Weekends
 * genuinely book first in this business; the CTA feeds the Date Checker, which
 * answers in seconds.
 */
export default function AvailabilityStrip() {
  const month = new Date().toLocaleString('en', { month: 'long' });

  return (
    <section className="py-6">
      <Reveal className="container-x">
        <div className="flex flex-col items-start justify-between gap-5 rounded-bento border border-gold/25 bg-gradient-to-r from-gold/10 via-surface to-surface p-6 sm:p-7 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <span className="relative mt-1.5 grid h-3 w-3 shrink-0 place-items-center" aria-hidden="true">
              <span className="absolute h-3 w-3 animate-ping rounded-full bg-gold/50" />
              <span className="h-2.5 w-2.5 rounded-full bg-gold" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-ivory sm:text-xl">
                Planning something in {month}? Weekends go first.
              </p>
              <p className="mt-1 text-sm text-muted">
                Tell us your date — it takes about 10 seconds, and we’ll confirm right on WhatsApp.
              </p>
            </div>
          </div>
          <Button onClick={() => openDateChecker('availability_strip')} className="shrink-0">
            Check your date <ArrowIcon />
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
