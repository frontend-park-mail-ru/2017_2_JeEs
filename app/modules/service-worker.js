'use strict';
const CACHE_NAME = 'version_0.1';

const casheData = [
    '/bundle.css',
    '/bundle.js',
    '/images/wall.jpg',
    '/images/404.png',
    '/images/cat.png',
    '/images/wall3.jpg',
    '/fonts/lombardia.ttf',
    '/fonts/Neucha.ttf',
    '/meshes/wall.babylon',
    '/meshes/hero.babylon',
];

const casheUrls = [
    '/',
    '/game',
    '/rating',
    '/signin',
    '/signup', 
    '/authors', 
    '/rules'
]

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(casheUrls.concat(casheData));
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