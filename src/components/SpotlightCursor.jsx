import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsMobile } from '../hooks/useMediaQuery';
import { usePreferences } from '../context/PreferencesContext';

/**
 * Soft accent "spotlight" that trails the cursor — ambient atmosphere for the
 * immersive feel. Pure transform on a single blurred blob, pointer-events-none.
 * Desktop only; never renders on touch / reduced motion, and visitors can turn
 * it off in the Settings panel.
 */
export default function SpotlightCursor() {
  const { calm, spotlight } = usePreferences();
  const isMobile = useIsMobile();

  const disabled = calm || isMobile || !spotlight;

  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const sx = useSpring(x, { stiffness: 280, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 280, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (disabled) return undefined;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [disabled, x, y]);

  if (disabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-40"
    >
      <div className="h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.06] blur-3xl" />
    </motion.div>
  );
}
