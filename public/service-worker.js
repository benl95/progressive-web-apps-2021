const cacheName = 'v1';

const cacheAssets = [
	'/css/index.css',
	'/js/bundle.js',
	'/manifest.json',
	'/',
	'/offline',
];

// Call Install Event
self.addEventListener('install', e => {
	console.log('Service Worker: Installing');

	e.waitUntil(
		caches
			.open(cacheName)
			.then(cache => {
				console.log('Service Worker: Caching Files');
				return cache.addAll(cacheAssets);
			})
			.then(() => self.skipWaiting())
			.catch(err => console.log(err))
	);
});

// Call Activate Event
self.addEventListener('activate', e => {
	console.log('Serice Worker: Activated');
	e.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cache => {
					if (cache !== cacheName) {
						console.log('Service Worker: Clearing Old Cache');
						return caches.delete(cache);
					}
				})
			);
		})
	);
});

// Call Fetch event
self.addEventListener('fetch', e => {
	console.log('Service Worker: Fetching');
	e.respondWith(
		caches
			.match(e.request)
			.then(response => {
				if (response) {
					return response;
				}

				return fetch(e.request);
			})
			.catch(() => caches.match('/offline'))
	);
});
