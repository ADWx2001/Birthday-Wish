# A Birthday Surprise 💛

A premium, cinematic, frontend-only birthday landing page — a digital love letter
that unfolds chapter by chapter as you scroll. Built with Next.js, Tailwind,
Framer Motion, GSAP + ScrollTrigger and Lenis smooth scrolling.

## Quick start

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Make it yours (no component edits needed)

Everything editable lives in **one file**: [`lib/content.ts`](./lib/content.ts).
Open it and replace the placeholder text — names, dates, story chapters, quotes,
the love letter, the final message, etc.

### Add your photos

1. Drop image files into `public/photos/` (any names you like).
2. In `lib/content.ts`, point each photo's `src` at your file, e.g.
   `src: "/photos/our-first-date.jpg"`.

Until you do, elegant generated placeholders are shown. Regenerate them anytime:

```bash
npm run placeholders
```

### Add your song

Drop an audio file into `public/` and set `music.src` in `lib/content.ts`
(e.g. `"/our-song.mp3"`). The floating player starts **muted** and only plays
on click — it never autoplays. If the file is missing, the button just stays
disabled.

## What's inside

- **Loading screen** → **Hero** (night sky, moon, swinging fairy lights, typewriter)
- **Story timeline**, **memory cards**, a **light-up journey** section
- **Masonry gallery** with a zoom lightbox
- **Birthday cake** (blow the candles → confetti)
- **Interactive sky** (tap stars), a **catchable shooting star**
- A **love letter** envelope, then the **final sunrise** finale
- Floating particles, parallax, progress rail, and hidden easter eggs:
  type `LOVE` or `HAPPY`, click the moon, click a heart 5×, or double-click a
  fairy light.

## Accessibility & performance

Keyboard accessible, honours `prefers-reduced-motion`, responsive down to mobile,
lazy-loaded images and code-split sections.

## Deploy

Push to GitHub and import into [Vercel](https://vercel.com/new) — no configuration
required.

---

Made with love. 💛
