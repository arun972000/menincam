import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

/**
 * User-facing site preferences (Settings panel): theme, accent colour, motion
 * level and ambient effects. Persisted per-device in localStorage and mirrored
 * onto <html> (class + data attributes) so plain CSS can react to everything.
 * A tiny inline script in index.html applies the saved values before first
 * paint, so there is never a theme flash on load.
 */

const STORAGE_KEY = 'mic:prefs:v1';

export const THEMES = [
  { id: 'midnight', label: 'Midnight', emoji: '🌙' },
  { id: 'daylight', label: 'Daylight', emoji: '☀️' },
  { id: 'system', label: 'Auto', emoji: '✨' },
];

// "signature" keeps the per-theme brand accent (red on Midnight, tangerine on
// Daylight). The rest override --c-gold via html[data-accent] in index.css.
// All swatches keep white button text at WCAG AA contrast.
export const ACCENTS = [
  { id: 'signature', label: 'Signature', swatch: 'linear-gradient(135deg, #E01E2B, #D63E08)' },
  { id: 'ocean', label: 'Ocean', swatch: '#2563EB' },
  { id: 'violet', label: 'Violet', swatch: '#6D28D9' },
  { id: 'rose', label: 'Rose', swatch: '#DB2777' },
];

const DEFAULTS = {
  theme: 'midnight', // 'midnight' | 'daylight' | 'system'
  accent: 'signature',
  motion: 'full', // 'full' | 'calm'
  spotlight: true, // ambient cursor glow (desktop only)
  smooth: true, // Lenis momentum scrolling (desktop only)
};

function load() {
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
  } catch {
    return DEFAULTS;
  }
}

const PreferencesContext = createContext(null);

export function PreferencesProvider({ children }) {
  const [prefs, setPrefs] = useState(load);
  const systemLight = useMediaQuery('(prefers-color-scheme: light)');
  const osReduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  const isLight = prefs.theme === 'daylight' || (prefs.theme === 'system' && systemLight);
  // "Calm" is on when the user picked it OR the OS asks for reduced motion.
  const calm = prefs.motion === 'calm' || osReduced;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      /* private mode — preferences just won't persist */
    }
    const root = document.documentElement;
    root.classList.toggle('theme-light', isLight);
    if (prefs.accent !== 'signature') root.dataset.accent = prefs.accent;
    else delete root.dataset.accent;
    if (prefs.motion === 'calm') root.dataset.motion = 'reduced';
    else delete root.dataset.motion;
    // Keep the browser chrome colour in sync with the active theme.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', isLight ? '#FFF8F1' : '#0B0B0D');
  }, [prefs, isLight]);

  const value = useMemo(
    () => ({
      ...prefs,
      isLight,
      calm,
      set: (patch) => setPrefs((p) => ({ ...p, ...patch })),
      reset: () => setPrefs(DEFAULTS),
    }),
    [prefs, isLight, calm]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences must be used inside <PreferencesProvider>');
  return ctx;
}
