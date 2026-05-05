/**
 * Cloudflare Pages Function — /callback
 *
 * GitHub renvoie l'utilisateur ici avec ?code=... après login.
 * On échange le code contre un access_token (POST GitHub),
 * puis on retourne une page HTML qui postMessage le token à la fenêtre
 * opener (Decap CMS) via le protocole attendu par Decap.
 *
 * Variables d'environnement requises :
 *   GITHUB_CLIENT_ID      (ou OAUTH_CLIENT_ID)
 *   GITHUB_CLIENT_SECRET  (ou OAUTH_CLIENT_SECRET)
 */
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code) {
    return htmlResponse(errorPage("Code manquant dans le callback GitHub."), 400);
  }

  // Validation CSRF
  const cookie = request.headers.get("Cookie") || "";
  const stateCookieMatch = cookie.match(/oauth_state=([^;]+)/);
  const expectedState = stateCookieMatch ? stateCookieMatch[1] : null;
  if (!expectedState || expectedState !== state) {
    return htmlResponse(
      errorPage("État CSRF invalide — relance le login depuis /admin."),
      400
    );
  }

  const clientId = env.GITHUB_CLIENT_ID || env.OAUTH_CLIENT_ID;
  const clientSecret = env.GITHUB_CLIENT_SECRET || env.OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return htmlResponse(
      errorPage(
        "GITHUB_CLIENT_ID/SECRET (ou OAUTH_CLIENT_ID/SECRET) non configurés dans les env vars Cloudflare Pages."
      ),
      500
    );
  }

  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    }
  );

  const tokenData = await tokenResponse.json();

  if (tokenData.error || !tokenData.access_token) {
    return htmlResponse(
      errorPage(
        `Erreur GitHub : ${tokenData.error_description || tokenData.error || "access_token absent"}`
      ),
      400
    );
  }

  const payload = JSON.stringify({
    token: tokenData.access_token,
    provider: "github",
  });

  const html = `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Authentification réussie · Gaoson</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body {
        font-family: system-ui, -apple-system, sans-serif;
        background: #050505;
        color: #e8e4dc;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        margin: 0;
      }
      .box { text-align: center; max-width: 420px; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; font-weight: 500; }
      p  { color: #8a8a8a; margin: 0; }
    </style>
  </head>
  <body>
    <div class="box">
      <h1>Authentification réussie</h1>
      <p>Cette fenêtre va se fermer automatiquement…</p>
    </div>
    <script>
      (function () {
        var payload = ${payload};
        function receiveMessage(e) {
          window.opener.postMessage(
            'authorization:github:success:' + JSON.stringify(payload),
            e.origin
          );
          window.removeEventListener('message', receiveMessage, false);
          setTimeout(function () { window.close(); }, 600);
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
  </body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Set-Cookie": "oauth_state=; Path=/; Max-Age=0",
    },
  });
}

function htmlResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function errorPage(message) {
  return `<!DOCTYPE html>
<html lang="fr">
  <head><meta charset="utf-8"><title>Erreur · Gaoson</title></head>
  <body style="font-family:system-ui;padding:2rem;background:#050505;color:#e8e4dc;">
    <h1>Erreur d'authentification</h1>
    <p>${message}</p>
    <p><a href="/admin/" style="color:#f5f1e8;">← Retour à /admin</a></p>
  </body>
</html>`;
}
