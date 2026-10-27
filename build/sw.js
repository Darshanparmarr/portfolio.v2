/* =========================================================================
   Service worker — offline-first shell for the portfolio PWA.

   This file is copied to the build root verbatim by react-scripts (it is NOT
   transpiled), so it must be written in browser-native JavaScript.

   Caching strategy:
     • Navigations (HTML)        → network-first, fall back to cached shell.
       Keeps the app fresh online and still boots offline after a first visit.
     • Same-origin static assets → stale-while-revalidate.
       CRA emits content-hashed bundles, so cached copies are always valid.
     • Google Fonts (CSS + woff) → stale-while-revalidate, so type renders
       offline too.

   Bump CACHE_VERSION to invalidate everything on the next activation.
   ========================================================================= */

const CACHE_VERSION = 'v1';
const SHELL_CACHE = `shell-${CACHE_VERSION}`;
const ASSET_CACHE = `assets-${CACHE_VERSION}`;

/* Minimal app shell precached at install so the site loads with no network
   after the first visit. Stable (non-hashed) paths only. */
const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/favicon.png',
  '/DarshanParmar.jpeg',
];

const FONT_ORIGINS = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      // Add individually so one missing asset can't fail the whole install.
      await Promise.all(SHELL_ASSETS.map((url) => cache.add(url).catch(() => {})));
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== SHELL_CACHE && key !== ASSET_CACHE)
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only GET requests are cacheable; let the browser handle the rest.
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 1) Navigations → network-first, cached-shell fallback (offline support).
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);
          const cache = await caches.open(SHELL_CACHE);
          cache.put('/', response.clone());
          return response;
        } catch (err) {
          const cached = await caches.match(request);
          return cached || (await caches.match('/')) || Response.error();
        }
      })()
    );
    return;
  }

  const isSameOrigin = url.origin === self.location.origin;
  const isFont = FONT_ORIGINS.includes(url.origin);

  // 2) Same-origin assets + Google Fonts → stale-while-revalidate.
  if (isSameOrigin || isFont) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(ASSET_CACHE);
        const cached = await cache.match(request);
        const network = fetch(request)
          .then((response) => {
            // Cache successful same-origin responses and opaque font responses.
            if (response && (response.ok || response.type === 'opaque')) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cached);
        return cached || network;
      })()
    );
  }
});
