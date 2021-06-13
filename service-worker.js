const CACHE_NAME = 'site-name-cache';

self.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache =>
                cache.addAll([
                    window.location.href
                ])
            )
    );
});
