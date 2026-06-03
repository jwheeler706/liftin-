const CACHE_NAME = 'liftin-v2';

const PAGES = [
  './',
  './index.html',
  './manifest.json',
  './assets/icons/icon.svg',
  './workouts/chest-tri.html',
  './workouts/upper-body-today.html',
  './assets/css/workout-app.css',
  './assets/js/workout-app.js',
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
