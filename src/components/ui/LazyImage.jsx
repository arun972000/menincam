import { useRef, useState } from 'react';

/**
 * Performance-first image:
 *  - native loading="lazy" + async decoding
 *  - responsive WebP srcset (built from Unsplash/imgix params)
 *  - blur-up: a tiny blurred version fades out as the full image loads
 *  - reserves space via aspect-ratio to avoid layout shift (CLS)
 *
 * Pass `ratio` (width / height) so the box is sized before the image arrives.
 * `priority` opts the LCP image out of lazy-loading.
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
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  const srcSet = WIDTHS.map((w) => `${withParams(src, { w })} ${w}w`).join(', ');
  const placeholder = withParams(src, { w: 24, q: 20, blur: 600 });

  return (
    <div
      className={`relative overflow-hidden ${rounded ? 'rounded-xl' : ''} bg-surface ${className}`}
      style={{ aspectRatio: ratio }}
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
