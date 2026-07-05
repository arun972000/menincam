import Navbar from './Navbar';
import Footer from './Footer';
import MobileTabBar from './MobileTabBar';
import PageTransition from '../PageTransition';
import ScrollProgress from '../ScrollProgress';
import SpotlightCursor from '../SpotlightCursor';
import WhatsAppButton from '../conversion/WhatsAppButton';
import StickyCTA from '../conversion/StickyCTA';
import ExitIntent from '../conversion/ExitIntent';
import DateChecker from '../conversion/DateChecker';
import SettingsPanel from '../settings/SettingsPanel';

/** Page chrome shared by every route. */
export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Skip link for keyboard / screen-reader users. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      {/* Breathing room so the floating tab bar never covers footer content. */}
      <div aria-hidden="true" className="h-24 lg:hidden" />

      {/* Scroll progress + ambient cursor spotlight + route transition wipe */}
      <ScrollProgress />
      <SpotlightCursor />
      <PageTransition />

      {/* Conversion features. Desktop gets the floating widgets; mobile gets
          the app chrome (tab bar + sheets) instead. */}
      <WhatsAppButton />
      <StickyCTA />
      <ExitIntent />
      <MobileTabBar />
      <DateChecker />

      {/* User preferences: theme / accent / motion / effects + easter egg */}
      <SettingsPanel />
    </div>
  );
}
