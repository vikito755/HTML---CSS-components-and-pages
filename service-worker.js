//...
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                //found cached resource
                return response;
            }

            // get resource and add it to cache
            return fetch(event.request)
                .then(response => {
                    // check if the response is valid
                    if (!response.ok) {
                        return response;
                    }

                    // clone the response
                    const newResponse = response.clone();

                    // add it to cache
                    caches.open(CACHE_NAME)
                        .then(cache =>
                            cache.put(event.request, newResponse)
                        );

                    // return response
                    return response;
                });
        })
    );
});
