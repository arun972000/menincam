import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { usePreferences } from '../../context/PreferencesContext';

/**
 * 3D tilt-on-hover: the card leans toward the cursor (like holding a photo
 * print), springing back on leave. Pure transform with perspective — GPU-cheap,
 * tactile, and one of the highest "feels alive" returns per byte.
 * No-op on touch devices and in Calm mode (renders a plain div).
 */
export default function Tilt({ children, max = 7, className = '' }) {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const { calm } = usePreferences();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 260, damping: 22 });
  const sy = useSpring(py, { stiffness: 260, damping: 22 });
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);

  if (isMobile || calm) return <div className={className}>{children}</div>;

  const onPointerMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onPointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
