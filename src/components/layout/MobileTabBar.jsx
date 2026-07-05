import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import BottomSheet from '../ui/BottomSheet';
import Icon from '../ui/Icon';
import { contact, social, whatsappLink } from '../../data/site';
import { usePreferences } from '../../context/PreferencesContext';
import { openDateChecker, openSettings } from '../../lib/bus';
import { track } from '../../lib/track';
import { tap } from '../../lib/haptics';

/**
 * The mobile app chrome: a floating dock (not a full-width web bar) with a
 * raised camera "Book" action in the middle. Replaces the hamburger menu below
 * lg: primary pages are tabs, everything else lives in the "More" sheet.
 * Active tab gets an animated accent pill (shared layoutId).
 */

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

const HomeIcon = (p) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M4 11.5 12 4l8 7.5" />
    <path d="M6.5 10.5V20h11v-9.5" />
  </svg>
);
const GridIcon = (p) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}>
    <rect x="4" y="4" width="7" height="7" rx="2" />
    <rect x="13" y="4" width="7" height="7" rx="2" />
    <rect x="4" y="13" width="7" height="7" rx="2" />
    <rect x="13" y="13" width="7" height="7" rx="2" />
  </svg>
);
const LayersIcon = (p) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="m12 3 8.5 5L12 13 3.5 8 12 3Z" />
    <path d="m4.5 12.5 7.5 4.5 7.5-4.5" />
    <path d="m4.5 16.5 7.5 4.5 7.5-4.5" />
  </svg>
);
const DotsIcon = (p) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}>
    <circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);
const CameraIcon = (p) => (
  <svg viewBox="0 0 24 24" {...stroke} {...p}>
    <path d="M4 8.5h3l1.6-2.5h6.8L17 8.5h3a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1Z" />
    <circle cx="12" cy="13.5" r="3.4" />
  </svg>
);

const TABS_LEFT = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/services', label: 'Covered', icon: GridIcon },
];
const TABS_RIGHT = [{ to: '/packages', label: 'Packages', icon: LayersIcon }];

function Tab({ to, label, icon: IconEl }) {
  return (
    <NavLink
      to={to}
      onClick={() => tap()}
      className="relative flex flex-1 flex-col items-center gap-1 py-2.5"
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="tab-pill"
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="absolute inset-x-2 inset-y-1 rounded-xl bg-gold/10"
            />
          )}
          <IconEl className={`relative h-5 w-5 ${isActive ? 'text-gold' : 'text-muted'}`} />
          <span
            className={`relative text-[10px] font-semibold tracking-wide ${
              isActive ? 'text-gold' : 'text-muted'
            }`}
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
}

/** Row inside the More sheet. */
function MoreLink({ to, title, sub, onNavigate }) {
  return (
    <NavLink
      to={to}
      onClick={() => {
        tap();
        onNavigate();
      }}
      className="flex items-center justify-between rounded-2xl border border-line bg-ink/40 px-4 py-3.5 transition-colors active:bg-ink/60"
    >
      <span>
        <span className="block text-sm font-semibold text-ivory">{title}</span>
        <span className="block text-xs text-muted">{sub}</span>
      </span>
      <span className="text-muted" aria-hidden="true">
        →
      </span>
    </NavLink>
  );
}

