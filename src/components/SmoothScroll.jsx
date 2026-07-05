import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { useIsMobile } from '../hooks/useMediaQuery';
import { usePreferences } from '../context/PreferencesContext';

/**
 * Smooth momentum scrolling (Lenis): the single biggest "immersive feel"
 * upgrade, for ~3 KB. It drives the real page scroll with inertia, so existing
 * scroll listeners (navbar, sticky CTA) and Framer's useScroll keep working.
 *
 * Safety: disabled for reduced motion (OS setting or the site's Calm mode),
 * when the visitor turns it off in the Settings panel, and on mobile entirely
 * (touch was already native; skipping the RAF loop too saves battery). Also
 * resets scroll to top on route change (replaces the old ScrollToTop).
 */
export default function SmoothScroll() {
  const { calm, smooth } = usePreferences();
  const isMobile = useIsMobile();
  const { pathname } = useLocation();
  const lenisRef = useRef(null);

  const disabled = calm || !smooth || isMobile;

  useEffect(() => {
    if (disabled) return undefined;

    const lenis = new Lenis({
      duration: 0.9,
      lerp: 0.12, // a touch snappier so it never feels floaty/slow
      smoothWheel: true,
      syncTouch: false, // keep native touch scrolling on mobile
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [disabled]);

  // Reset to top on navigation (works with or without Lenis).
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
