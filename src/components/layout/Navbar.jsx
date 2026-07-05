import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { nav, whatsappLink } from '../../data/site';
import Logo from './Logo';
import Button, { ArrowIcon } from '../ui/Button';
import Icon from '../ui/Icon';
import { track } from '../../lib/track';

/**
 * Sticky top bar: transparent over the hero, frosted/solid once scrolled.
 * Desktop shows inline links + CTA. On mobile there is NO hamburger: primary
 * navigation lives in the bottom tab bar (app chrome), so the top bar stays
 * minimal: logo + a WhatsApp quick action.
 */

// Routes whose header sits over a dark-scrimmed photo. While the navbar is
// transparent on these, text is forced white so it reads in BOTH themes.
const PHOTO_ROUTES = ['/', '/about', '/services', '/packages', '/contact', '/faq'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const overPhoto = !scrolled && PHOTO_ROUTES.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-cinema ${
        scrolled
          ? 'border-b border-line/60 bg-ink/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between sm:h-20">
        <Logo onDark={overPhoto} />

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {nav.slice(0, 8).map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `relative text-sm tracking-wide transition-colors duration-300 hover:text-gold ${
                    isActive ? 'text-gold' : overPhoto ? 'text-white/85' : 'text-ivory/80'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button to="/contact" size="sm">
            Get a quote <ArrowIcon />
          </Button>
        </div>

        {/* Mobile quick action: navigation lives in the bottom tab bar. */}
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Men in Cam on WhatsApp"
          onClick={() => track('whatsapp_click', { source: 'topbar' })}
          className={`grid h-10 w-10 place-items-center rounded-full border transition-colors duration-300 lg:hidden ${
            overPhoto
              ? 'border-white/30 bg-black/20 text-white backdrop-blur-sm'
              : 'border-line bg-surface text-ivory'
          }`}
        >
          <Icon name="whatsapp" filled className="h-5 w-5" />
        </a>
      </nav>
    </header>
  );
}
