import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Section, { SectionHeading } from '../ui/Section';
import Button, { ArrowIcon } from '../ui/Button';
import Reveal from '../ui/Reveal';
import { faqs } from '../../data/faqs';

/** Home FAQ teaser — the top questions, answered inline to lower friction. */
export default function HomeFAQ() {
  const [open, setOpen] = useState(0);
  const items = faqs.slice(0, 5);

  return (
    <Section>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Good to know"
            title="Quick answers, no surprises"
            intro="The things people ask us most — answered up front. Still curious? We’re a message away."
          />
          <Reveal className="mt-7 flex flex-wrap gap-3">
            <Button to="/faq" variant="outline">
              See all FAQs <ArrowIcon />
            </Button>
            <Button to="/contact" variant="ghost">
              Ask us anything
            </Button>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7">
          <div className="panel divide-y divide-line/70 overflow-hidden">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:text-gold"
                  >
                    <span className="font-display text-base font-bold text-ivory sm:text-lg">{item.q}</span>
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-gold transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
