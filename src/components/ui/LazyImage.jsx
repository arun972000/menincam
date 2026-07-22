import { useRef, useState } from 'react';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { usePreferences } from '../../context/PreferencesContext';

/**
 * Performance-first image:
 *  - native loading="lazy" + async decoding
 *  - responsive WebP srcset (built from Unsplash/imgix params)
 *  - blur-up: a tiny blurred version fades out as the full image loads
 *  - reserves space via aspect-ratio to avoid layout shift (CLS)
 *  - "darkroom develop": images enter grayscale + soft-blurred and develop into
 *    full colour as they scroll into view — the site's signature image motion.
 *    (Pure CSS filter on the wrapper; skipped for priority/LCP images and in
 *    Calm mode.)
 *
 * Pass `ratio` (width / height) so the box is sized before the image arrives.
 * `priority` opts the LCP image out of lazy-loading (and out of the develop
 * effect). `develop={false}` opts a single image out.
 */

// Swap the width on an Unsplash-style URL and request WebP.
function withParams(src, { w, q = 70, blur } = {}) {
  try {
    const url = new URL(src);
    if (w) url.searchParams.set('w', String(w));
    url.searchParams.set('q', String(q));
    url.searchParams.set('fm', 'webp');
    url.searchParams.set('auto', 'format');
    if (blur) url.searchParams.set('blur', String(blur));
    return url.toString();
  } catch {
    return src;
  }
}

const WIDTHS = [400, 640, 900, 1280];

export default function LazyImage({
  src,
  alt,
  ratio = 1,
  className = '',
  imgClassName = '',
  sizes = '(max-width: 768px) 100vw, 33vw',
  priority = false,
  rounded = true,
  develop = true,
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  const { calm } = usePreferences();
  const [viewRef, inView] = useInViewOnce({ threshold: 0.2 });

  const srcSet = WIDTHS.map((w) => `${withParams(src, { w })} ${w}w`).join(', ');
  const placeholder = withParams(src, { w: 24, q: 20, blur: 600 });

  // Darkroom develop: applies until the image has both loaded AND entered view.
  const developing = develop && !priority && !calm && !(inView && loaded);

  return (
    <div
      ref={viewRef}
      className={`relative overflow-hidden ${rounded ? 'rounded-xl' : ''} bg-surface transition-[filter] duration-1000 ease-cinema ${className}`}
      style={{
        aspectRatio: ratio,
        filter: developing ? 'grayscale(1) blur(4px)' : 'none',
      }}
    >
      {/* Blurred low-res placeholder (instant) */}
      <img
        src={placeholder}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full scale-110 object-cover blur-xl transition-opacity duration-700 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {/* Full image */}
      <img
        ref={imgRef}
        src={withParams(src, { w: 900 })}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        fetchpriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-cinema ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  );
}
