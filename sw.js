const CACHE_NAME = 'lift-log-v1';

const PAGES = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './chest-tri.html',
  './upper-body-today.html',
  './workout-app.css',
  './workout-app.js',
  './WORKOUTS.md'
];

const PAGE_URLS = new Set(PAGES.map(page => new URL(page, self.registration.scope).href));

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PAGES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  if (!PAGE_URLS.has(requestUrl.href)) return;

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
