# Gaoson's Barber Shop

Site one-page premium pour [Gaoson's Barber Shop](https://gaoson-barbershop.fr) — salon de coiffure homme et dépôt-vente sneakers, Biot.

> **Crafted Cuts. Curated Kicks.**

## Stack

- **Next.js 16** (App Router) + **TypeScript** strict
- **Tailwind CSS v4** (config-in-CSS via `@theme`)
- **Lenis** smooth scroll global
- **GSAP** + **Framer Motion** + **Auto-Animate**
- **Decap CMS** (collection sneakers, OAuth GitHub via Cloudflare Worker)
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
  app/                  # layout, page, sitemap
  components/
    sections/           # Hero, Manifesto, Services, Drop, Atelier, Reviews, Visit, Footer
    ui/                 # BooksyButton, Reveal, SectionHeader, Marquee
    icons/              # InstagramIcon (SVG inline)
    lenis-provider.tsx
    site-nav.tsx
  lib/
    site.ts             # infos établissement (adresse, horaires, liens)
    services.ts         # tarifs salon (édition manuelle dans le code)
    sneakers.ts         # types & helpers (client-safe)
    sneakers.server.ts  # lecture markdown au build (server-only)
    utils.ts            # cn()

content/
  sneakers/             # collection Decap — un .md par paire

public/
  admin/                # Decap CMS — entrée /admin
  images/sneakers/      # photos des paires (uploadées via Decap)
  images/atelier/       # placeholders galerie

cloudflare/
  oauth-worker/         # proxy OAuth GitHub (Decap CMS)
```

## Modifier les services / tarifs

Édite directement [src/lib/services.ts](src/lib/services.ts).

## Modifier l'infobox / coordonnées

Édite [src/lib/site.ts](src/lib/site.ts).

## Ajouter / modifier une sneaker via Decap CMS

Une fois en prod (voir « Déploiement »), va sur `https://gaoson-barbershop.fr/admin/`. Connecte-toi avec ton compte GitHub (autorisé sur le repo). Tu peux :

- créer une nouvelle paire (champ par champ, photo uploadée)
- modifier le statut (`available`, `reserved`, `sold`)
- supprimer une paire vendue depuis trop longtemps

Chaque action commit automatiquement sur la branche `main` du repo. Cloudflare Pages re-build et déploie en ~30s.

### Édition en local (sans Decap)

Crée un fichier `content/sneakers/XX-slug.md` avec le frontmatter :

```md
---
brand: Air Jordan
model: 1 Retro High OG "Chicago"
size: "US 9 / EU 42.5"
condition: "Neuf — boîte d'origine"
price: 320
status: available
image: /images/sneakers/ma-photo.jpg
order: 1
---

Description courte (optionnelle).
```

## Déploiement

### 1. Cloudflare Pages — site statique

1. Connecte le repo GitHub à Cloudflare Pages.
2. Build settings :
   - **Framework preset** : Next.js (Static HTML Export)
   - **Build command** : `npm run build`
   - **Build output directory** : `out`
   - **Node version** : 20 (via `.nvmrc`)
3. Custom domain : `gaoson-barbershop.fr` (DNS Cloudflare).

### 2. Worker OAuth — Decap CMS

Le CMS a besoin d'un proxy OAuth GitHub. Le code est dans [cloudflare/oauth-worker/](cloudflare/oauth-worker/).

```bash
cd cloudflare/oauth-worker
npm install
npx wrangler login
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
npm run deploy
```

Le worker sera déployé sur `https://gaoson-cms-oauth.<TON-SUBDOMAIN>.workers.dev`.

#### Créer la GitHub OAuth App

1. https://github.com/settings/developers → **New OAuth App**
2. Homepage URL : `https://gaoson-barbershop.fr`
3. Authorization callback URL : `https://gaoson-cms-oauth.<TON-SUBDOMAIN>.workers.dev/callback`
4. Récupère **Client ID** et **Client Secret** → utilise-les dans `wrangler secret put`.

#### Mettre à jour `public/admin/config.yml`

Remplace `gaoson-cms-oauth.YOUR-WORKER-SUBDOMAIN.workers.dev` par l'URL réelle du worker.

### 3. DNS

`gaoson-barbershop.fr` → **CNAME** → `<projet>.pages.dev`
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
