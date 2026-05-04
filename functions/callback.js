/**
 * GET /callback?code=...
 * GitHub redirige ici après que l'utilisateur a autorisé l'app.
 * On échange le `code` contre un access_token via l'API GitHub
 * en utilisant le client_secret stocké côté serveur.
 *
 * Variables Pages requises (l'un OU l'autre, prefer OAUTH_*):
 *   - OAUTH_CLIENT_ID      ou  GITHUB_CLIENT_ID
 *   - OAUTH_CLIENT_SECRET  ou  GITHUB_CLIENT_SECRET
 */

function renderPostMessage(status, payload) {
  const body = JSON.stringify(payload).replace(/</g, "\\u003c");
  const safeBody = JSON.stringify(body);

  return `<!doctype html>
<html><head><meta charset="utf-8"><title>Authorizing…</title></head>
<body><script>
(function() {
  function send(message) {
    if (window.opener) {
      window.opener.postMessage("authorization:github:${status}:" + message, "*");
    }
  }
  window.addEventListener("message", function(e) {
    if (e.data === "authorizing:github") send(${safeBody});
  }, false);
  send(${safeBody});
})();
</script><p>Authentification en cours… cette fenêtre va se fermer.</p></body></html>`;
}

export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  const clientId = env.OAUTH_CLIENT_ID || env.GITHUB_CLIENT_ID;
  const clientSecret = env.OAUTH_CLIENT_SECRET || env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new Response(
      "OAUTH_CLIENT_ID/SECRET (or GITHUB_CLIENT_ID/SECRET) env var is missing",
      { status: 500 },
    );
  }

  if (!code) {
    return new Response(
      renderPostMessage("error", { message: "missing-code" }),
      { headers: { "content-type": "text/html;charset=UTF-8" } },
    );
  }

  const tokenRes = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    },
  );

  const data = await tokenRes.json();

  if ("error" in data) {
    return new Response(
      renderPostMessage("error", {
        message: data.error_description ?? data.error,
      }),
      { headers: { "content-type": "text/html;charset=UTF-8" } },
    );
  }

  return new Response(
    renderPostMessage("success", {
      token: data.access_token,
      provider: "github",
    }),
    { headers: { "content-type": "text/html;charset=UTF-8" } },
  );
};
