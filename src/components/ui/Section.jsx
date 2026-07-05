import Reveal from './Reveal';
import FocusText from './FocusText';

/** Generic vertical-rhythm section wrapper. */
export default function Section({ id, className = '', children, container = true }) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      {container ? <div className="container-x">{children}</div> : children}
    </section>
  );
}

/** Eyebrow + serif heading + optional intro, with a reveal animation. */
export function SectionHeading({ eyebrow, title, intro, align = 'left', className = '' }) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow && (
        <span className="eyebrow">
          <span className="rule-gold" /> {eyebrow}
        </span>
      )}
      <h2 className="font-display text-fluid-xl font-extrabold leading-[1.05] tracking-tight text-ivory text-balance">
        {typeof title === 'string' ? <FocusText>{title}</FocusText> : title}
      </h2>
      {intro && <p className="text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
    </Reveal>
  );
}
