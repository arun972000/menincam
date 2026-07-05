# Men in Cam — Photo & Video for Every Event

A clean, fast, conversion-focused **static** website for **Men in Cam**, a photo &
video crew that covers **all kinds of events** (weddings, birthdays, parties,
corporate days and more). No backend — deployable to Netlify or Vercel in minutes.

> **The site's job is to get enquiries, not to be a gallery.** Portfolio, films,
> reviews and a journal live on **Instagram** for now — the website focuses on
> attracting visitors and turning them into leads. Those pages can be added back
> in a later phase (the components/patterns are easy to reintroduce).

> **Theme:** _"Daylight Squad"_ — bright, friendly and tap-first. A warm **cream**
> canvas, one bold **tangerine** action accent (`#E8480C`), and a **teal** trust
> cue (`#0E9E8E`), set in **Plus Jakarta Sans** + **Inter**. Deliberately *not*
> a premium/luxury look — it matches the fun, confident "Men in Cam" name.

> **Tagline:** _"The squad that shows up and nails the shot."_
> Alternatives (in `src/data/site.js`):
> - "Big day or small party — we bring the cameras."
> - "Tap. Book. We handle the rest."

---

## ✨ Highlights

- **React + Vite + React Router** SPA, route-based code-splitting.
- **Tailwind CSS** with a single-token theme — every colour reads through 6 CSS variables, so the whole site re-skins by editing one block (an optional `.theme-dark` variant is included).
- **WebGL-free hero** — a friendly two-column layout (bold headline on cream + a framed, crossfading event photo and a floating proof badge). Loads instantly, works on every device.
- **Simple, everyday language** throughout — written so anyone can understand it at a glance.
- **Lead-gen first**: floating WhatsApp button, scroll-triggered sticky CTA, exit-intent popup, low-friction enquiry form, **and a no-price packages page** that turns curiosity into a quote request (send details → get a price).
- **Performance-obsessed**: LCP hero frame eager-loaded with `fetchpriority`, secondary frames mounted post-idle, blur-up lazy images with WebP `srcset`, no CLS, lean initial bundle.
- **Accessible**: keyboard nav, focus rings, reduced-motion support, semantic headings, alt text.

### Pages
`Home` · `About` · `What We Cover` (services) · `Packages` (no prices) · `FAQ` · `Contact`
*(Portfolio / Films / Reviews / Journal intentionally omitted for this phase.)*

---

## 🚀 Getting started

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

Requires Node 18+.

---

## 🖼️ Where to drop your real photos

All content is hardcoded in **`/src/data`** — no CMS, no database. Every image is
a free Unsplash placeholder marked `// TODO: replace with real Men in Cam photos`.

| What | File |
| --- | --- |
| Brand, contact, social, nav, taglines | `src/data/site.js` |
| Trust-bar counters | `src/data/stats.js` |
| What we cover — events (copy + photos) | `src/data/services.js` |
| Packages (inclusions, **no prices**) | `src/data/packages.js` |
| Why-us / process / promises | `src/data/studio.js` |
| FAQ | `src/data/faqs.js` |
| Team & founders | `src/data/team.js` |
| Trust strip / awards / event-types / Instagram | `src/data/press.js` |

The **hero frames** live in `src/components/hero/CinematicBackdrop.jsx`
(`FRAMES` array). The first one is the LCP image — swap it for your best real
Men in Cam frame for the strongest first impression.

> **Tip:** the gallery uses Unsplash's imgix params to generate WebP `srcset`
> and blur-up placeholders automatically. If you host images elsewhere, update
> `withParams()` in `src/components/ui/LazyImage.jsx` to match your CDN.

---

## 📨 EmailJS + WhatsApp (the inquiry form)

The form (`src/components/forms/InquiryForm.jsx`) submits via **EmailJS** with a
**WhatsApp deep-link fallback** — zero server code.

1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. Copy `.env.example` → `.env` and fill in:

   ```env
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
   ```

3. Your EmailJS template should accept these variables: `from_name`, `phone`,
   `email`, `event_type`, `event_date`, `city`, `budget`, `message`.

**Until keys are added**, the form gracefully opens a pre-filled WhatsApp chat
instead — so it works out of the box.

### WhatsApp / phone / map

Edit `src/data/site.js`:

- `contact.whatsappNumber` — international format, **no `+` or spaces** (e.g. `919876543210`).
- `contact.phoneDisplay` / `contact.phoneE164`, `contact.email`.
- `contact.mapEmbedSrc` — Google Maps → Share → **Embed a map** → copy the `src`.
- `social.*` — your Instagram, YouTube, Facebook links.

---

