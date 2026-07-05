import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button, { ArrowIcon } from '../ui/Button';
import Icon from '../ui/Icon';
import { contact } from '../../data/site';
import { builderGroups, builderDurations } from '../../data/packages';
import { eventTypes } from '../../data/press';
import { sendEnquiry } from '../../lib/mail';
import { track } from '../../lib/track';
import { tap } from '../../lib/haptics';
import { confettiBurst } from '../../lib/confetti';

/**
 * Build-your-own package. Visitors add, change or remove exactly what they
 * want (photo, video, extras, duration), watch their package take shape live,
 * then send it straight to the studio inbox for a quote. WhatsApp is offered
 * as a separate, explicit option with the same list pre-filled.
 *
 * The ready-made package cards can pre-fill this builder: they dispatch a
 * "mic:builder-preset" window event with the item ids to select.
 */

const ALL_ITEMS = builderGroups.flatMap((g) => g.items);
const DEFAULT_SELECTED = ALL_ITEMS.filter((i) => i.popular).map((i) => i.id);

export default function PackageBuilder() {
  const [selected, setSelected] = useState(() => new Set(DEFAULT_SELECTED));
  const [duration, setDuration] = useState('full-day');
  const [eventType, setEventType] = useState(eventTypes[0]);
  const [eventDate, setEventDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  // Ready-made cards pre-fill the builder through this event.
  useEffect(() => {
    const onPreset = (e) => {
      const ids = e.detail?.ids;
      if (Array.isArray(ids)) {
        setSelected(new Set(ids));
        tap();
      }
    };
    window.addEventListener('mic:builder-preset', onPreset);
    return () => window.removeEventListener('mic:builder-preset', onPreset);
  }, []);

  const toggle = (id) => {
    tap();
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    if (status === 'success') setStatus('idle');
  };

  const chosenItems = ALL_ITEMS.filter((i) => selected.has(i.id));
  const durationLabel = builderDurations.find((d) => d.id === duration)?.label ?? duration;

  const summaryLines = useMemo(
    () => [
      `Event: ${eventType}`,
      eventDate && `Date: ${eventDate}`,
      `Duration: ${durationLabel}`,
      `Coverage: ${chosenItems.map((i) => i.label).join(', ') || 'nothing picked yet'}`,
    ].filter(Boolean),
    [eventType, eventDate, durationLabel, chosenItems]
  );

  const whatsappHref = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
    ['Hi Men in Cam! I built my own package on your site. Can you send me a quote?', ...summaryLines, name && `Name: ${name}`]
      .filter(Boolean)
      .join('\n')
  )}`;

  const canSend = chosenItems.length > 0 && name.trim() && phone.trim();

  const submit = async (e) => {
    e.preventDefault();
    if (!canSend || status === 'sending') return;
    setStatus('sending');
    try {
      const result = await sendEnquiry(
        {
          from_name: name,
          phone,
          event_type: eventType,
          event_date: eventDate || 'not fixed yet',
          duration: durationLabel,
          package_items: chosenItems.map((i) => i.label).join(', '),
          message: 'Custom package built on the Packages page.',
        },
        { subject: `Custom package quote request from ${name}` }
      );
      setStatus('success');
      confettiBurst({ count: 80, duration: 1400 });
      track('package_builder_quote', { method: result.via, items: chosenItems.length });
    } catch (err) {
      console.error('Package builder send failed:', err);
      setStatus('error');
      track('enquiry_error', { source: 'package_builder' });
    }
  };

  const field =
    'w-full rounded-xl border border-line bg-ink/40 px-4 py-3 text-sm text-ivory placeholder-muted/70 focus:border-gold focus-visible:ring-0';

  return (
    <section id="build" className="scroll-mt-24 border-t border-line/60 py-20">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">
            <span className="rule-gold" /> Build your own
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-ivory sm:text-4xl">
            Make a package that fits you exactly
          </h2>
          <p className="mt-4 text-muted">
            Tap to add or remove anything. Your package updates live, and when it looks right,
            send it over. We reply with a clear price within 24 hours.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* ── Pick your coverage ── */}
          <div className="space-y-8 lg:col-span-3">
            {builderGroups.map((g) => (
              <div key={g.id}>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest2 text-muted">
                  {g.label}
                </h3>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {g.items.map((item) => {
                    const on = selected.has(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggle(item.id)}
                        aria-pressed={on}
                        className={`group flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ease-snap active:scale-[0.98] ${
                          on
                            ? 'border-gold/60 bg-gold/10 shadow-glow'
                            : 'border-line bg-surface/40 hover:border-gold/40'
                        }`}
                      >
                        <span className="text-xl" aria-hidden="true">
                          {item.emoji}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2 text-sm font-semibold text-ivory">
                            {item.label}
                            {item.popular && !on && (
                              <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-semibold text-teal">
                                Popular
                              </span>
                            )}
                          </span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-muted">{item.desc}</span>
                        </span>
                        <span
                          aria-hidden="true"
                          className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs transition-all duration-200 ${
                            on ? 'border-gold bg-gold text-white' : 'border-line text-muted group-hover:border-gold/50'
                          }`}
                        >
                          {on ? '✓' : '+'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Duration */}
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest2 text-muted">
                How long do you need us?
              </h3>
              <div className="grid grid-cols-3 gap-2.5">
                {builderDurations.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      tap();
                      setDuration(d.id);
                    }}
                    aria-pressed={duration === d.id}
                    className={`rounded-2xl border px-3 py-3 text-center transition-all duration-200 ease-snap active:scale-[0.98] ${
                      duration === d.id
                        ? 'border-gold/60 bg-gold/10'
                        : 'border-line bg-surface/40 hover:border-gold/40'
                    }`}
                  >
                    <span className="block text-sm font-semibold text-ivory">{d.label}</span>
                    <span className="mt-0.5 block text-[11px] text-muted">{d.hint}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Your package, live ── */}
          <div className="lg:col-span-2">
            <div className="panel sticky top-24 p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-ivory">Your package</h3>
                <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                  {chosenItems.length} {chosenItems.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              <ul className="mt-4 min-h-[3rem] space-y-2">
                <AnimatePresence initial={false}>
                  {chosenItems.length === 0 && (
                    <motion.li
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-muted"
                    >
                      Nothing picked yet. Tap a few options on the left to start.
                    </motion.li>
                  )}
                  {chosenItems.map((i) => (
                    <motion.li
                      key={i.id}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.18 }}
                      className="flex items-center justify-between gap-2 rounded-xl border border-line/60 bg-ink/30 px-3 py-2"
                    >
                      <span className="flex min-w-0 items-center gap-2 text-sm text-ivory">
                        <span aria-hidden="true">{i.emoji}</span>
                        <span className="truncate">{i.label}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => toggle(i.id)}
                        aria-label={`Remove ${i.label}`}
                        className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-muted transition-colors hover:text-gold"
                      >
                        ✕
                      </button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              <p className="mt-3 border-t border-line/50 pt-3 text-xs text-muted">
                {eventType} · {durationLabel}
                {eventDate ? ` · ${eventDate}` : ''}
              </p>

              {status === 'success' ? (
                <div className="mt-5 rounded-2xl border border-teal/40 bg-teal/10 p-4 text-center">
                  <p className="text-sm font-semibold text-ivory">Sent! Your package is in our inbox.</p>
                  <p className="mt-1 text-xs text-muted">
                    We will reply to {phone} with a clear price within 24 hours.
                  </p>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => track('whatsapp_click', { source: 'package_builder' })}
                    className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-teal hover:underline"
                  >
                    <Icon name="whatsapp" filled className="h-4 w-4" /> Want it faster? Ping us on WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-5 space-y-2.5">
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <select
                      aria-label="Event type"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className={field}
                    >
                      {eventTypes.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                    <input
                      type="date"
                      aria-label="Event date (optional)"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className={field}
                    />
                  </div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name *"
                    autoComplete="name"
                    required
                    className={field}
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone / WhatsApp *"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    className={field}
                  />

                  {status === 'error' && (
                    <p className="text-xs font-medium text-gold">
                      That didn't send. Please try again, or use the WhatsApp button below.
                    </p>
                  )}

                  <Button type="submit" className="w-full" disabled={!canSend || status === 'sending'}>
                    {status === 'sending' ? 'Sending your package…' : 'Email me a quote'} <ArrowIcon />
                  </Button>
                  <Button
                    href={whatsappHref}
                    variant="whatsapp"
                    className="w-full"
                    onClick={() => track('whatsapp_click', { source: 'package_builder' })}
                  >
                    <Icon name="whatsapp" filled className="h-5 w-5" /> Send it on WhatsApp instead
                  </Button>
                  <p className="pt-1 text-center text-[11px] text-muted">
                    Goes straight to {contact.email}. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
