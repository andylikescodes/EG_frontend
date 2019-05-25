if (workbox) {
    console.log(`Workbox is loaded`);

    workbox.precaching.precacheAndRoute(self.__precacheManifest);

    workbox.routing.registerRoute(
      new RegExp('\.html'),
      workbox.strategies.networkFirst()
    );

    workbox.routing.registerRoute(
      new RegExp('\.(?:js|css)$'),
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'js_cache'
      })
    );

    workbox.routing.registerRoute(
      new RegExp('\.mp3'),
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'music_cache'
      })
    );

    workbox.routing.registerRoute(
      new RegExp('\.(?:png|gif|jpg|jpeg|webp|svg)'),
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'image_cache'
      })
    );
}
else {
    console.log(`Workbox didn't load`);
}
