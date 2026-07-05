import { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

/**
 * Route page-transition wipe — a tangerine panel sweeps up across the screen on
 * each navigation (the "moving between scenes" beat). The new page mounts
 * underneath while it's covered. Pure transform, pointer-events-none, ~no cost.
 * Skipped on first load and for reduced-motion.
 */
export default function PageTransition() {
  const { pathname } = useLocation();
  const controls = useAnimationControls();
  const reduced = usePrefersReducedMotion();
  const first = useRef(true);

  useEffect(() => {
    if (reduced) return;
    if (first.current) {
      first.current = false;
      return;
    }
    controls.set({ y: '100%' });
    controls.start({
      y: ['100%', '0%', '0%', '-100%'],
      transition: { duration: 0.5, times: [0, 0.42, 0.5, 1], ease: [0.7, 0, 0.3, 1] },
    });
  }, [pathname, reduced, controls]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      initial={{ y: '100%' }}
      animate={controls}
      className="pointer-events-none fixed inset-0 z-[85] flex items-center justify-center bg-gold"
    >
      <span className="flex items-center gap-3 font-display text-2xl font-extrabold uppercase tracking-tight text-white">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
          <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" aria-hidden="true">
            <circle cx="20" cy="20" r="15" stroke="#ffffff" strokeWidth="2.4" />
            <circle cx="20" cy="20" r="5" fill="#ffffff" />
          </svg>
        </span>
        Men in Cam
      </span>
    </motion.div>
  );
}
