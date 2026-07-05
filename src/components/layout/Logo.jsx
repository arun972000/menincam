import { Link } from 'react-router-dom';
import { brand } from '../../data/site';

/**
 * Men in Cam wordmark — a bold all-caps lockup with a camera-lens mark whose
 * iris glows in the tangerine accent. Pure SVG/CSS, no image request. Colours
 * read from theme tokens so it adapts to the optional dark variant too.
 */
export default function Logo({ className = '', onDark = false }) {
  // onDark: forced-white lockup for when the navbar is transparent over a
  // photo (the ivory token flips to near-black in Daylight and would vanish).
  const ring = onDark ? '#ffffff' : 'rgb(var(--c-ivory))';
  return (
    <Link
      to="/"
      className={`group flex items-center gap-2.5 ${className}`}
      aria-label={`${brand.name} — Photo & Video — home`}
    >
      {/* Camera-lens mark */}
      <span className="relative grid h-9 w-9 place-items-center transition-transform duration-300 ease-cinema group-hover:rotate-12">
        <svg viewBox="0 0 40 40" className="h-9 w-9" fill="none" aria-hidden="true">
          <circle cx="20" cy="20" r="17" stroke={ring} strokeWidth="2.6" />
          <circle cx="20" cy="20" r="10.5" stroke={ring} strokeWidth="1.8" strokeOpacity="0.45" />
          <circle cx="20" cy="20" r="5.6" fill="rgb(var(--c-gold))" />
          <circle cx="23.4" cy="16.2" r="1.5" fill="#ffffff" />
        </svg>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-extrabold uppercase tracking-tight ${
            onDark ? 'text-white' : 'text-ivory'
          }`}
        >
          Men in <span className="text-gold">Cam</span>
        </span>
        <span
          className={`mt-0.5 text-[9px] font-medium uppercase tracking-widest2 ${
            onDark ? 'text-white/70' : 'text-muted'
          }`}
        >
          Photo &amp; Video
        </span>
      </span>
    </Link>
  );
}
