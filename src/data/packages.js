// Simple packages for ANY event, with NO prices shown. The page is built to
// get an enquiry (send details, get a quote), not to reveal numbers people
// bounce on.

export const collections = [
  {
    id: 'basic',
    name: 'Basic',
    bestFor: 'Small events & single functions',
    ribbon: null,
    highlighted: false,
    blurb: 'Everything you need for a smaller celebration.',
    features: [
      'Up to 6 hours of coverage',
      '1 photographer',
      'Edited photos online',
      'Quick preview in a few days',
      'Easy to share with family',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    bestFor: 'Most events. The popular choice',
    ribbon: 'Most picked',
    highlighted: true,
    blurb: 'Photos and video, fully covered, start to finish.',
    features: [
      'Full event coverage',
      'Photographer + videographer',
      'Edited photos + highlight video',
      'Short teaser clip',
      'Online gallery to share',
      'Faster delivery',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    bestFor: 'Big or multi-day events',
    ribbon: 'All-in',
    highlighted: false,
    blurb: 'The full works for a big celebration.',
    features: [
      'Multiple days / functions',
      'Full photo + video team',
      'Drone / aerial shots',
      'Teaser + full highlight film',
      'Printed photo album',
      'Priority editing & support',
    ],
  },
];

// Reasons to enquire instead of seeing a price: builds trust, lowers worry.
export const quoteAssurances = [
  { icon: 'check', label: 'A clear quote with everything listed out' },
  { icon: 'check', label: 'Made to fit your event and your budget' },
  { icon: 'check', label: 'No hidden charges and no pushy calls' },
  { icon: 'check', label: 'Easy payment to lock your date' },
];

export const quoteCta = {
  eyebrow: 'Your price',
  title: 'Every event is different, and so is every quote.',
  body: 'Instead of fixed price lists, we make a quote that fits your event. Tell us your date and what you are planning, and we will send a simple price within 24 hours.',
};

// ── Custom package builder ───────────────────────────────────────────────────
// Visitors pick exactly what they want, then send the list for a quote.
export const builderGroups = [
  {
    id: 'photo',
    label: 'Photography',
    items: [
      { id: 'candid-photo', emoji: '📷', label: 'Candid photography', desc: 'Natural, unposed moments as they happen', popular: true },
      { id: 'trad-photo', emoji: '🖼️', label: 'Traditional photography', desc: 'Classic posed portraits and family groups' },
      { id: 'second-shooter', emoji: '👥', label: 'Second photographer', desc: 'Two angles, so nothing gets missed' },
      { id: 'pre-event', emoji: '💞', label: 'Pre-event shoot', desc: 'A relaxed shoot before the big day' },
    ],
  },
  {
    id: 'video',
    label: 'Video',
    items: [
      { id: 'highlight-film', emoji: '🎬', label: 'Cinematic highlight film', desc: 'A short film of your best moments', popular: true },
      { id: 'full-video', emoji: '📼', label: 'Full-length video', desc: 'The complete event, start to finish' },
      { id: 'teaser', emoji: '⚡', label: '60-second teaser', desc: 'A quick reel for Instagram, ready fast' },
      { id: 'live-stream', emoji: '📡', label: 'Live streaming', desc: 'Family far away? They watch it live' },
    ],
  },
  {
    id: 'extras',
    label: 'Extras',
    items: [
      { id: 'drone', emoji: '🚁', label: 'Drone coverage', desc: 'Aerial views of the venue and crowd' },
      { id: 'album', emoji: '📖', label: 'Printed album', desc: 'A premium photo book to keep' },
      { id: 'same-day-edit', emoji: '🌙', label: 'Same-day edit', desc: 'A montage screened at the event itself' },
      { id: 'prints', emoji: '🪞', label: 'Framed prints', desc: 'Your favourite shots, ready to hang' },
    ],
  },
];

export const builderDurations = [
  { id: 'half-day', label: 'Half day', hint: 'up to 4 hours' },
  { id: 'full-day', label: 'Full day', hint: 'up to 8 hours' },
  { id: 'multi-day', label: 'Multiple days', hint: '2 or more functions' },
];

// Which builder items each ready-made collection maps to. Used by the
// "Start with…" buttons on the package cards to pre-fill the builder.
export const collectionPresets = {
  basic: ['candid-photo'],
  standard: ['candid-photo', 'highlight-film', 'teaser'],
  premium: ['candid-photo', 'trad-photo', 'highlight-film', 'full-video', 'drone', 'album'],
};
