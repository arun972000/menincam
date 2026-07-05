/**
 * Minimal app event bus: lets any component open globally-mounted overlays
 * (the "Check your date" sheet, the Settings panel) without prop-drilling or
 * context rewiring. Components mount once in Layout and subscribe here.
 */
const bus = new EventTarget();

export const EVENTS = {
  DATECHECKER: 'mic:datechecker',
  SETTINGS: 'mic:settings',
};

/** Open the "Check your date" flow. `source` feeds analytics. */
export function openDateChecker(source = 'unknown') {
  bus.dispatchEvent(new CustomEvent(EVENTS.DATECHECKER, { detail: { source } }));
}

/** Open the site Settings ("Make it yours") panel. */
export function openSettings() {
  bus.dispatchEvent(new CustomEvent(EVENTS.SETTINGS));
}

/** Subscribe; returns an unsubscribe function (use in useEffect). */
export function onBus(event, handler) {
  bus.addEventListener(event, handler);
  return () => bus.removeEventListener(event, handler);
}
