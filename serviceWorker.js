const CACHE_NAME = 'alan-portafolio-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/CSS/estilos.css',
  '/js/script.js',
  '/favicon.png'
];

// Instala el Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

// Activa el Service Worker y elimina caches antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      );
    })
  );
});

// Intercepta las solicitudes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
