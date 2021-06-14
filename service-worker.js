const CACHE_NAME = 'site-name-cache';

self.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache =>
                cache.addAll([
                    `${window.location.href}`
                ])
            )
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                //found cached resource
                return response;
            }
            return fetch(event.request);
        })
    );
});
