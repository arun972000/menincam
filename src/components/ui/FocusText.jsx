import { motion } from 'framer-motion';
import { usePreferences } from '../../context/PreferencesContext';

/**
 * "Focus pull" text reveal: words rack from a soft blur into sharp focus as
 * the heading scrolls into view, like a lens finding its subject. Used by
 * SectionHeading so every section title across the site shares the same
 * signature reveal. String children only; anything else passes through.
 *
 * Zero CLS by construction: each word stays an inline-block in normal flow
 * (trailing spaces preserved), so lines wrap exactly like the plain string.
 * Calm mode (which already includes the OS reduced-motion setting) renders
 * instantly as plain text.
 */
export default function FocusText({ children, className = '' }) {
  const { calm } = usePreferences();

  const text = typeof children === 'string' ? children : null;
  if (text === null) return children;
  if (calm) return <span className={className}>{children}</span>;

  const words = text.split(' ');
  return (
    // No aria-label here: we split by WORD (not letter), so a screen reader
    // reads the word spans as one natural phrase. (aria-label on a span with
    // no role is prohibited and fails axe.)
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-[filter,transform]"
          variants={{
            hidden: { opacity: 0, y: 12, filter: 'blur(8px)' },
            show: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
}
