// ─────────────────────────────────────────────────────────────────────────────
// Men in Cam: central site configuration.
// EDIT THIS FILE to update brand details, contact info, and navigation.
// Everything below is PLACEHOLDER content, replace with real Men in Cam data.
// ─────────────────────────────────────────────────────────────────────────────

export const brand = {
  name: 'Men in Cam',
  // Primary tagline + 2 alternatives (swap `tagline` to switch).
  tagline: 'The squad that shows up and nails the shot.',
  taglineAlternatives: [
    'Big day or small party, we bring the cameras.',
    'Tap. Book. We handle the rest.',
  ],
  // [CITY / BASE]: your main city for SEO and the "based in" line.
  city: 'Chennai',
  region: 'Tamil Nadu',
  country: 'India',
  baseLine: 'Photo & video for every event · Based in Chennai',
  foundersNote: 'The Men in Cam crew',
};

export const contact = {
  // The two founders: both personally handle every business enquiry.
  // `avatar` picks the animated character variant (see ui/AvatarCharacter).
  people: [
    {
      id: 'shakthi',
      name: 'Shakthi Kumar S',
      role: 'Co-Founder & CEO',
      bio: 'Shakthi looks after bookings, budgets and the big picture. Call him and your date is as good as planned.',
      phoneDisplay: '+91 70105 33561',
      phoneE164: '+917010533561',
      whatsapp: '917010533561',
      avatar: 'a',
    },
    {
      id: 'arun',
      name: 'Arun Pandian M',
      role: 'Co-Founder & CEO',
      bio: 'Arun handles enquiries, crews and delivery. Message him anytime and he’ll sort your event end to end.',
      phoneDisplay: '+91 74492 05596',
      phoneE164: '+917449205596',
      whatsapp: '917449205596',
      avatar: 'b',
    },
  ],
  // Primary line (first founder), used wherever only one number fits.
  phoneDisplay: '+91 70105 33561',
  phoneE164: '+917010533561',
  // WhatsApp number in international format WITHOUT the leading "+" or spaces.
  whatsappNumber: '917010533561',
  whatsappPrefill:
    'Hi Men in Cam! I want to book photos/video for my event. Can you check if you are free?',
  email: 'studio@menincam.in',
  // No street address or map by request: we come to you, city base only.
  hours: 'Mon-Sun · 8 AM - 8 PM',
};

export const social = {
  // TODO: replace remaining handles/links with the real ones.
  instagram: 'https://instagram.com/menincam',
  instagramHandle: '@menincam',
  youtube: 'https://youtube.com/',
  facebook: 'https://facebook.com/',
  pinterest: 'https://pinterest.com/',
};

// Primary navigation: order matters; rendered in the navbar + footer.
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
