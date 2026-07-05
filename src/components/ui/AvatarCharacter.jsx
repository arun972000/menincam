import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePreferences } from '../../context/PreferencesContext';
import { tap } from '../../lib/haptics';

/**
 * Interactive animated character avatar for the founders: a friendly cartoon
 * photographer instead of a stock photo. The character's eyes FOLLOW the
 * visitor's cursor, it blinks on its own, and hovering/tapping makes it grin
 * and fire its camera flash (with a haptic tick on phones). Pure inline SVG,
 * zero image requests. Two variants:
 *   'a' - cap + beard (Shakthi)   'b' - glasses + curly hair (Arun)
 * All motion stops in Calm/reduced-motion mode (friendly static portrait).
 */

const VARIANTS = {
  a: { shirt: 'rgb(var(--c-teal))', skin: '#F2C094', hairColor: '#2A2118' },
  b: { shirt: 'rgb(var(--c-gold))', skin: '#E8B181', hairColor: '#1F1B16' },
};

export default function AvatarCharacter({ variant = 'a', name = '', size = 160, className = '' }) {
  const { calm } = usePreferences();
  const v = VARIANTS[variant] ?? VARIANTS.a;
  const ref = useRef(null);
  const [happy, setHappy] = useState(false);
  const [blink, setBlink] = useState(false);
  const [flash, setFlash] = useState(false);

  // ── Eyes follow the cursor (springy, render-free via motion values) ──
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 140, damping: 14, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 140, damping: 14, mass: 0.4 });

  useEffect(() => {
    if (calm) return undefined;
    const onMove = (e) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const ang = Math.atan2(e.clientY - cy, e.clientX - cx);
      const pull = Math.min(1, Math.hypot(e.clientX - cx, e.clientY - cy) / 260);
      px.set(Math.cos(ang) * 2.6 * pull);
      py.set(Math.sin(ang) * 2.1 * pull);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [calm, px, py]);

  // ── Natural blinking on a randomised timer ──
  useEffect(() => {
    if (calm) return undefined;
    let alive = true;
    let t;
    const loop = () => {
      t = setTimeout(() => {
        if (!alive) return;
        setBlink(true);
        setTimeout(() => alive && setBlink(false), 140);
        loop();
      }, 2400 + Math.random() * 2600);
    };
    loop();
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [calm]);

  // ── Say cheese: grin + camera flash ──
  const snap = () => {
    if (flash) return;
    tap(6);
    setHappy(true);
    setFlash(true);
    setTimeout(() => setFlash(false), 380);
    setTimeout(() => setHappy(false), 900);
  };

  return (
    <motion.div
      ref={ref}
      whileHover={calm ? undefined : { scale: 1.05, rotate: -2 }}
      whileTap={calm ? undefined : { scale: 0.95 }}
      transition={{ type: 'spring', damping: 16, stiffness: 260 }}
      onHoverStart={snap}
      onTapStart={snap}
      className={`inline-block cursor-pointer select-none ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${name}, animated character portrait`}
    >
      <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
        {/* Frame */}
        <circle cx="60" cy="60" r="57" fill="rgb(var(--c-gold) / 0.08)" />
        <circle cx="60" cy="60" r="57" fill="none" stroke="rgb(var(--c-gold) / 0.45)" strokeWidth="2" strokeDasharray="4 6" strokeLinecap="round" />

        {/* Body / shirt */}
        <path d="M28 108c2-20 14-30 32-30s30 10 32 30" fill={v.shirt} />
        <path d="M52 80h16l-3 9h-10z" fill={v.skin} />

        {/* Head */}
        <circle cx="60" cy="52" r="22" fill={v.skin} />

        {/* Ears */}
        <circle cx="38.5" cy="52" r="3.6" fill={v.skin} />
        <circle cx="81.5" cy="52" r="3.6" fill={v.skin} />

        {variant === 'a' ? (
          <>
            {/* Cap */}
            <path d="M38 46c1-13 10-20 22-20s21 7 22 20c-8-5-14-6-22-6s-14 1-22 6Z" fill="rgb(var(--c-teal))" />
            <path d="M36 45c8-4 16-5.5 24-5.5S76 41 84 45l2 4c-9-4-17-5.5-26-5.5S43 45 34 49l2-4Z" fill="rgb(var(--c-teal))" opacity="0.85" />
            <circle cx="60" cy="27" r="2.6" fill="rgb(var(--c-gold))" />
            {/* Beard */}
            <path d="M46 60c1 9 6 14 14 14s13-5 14-14c-3 7-8 9-14 9s-11-2-14-9Z" fill={v.hairColor} opacity="0.9" />
          </>
        ) : (
          <>
            {/* Curly hair */}
            <path d="M38 47c-2-12 6-21 22-21 15 0 24 8 22 21-2-6-5-9-8-9 1 3 0 5-1 6-2-5-5-8-9-8 1 3 0 5-1 6-3-5-7-7-11-6 0 2 0 4-1 5-4-2-9 0-13 6Z" fill={v.hairColor} />
            {/* Glasses */}
            <circle cx="51" cy="52" r="7.4" fill="none" stroke="#1E1B18" strokeWidth="1.8" />
            <circle cx="69" cy="52" r="7.4" fill="none" stroke="#1E1B18" strokeWidth="1.8" />
            <path d="M58.4 52h3.2M43.6 51l-4-1.6M76.4 51l4-1.6" stroke="#1E1B18" strokeWidth="1.8" strokeLinecap="round" />
          </>
        )}

        {/* Brows */}
        <path d={happy ? 'M46 43.5q5-3.5 10 0' : 'M46 45q5-2.5 10 0'} stroke={v.hairColor} strokeWidth="2" strokeLinecap="round" fill="none" transform="translate(-9 0) scale(0.9)" style={{ transformOrigin: '51px 45px' }} />
        <path d={happy ? 'M64 43.5q5-3.5 10 0' : 'M64 45q5-2.5 10 0'} stroke={v.hairColor} strokeWidth="2" strokeLinecap="round" fill="none" transform="translate(9 0) scale(0.9)" style={{ transformOrigin: '69px 45px' }} />

        {/* Eyes */}
        {blink ? (
          <>
            <path d="M47 53q4 2 8 0" stroke="#1E1B18" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M65 53q4 2 8 0" stroke="#1E1B18" strokeWidth="2" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <ellipse cx="51" cy="52.5" rx="4.6" ry="5" fill="#fff" />
            <ellipse cx="69" cy="52.5" rx="4.6" ry="5" fill="#fff" />
            <motion.g style={{ x: sx, y: sy }}>
              <circle cx="51" cy="53" r="2.3" fill="#1E1B18" />
              <circle cx="69" cy="53" r="2.3" fill="#1E1B18" />
              <circle cx="51.9" cy="52.1" r="0.7" fill="#fff" />
              <circle cx="69.9" cy="52.1" r="0.7" fill="#fff" />
            </motion.g>
          </>
        )}

        {/* Mouth: grins when greeted */}
        {happy ? (
          <path d="M52 63q8 8 16 0q-2 7-8 7t-8-7Z" fill="#7C2D2D" stroke="#1E1B18" strokeWidth="1.4" strokeLinejoin="round" />
        ) : (
          <path d="M53 64q7 5 14 0" stroke="#1E1B18" strokeWidth="2" strokeLinecap="round" fill="none" />
        )}

        {/* Camera in hands */}
        <g>
          <rect x="44" y="86" width="32" height="20" rx="4.5" fill="#23201C" />
          <rect x="52" y="82.5" width="16" height="6" rx="2.5" fill="#23201C" />
          <circle cx="60" cy="96" r="7" fill="#3A352F" />
          <circle cx="60" cy="96" r="4.6" fill="rgb(var(--c-gold))" />
          <circle cx="61.8" cy="94.2" r="1.3" fill="#fff" />
          <rect x="47.5" y="89" width="4.5" height="3" rx="1.5" fill="rgb(var(--c-teal))" />
          {/* Hands */}
          <circle cx="43" cy="97" r="4.4" fill={v.skin} />
          <circle cx="77" cy="97" r="4.4" fill={v.skin} />
        </g>

        {/* Camera flash burst */}
        {flash && (
          <motion.g
            initial={{ opacity: 1, scale: 0.4 }}
            animate={{ opacity: 0, scale: 1.6 }}
            transition={{ duration: 0.38, ease: 'easeOut' }}
            style={{ transformOrigin: '72px 84px' }}
          >
            <circle cx="72" cy="84" r="9" fill="#fff" opacity="0.9" />
            <path d="M72 70v7M72 91v7M58 84h7M79 84h7M62 74l5 5M82 94l-5-5M82 74l-5 5M62 94l5-5" stroke="#FFE9B0" strokeWidth="2.4" strokeLinecap="round" />
          </motion.g>
        )}
      </svg>
    </motion.div>
  );
}
