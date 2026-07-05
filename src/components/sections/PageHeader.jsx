import { motion } from 'framer-motion';

/**
 * Shared inner-page hero. A compact header over a real event photo with a dark
 * scrim, so the headline stays legible on the bright site. (When no image is
 * passed it falls back to plain page colours.)
 */
export default function PageHeader({ eyebrow, title, intro, image, align = 'center' }) {
  const center = align === 'center';
  const onPhoto = Boolean(image);
  return (
    <header className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
      {onPhoto && (
        <>
          <img
            src={`${image}&w=1600`}
            alt=""
            aria-hidden="true"
            fetchpriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* True dark scrim so white text reads on any photo */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/60 to-black/75" />
        </>
      )}
      <div className="container-x relative">
        <div className={`max-w-3xl ${center ? 'mx-auto text-center' : 'text-left'}`}>
          <motion.p
            className={`eyebrow mb-5 ${center ? 'justify-center' : ''}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="rule-gold" /> {eyebrow}
          </motion.p>
          <motion.h1
            className={`font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl ${
              onPhoto ? 'text-white' : 'text-ivory'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h1>
          {intro && (
            <motion.p
              className={`mt-5 text-base leading-relaxed sm:text-lg ${center ? 'mx-auto max-w-2xl' : 'max-w-2xl'} ${
                onPhoto ? 'text-white/85' : 'text-muted'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {intro}
            </motion.p>
          )}
        </div>
      </div>
    </header>
  );
}