## 🎨 Theme: "Daylight Squad" (one-block swap)

Colours are CSS variables in `src/index.css` (`:root`) and mapped to Tailwind
tokens. The whole site re-skins by editing that one block:

| Token | Value | Role |
| --- | --- | --- |
| `ink` | `#FFF8F1` | page background (warm cream) |
| `surface` | `#FFFFFF` | raised cards / form fields |
| `ivory` | `#1A1614` | primary text (near-black) |
| `muted` | `#6B5F57` | secondary text |
| `gold` | `#E8480C` | **tangerine** action accent (buttons/links) |
| `teal` | `#0E9E8E` | trust / WhatsApp / success cue |
| `line` | `#F0E4D8` | hairline borders |

> The token **names** are kept from the old theme (so no components needed
> rewriting) but the **values** flipped from dark→light. That means `ink` is now
> a *light* value and `ivory` is now a *dark* value. Any text placed directly on
> a **photo** therefore uses a hardcoded dark scrim + white text, not the tokens.

A ready-made **`.theme-dark`** block is included — add `class="theme-dark"` to
`<html>` for a night-mode variant. Fonts: **Plus Jakarta Sans** (bold display)
+ **Inter** (body), loaded via Google Fonts with `font-display: swap`. The accent
is exclusive to "tap here" actions so the enquiry funnel stays obvious.

---

## ⚡ Performance notes (the #1 priority)

- **No WebGL.** The site ships zero three.js / R3F (≈950 KB raw removed). The hero
  is pure HTML/CSS + a touch of Framer Motion, so first paint is instant.
- The hero's **first frame is the LCP image** — eager-loaded with
  `fetchpriority="high"`. The remaining crossfade frames mount only after the
  browser goes idle (post-paint), so they never compete with first paint.
- Reduced-motion users get a single still hero frame (no crossfade, no rotation).
- Images: native `loading="lazy"`, WebP `srcset`, blur-up placeholders, and
  reserved aspect-ratios (no CLS).
- Trimming the showcase pages (portfolio/films/reviews/journal) keeps the site
  extra light — most routes are only a couple of KB of gzipped JS.
- Route-based code-splitting + a Vite manual chunk isolating `framer-motion`.

Suggested check: run Lighthouse (mobile) on the production build (`npm run build && npm run preview`).

---

## 🗂️ Project structure

```
src/
├── components/
│   ├── conversion/   WhatsApp button, sticky CTA, exit-intent popup
│   ├── forms/        Enquiry form (EmailJS + WhatsApp)
│   ├── hero/         Cinematic crossfade backdrop + aperture ring
│   ├── layout/       Navbar, Footer, Logo, Layout
│   ├── sections/     Reusable page sections (Hero, TrustBar, WhyUs, Process, …)
│   ├── ui/           Buttons, Reveal, Counter, LazyImage, Icon, …
│   └── Seo.jsx       Per-page <title>/meta/OG (no dependency)
├── data/             ← ALL editable content lives here
├── hooks/            useMediaQuery, useInViewOnce
├── pages/            Home, About, Services, Packages, Contact, FAQ, NotFound
├── App.jsx           Routes + Suspense
├── main.jsx          Entry
└── index.css         Theme tokens + base styles
```

---

## 🌐 Deploy

- **Netlify** — `netlify.toml` included (build `npm run build`, publish `dist`, SPA redirect).
- **Vercel** — `vercel.json` included (SPA rewrites + asset caching). Or just import the repo; Vite is auto-detected.

---

## ✅ Before you launch — checklist

- [ ] Replace all placeholder photos (`src/data/*`, hero frames in `CinematicBackdrop.jsx`).
- [ ] Set real phone / WhatsApp / email / address / map (`src/data/site.js`).
- [ ] Add EmailJS keys (`.env`).
- [ ] Review the **Packages** inclusions (`src/data/packages.js`). By design they show **no prices** — the page captures leads who then receive a tailored quote. Keep it that way unless you specifically want to publish numbers.
- [ ] Set your **Instagram** link/handle (`src/data/site.js`) — it's where your work/showcase lives.
- [ ] Set your domain in `index.html` (canonical + OG URLs) and `public/robots.txt`.
- [ ] Swap `[CITY / BASE]` everywhere (currently **Chennai**).

> **Later phase:** to bring back Portfolio / Films / Reviews / a Journal, re-add
> their routes in `src/App.jsx`, their links in `nav` (`src/data/site.js`), and
> rebuild the pages/sections (the patterns are simple to recreate).

---

_All copy and imagery here are **placeholders** written in plain, friendly
English — ready for you to replace with the real Men in Cam._
