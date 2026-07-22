import { useEffect, useRef, useState } from 'react';
import Section, { SectionHeading } from '../ui/Section';
import Reveal from '../ui/Reveal';
import { usePreferences } from '../../context/PreferencesContext';
import { track } from '../../lib/track';

/**
 * "What your phone sees vs what we see": a draggable before/after comparison.
 * The same frame twice: the top layer simulates a phone snap (soft, washed out)
 * and is clipped at the handle; underneath is the pro shot. Dragging the handle
 * IS the proof of quality — the most persuasive thing a studio can show.
 *
 * Pure CSS clip-path + pointer events (GPU-cheap, no library). Keyboard
 * accessible (role=slider, arrow keys). A one-time idle "nudge" wiggles the
 * handle when the section enters view so visitors discover it (skipped in Calm).
 */
// TODO: replace with a real Men in Cam frame — ideally the SAME moment shot on
// a phone (left) and your camera (right) for an honest comparison.
const IMAGE = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&fm=webp&q=78&w=1600';

const CLAMP = { min: 6, max: 94 };

export default function FocusSlider() {
  const { calm } = usePreferences();
  const stageRef = useRef(null);
  const [pos, setPos] = useState(50); // handle position, % from the left
  const [dragging, setDragging] = useState(false);
  const touched = useRef(false); // has the visitor interacted yet?
  const nudged = useRef(false);

  const clamp = (v) => Math.min(CLAMP.max, Math.max(CLAMP.min, v));

  const posFromEvent = (e) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return 50;
    return clamp(((e.clientX - r.left) / r.width) * 100);
  };

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDragging(true);
    setPos(posFromEvent(e));
    if (!touched.current) {
      touched.current = true;
      track('focus_slider_used');
    }
  };
  const onPointerMove = (e) => dragging && setPos(posFromEvent(e));
  const endDrag = () => setDragging(false);

  const onKeyDown = (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    touched.current = true;
    setPos((p) => clamp(p + (e.key === 'ArrowRight' ? 4 : -4)));
  };

  // One-time discovery nudge when the stage scrolls into view.
  useEffect(() => {
    const el = stageRef.current;
    if (!el || calm || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || nudged.current || touched.current) return;
        nudged.current = true;
        const steps = [
          [64, 350],
          [40, 800],
          [50, 1250],
        ];
        steps.forEach(([p, t]) => setTimeout(() => !touched.current && setPos(p), t));
        io.disconnect();
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [calm]);

  return (
    <Section className="bg-surface/40">
      <SectionHeading
        eyebrow="See the difference"
        title="What your phone sees vs what we see"
        intro="Drag the handle. Same moment — one shot on a phone, one by our crew. This is why you book a photographer."
        align="center"
        className="mx-auto"
      />

      <Reveal className="mx-auto mt-12 max-w-4xl">
        <div
          ref={stageRef}
          role="slider"
          tabIndex={0}
          aria-label="Compare phone photo with professional photo"
          aria-valuemin={CLAMP.min}
          aria-valuemax={CLAMP.max}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% phone view`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
          className="group relative aspect-[16/10] cursor-ew-resize touch-none select-none overflow-hidden rounded-bento border border-line shadow-soft focus-visible:ring-2 focus-visible:ring-gold"
        >
          {/* Pro shot (base layer) */}
          <img src={IMAGE} alt="Professionally captured event moment" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />

          {/* "Phone" layer — same frame, degraded; clipped at the handle */}
          <img
            src={IMAGE}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover ${dragging ? '' : 'transition-[clip-path] duration-300 ease-cinema'}`}
            style={{
              clipPath: `inset(0 ${100 - pos}% 0 0)`,
              filter: 'blur(2px) saturate(0.68) contrast(0.86) brightness(1.05)',
            }}
          />

          {/* Corner labels */}
          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
            📱 Your phone
          </span>
          <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-gold px-3 py-1.5 text-xs font-semibold text-white">
            📸 Men in Cam
          </span>

          {/* Handle */}
          <div
            className={`pointer-events-none absolute inset-y-0 z-10 ${dragging ? '' : 'transition-[left] duration-300 ease-cinema'}`}
            style={{ left: `${pos}%` }}
          >
            <div className="absolute inset-y-0 -ml-px w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.6)]" />
            <div className="absolute top-1/2 -ml-6 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-ink/80 text-white shadow-lift backdrop-blur">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
              </svg>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted">Drag left and right to compare · placeholder frame, swap for a real one</p>
      </Reveal>
    </Section>
  );
}
