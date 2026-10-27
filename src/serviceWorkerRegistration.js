// Registers the offline service worker (public/sw.js) in production builds.
//
// Kept deliberately tiny — no Workbox — so it works with this project's stock
// CRA setup: sw.js is copied to the build root and served from the app scope.
// It is only registered in production; in `npm start` a service worker would
// cache the dev bundle and fight hot-reload.

export function register() {
  if (process.env.NODE_ENV !== "production") return;
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    const swUrl = `${process.env.PUBLIC_URL || ""}/sw.js`;
    navigator.serviceWorker.register(swUrl).catch(() => {
      // A failed registration must never break the app — offline is a bonus.
    });
  });
}

export function unregister() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
  navigator.serviceWorker.ready
    .then((registration) => registration.unregister())
    .catch(() => {});
}
