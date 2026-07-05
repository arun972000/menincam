import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeading } from '../ui/Section';
import Icon from '../ui/Icon';
import LazyImage from '../ui/LazyImage';
import Button, { ArrowIcon } from '../ui/Button';
import { RevealGroup, RevealItem } from '../ui/Reveal';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { servicesOverview } from '../../data/services';

/** A single editorial service tile (text over a photo with a dark scrim). */
function ServiceCard({ s, index, className = '' }) {
  return (
    <Link
      to="/services"
      className={`group relative block overflow-hidden rounded-bento ${className}`}
      aria-label={`${s.title} — explore`}
    >
      <LazyImage
        src={s.image}
        alt={s.alt}
        ratio={0.82}
        rounded={false}
        imgClassName="brightness-[0.8] transition-all duration-700 ease-cinema group-hover:brightness-95 group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 22rem"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
      <div className="pointer-events-none absolute inset-3 rounded-2xl border border-white/15 transition-colors duration-500 group-hover:border-white/60" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-3 select-none font-display text-6xl font-extrabold leading-none text-white/20"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="inline-grid h-11 w-11 place-items-center rounded-full bg-black/40 text-gold ring-1 ring-gold/40 backdrop-blur">
          <Icon name={s.icon} className="h-5 w-5" />
        </span>
        <h3 className="mt-4 font-display text-2xl font-bold text-white">{s.title}</h3>
        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-cinema group-hover:grid-rows-[1fr] group-hover:opacity-100 max-lg:grid-rows-[1fr] max-lg:opacity-100">
          <p className="overflow-hidden text-sm leading-relaxed text-white/85">
            <span className="block pt-2">{s.short}</span>
          </p>
        </div>
        <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-gold">
          Explore
          <span className="h-px w-6 bg-gold transition-all duration-500 ease-cinema group-hover:w-10" />
        </span>
      </div>
    </Link>
  );
}

/** Desktop: vertical scroll drives a horizontal "push-through" track. */
function HorizontalTrack() {
  const targetRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  // useLayoutEffect: measure BEFORE first paint so the section renders at its
  // real height immediately — no layout shift pushing the footer around (CLS).
  useLayoutEffect(() => {
    const calc = () => {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 32));
    };
    calc();
    const ro = new ResizeObserver(calc);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', calc);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', calc);
    };
  }, []);

  return (
    <section
      ref={targetRef}
      className="relative hidden lg:block"
      style={{ height: distance ? `${distance + window.innerHeight}px` : '100vh' }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex items-center gap-6 px-[6vw]">
          {/* Intro panel */}
          <div className="panel flex w-[18rem] shrink-0 flex-col justify-between self-stretch p-8">
            <span className="chip w-fit !border-gold/30 !bg-gold/5 !text-ivory">Swipe through →</span>
            <div>
              <h3 className="font-display text-3xl font-extrabold leading-tight text-ivory text-balance">
                Every kind of event
              </h3>
              <p className="mt-3 text-sm text-muted">Scroll to push through what we cover.</p>
            </div>
            <Button to="/services" variant="outline" className="w-fit">
              See all <ArrowIcon />
            </Button>
          </div>

          {servicesOverview.map((s, i) => (
            <ServiceCard key={s.id} s={s} index={i} className="h-[26rem] w-[20rem] shrink-0" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function ServicesOverview() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="bg-surface/30 py-20 sm:py-28">
      <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="What we cover"
          title="One team for every kind of event"
          intro="Weddings, birthdays, parties, corporate days and more — we cover them all."
        />
        <Button to="/services" variant="ghost" className="shrink-0">
          See all events <ArrowIcon />
        </Button>
      </div>

      {/* Phone: app-style swipeable snap carousel — cards peek to invite the
          swipe. No scroll-reveal here; horizontal scrolling stays 60fps. */}
      <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 no-scrollbar sm:hidden">
        {servicesOverview.map((s, i) => (
          <div key={s.id} className="w-[76vw] max-w-[19rem] shrink-0 snap-center">
            <ServiceCard s={s} index={i} />
          </div>
        ))}
        {/* End spacer so the last card can snap to centre */}
        <div className="w-1 shrink-0" aria-hidden="true" />
      </div>

      {/* Tablet (and reduced-motion desktop): editorial grid */}
      <RevealGroup
        className={`container-x mt-12 hidden gap-4 sm:grid sm:grid-cols-2 ${
          reduced ? 'lg:grid-cols-3' : 'lg:hidden'
        }`}
      >
        {servicesOverview.map((s, i) => (
          <RevealItem key={s.id}>
            <ServiceCard s={s} index={i} />
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Desktop: horizontal push-through */}
      {!reduced && <HorizontalTrack />}
    </section>
  );
}
