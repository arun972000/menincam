import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePreferences, THEMES, ACCENTS } from '../../context/PreferencesContext';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { confettiBurst } from '../../lib/confetti';
import { EVENTS, onBus } from '../../lib/bus';

/**
 * "Make it yours": floating settings panel that lets visitors personalise the
 * site: Midnight/Daylight/Auto theme, accent colour, motion level and ambient
 * effects. Sits just above the WhatsApp button. Includes a playful
 * "Say cheese" camera-flash easter egg. All choices persist on the device via
 * PreferencesContext.
 */

function SlidersIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 7h9M19 7h1M4 17h3M13 17h7" strokeLinecap="round" />
      <circle cx="15.5" cy="7" r="2.3" />
      <circle cx="9.5" cy="17" r="2.3" />
    </svg>
  );
}

/** Small segmented control (theme / motion pickers). */
function Segmented({ label, value, onChange, options, cols = 3 }) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`grid gap-1 rounded-xl border border-line bg-ink/40 p-1 ${
        cols === 2 ? 'grid-cols-2' : 'grid-cols-3'
      }`}
    >
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          aria-pressed={value === o.id}
          className={`rounded-lg px-2 py-2 text-xs font-semibold transition-colors duration-300 ${
            value === o.id ? 'bg-gold text-white' : 'text-muted hover:text-ivory'
          }`}
        >
          <span aria-hidden="true" className="mr-1">
            {o.emoji}
          </span>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Accessible on/off switch row. */
function Toggle({ label, hint, checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 rounded-lg px-1 py-2 text-left transition-colors hover:bg-ink/30"
    >
      <span>
        <span className="block text-sm font-medium text-ivory">{label}</span>
        {hint && <span className="block text-xs text-muted">{hint}</span>}
      </span>
      <span
        aria-hidden="true"
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
          checked ? 'bg-gold' : 'bg-line'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ease-snap ${
            checked ? 'left-[1.375rem]' : 'left-0.5'
          }`}
        />
      </span>
    </button>
  );
}

const sectionLabel = 'mb-2 mt-4 block text-[11px] font-medium uppercase tracking-widest2 text-muted';

export default function SettingsPanel() {
  const prefs = usePreferences();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [flash, setFlash] = useState(false);

  // Close on Escape.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Openable from anywhere (mobile "More" sheet); the floating trigger is
  // desktop-only.
  useEffect(() => onBus(EVENTS.SETTINGS, () => setOpen(true)), []);

  // 📸 Easter egg: camera flash + confetti. Skipped entirely in Calm mode.
  const sayCheese = () => {
    if (prefs.calm || flash) return;
    setFlash(true);
    confettiBurst();
    window.setTimeout(() => setFlash(false), 700);
  };

  return (
    <>
      {/* Trigger: floats just above the WhatsApp button. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Personalise this site"
        className="group fixed bottom-[5.75rem] right-5 z-[45] hidden h-12 w-12 place-items-center rounded-full border border-line bg-surface text-ivory shadow-soft transition-all duration-300 ease-cinema hover:-translate-y-0.5 hover:border-gold/50 hover:text-gold sm:bottom-24 sm:right-6 lg:grid"
      >
        <SlidersIcon className="h-5 w-5 transition-transform duration-500 ease-cinema group-hover:rotate-90" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Click-away backdrop (transparent: the panel is a popover, not a modal). */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[55] bg-ink/20"
            />
            <motion.aside
              key="panel"
              role="dialog"
              aria-label="Site preferences"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-[9.25rem] right-5 z-[60] max-h-[min(72vh,34rem)] w-[19.5rem] max-w-[calc(100vw-2.5rem)] overflow-y-auto rounded-bento border border-line bg-surface p-5 shadow-lift sm:bottom-40 sm:right-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-lg text-ivory">Make it yours</h2>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={prefs.reset}
                    className="rounded-full px-2.5 py-1 text-xs text-muted transition-colors hover:text-gold"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close preferences"
                    className="grid h-7 w-7 place-items-center rounded-full text-muted transition-colors hover:text-ivory"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <span className={sectionLabel}>Theme</span>
              <Segmented
                label="Theme"
                value={prefs.theme}
                onChange={(theme) => prefs.set({ theme })}
                options={THEMES}
              />

              <span className={sectionLabel}>Accent colour</span>
              <div className="flex items-center gap-2.5" role="group" aria-label="Accent colour">
                {ACCENTS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => prefs.set({ accent: a.id })}
                    aria-pressed={prefs.accent === a.id}
                    aria-label={`${a.label} accent`}
                    title={a.label}
                    style={{ background: a.swatch }}
                    className={`h-8 w-8 rounded-full border border-white/20 transition-all duration-300 ease-snap hover:scale-110 ${
                      prefs.accent === a.id
                        ? 'ring-2 ring-ivory ring-offset-2 ring-offset-surface'
                        : ''
                    }`}
                  />
                ))}
              </div>

              <span className={sectionLabel}>Motion</span>
              <Segmented
                label="Motion"
                cols={2}
                value={prefs.motion}
                onChange={(motionPref) => prefs.set({ motion: motionPref })}
                options={[
                  { id: 'full', label: 'Cinematic', emoji: '🎬' },
                  { id: 'calm', label: 'Calm', emoji: '🍃' },
                ]}
              />

              {!isMobile && (
                <>
                  <span className={sectionLabel}>Effects</span>
                  <Toggle
                    label="Cursor spotlight"
                    hint="A soft glow that follows your mouse"
                    checked={prefs.spotlight}
                    onChange={(spotlight) => prefs.set({ spotlight })}
                  />
                  <Toggle
                    label="Smooth scrolling"
                    hint="Cinematic momentum while you scroll"
                    checked={prefs.smooth}
                    onChange={(smooth) => prefs.set({ smooth })}
                  />
                </>
              )}

              <span className={sectionLabel}>Just for fun</span>
              <button
                type="button"
                onClick={sayCheese}
                disabled={prefs.calm}
                className="w-full rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm font-semibold text-gold transition-colors duration-300 hover:bg-gold/20 disabled:cursor-not-allowed disabled:opacity-40"
              >
                📸 Say cheese, fire the flash!
              </button>
              {prefs.calm && (
                <p className="mt-1.5 text-center text-[11px] text-muted">
                  Turned off while Calm motion is on.
                </p>
              )}

              <p className="mt-4 text-center text-[11px] text-muted">
                Saved on this device. Tweak any time.
              </p>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Camera flash overlay for the easter egg. */}
      {flash && (
        <div aria-hidden="true" className="mic-flash pointer-events-none fixed inset-0 z-[90] bg-white" />
      )}
    </>
  );
}
