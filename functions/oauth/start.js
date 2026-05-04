/**
 * GET /oauth/start
 * Démarre le flow OAuth GitHub pour Decap CMS.
 * Redirige vers github.com/login/oauth/authorize avec le client_id
 * configuré dans les variables d'environnement Cloudflare Pages.
 *
 * Variables Pages requises (l'un OU l'autre, prefer OAUTH_*):
 *   - OAUTH_CLIENT_ID  ou  GITHUB_CLIENT_ID
 */

export const onRequestGet = ({ request, env }) => {
  const url = new URL(request.url);
  const clientId = env.OAUTH_CLIENT_ID || env.GITHUB_CLIENT_ID;

  if (!clientId) {
    return new Response(
      "OAUTH_CLIENT_ID (or GITHUB_CLIENT_ID) env var is missing",
      { status: 500 },
    );
  }

  const authUrl = new URL("https://github.com/login/oauth/authorize");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", `${url.origin}/oauth/callback`);
  authUrl.searchParams.set("scope", "repo,user");

  return Response.redirect(authUrl.toString(), 302);
};
