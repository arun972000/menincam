import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight IntersectionObserver hook. Returns a ref + whether the element
 * has entered the viewport. By default it "latches" true the first time (handy
 * for one-shot reveals and counter animations); pass { once: false } to track
 * continuously (used to pause/unmount the 3D Canvas when it scrolls away).
 */
export function useInViewOnce({ once = true, rootMargin = '0px', threshold = 0.2 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true); // Fail open: show content if IO is unavailable.
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return [ref, inView];
}
