import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import LazyImage from '../ui/LazyImage';
import { usePreferences } from '../../context/PreferencesContext';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { services } from '../../data/services';

/**
 * Film-strip showreel — frames from real events presented as a strip of 35mm
 * film (sprocket holes, REC dot, frame counter). On desktop, vertical scroll
 * scrubs the strip sideways like film through a projector; on mobile / Calm
 * it's a native swipe strip. Transform-only — GPU-cheap, no video download.
 */
const FRAMES = services.slice(0, 8).map((s) => ({ src: s.image, alt: s.alt, label: s.title }));

function Sprockets() {
  return (
    <div className="flex justify-between gap-2 px-3 py-2" aria-hidden="true">
      {Array.from({ length: 24 }).map((_, i) => (
        <span key={i} className="h-2.5 w-3.5 shrink-0 rounded-[3px] bg-white/15" />
      ))}
    </div>
  );
}

function Frame({ f, i }) {
  return (
    <figure className="relative w-64 shrink-0 sm:w-72">
      <LazyImage src={f.src} alt={f.alt} ratio={1.35} rounded={false} className="!rounded-md" sizes="18rem" />
      <figcaption className="pointer-events-none absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest2 text-white/90">
        {f.label}
      </figcaption>
      <span className="pointer-events-none absolute right-2 top-2 font-mono text-[10px] text-white/60">
        FR{String(i + 1).padStart(2, '0')}
      </span>
    </figure>
  );
}

/** The strip chrome shared by both modes. */
function StripShell({ children }) {
  return (
    <div className="border-y border-white/10 bg-[#0a0a0c] shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
      <Sprockets />
      {children}
      <Sprockets />
    </div>
  );
}

/** Desktop: scroll scrubs the strip horizontally inside a sticky stage. */
function ScrubStrip() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [counter, setCounter] = useState(1);

  const { scrollYProgress } = useScroll({ target: sectionRef });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setCounter(Math.min(FRAMES.length, Math.max(1, Math.round(v * (FRAMES.length - 1)) + 1)));
  });

  // Measure before paint so the section height is right immediately (no CLS).
  useLayoutEffect(() => {
    const calc = () => {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 64));
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
    <div ref={sectionRef} style={{ height: distance ? `${distance + 600}px` : '120vh' }}>
      <div className="sticky top-0 flex min-h-[70vh] flex-col justify-center overflow-hidden py-10">
        {/* Header row */}
        <div className="container-x mb-6 flex items-end justify-between">
          <p className="eyebrow">
            <span className="rule-gold" /> The reel
          </p>
          <div className="flex items-center gap-4 font-mono text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-gold" /> REC
            </span>
            <span className="tabular-nums">
              FRAME {String(counter).padStart(2, '0')}/{String(FRAMES.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        <StripShell>
          <motion.div ref={trackRef} style={{ x }} className="flex gap-3 px-8">
            {FRAMES.map((f, i) => (
              <Frame key={f.src} f={f} i={i} />
            ))}
          </motion.div>
        </StripShell>

        <p className="container-x mt-4 text-xs text-muted">Keep scrolling — the film advances with you.</p>
      </div>
    </div>
  );
}

/** Mobile / Calm: native swipe strip, same film chrome. */
function SwipeStrip() {
  return (
    <div className="py-10">
      <div className="container-x mb-6 flex items-end justify-between">
        <p className="eyebrow">
          <span className="rule-gold" /> The reel
        </p>
        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
          <span className="h-2 w-2 rounded-full bg-gold" /> REC
        </span>
      </div>
      <StripShell>
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-8 no-scrollbar">
          {FRAMES.map((f, i) => (
            <div key={f.src} className="snap-center">
              <Frame f={f} i={i} />
            </div>
          ))}
        </div>
      </StripShell>
      <p className="container-x mt-4 text-xs text-muted">Swipe the strip →</p>
    </div>
  );
}

export default function FilmStrip() {
  const { calm } = usePreferences();
  const isMobile = useIsMobile();
  return calm || isMobile ? <SwipeStrip /> : <ScrubStrip />;
}
