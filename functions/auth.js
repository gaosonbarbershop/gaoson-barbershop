/**
 * GET /auth
 * Démarre le flow OAuth GitHub pour Decap CMS.
 * Redirige vers github.com/login/oauth/authorize avec le client_id
 * configuré dans les variables d'environnement Cloudflare Pages.
 *
 * Variables Pages requises :
 *   - GITHUB_CLIENT_ID  (Production + Preview)
 *
 * Decap CMS appelle cette URL avec ?provider=github (ignoré ici, on
 * utilise toujours github).
 */

export const onRequestGet = ({ request, env }) => {
  const url = new URL(request.url);

  if (!env.GITHUB_CLIENT_ID) {
    return new Response("GITHUB_CLIENT_ID env var is missing", {
      status: 500,
    });
  }

  const authUrl = new URL("https://github.com/login/oauth/authorize");
  authUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  authUrl.searchParams.set("redirect_uri", `${url.origin}/callback`);
  authUrl.searchParams.set("scope", "repo,user");

  return Response.redirect(authUrl.toString(), 302);
};
