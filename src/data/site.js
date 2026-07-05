// ─────────────────────────────────────────────────────────────────────────────
// Men in Cam — central site configuration.
// EDIT THIS FILE to update brand details, contact info, and navigation.
// Everything below is PLACEHOLDER content — replace with real Men in Cam data.
// ─────────────────────────────────────────────────────────────────────────────

export const brand = {
  name: 'Men in Cam',
  // Primary tagline + 2 alternatives (swap `tagline` to switch).
  tagline: 'The squad that shows up and nails the shot.',
  taglineAlternatives: [
    'Big day or small party — we bring the cameras.',
    'Tap. Book. We handle the rest.',
  ],
  // [CITY / BASE] — your main city for SEO and the "based in" line.
  city: 'Chennai',
  region: 'Tamil Nadu',
  country: 'India',
  baseLine: 'Photo & video for every event · Based in Chennai',
  foundersNote: 'The Men in Cam crew',
};

export const contact = {
  // TODO: replace with the real Men in Cam numbers / addresses.
  phoneDisplay: '+91 98765 43210',
  phoneE164: '+919876543210',
  // WhatsApp number in international format WITHOUT the leading "+" or spaces.
  whatsappNumber: '919876543210',
  whatsappPrefill:
    'Hi Men in Cam! I want to book photos/video for my event. Can you check if you are free?',
  email: 'hello@menincam.example.com',
  addressLines: ['Men in Cam Studio', '12 Cathedral Road', 'Chennai 600086, Tamil Nadu'],
  // Paste your own Google Maps "embed" src here (Maps → Share → Embed a map).
  mapEmbedSrc:
    'https://www.google.com/maps?q=Chennai%2C%20Tamil%20Nadu&output=embed',
  hours: 'Mon–Sat · 10:00 AM – 7:00 PM',
};

export const social = {
  // TODO: replace with real handles/links.
  instagram: 'https://instagram.com/',
  instagramHandle: '@menincam',
  youtube: 'https://youtube.com/',
  facebook: 'https://facebook.com/',
  pinterest: 'https://pinterest.com/',
};

// Primary navigation — order matters; rendered in the navbar + footer.
// NOTE: Portfolio / Films / Reviews / Journal live on Instagram for now. The
// website is focused on enquiries; those pages can be added back in a later phase.
export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'What We Cover', to: '/services' },
  { label: 'Packages', to: '/packages' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

// EmailJS keys are read from environment variables (see .env.example).
// Fallback strings are obvious PLACEHOLDERS so the form gracefully degrades to
// the WhatsApp deep-link if keys aren't configured yet.
export const emailjs = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'SERVICE_ID_PLACEHOLDER',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'TEMPLATE_ID_PLACEHOLDER',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'PUBLIC_KEY_PLACEHOLDER',
};

// Helper: build a WhatsApp deep link with a pre-filled message.
export function whatsappLink(message = contact.whatsappPrefill) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
