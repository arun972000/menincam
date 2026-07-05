import Seo from '../components/Seo';
import Hero from '../components/sections/Hero';
import TrustBar from '../components/sections/TrustBar';
import Marquee from '../components/sections/Marquee';
import ServicesOverview from '../components/sections/ServicesOverview';
import WhyUs from '../components/sections/WhyUs';
import Approach from '../components/sections/Approach';
import Process from '../components/sections/Process';
import PressWall from '../components/sections/PressWall';
import InstagramStrip from '../components/sections/InstagramStrip';
import HomeFAQ from '../components/sections/HomeFAQ';
import CTABand from '../components/sections/CTABand';
import { brand } from '../data/site';

export default function Home() {
  return (
    <>
      <Seo
        title="Photo & Video for Every Event"
        description={`${brand.name} — ${brand.tagline} We cover weddings, birthdays, parties, corporate events and more in ${brand.city}. Send your date and get a quick reply.`}
        path="/"
      />

      <Hero />
      <TrustBar />
      <Marquee />
      <ServicesOverview />
      <WhyUs />
      <Approach />
      <Process />
      <PressWall />
      <HomeFAQ />
      <InstagramStrip />
      <CTABand />
    </>
  );
}
