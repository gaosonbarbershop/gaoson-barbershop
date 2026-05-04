/**
 * Decap CMS — GitHub OAuth proxy on Cloudflare Workers.
 *
 * Endpoints:
 *   GET  /auth          — start the OAuth flow (Decap CMS calls this)
 *   GET  /callback      — GitHub redirects here with `?code`
 *
 * Required secrets (set via `wrangler secret put`):
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 *
 * Reference: https://decapcms.org/docs/external-oauth-clients/
 */

interface Env {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
}

const SCOPE = "repo,user";

function renderPostMessage(status: "success" | "error", payload: unknown) {
  const body = JSON.stringify(payload).replace(/</g, "\\u003c");
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>Authorizing…</title></head>
<body><script>
(function() {
  function send(message) {
    window.opener && window.opener.postMessage("authorization:github:${status}:" + message, "*");
  }
  window.addEventListener("message", function(e) {
    if (e.data === "authorizing:github") send(${JSON.stringify(JSON.stringify(payload))});
  }, false);
  // Also send immediately for clients that don't ping first.
  send(${body});
})();
</script><p>Authentification en cours… cette fenêtre va se fermer.</p></body></html>`;
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    if (url.pathname === "/auth" || url.pathname === "/auth/") {
      const authUrl = new URL("https://github.com/login/oauth/authorize");
      authUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
      authUrl.searchParams.set(
        "redirect_uri",
        `${url.origin}/callback`,
      );
      authUrl.searchParams.set("scope", SCOPE);
      return Response.redirect(authUrl.toString(), 302);
    }

    if (url.pathname === "/callback" || url.pathname === "/callback/") {
      const code = url.searchParams.get("code");
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
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code,
          }),
        },
      );

      const data = (await tokenRes.json()) as
        | { access_token: string; token_type: string; scope: string }
        | { error: string; error_description?: string };

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
    }

    return new Response("Gaoson · Decap OAuth proxy", {
      status: 200,
      headers: { "content-type": "text/plain;charset=UTF-8" },
    });
  },
};
