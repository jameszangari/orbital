const cacheName = "orbital-cache";
const assetsToCache = [
  "/",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
];

self.addEventListener("install", (event) => {
  self.skipWaiting(); // skip waiting
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
