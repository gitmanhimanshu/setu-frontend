/* Google Identity Services (GIS) token client.
 *
 * The dashboard needs a Google access token to call /api/stats — the same kind
 * of token the MCP OAuth flow issues. GIS gets one in a popup, entirely
 * client-side: no NextAuth, no session backend, nothing stored server-side.
 *
 * Requires NEXT_PUBLIC_GOOGLE_CLIENT_ID, and the site origin listed under
 * "Authorized JavaScript origins" on that OAuth client in Google Console.
 */

export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

const GSI_SRC = "https://accounts.google.com/gsi/client";

/* Enough to identify the caller — /api/stats resolves the token via the
   userinfo endpoint. Deliberately NOT gmail.send: the dashboard reads stats,
   it never sends, so it has no business asking for the send scope. */
const SCOPES = "openid email profile";

type TokenResponse = { access_token?: string; error?: string };

declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: {
          initTokenClient(config: {
            client_id: string;
            scope: string;
            callback: (response: TokenResponse) => void;
            error_callback?: (error: { type?: string }) => void;
          }): { requestAccessToken(): void };
        };
      };
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (window.google?.accounts?.oauth2) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = GSI_SRC;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => {
        scriptPromise = null;
        reject(new Error("Could not load Google sign-in. Check your connection."));
      };
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

export async function requestAccessToken(): Promise<string> {
  if (!GOOGLE_CLIENT_ID) {
    throw new Error("Google sign-in is not configured on this deployment.");
  }
  await loadScript();

  return new Promise((resolve, reject) => {
    const oauth2 = window.google?.accounts?.oauth2;
    if (!oauth2) return reject(new Error("Google sign-in failed to initialise."));

    const client = oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: SCOPES,
      callback: (response) => {
        if (response.access_token) resolve(response.access_token);
        else reject(new Error(response.error ?? "Sign-in was cancelled."));
      },
      error_callback: (error) => {
        reject(
          new Error(
            error?.type === "popup_closed"
              ? "The sign-in window was closed before finishing."
              : "Sign-in failed. Try again."
          )
        );
      },
    });
    client.requestAccessToken();
  });
}
