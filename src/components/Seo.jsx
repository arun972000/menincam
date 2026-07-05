import { useEffect } from 'react';
import { brand } from '../data/site';

/**
 * Tiny dependency-free SEO helper. Sets per-page <title>, meta description,
 * canonical, and Open Graph tags by mutating the document head. Works fine for
 * a client-rendered SPA (and keeps the bundle lean, no react-helmet).
 */
function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function Seo({ title, description, image, path = '/', keywords, jsonLd }) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${brand.name}` : `${brand.name} · Photo & Video for Every Event`;
    document.title = fullTitle;

    setMeta('name', 'description', description);
    if (keywords) setMeta('name', 'keywords', keywords);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'website');
    if (image) setMeta('property', 'og:image', image);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);

    // Canonical link.
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://menincam.example.com${path}`);

    // Per-page structured data (FAQ, service lists…) for rich search results.
    const JSONLD_ID = 'seo-page-jsonld';
    let script = document.getElementById(JSONLD_ID);
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = JSONLD_ID;
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, image, path, keywords, jsonLd]);

  return null;
}
