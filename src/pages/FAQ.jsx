import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Seo from '../components/Seo';
import PageHeader from '../components/sections/PageHeader';
import Reveal from '../components/ui/Reveal';
import CTABand from '../components/sections/CTABand';
import { faqs } from '../data/faqs';

function AccordionItem({ item, isOpen, onToggle, id }) {
  return (
    <div className="border-b border-line/60">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${id}`}
          id={`faq-button-${id}`}
          className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:text-gold"
        >
          <span className="font-serif text-lg text-ivory sm:text-xl">{item.q}</span>
          <span
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-gold transition-transform duration-300 ${
              isOpen ? 'rotate-45' : ''
            }`}
            aria-hidden="true"
          >
            +
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${id}`}
            role="region"
            aria-labelledby={`faq-button-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 leading-relaxed text-muted">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <>
      <Seo
        title="FAQ"
        description="Common questions about Men in Cam — what events we cover, travel, delivery times, booking and pricing. Quick, simple answers."
        path="/faq"
      />
      <PageHeader
        eyebrow="Good to know"
        title="Common questions"
        intro="The things people ask us most. Can’t find your answer? Just send us a message."
        image="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=60"
      />

      <section className="pb-8">
        <Reveal className="container-x mx-auto max-w-3xl">
          {faqs.map((item, i) => (
            <AccordionItem
              key={item.q}
              id={i}
              item={item}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </Reveal>
      </section>

      <CTABand
        eyebrow="Still curious?"
        title="Ask us anything — really."
        body="No question is too small. Tell us what’s on your mind and we’ll help you plan."
      />
    </>
  );
}
