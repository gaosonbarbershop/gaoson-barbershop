# Gaoson — Decap CMS OAuth Proxy

Cloudflare Worker qui sert de pont OAuth entre **Decap CMS** (`/admin`) et **GitHub**.
Sans ça, le CMS ne peut pas demander d'access token GitHub depuis le navigateur (CORS + secret).

## Setup

```bash
npm install
npx wrangler login
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
npm run deploy
```

## GitHub OAuth App

Crée une OAuth App sur https://github.com/settings/developers :

- **Homepage URL** : `https://gaoson-barbershop.fr`
- **Callback URL** : `https://gaoson-cms-oauth.<TON-SUBDOMAIN>.workers.dev/callback`

Récupère `Client ID` et `Client Secret`, mets-les dans les secrets du worker.

## Endpoints

- `GET /auth` — démarre le flow OAuth (Decap appelle cette URL)
- `GET /callback` — GitHub redirige ici avec `?code`, le worker échange le code contre un token et le renvoie au CMS via `postMessage`

## Mettre à jour le site

Dans `public/admin/config.yml`, remplace :

```yaml
base_url: https://gaoson-cms-oauth.YOUR-WORKER-SUBDOMAIN.workers.dev
```

par l'URL réelle de ton worker.
