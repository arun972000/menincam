import Section from '../ui/Section';
import Reveal from '../ui/Reveal';
import Icon from '../ui/Icon';
import Magnetic from '../ui/Magnetic';
import { instagramPosts } from '../../data/press';
import { social } from '../../data/site';
import { track } from '../../lib/track';

/**
 * Instagram strip — the bridge to the real portfolio (@menincam). Static
 * thumbnails (lazy-loaded) linking to the profile: no Instagram embed SDK, so
 * zero third-party JS. The follow button wears Instagram's own gradient (a
 * recognisable trust cue that draws the eye without touching brand tokens).
 */
const IG_GRADIENT = 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)';

export default function InstagramStrip() {
  return (
    <Section className="bg-surface/30">
      <Reveal className="mb-10 flex flex-col items-center text-center">
        <p className="eyebrow mb-3 justify-center">
          <span className="rule-gold" /> See our work
        </p>
        <h2 className="font-display text-fluid-lg font-extrabold tracking-tight text-ivory text-balance">
          All our latest photos &amp; videos are on Instagram
        </h2>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <a
              href={social.instagram}
              target="_blank"
              rel="noreferrer"
              onClick={() => track('instagram_follow_click', { source: 'strip' })}
              className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-base font-bold text-white shadow-lift transition-transform duration-300 ease-snap hover:-translate-y-0.5 active:scale-[0.97]"
              style={{ background: IG_GRADIENT }}
            >
              <Icon name="instagram" className="h-5 w-5" /> Follow {social.instagramHandle}
            </a>
          </Magnetic>
          <a
            href={social.instagram}
            target="_blank"
            rel="noreferrer"
            onClick={() => track('instagram_dm_click', { source: 'strip' })}
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold text-ivory transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            DM us your date — we reply fast
          </a>
        </div>
      </Reveal>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
        {instagramPosts.map((src, i) => (
          <a
            key={i}
            href={social.instagram}
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-square overflow-hidden rounded-lg"
            aria-label={`View post on Instagram (${social.instagramHandle})`}
          >
            <img
              src={src}
              alt="Recent Men in Cam Instagram post"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 ease-cinema group-hover:scale-110"
            />
            <span className="absolute inset-0 grid place-items-center bg-black/0 text-white opacity-0 transition-all duration-300 group-hover:bg-black/50 group-hover:opacity-100">
              <Icon name="instagram" className="h-6 w-6" />
            </span>
          </a>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-muted">
        Tap any photo to open {social.instagramHandle} · placeholder thumbnails until the real feed
      </p>
    </Section>
  );
}
