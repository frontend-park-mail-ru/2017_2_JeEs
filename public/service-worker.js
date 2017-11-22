// "use strict";
// const CACHE_NAME = "serviceWorkerAlpha.1";
//
// const cacheUrls = [
// 	'bundle.css',
// 	'bundle.js'
// 	//дописать все то то выгружаем на сайт (картинки и тд)
// ];
//
// self.addEventListener("install", (event) => {
// 	event.waitUntil(
// 		caches.open(CACHE_NAME)
// 			.then((cache) => {
// 				return cache.addAll(cacheUrls);
// 			})
// 	);
// });
//
// self.addEventListener("fetch", (event) => {
// 	event.respondWith(
// 		caches.match(event.request).then((cachedResponse) => {
// 			if (cachedResponse) {
// 				return cachedResponse;
// 			}
// 			return fetch(event.request);
// 		})
// 	);
// });