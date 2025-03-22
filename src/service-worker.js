self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('persona-v1').then(function(cache) {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './style.css',
        './js/dom.js',
        './js/utils.js',
        './js/data/models.js',
        './js/inputs.js',
        './js/navigation.js',
        './js/modals.js',
        './js/export.js',
        './js/data/prompts.js',
        './js/data/rag.js',
        './js/generation.js',
        './js/index.js',
        './icons/icon-192.png',
        './icons/icon-512.png'
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
