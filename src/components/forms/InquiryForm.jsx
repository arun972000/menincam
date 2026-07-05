import { useEffect, useMemo, useState } from 'react';
import Button, { ArrowIcon } from '../ui/Button';
import Icon from '../ui/Icon';
import { contact } from '../../data/site';
import { eventTypes, budgetRanges } from '../../data/press';
import { sendEnquiry } from '../../lib/mail';
import { confettiBurst } from '../../lib/confetti';
import { track } from '../../lib/track';

/**
 * Low-friction inquiry form. Submitting ALWAYS emails the studio inbox
 * directly (EmailJS when keys are configured, FormSubmit.co otherwise; see
 * src/lib/mail.js). Nothing redirects the visitor anywhere. WhatsApp is a
 * separate, clearly-labelled button for people who prefer to chat.
 */

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  eventType: eventTypes[0],
  eventDate: '',
  city: '',
  budget: budgetRanges[0],
  message: '',
};

export default function InquiryForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // A booked enquiry is worth celebrating: confetti on success (no-ops for
  // reduced-motion / Calm-mode users).
  useEffect(() => {
    if (status === 'success') confettiBurst();
  }, [status]);

  // Compose a tidy WhatsApp message from the current field values.
  const whatsappHref = useMemo(() => {
    const lines = [
      'Hi Men in Cam! I’d like to enquire about photo/video for my event.',
      form.name && `Name: ${form.name}`,
      form.phone && `Phone: ${form.phone}`,
      form.eventType && `Event: ${form.eventType}`,
      form.eventDate && `Date: ${form.eventDate}`,
      form.city && `City/Venue: ${form.city}`,
      form.budget && `Budget: ${form.budget}`,
      form.message && `Note: ${form.message}`,
    ].filter(Boolean);
    return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
  }, [form]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    try {
      setStatus('sending');
      const result = await sendEnquiry(
        {
          from_name: form.name,
          phone: form.phone,
          email: form.email,
          event_type: form.eventType,
          event_date: form.eventDate,
          city: form.city,
          budget: form.budget,
          message: form.message,
        },
        { subject: `New enquiry from ${form.name} (${form.eventType})` }
      );
      setStatus('success');
      setForm(EMPTY);
      track('enquiry_submitted', { method: result.via });
    } catch (err) {
      console.error('Enquiry send failed:', err);
      setStatus('error');
      track('enquiry_error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-gold/40 bg-surface/60 p-10 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-gold">
          <Icon name="check" className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-serif text-2xl text-ivory">Thank you. We have your details.</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Your enquiry is in our inbox at {contact.email}. One of us will reach out within 24
          hours to check availability for your date. For anything urgent, message us on WhatsApp.
        </p>
        <div className="mt-6 flex justify-center">
          <Button
            href={whatsappHref}
            variant="outline"
            onClick={() => track('whatsapp_click', { source: 'inquiry_success' })}
          >
            <Icon name="whatsapp" filled className="h-5 w-5" /> Continue on WhatsApp
          </Button>
        </div>
      </div>
    );
  }

  const field =
    'w-full rounded-lg border border-line bg-surface px-4 py-3 text-ivory placeholder-muted/70 shadow-sm transition-colors duration-300 focus:border-gold focus-visible:ring-0';
  const label = 'mb-1.5 block text-xs uppercase tracking-widest2 text-muted';

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-line/60 bg-surface/40 p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Your name *</label>
          <input id="name" name="name" value={form.name} onChange={update} required className={field} placeholder="Your name" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="phone" className={label}>Phone / WhatsApp *</label>
          <input id="phone" name="phone" value={form.phone} onChange={update} required className={field} placeholder="+91 ..." inputMode="tel" autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={update} className={field} placeholder="you@email.com" autoComplete="email" />
        </div>
        <div>
          <label htmlFor="eventType" className={label}>Event type *</label>
          <select id="eventType" name="eventType" value={form.eventType} onChange={update} className={field}>
            {eventTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="eventDate" className={label}>Event date</label>
          <input id="eventDate" name="eventDate" type="date" value={form.eventDate} onChange={update} className={field} />
        </div>
        <div>
          <label htmlFor="city" className={label}>City / Venue</label>
          <input id="city" name="city" value={form.city} onChange={update} className={field} placeholder="Chennai / venue name" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="budget" className={label}>Budget comfort (optional)</label>
          <select id="budget" name="budget" value={form.budget} onChange={update} className={field}>
            {budgetRanges.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={label}>Tell us about your event</label>
          <textarea id="message" name="message" value={form.message} onChange={update} rows={4} className={field} placeholder="What’s the event, how many hours, anything special you need…" />
        </div>
      </div>

      {status === 'error' && (
        <p className="mt-4 text-sm font-medium text-gold">
          Something went wrong sending your enquiry. Please try again, or message us on WhatsApp below.
        </p>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Button type="submit" size="lg" className="sm:flex-1" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send enquiry'} <ArrowIcon />
        </Button>
        <Button
          href={whatsappHref}
          variant="outline"
          size="lg"
          className="sm:flex-1"
          onClick={() => track('whatsapp_click', { source: 'inquiry_form' })}
        >
          <Icon name="whatsapp" filled className="h-5 w-5" /> Prefer WhatsApp? Chat now
        </Button>
      </div>
      <p className="mt-4 text-center text-xs text-muted">
        Your enquiry goes straight to {contact.email}. We typically reply within 24 hours, and your
        details are only used to respond to you.
      </p>
    </form>
  );
}
