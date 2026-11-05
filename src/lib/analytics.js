/* =========================================================================
   ANALYTICS — thin wrapper around GA4's gtag().
   Safe to call anywhere: if GA isn't loaded (ad-blocked, dev build with the
   placeholder ID, or the user denied tracking) these become silent no-ops,
   so callers never need to guard or try/catch.
   The base tag lives in public/index.html; this only sends custom events.
   ========================================================================= */

export function track(name, params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
