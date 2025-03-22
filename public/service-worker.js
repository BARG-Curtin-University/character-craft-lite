self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('persona-v1').then(function(cache) {
      return cache.addAll([
        '/src/index.html',
        '/src/style.css',
        '/src/app.js',
        '/src/utils.js',
        '/src/data.js',
        '/src/pwa.js',
        '/public/manifest.json',
        '/src/icons/icon-192.png',
        '/src/icons/icon-512.png'
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
