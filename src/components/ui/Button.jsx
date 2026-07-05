import { Link } from 'react-router-dom';

/**
 * Polymorphic button. Renders a React Router <Link> for internal `to`, an <a>
 * for external `href`, or a <button> otherwise. Variants: primary (gold),
 * outline, ghost. All share the same hover-lift micro-interaction.
 */
const base =
  'group inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ease-snap focus-visible:outline-none active:scale-[0.97] disabled:opacity-60 disabled:pointer-events-none';

const sizes = {
  md: 'px-6 py-3',
  lg: 'px-8 py-4 text-base',
  sm: 'px-4 py-2 text-xs',
};

const variants = {
  primary:
    'bg-gold text-white hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgb(var(--c-gold)/0.6)]',
  outline:
    'border border-gold/60 text-ivory hover:border-gold hover:-translate-y-0.5 hover:bg-gold/10',
  // text-ink (not white): teal is BRIGHT in Midnight and DARK in Daylight, and
  // ink flips the opposite way, so this stays readable in both themes.
  whatsapp:
    'bg-teal text-ink hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgb(var(--c-teal)/0.6)]',
  ghost: 'text-ivory/90 hover:text-gold',
};

export default function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer' : undefined}
        className={cls}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  );
}

/** Small right-arrow that nudges on hover; pairs with Button/links. */
export function ArrowIcon({ className = '' }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform duration-300 ease-cinema group-hover:translate-x-1 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
