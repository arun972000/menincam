import { useEffect, useRef, useState } from 'react';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

/**
 * Counts up to `value` once it scrolls into view. Uses requestAnimationFrame
 * with an ease-out curve. Respects reduced-motion (snaps to final value).
 */
export default function Counter({ value, suffix = '', duration = 1800, className = '' }) {
  const [ref, inView] = useInViewOnce({ threshold: 0.4 });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    if (reduced) {
      setDisplay(value);
      return;
    }

    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}
