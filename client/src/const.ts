export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  
  // Handle missing environment variables gracefully
  if (!oauthPortalUrl || !appId) {
    const missing = [];
    if (!oauthPortalUrl) missing.push("VITE_OAUTH_PORTAL_URL");
    if (!appId) missing.push("VITE_APP_ID");
    console.error(`OAuth configuration missing: ${missing.join(", ")} environment variable(s) not set. Authentication will not work.`);
    // Return empty string to prevent errors, calling code should handle this gracefully
    return "";
  }
  
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
