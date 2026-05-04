# Gaoson's Barber Shop

Site one-page premium pour [Gaoson's Barber Shop](https://gaoson-barbershop.fr) — salon de coiffure homme à Biot.

> **Crafted Cuts. Sharp Style.**

## Stack

- **Next.js 16** (App Router) + **TypeScript** strict
- **Tailwind CSS v4** (config-in-CSS via `@theme`)
- **Framer Motion** (reveals at scroll, micro-interactions)
- **Decap CMS** (édition du contenu via interface web `/admin`)
- **Cloudflare Pages** (static export + Pages Functions pour OAuth GitHub)

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
  app/                  # layout, page (server), sitemap, globals.css
  components/
    sections/           # Hero, Manifesto, Services, Atelier, Reviews, Visit, Footer
    ui/                 # BooksyButton, Reveal, SectionHeader, Marquee
    icons/              # InstagramIcon (SVG inline)
    logo.tsx            # Wordmark Gaoson's en blackletter (UnifrakturMaguntia)
    site-context.tsx    # Provider/hook pour passer `site` aux client components
    site-nav.tsx
  lib/
    site.ts             # types
    site.server.ts      # loader YAML (server-only)
    services.ts         # types
    services.server.ts  # loader YAML
    manifesto.ts        # types
    manifesto.server.ts # loader markdown
    atelier.ts          # types
    atelier.server.ts   # loader markdown
    utils.ts            # cn()

content/                # ← édité via Decap CMS
  site.yml              # coordonnées, horaires, liens, mentions légales
  services.yml          # groupes de prestations + prix
  manifesto.md          # textes du Hero + section Manifesto
  atelier/              # photos de la galerie (1 .md par photo)

functions/              # Cloudflare Pages Functions
  auth.js               # /auth → start OAuth GitHub
  callback.js           # /callback → exchange code → token → postMessage

public/
  admin/                # Decap CMS admin UI (/admin)
    index.html
    config.yml          # définition des collections
  images/
    atelier/            # photos uploadées via Decap
```

## Modifier le contenu via le CMS

Une fois en prod, va sur `https://gaoson-barbershop.fr/admin/`. Connecte-toi
avec ton compte GitHub (autorisé sur le repo `gaosonbarbershop`). Tu peux
éditer 4 collections :

1. **Coordonnées & horaires** — adresse, horaires, liens Booksy/Insta,
   SIRET, mentions légales (single file `site.yml`)
2. **Services & Tarifs** — les 3 groupes de prestations avec prix/durée
   (single file `services.yml`)
3. **Manifeste & Hero** — textes du Hero et de la section Maison, KPIs,
   marquee (`manifesto.md`)
4. **Galerie atelier** — ajouter / modifier / réordonner les photos du salon
   (folder `atelier/*.md`, photos uploadées dans `/public/images/atelier`)

Chaque édition commit automatiquement sur la branche `main`. Cloudflare
Pages re-build et déploie en ~30 secondes.

### Édition en local (sans Decap)

Tu peux aussi éditer directement les fichiers YAML/MD dans `content/`.

## Déploiement

### 1. Cloudflare Pages — site + Pages Functions

1. Connecte le repo GitHub à Cloudflare Pages.
2. Build settings :
   - **Framework preset** : Next.js (Static HTML Export)
   - **Build command** : `npm run build`
   - **Build output directory** : `out`
   - **Node version** : 20 (via `.nvmrc`)
3. Custom domain : `gaoson-barbershop.fr` (DNS Cloudflare).

Le dossier `functions/` est automatiquement détecté par Cloudflare Pages
et déployé comme Functions à côté du site statique. Pas de config
supplémentaire.

### 2. GitHub OAuth App (pour Decap CMS)

Sur le compte GitHub `gaosonbarbershop` :

1. Va sur **github.com/settings/developers** → **New OAuth App**
2. **Application name** : `Gaoson Barber Shop CMS`
3. **Homepage URL** : `https://gaoson-barbershop.fr`
4. **Authorization callback URL** : `https://gaoson-barbershop.fr/callback`
5. Crée l'app, note **Client ID**, génère un **Client Secret**.

### 3. Variables d'environnement Cloudflare Pages

Dans le dashboard Cloudflare Pages → ton projet → **Settings** →
**Environment variables**, ajoute pour **Production** + **Preview** :

- `OAUTH_CLIENT_ID` — ton Client ID GitHub OAuth (Encrypt)
- `OAUTH_CLIENT_SECRET` — ton Client Secret (Encrypt)

Le code accepte aussi `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` comme alternative.

Re-deploy le projet après avoir ajouté les variables.

### 4. DNS

`gaoson-barbershop.fr` → CNAME → `<projet>.pages.dev`
(géré dans le dashboard Cloudflare Pages, onglet Custom Domains)

## Performance & SEO

- ✓ Static export (TTFB instant, edge-cached partout)
- ✓ Pages Functions pour OAuth uniquement (le site reste statique)
- ✓ `next/font` (Instrument Serif, Inter Tight, JetBrains Mono, UnifrakturMaguntia — display: swap)
- ✓ JSON-LD Schema.org `HairSalon` dans le layout
- ✓ `robots.txt` + `sitemap.xml`
- ✓ Open Graph + Twitter Cards
- ✓ `prefers-reduced-motion` respecté
- ✓ Mobile-first, viewport responsive

## Crédits

- Hébergement : **IONOS SE** (mention légale)
- Réservation : **Booksy**
- Avis : **Elfsight Google Reviews**
- Cartographie : **OpenStreetMap**

---

© Gaoson's Barber Shop — SIRET 350 067 146 00018
