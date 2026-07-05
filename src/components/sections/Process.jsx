import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Section, { SectionHeading } from '../ui/Section';
import Button, { ArrowIcon } from '../ui/Button';
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal';
import { process } from '../../data/studio';

export default function Process() {
  const [active, setActive] = useState(0);

  return (
    <Section className="bg-surface/40">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="How it works"
          title="Booking is quick and simple"
          intro="No confusing steps or pushy calls. Just four easy steps from your first message to your photos."
        />
        <Button to="/contact" variant="ghost" className="shrink-0">
          Start with your date <ArrowIcon />
        </Button>
      </div>

      {/* ── Mobile: simple stacked cards ─────────────────────────── */}
      <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {process.map((p) => (
          <RevealItem key={p.step} className="panel p-7">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold text-lg font-extrabold text-white shadow-glow">
              {p.step}
            </span>
            <h3 className="mt-5 font-display text-lg font-bold text-ivory">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* ── Desktop: pinned sticky-scroll storytelling ───────────── */}
      <div className="mt-14 hidden lg:grid lg:grid-cols-2 lg:gap-16">
        {/* Sticky synced visual */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="panel relative flex aspect-square flex-col justify-between overflow-hidden p-9">
            {/* soft accent bloom */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />
            <span className="chip w-fit !border-gold/30 !bg-gold/5 !text-ivory">Your journey</span>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="block font-display text-[9rem] font-extrabold leading-none text-gold">
                  {process[active].step}
                </span>
                <h3 className="mt-1 font-display text-4xl font-extrabold text-ivory">{process[active].title}</h3>
              </motion.div>
            </AnimatePresence>

            {/* Progress rail */}
            <div className="flex gap-2">
              {process.map((p, i) => (
                <span
                  key={p.step}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                    i <= active ? 'bg-gold' : 'bg-line'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling steps that drive the active index */}
        <div>
          {process.map((p, i) => (
            <motion.div
              key={p.step}
              onViewportEnter={() => setActive(i)}
              viewport={{ amount: 0.6, margin: '-15% 0px -15% 0px' }}
              className="flex min-h-[60vh] flex-col justify-center"
            >
              <span className="font-display text-6xl font-extrabold text-gold/25">{p.step}</span>
              <h3 className="mt-3 font-display text-3xl font-extrabold text-ivory">{p.title}</h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <Reveal className="mt-12 text-center">
        <Button to="/contact" size="lg">
          Check your date <ArrowIcon />
        </Button>
      </Reveal>
    </Section>
  );
}
