const cacheName = 'v1';

const cacheAssets = [
	'/css/index.css',
	'/js/bundle.js',
	'/manifest.json',
	'/detail',
	'/home',
];

// Call Install Event
self.addEventListener('install', e => {
	console.log('Service Worker: Installing');

	e.waitUntil(
		caches
			.open(cacheName)
			.then(cache => {
				console.log('Service Worker: Caching Files');
				cache.addAll(cacheAssets);
			})
			.then(() => self.skipWaiting())
			.catch(err => console.log(err))
	);
});

// Call Activate Event
self.addEventListener('activate', e => {
	console.log('Serice Worker: Activated');
	// Remove unwanted caches
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
	e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});