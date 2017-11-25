'use strict';
const CACHE_NAME = 'serviceWorkerAlpha.1';

const cacheUrls = [
    'bundle.css',
    'bundle.js',
    'images/wall.jpg',
    'images/404.png',
    'images/cat.png',
    'images/wall3.jpg',
    'fonts/lombardia.ttf',
    'fonts/Neucha.ttf',
    '/meshes/wall.babylon',
    '/meshes/hero.babylon',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(cacheUrls);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});