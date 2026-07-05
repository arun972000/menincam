import { contact, emailjs as emailjsCfg } from '../data/site';

/**
 * Direct email delivery for enquiry and quote forms. Nothing here opens a
 * mail client or redirects the visitor: the message is sent in the background
 * and lands in the studio inbox.
 *
 * Two transports, tried in this order:
 * 1. EmailJS, when real keys are configured in .env (see .env.example).
 * 2. FormSubmit.co AJAX (free, no account needed): POSTs the fields to
 *    https://formsubmit.co/ajax/<inbox>. NOTE: the very first submission
 *    triggers a one-time activation email to studio@menincam.in. Click the
 *    link in it once and every later submission arrives normally.
 */

const keysConfigured =
  !emailjsCfg.serviceId.includes('PLACEHOLDER') &&
  !emailjsCfg.templateId.includes('PLACEHOLDER') &&
  !emailjsCfg.publicKey.includes('PLACEHOLDER');

export async function sendEnquiry(fields, { subject = 'New enquiry from the Men in Cam website' } = {}) {
  if (keysConfigured) {
    // Lazy import keeps EmailJS out of the bundle until a form is submitted.
    const { default: emailjs } = await import('@emailjs/browser');
    await emailjs.send(emailjsCfg.serviceId, emailjsCfg.templateId, fields, {
      publicKey: emailjsCfg.publicKey,
    });
    return { via: 'emailjs' };
  }

  const res = await fetch(`https://formsubmit.co/ajax/${contact.email}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
      ...fields,
    }),
  });
  if (!res.ok) throw new Error(`FormSubmit responded ${res.status}`);
  const data = await res.json();
  if (String(data.success) !== 'true') throw new Error(data.message || 'FormSubmit rejected the message');
  return { via: 'formsubmit' };
}
