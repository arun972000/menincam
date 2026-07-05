/**
 * Conversion event tracking. Pushes to GTM's dataLayer and/or gtag when they
 * exist (add the GA4/GTM snippet in index.html to activate), logs in dev, and
 * never throws — analytics must never break the site.
 *
 * Events used across the site:
 *   enquiry_submitted { method }   — inquiry form success (emailjs | whatsapp)
 *   enquiry_error                  — inquiry form send failure
 *   whatsapp_click   { source }    — any WhatsApp deep-link tap
 *   datechecker_open { source }    — "Check your date" flow opened
 *   datechecker_done { eventType, hasDate } — flow reached the result step
 */
export function track(event, props = {}) {
  try {
    if (window.dataLayer) window.dataLayer.push({ event, ...props });
    if (window.gtag) window.gtag('event', event, props);
    if (import.meta.env.DEV) console.debug('[track]', event, props);
  } catch {
    /* no-op */
  }
}
