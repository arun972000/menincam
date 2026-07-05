import { useEffect, useState } from 'react';

/**
 * Subscribe to a CSS media query. SSR/first-render safe (defaults to false).
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True on phones / small tablets: used to disable 3D entirely on mobile. */
export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)');
}

/** True below the desktop breakpoint: the app-style mobile chrome (bottom
 *  tab bar, bottom sheets) shows in this range; desktop keeps the web UI. */
export function useIsCompact() {
  return useMediaQuery('(max-width: 1023px)');
}

/** True when the user prefers reduced motion. */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
