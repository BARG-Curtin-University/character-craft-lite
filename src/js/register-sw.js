// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    try {
      // Just use a simple relative path that works in both module and non-module contexts
      const swPath = './service-worker.js';
      console.log("Registering service worker from:", swPath);
      
      navigator.serviceWorker.register(swPath)
        .then(function(registration) {
          console.log('ServiceWorker registration successful');
        })
        .catch(function(error) {
          console.log('ServiceWorker registration failed: ', error);
        });
    } catch (err) {
      console.warn("Error registering service worker:", err);
    }
  });
}