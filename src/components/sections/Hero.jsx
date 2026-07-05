import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import Magnetic from '../ui/Magnetic';
import Button, { ArrowIcon } from '../ui/Button';
import Icon from '../ui/Icon';
import { brand, social, whatsappLink } from '../../data/site';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { usePreferences } from '../../context/PreferencesContext';

// Full-bleed background frames: high-res event photos. The first is the LCP
// image; the rest mount after idle and slow-crossfade with a Ken Burns zoom.
// TODO: replace with your best real shots (or drop a <video> reel in below).
const FRAMES = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552', alt: 'A couple at their wedding' },
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', alt: 'Friends celebrating with confetti at a party' },
  { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3', alt: 'Crowd at a live stage show' },
  { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d', alt: 'A beautifully lit reception' },
];

const WORDS = ['weddings', 'birthdays', 'parties', 'every event'];

const TRUST = [
  { icon: 'sparkles', label: '1,200+ events' },
  { icon: 'film', label: 'Photo + video' },
  { icon: 'pin', label: 'We travel anywhere' },
];

function srcset(base) {
  return [768, 1280, 1920].map((w) => `${base}?auto=format&fit=crop&fm=webp&q=70&w=${w} ${w}w`).join(', ');
}

export default function Hero() {
  // Calm already ORs the OS reduced-motion setting, so it is a strict
  // superset of the old prefers-reduced-motion check.
  const { calm, spotlight } = usePreferences();
  const reduced = calm;
  const isMobile = useIsMobile();
  // Lens parallax mounts on desktop only; mobile and Calm get today's static hero.
  const interactive = !calm && !isMobile;

  const [frame, setFrame] = useState(0);
  const [word, setWord] = useState(0);
  const [extrasReady, setExtrasReady] = useState(false);

  // ── "Through the lens" depth: photo drifts against the cursor, copy drifts
  //    with it, and an accent glare tracks the pointer like light on glass.
  //    All hooks run unconditionally; only the style props attach conditionally.
  const sectionRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 120, damping: 20 });
  const smy = useSpring(my, { stiffness: 120, damping: 20 });
  const gxRaw = useMotionValue(-500);
  const gyRaw = useMotionValue(-500);
  const gx = useSpring(gxRaw, { stiffness: 160, damping: 24 });
  const gy = useSpring(gyRaw, { stiffness: 160, damping: 24 });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgX = useTransform(smx, (v) => v * -14);
  const bgY = useTransform(smy, (v) => v * -10);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.14]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const driftX = useTransform(smx, (v) => v * 6);
  const driftY = useTransform(smy, (v) => v * 4);
  const glare = useMotionTemplate`radial-gradient(30rem circle at ${gx}px ${gy}px, rgb(var(--c-gold) / 0.10), transparent 60%)`;

  const onPointerMove = (e) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX / r.width - 0.5);
    my.set(e.clientY / r.height - 0.5);
    gxRaw.set(e.clientX - r.left);
    gyRaw.set(e.clientY - r.top);
  };
  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Mount frames 2-n after idle so they never compete with the LCP frame.
  useEffect(() => {
    if (reduced) return undefined;
    const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 700));
    const id = ric(() => setExtrasReady(true));
    return () => (window.cancelIdleCallback || clearTimeout)(id);
  }, [reduced]);

  useEffect(() => {
    if (reduced || !extrasReady) return undefined;
    const t = setInterval(() => setFrame((i) => (i + 1) % FRAMES.length), 6000);
    return () => clearInterval(t);
  }, [reduced, extrasReady]);

  useEffect(() => {
    if (reduced) return undefined;
    const t = setInterval(() => setWord((i) => (i + 1) % WORDS.length), 2600);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink"
      {...(interactive ? { onPointerMove, onPointerLeave } : {})}
    >
      {/* ── Full-bleed crossfading background (drifts against the cursor;
             the permanent 1.06 scale hides the travel so edges never show) ── */}
      <motion.div
        className="absolute inset-0 scale-[1.06]"
        style={interactive ? { x: bgX, y: bgY, scale: bgScale } : undefined}
      >
        {FRAMES.map((f, i) => {
          if (i > 0 && !extrasReady) return null;
          const active = i === frame;
          return (
            <img
              key={f.src}
              src={`${f.src}?auto=format&fit=crop&fm=webp&q=70&w=1920`}
              srcSet={srcset(f.src)}
              sizes="100vw"
              alt={i === 0 ? f.alt : ''}
              aria-hidden={i === 0 ? undefined : true}
              loading={i === 0 ? 'eager' : 'lazy'}
              // eslint-disable-next-line react/no-unknown-property
              fetchpriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ease-cinema ${
                active ? 'opacity-100' : 'opacity-0'
              } ${active && !reduced ? 'animate-kenburns' : ''}`}
            />
          );
        })}
        {/* Cinematic legibility scrims: TRUE black (not the ink token) so the
            fixed-white hero text stays readable in Daylight theme too. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
        {/* Theme-aware fade so the hero's bottom edge blends into the page. */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink to-transparent" />
        {/* Lens glare tracking the pointer (respects the spotlight preference) */}
        {interactive && spotlight && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: glare }}
          />
        )}
      </motion.div>

      {/* ── Content (slides up + fades as you scroll away, drifts subtly with
             the cursor for depth against the background) ── */}
      <motion.div
        className="container-x relative z-10 pt-24"
        style={interactive ? { y: contentY, opacity: contentOpacity } : undefined}
      >
        <motion.div
          className="max-w-3xl"
          style={interactive ? { x: driftX, y: driftY } : undefined}
        >
          <motion.span
            className="chip !border-gold/40 !bg-black/30 !text-white backdrop-blur-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {brand.baseLine}
          </motion.span>

          <motion.h1
            className="mt-6 font-display text-fluid-3xl font-extrabold leading-[0.95] tracking-tight text-white text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Photos &amp; video
            <br />
            <span className="inline-flex flex-wrap items-baseline gap-x-4">
              <span>for</span>
              {/* inline-grid stacks every word in one cell; an invisible ghost
                  sizes the box to the WIDEST word so swapping words never
                  reflows the line (was a periodic layout shift / CLS). */}
              <span className="relative inline-grid text-gold">
                <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden="true">
                  {WORDS.reduce((a, b) => (b.length > a.length ? b : a))}
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={WORDS[word]}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="col-start-1 row-start-1 inline-block whitespace-nowrap"
                  >
                    {WORDS[word]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span>.</span>
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/80"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            {brand.name} is a friendly crew covering all kinds of events. Easy booking, natural
            photos and quick delivery. Just tell us your date.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Magnetic>
              <Button to="/contact" size="lg">
                Get a quote <ArrowIcon />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href={whatsappLink()} variant="whatsapp" size="lg">
                <Icon name="whatsapp" filled className="h-5 w-5" /> Chat on WhatsApp
              </Button>
            </Magnetic>
            <a
              href={social.instagram}
              target="_blank"
              rel="noreferrer"
              className="group ml-1 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition-colors hover:text-gold"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/30 transition-colors group-hover:border-gold">
                <Icon name="play" filled className="h-4 w-4 translate-x-0.5" />
              </span>
              See our work
            </a>
          </motion.div>

          {/* Inline trust signals */}
          <motion.ul
            className="mt-10 flex flex-wrap gap-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* Chip backdrop keeps these readable over any photo AND over the
                theme-coloured bottom fade in both themes. */}
            {TRUST.map((t) => (
              <li
                key={t.label}
                className="flex items-center gap-2 rounded-full bg-black/35 px-3.5 py-1.5 text-sm text-white/90 backdrop-blur-sm"
              >
                <Icon name={t.icon} className="h-4 w-4 text-gold" />
                {t.label}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>

      {/* Frame ticks + scroll cue */}
      {extrasReady && !reduced && (
        <div className="absolute bottom-8 right-6 z-10 hidden items-center gap-2 sm:flex">
          {FRAMES.map((f, i) => (
            <button
              key={f.src}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setFrame(i)}
              className="group/tick flex h-6 min-w-6 items-center justify-center"
            >
              <span
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === frame ? 'w-7 bg-gold' : 'w-3 bg-ivory/40 group-hover/tick:bg-ivory/70'
                }`}
              />
            </button>
          ))}
        </div>
      )}

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-ivory/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest2">Scroll</span>
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-ivory/30 p-1">
            <motion.span
              className="h-2 w-px bg-gold"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
