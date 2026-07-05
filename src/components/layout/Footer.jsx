import { Link } from 'react-router-dom';
import { brand, contact, social, nav, whatsappLink } from '../../data/site';
import Icon from '../ui/Icon';
import Button, { ArrowIcon } from '../ui/Button';

const socialLinks = [
  { name: 'instagram', href: social.instagram, label: 'Instagram' },
  { name: 'youtube', href: social.youtube, label: 'YouTube' },
  { name: 'facebook', href: social.facebook, label: 'Facebook' },
  { name: 'whatsapp', href: whatsappLink(), label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer className="border-t border-line/60 bg-ink">
      {/* Closing CTA */}
      <div className="container-x py-16 sm:py-20">
        <div className="flex flex-col items-start gap-6 border-b border-line/50 pb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow mb-4">
              <span className="rule-gold" /> Got an event coming up?
            </p>
            <h2 className="font-serif text-3xl leading-tight text-ivory sm:text-4xl lg:text-5xl">
              Let’s capture it for you.
            </h2>
          </div>
          <Button to="/contact" size="lg">
            Check your date <ArrowIcon />
          </Button>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-serif text-2xl text-ivory">{brand.name}</span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{brand.tagline}</p>
            <p className="mt-4 text-xs uppercase tracking-widest2 text-muted">{brand.baseLine}</p>
          </div>

          <div>
            <h3 className="mb-4 text-xs uppercase tracking-widest2 text-gold">Explore</h3>
            <ul className="space-y-2.5">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-muted transition-colors hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs uppercase tracking-widest2 text-gold">Get in touch</h3>
            <ul className="space-y-3 text-sm text-muted">
              {contact.people.map((p) => (
                <li key={p.id}>
                  <a href={`tel:${p.phoneE164}`} className="flex items-center gap-2 transition-colors hover:text-ivory">
                    <Icon name="phone" className="h-4 w-4 text-gold" /> {p.phoneDisplay}
                    <span className="text-xs text-muted/80">· {p.name.split(' ')[0]}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 transition-colors hover:text-ivory">
                  <Icon name="mail" className="h-4 w-4 text-gold" /> {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
                </span>
                {contact.hours}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs uppercase tracking-widest2 text-gold">Follow the work</h3>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                >
                  <Icon name={s.name} className="h-5 w-5" />
                </a>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted">{social.instagramHandle}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-line/50">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <p>
            {brand.tagline} <span className="text-gold">·</span> Made with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
