/**
 * Tiny haptic feedback for the app-style mobile chrome (tab bar, sheets,
 * pickers). Uses the Vibration API where available (Android Chrome); iOS
 * Safari ignores it silently. Skipped in Calm/reduced-motion mode.
 */
export function tap(pattern = 8) {
  try {
    if (document.documentElement.dataset.motion === 'reduced') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    navigator.vibrate?.(pattern);
  } catch {
    /* no-op */
  }
}
