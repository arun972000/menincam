import Section from '../ui/Section';
import Reveal from '../ui/Reveal';
import Icon from '../ui/Icon';
import { instagramPosts } from '../../data/press';
import { social } from '../../data/site';

/**
 * Instagram feed strip. Static thumbnails (lazy-loaded) linking to the profile
 * with no Instagram embed SDK, so zero third-party JS. Swap for a real feed later.
 */
export default function InstagramStrip() {
  return (
    <Section className="bg-surface/30">
      <Reveal className="mb-10 flex flex-col items-center text-center">
        <p className="eyebrow mb-3 justify-center">
          <span className="rule-gold" /> See our work
        </p>
        <h2 className="font-serif text-3xl text-ivory sm:text-4xl">
          All our latest photos &amp; videos are on Instagram
        </h2>
        <a
          href={social.instagram}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-xl font-bold text-gold transition-colors hover:text-ivory"
        >
          <Icon name="instagram" className="h-6 w-6" /> Follow {social.instagramHandle}
        </a>
      </Reveal>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
        {instagramPosts.map((src, i) => (
          <a
            key={i}
            href={social.instagram}
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-square overflow-hidden rounded-lg"
            aria-label="View on Instagram"
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
    </Section>
  );
}
