import Seo from '../components/Seo';
import PageHeader from '../components/sections/PageHeader';
import Reveal from '../components/ui/Reveal';
import Icon from '../components/ui/Icon';
import InquiryForm from '../components/forms/InquiryForm';
import { contact, social, brand, whatsappLink } from '../data/site';

const details = [
  { icon: 'phone', label: 'Call us', value: contact.phoneDisplay, href: `tel:${contact.phoneE164}` },
  { icon: 'whatsapp', label: 'WhatsApp', value: contact.phoneDisplay, href: whatsappLink() },
  { icon: 'mail', label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { icon: 'pin', label: 'Studio', value: contact.addressLines.join(', ') },
  { icon: 'clock', label: 'Hours', value: contact.hours },
];

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact & Get a Quote"
        description={`Get a quote from ${brand.name} for any event in ${brand.city} and beyond — weddings, birthdays, parties, corporate and more. Reach us by form, WhatsApp, phone or email.`}
        path="/contact"
      />
      <PageHeader
        eyebrow="Get a quote"
        title="Tell us about your event"
        intro="Fill in a few details and we’ll get back within 24 hours with a simple price. Prefer to chat? WhatsApp us — we reply fast."
        image="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=60"
      />

      <section className="pb-24">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <InquiryForm />
          </Reveal>

          {/* Details + map */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="space-y-3">
              {details.map((d) => {
                const Inner = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
                      <Icon name={d.icon} className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-widest2 text-muted">{d.label}</span>
                      <span className="text-ivory">{d.value}</span>
                    </span>
                  </>
                );
                return d.href ? (
                  <a
                    key={d.label}
                    href={d.href}
                    target={d.href.startsWith('http') ? '_blank' : undefined}
                    rel={d.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="flex items-center gap-4 rounded-xl border border-line/60 bg-surface/40 p-4 transition-colors duration-300 hover:border-gold/50"
                  >
                    {Inner}
                  </a>
                ) : (
                  <div key={d.label} className="flex items-center gap-4 rounded-xl border border-line/60 bg-surface/40 p-4">
                    {Inner}
                  </div>
                );
              })}

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

              {/* Embedded map */}
              <div className="overflow-hidden rounded-xl border border-line/60">
                <iframe
                  title={`${brand.name} location map`}
                  src={contact.mapEmbedSrc}
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
