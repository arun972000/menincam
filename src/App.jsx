import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Layout from './components/layout/Layout';
import SmoothScroll from './components/SmoothScroll';
import PageLoader from './components/ui/PageLoader';
import { usePreferences } from './context/PreferencesContext';

// ─── Route-based code splitting ──────────────────────────────────────────────
// Every page is its own lazy chunk so the initial bundle stays lean. Home is
// loaded eagerly-ish but still split from the 3D libraries (those load only
// when the hero mounts).
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Packages = lazy(() => import('./pages/Packages'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const { calm } = usePreferences();
  return (
    // "Calm" mode (Settings panel) silences Framer Motion animations app-wide,
    // on top of the CSS rules that silence plain CSS animations.
    <MotionConfig reducedMotion={calm ? 'always' : 'user'}>
      <SmoothScroll />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </MotionConfig>
  );
}
