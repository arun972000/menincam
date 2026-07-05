// Simple packages for ANY event — NO prices shown. The page is built to get an
// enquiry (send details → get a quote), not to reveal numbers people bounce on.

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
    bestFor: 'Most events — the popular choice',
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

// Reasons to enquire instead of seeing a price — builds trust, lowers worry.
export const quoteAssurances = [
  { icon: 'check', label: 'A clear quote with everything listed out' },
  { icon: 'check', label: 'Made to fit your event and your budget' },
  { icon: 'check', label: 'No hidden charges and no pushy calls' },
  { icon: 'check', label: 'Easy payment to lock your date' },
];

export const quoteCta = {
  eyebrow: 'Your price',
  title: 'Every event is different — so is every quote.',
  body: 'Instead of fixed price lists, we make a quote that fits your event. Tell us your date and what you are planning, and we will send a simple price within 24 hours.',
};
