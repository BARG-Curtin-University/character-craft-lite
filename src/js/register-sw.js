// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    try {
      // Try to get service worker path in a way that works in both module and non-module contexts
      let swPath;
      
      // For module context
      if (typeof import !== 'undefined' && import.meta && import.meta.url) {
        swPath = new URL('../service-worker.js', import.meta.url).href;
        console.log("Using module URL for service worker:", swPath);
      } 
      // For standalone/non-module context
      else {
        // Use a relative path as fallback
        swPath = './service-worker.js';
        console.log("Using relative path for service worker:", swPath);
      }
      
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