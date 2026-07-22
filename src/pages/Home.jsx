import Seo from '../components/Seo';
import Hero from '../components/sections/Hero';
import TrustBar from '../components/sections/TrustBar';
import Marquee from '../components/sections/Marquee';
import FilmStrip from '../components/sections/FilmStrip';
import ServicesOverview from '../components/sections/ServicesOverview';
import WhyUs from '../components/sections/WhyUs';
import FocusSlider from '../components/sections/FocusSlider';
import Approach from '../components/sections/Approach';
import Process from '../components/sections/Process';
import AvailabilityStrip from '../components/sections/AvailabilityStrip';
import PressWall from '../components/sections/PressWall';
import InstagramStrip from '../components/sections/InstagramStrip';
import HomeFAQ from '../components/sections/HomeFAQ';
import CTABand from '../components/sections/CTABand';
import { brand, contact } from '../data/site';
import { faqs } from '../data/faqs';
import { servicesOverview } from '../data/services';

// Structured data for rich search results: FAQ accordion (can win the FAQ
// snippet on Google) + the service catalogue + reviews (star rating in search
// results). Module-level constant so the object is stable across renders.
const HOME_JSONLD = [
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${brand.name}: event photography & videography services`,
    itemListElement: servicesOverview.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        description: s.short,
        provider: { '@type': 'LocalBusiness', name: brand.name, telephone: contact.phoneE164 },
        areaServed: `${brand.city}, India`,
      },
    })),
  },
  // NOTE: no review/AggregateRating markup on purpose — the studio doesn't
  // have enough real reviews yet, and fabricated review markup risks a Google
  // penalty. Add it back only with genuine numbers.
];

export default function Home() {
  return (
    <>
      <Seo
        title="Photo & Video for Every Event"
        description={`${brand.name}: event photographers & videographers in ${brand.city}. Weddings, birthday parties, engagements, baby showers, corporate events, concerts & drone coverage across Tamil Nadu. Send your date for a quick quote. Open 8 AM-8 PM, every day.`}
        keywords={`event photographers ${brand.city}, wedding photography ${brand.city}, birthday party photographer, candid wedding photographer, corporate event videography, baby shower photoshoot, concert coverage, drone photography, ${brand.name}`}
        path="/"
        jsonLd={HOME_JSONLD}
      />

      <Hero />
      <TrustBar />
      <Marquee />
      <FilmStrip />
      <ServicesOverview />
      <WhyUs />
      <FocusSlider />
      <Approach />
      <Process />
      <AvailabilityStrip />
      <PressWall />
      <HomeFAQ />
      <InstagramStrip />
      <CTABand />
    </>
  );
}
