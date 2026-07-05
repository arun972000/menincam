// What we cover — ALL kinds of events, not just weddings. Simple, plain-English
// copy so anyone can understand it at a glance.
// TODO: replace images with real Men in Cam photos.

export const services = [
  {
    id: 'weddings',
    icon: 'rings',
    title: 'Weddings',
    short: 'Your big day, captured fully — from the morning rituals to the last dance.',
    story:
      'We cover the whole wedding without getting in the way. You enjoy the day; we take care of the photos and video. You get natural, happy pictures you will love to look back on.',
    included: ['Full-day coverage', 'Photos + video', 'Quick preview in 2–3 days', 'Edited photos online', 'Easy to share with family'],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=70',
    alt: 'Couple at their wedding ceremony',
  },
  {
    id: 'birthday-parties',
    icon: 'sparkles',
    title: 'Birthdays & Parties',
    short: 'Birthdays, anniversaries and house parties — all the fun, nicely captured.',
    story:
      'From a first birthday to a big anniversary, we capture the cake, the smiles and the little moments in between. Fun, relaxed and never boring.',
    included: ['Photos + video', 'Candid & group shots', 'Cake and decor close-ups', 'Edited photos online', 'Same-week delivery'],
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=70',
    alt: 'Birthday party celebration with balloons',
  },
  {
    id: 'corporate-events',
    icon: 'briefcase',
    title: 'Corporate Events',
    short: 'Conferences, launches, award nights and team days — done professionally.',
    story:
      'We cover your company events cleanly and on time. Stage moments, speakers, guests and team photos — ready quickly when you need them.',
    included: ['Multi-camera coverage', 'Stage & speaker shots', 'Group & team photos', 'Fast turnaround', 'Photos + video'],
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=70',
    alt: 'Speaker on stage at a corporate event',
  },
  {
    id: 'engagement-reception',
    icon: 'heart',
    title: 'Engagement & Reception',
    short: 'The ring, the stage and the celebration — captured start to finish.',
    story:
      'Grand entries, stage moments, family photos and the party after. We cover it all so you can simply enjoy your evening.',
    included: ['Stage & decor shots', 'Family & couple photos', 'Party coverage', 'Photos + video', 'Quick preview'],
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=70',
    alt: 'Couple on a beautifully lit reception stage',
  },
  {
    id: 'baby-maternity',
    icon: 'baby',
    title: 'Baby Shower & Maternity',
    short: 'Soft, warm photos for the start of a new chapter.',
    story:
      'Maternity portraits, baby showers and newborn shoots — gentle, calm and full of love. In our studio or at your home.',
    included: ['Studio or at-home shoot', 'Soft, natural editing', 'Family photos included', 'Edited photos online', 'Gentle, relaxed pace'],
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=900&q=70',
    alt: 'Soft-light maternity portrait',
  },
  {
    id: 'video-films',
    icon: 'film',
    title: 'Video & Films',
    short: 'Short, lovely videos of your event — made to watch again and again.',
    story:
      'We make a short highlight video of your event, set to music. A quick teaser first, then the full film. Great for sharing with people who could not be there.',
    included: ['Highlight video', 'Short teaser clip', 'Background music', 'Ready to share online', 'HD quality'],
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=70',
    alt: 'Videographer filming an event',
  },
  {
    id: 'pre-wedding',
    icon: 'camera',
    title: 'Pre-Wedding & Couple Shoots',
    short: 'A fun, relaxed shoot for just the two of you, somewhere nice.',
    story:
      'Pick a spot you love and we will plan the shoot around the best light. No rush, no stiff poses — just the two of you, looking great.',
    included: ['Location help & planning', 'Up to 4 hours', 'One outfit change', 'Edited photos', 'Optional short reel'],
    image: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=900&q=70',
    alt: 'Couple at a golden-hour pre-wedding shoot',
  },
  {
    id: 'concerts-stage',
    icon: 'play',
    title: 'Concerts & Stage Shows',
    short: 'Live shows, cultural programs and stage events — captured with energy.',
    story:
      'Dance shows, music nights, school and college events — we capture the performance and the crowd so the night is never forgotten.',
    included: ['Stage & crowd shots', 'Photos + video', 'Low-light ready', 'Fast highlights', 'Multiple angles'],
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=70',
    alt: 'Performer on stage at a live show',
  },
  {
    id: 'drone-aerial',
    icon: 'drone',
    title: 'Drone & Aerial',
    short: 'Big, wide shots from above — for any event that needs the grand view.',
    story:
      'Add drone shots to any event for that wow factor — wide views of the venue, the crowd and the celebration from the sky.',
    included: ['Licensed drone pilots', 'Aerial photos & 4K video', 'Venue permission help', 'Blends into your video', 'Add-on to any package'],
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=900&q=70',
    alt: 'Aerial drone view of a venue at sunset',
  },
];

// A trimmed list for the Home "What we cover" cards (first six).
export const servicesOverview = services.slice(0, 6).map((s) => ({
  id: s.id,
  icon: s.icon,
  title: s.title,
  short: s.short,
  image: s.image,
  alt: s.alt,
}));
