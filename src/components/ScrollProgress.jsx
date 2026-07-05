import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin red scroll-progress bar pinned to the very top — a small "crafted
 * experience" cue. Transform-only (scaleX), so it costs nothing.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-gold"
    />
  );
}
