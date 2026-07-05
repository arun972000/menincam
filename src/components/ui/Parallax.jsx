import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';

/**
 * Scroll parallax: shifts its children vertically as the element travels through
 * the viewport, creating depth. Pure transform (GPU) — no layout cost. `speed`
 * is the fraction of travel (positive = moves up as you scroll = "further
 * back"; negative = moves down = "closer"). No-op under reduced-motion.
 */
export default function Parallax({ children, speed = 0.2, className = '', style = {} }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const range = Math.round(speed * 100);
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : [`${range}%`, `${-range}%`]);

  return (
    <motion.div ref={ref} style={{ y, ...style }} className={className}>
      {children}
    </motion.div>
  );
}
