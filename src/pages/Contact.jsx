import Seo from '../components/Seo';
import PageHeader from '../components/sections/PageHeader';
import Reveal from '../components/ui/Reveal';
import Icon from '../components/ui/Icon';
import AvatarCharacter from '../components/ui/AvatarCharacter';
import InquiryForm from '../components/forms/InquiryForm';
import { contact, social, brand } from '../data/site';
import { track } from '../lib/track';

/**
 * Contact page: enquiry form + the two founders' direct lines. No street
 * address or map by request — we shoot on location, so the phones ARE the
 * studio. Open 24/7.
 */
export default function Contact() {
  return (
    <>
      <Seo
        title="Contact & Get a Quote"
        description={`Get a quote from ${brand.name} for any event in ${brand.city} and beyond — weddings, birthdays, parties, corporate and more. Call or WhatsApp the founders directly, 24/7.`}
        path="/contact"
      />
      <PageHeader
        eyebrow="Get a quote"
        title="Tell us about your event"
        intro="Fill in a few details and we’ll get back within 24 hours with a simple price. Prefer to talk? Both founders pick up directly — day or night."
        image="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=60"
      />

      <section className="pb-24">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <InquiryForm />
          </Reveal>

          {/* Direct lines to the founders */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="space-y-3">
              {contact.people.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl border border-line/60 bg-surface/40 p-4 transition-colors duration-300 hover:border-gold/50"
                >
                  <div className="flex items-center gap-4">
                    <AvatarCharacter variant={p.avatar} name={p.name} size={64} className="shrink-0" />
                    <div>
                      <span className="block text-xs uppercase tracking-widest2 text-muted">{p.role}</span>
                      <span className="font-serif text-lg text-ivory">{p.name}</span>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${p.phoneE164}`}
                      onClick={() => track('call_click', { person: p.id })}
                      className="flex items-center justify-center gap-2 rounded-full border border-gold/50 px-3 py-2.5 text-xs font-semibold text-ivory transition-colors hover:bg-gold/10"
                    >
                      <Icon name="phone" className="h-4 w-4 text-gold" /> {p.phoneDisplay}
                    </a>
                    <a
                      href={`https://wa.me/${p.whatsapp}?text=${encodeURIComponent(`Hi ${p.name.split(' ')[0]}! I'd like to enquire about photos/video for my event.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => track('whatsapp_click', { source: 'contact', person: p.id })}
                      className="flex items-center justify-center gap-2 rounded-full bg-teal px-3 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      <Icon name="whatsapp" filled className="h-4 w-4" /> WhatsApp
                    </a>
                  </div>
                </div>
              ))}

              {/* Email */}
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-4 rounded-xl border border-line/60 bg-surface/40 p-4 transition-colors duration-300 hover:border-gold/50"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
                  <Icon name="mail" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest2 text-muted">Email</span>
                  <span className="text-ivory">{contact.email}</span>
                </span>
              </a>

              {/* Always open */}
              <div className="flex items-center gap-4 rounded-xl border border-teal/40 bg-teal/5 p-4">
                <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal/10 text-teal">
                  <Icon name="clock" className="h-5 w-5" />
                  <span className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full bg-teal">
                    <span className="absolute inset-0 animate-ping rounded-full bg-teal/60" />
                  </span>
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest2 text-muted">Hours</span>
                  <span className="text-ivory">{contact.hours}</span>
                </span>
              </div>

              {/* Social */}
              <div className="flex items-center gap-3 rounded-xl border border-line/60 bg-surface/40 p-4">
                <span className="text-xs uppercase tracking-widest2 text-muted">Follow</span>
                <div className="flex gap-2">
                  {[
                    { n: 'instagram', h: social.instagram },
                    { n: 'youtube', h: social.youtube },
                    { n: 'facebook', h: social.facebook },
                  ].map((s) => (
                    <a key={s.n} href={s.h} target="_blank" rel="noreferrer" aria-label={s.n} className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-gold hover:text-gold">
                      <Icon name={s.n} className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              <p className="px-1 text-xs leading-relaxed text-muted">
                We’re an on-location crew — we come to your venue, anywhere. That’s why you’ll find
                phones here instead of a street address.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
