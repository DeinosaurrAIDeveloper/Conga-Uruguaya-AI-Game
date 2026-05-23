const CACHE_NAME = 'conga-v16-cache';
const ASSETS = [
  '/Conga-Uruguaya-AI-Game/',
  '/Conga-Uruguaya-AI-Game/index.html',
  '/Conga-Uruguaya-AI-Game/manifest.json',
  '/Conga-Uruguaya-AI-Game/icon-192.png',
  '/Conga-Uruguaya-AI-Game/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    }).catch(() => {
      return caches.match('/Conga-Uruguaya-AI-Game/index.html');
    })
  );
});
