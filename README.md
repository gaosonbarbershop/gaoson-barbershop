# Gaoson's Barber Shop

Site one-page premium pour [Gaoson's Barber Shop](https://gaoson-barbershop.fr) — salon de coiffure homme à Biot.

> **Crafted Cuts. Sharp Style.**

## Stack

- **Next.js 16** (App Router) + **TypeScript** strict
- **Tailwind CSS v4** (config-in-CSS via `@theme`)
- **Framer Motion** + **Auto-Animate** (reveals at scroll, micro-interactions)
- **Cloudflare Pages** (static export, `output: "export"`)

## Démarrer en local

```bash
npm install
npm run dev          # http://localhost:3000
```

Build static :

```bash
npm run build        # → /out
```

## Structure

```
src/
  app/                  # layout, page, sitemap, globals.css
  components/
    sections/           # Hero, Manifesto, Services, Atelier, Reviews, Visit, Footer
    ui/                 # BooksyButton, Reveal, SectionHeader, Marquee
    icons/              # InstagramIcon (SVG inline)
    logo.tsx            # Wordmark Gaoson's via mask-image (SVG vectorisé)
    site-nav.tsx
  lib/
    site.ts             # infos établissement (adresse, horaires, liens)
    services.ts         # tarifs salon
    utils.ts            # cn()

public/
  images/
    logo-gaoson.svg     # wordmark vectorisé
    atelier/            # photos salon + rooftop
    hero-bg.svg

scripts/
  vectorize-logo.mjs    # régénère le SVG depuis un JPG source
```

## Modifier les services / tarifs

Édite directement [src/lib/services.ts](src/lib/services.ts).

## Modifier les coordonnées / horaires / liens

Édite [src/lib/site.ts](src/lib/site.ts).

## Régénérer le logo SVG depuis un nouveau visuel

Place le JPG/PNG source dans `public/images/logo-gaoson.jpg` puis :

```bash
node scripts/vectorize-logo.mjs
```

Le script (sharp + potrace) preprocess l'image (crop de la bordure, blur,
binarise, crop bbox des glyphes) et émet un SVG `currentColor` que tu peux
teinter via la `color` du parent.

## Déploiement

### Cloudflare Pages

1. Connecte le repo GitHub à Cloudflare Pages.
2. Build settings :
   - **Framework preset** : Next.js (Static HTML Export)
   - **Build command** : `npm run build`
   - **Build output directory** : `out`
   - **Node version** : 20 (via `.nvmrc`)
3. Custom domain : `gaoson-barbershop.fr` (DNS Cloudflare).

### DNS

`gaoson-barbershop.fr` → CNAME → `<projet>.pages.dev`
(géré dans le dashboard Cloudflare Pages, onglet Custom Domains)

## Performance & SEO

- ✓ Static export (TTFB instant, edge-cached partout)
- ✓ `next/font` (Instrument Serif, Inter Tight, JetBrains Mono — display: swap)
- ✓ JSON-LD Schema.org `HairSalon` dans le layout
- ✓ `robots.txt` + `sitemap.xml`
- ✓ Open Graph + Twitter Cards
- ✓ `prefers-reduced-motion` respecté sur toutes les animations
- ✓ Mobile-first, viewport responsive

## Crédits

- Hébergement : **IONOS SE** (mention légale)
- Réservation : **Booksy**
- Avis : **Elfsight Google Reviews**
- Cartographie : **OpenStreetMap**

---

© Gaoson's Barber Shop — SIRET 350 067 146 00018