export default function MobileTabBar() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { pathname } = useLocation();
  const { calm } = usePreferences();
  const { scrollY } = useScroll();

  // Smart dock: slides away while reading down, springs back on a flick up
  // (like native app chrome). 6px deadband stops jitter from momentum scroll;
  // pinned visible near the top of every page. Calm users keep it always on.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const d = y - prev;
    if (y < 120 || d < -6) setHidden(false);
    else if (d > 6) setHidden(true);
  });

  // Close the More sheet + re-show the dock after navigating.
  useEffect(() => {
    setMoreOpen(false);
    setHidden(false);
  }, [pathname]);
  useEffect(() => {
    if (moreOpen) setHidden(false);
  }, [moreOpen]);

  const moreActive = ['/about', '/faq', '/contact'].includes(pathname);

  return (
    <>
      <nav
        aria-label="App navigation"
        className="fixed inset-x-3 z-40 lg:hidden"
        style={{ bottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <motion.div
          animate={{ y: hidden && !calm ? 110 : 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
          className="mx-auto flex max-w-md items-stretch rounded-2xl border border-line bg-surface/90 shadow-lift backdrop-blur-xl"
        >
          {TABS_LEFT.map((t) => (
            <Tab key={t.to} {...t} />
          ))}

          {/* Raised "Book" action, the heart of the mobile experience. */}
          <div className="relative flex flex-1 items-end justify-center pb-1.5">
            <button
              type="button"
              onClick={() => {
                tap(12);
                openDateChecker('tabbar');
              }}
              aria-label="Book: check your date"
              className="absolute -top-6 grid h-14 w-14 place-items-center rounded-full bg-gold text-white shadow-glow transition-transform duration-200 ease-snap active:scale-90"
            >
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-gold/30 [animation-duration:2.4s]" />
              <CameraIcon className="h-6 w-6" />
            </button>
            <span className="text-[10px] font-semibold tracking-wide text-gold">Book</span>
          </div>

          {TABS_RIGHT.map((t) => (
            <Tab key={t.to} {...t} />
          ))}

          <button
            type="button"
            onClick={() => {
              tap();
              setMoreOpen(true);
            }}
            aria-label="More pages and options"
            aria-expanded={moreOpen}
            className="relative flex flex-1 flex-col items-center gap-1 py-2.5"
          >
            {moreActive && (
              <motion.span
                layoutId="tab-pill"
                transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                className="absolute inset-x-2 inset-y-1 rounded-xl bg-gold/10"
              />
            )}
            <DotsIcon className={`relative h-5 w-5 ${moreActive ? 'text-gold' : 'text-muted'}`} />
            <span
              className={`relative text-[10px] font-semibold tracking-wide ${
                moreActive ? 'text-gold' : 'text-muted'
              }`}
            >
              More
            </span>
          </button>
        </motion.div>
      </nav>

      {/* ── "More" hub sheet ── */}
      <BottomSheet open={moreOpen} onClose={() => setMoreOpen(false)} label="More pages and options">
        <div className="pb-3 pt-1">
          <h2 className="font-serif text-xl text-ivory">More</h2>
          <div className="mt-4 flex flex-col gap-2.5">
            <MoreLink to="/about" title="About us" sub="Who we are & how we work" onNavigate={() => setMoreOpen(false)} />
            <MoreLink to="/faq" title="Common questions" sub="Delivery times, travel, booking" onNavigate={() => setMoreOpen(false)} />
            <MoreLink to="/contact" title="Contact & directions" sub="Form, phone, studio map" onNavigate={() => setMoreOpen(false)} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <a
              href={`tel:${contact.phoneE164}`}
              onClick={() => tap()}
              className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-ink/40 px-4 py-3.5 text-sm font-semibold text-ivory active:bg-ink/60"
            >
              <Icon name="phone" className="h-5 w-5 text-gold" /> Call us
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                tap();
                track('whatsapp_click', { source: 'more_sheet' });
              }}
              className="flex items-center justify-center gap-2 rounded-2xl bg-teal px-4 py-3.5 text-sm font-semibold text-ink active:opacity-90"
            >
              <Icon name="whatsapp" filled className="h-5 w-5" /> WhatsApp
            </a>
          </div>

          <button
            type="button"
            onClick={() => {
              tap();
              setMoreOpen(false);
              openSettings();
            }}
            className="mt-2.5 flex w-full items-center justify-between rounded-2xl border border-gold/40 bg-gold/10 px-4 py-3.5 text-sm font-semibold text-gold active:bg-gold/20"
          >
            🎨 Personalise this site
            <span aria-hidden="true">→</span>
          </button>

          <div className="mt-5 flex items-center justify-between border-t border-line/60 pt-4">
            <a
              href={social.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-muted transition-colors hover:text-gold"
            >
              Instagram {social.instagramHandle}
            </a>
            <span className="text-xs text-muted">{contact.hours}</span>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
