const CACHE_NAME = 'radio-stream-v2';
// Only local files are cached - zero external CDN dependencies for the UI shell
const ASSETS_TO_CACHE = [
    './',
    './index.html'
];

// Install Event: Cache the app shell locally on first visit
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching App Shell');
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => self.skipWaiting())
    );
});

// Activate Event: Remove old caches from previous versions
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[Service Worker] Removing old cache:', key);
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event: Cache-First for local UI, pass-through for live audio streams
self.addEventListener('fetch', (event) => {
    const url = event.request.url;

    // Never intercept live audio streaming requests
    // (m3u8 HLS streams, MP3, Zeno.fm, Bitgravity CDN audio, TuneIn iframes)
    if (
        url.includes('.m3u8') ||
        url.includes('.mp3') ||
        url.includes('zeno.fm') ||
        url.includes('bitgravity.com') ||
        url.includes('tunein.com') ||
        url.includes('streamtheworld.com') ||
        url.includes('openstream.co') ||
        url.includes('akamaized.net') ||
        url.includes('cloudfront.net') ||
        url.includes('bbcmedia.co.uk')
    ) {
        return; // Let browser handle streaming URLs directly
    }

    // Cache-First strategy for everything else (HTML, HLS.js CDN script)
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse; // Serve instantly from local cache (0 KB download)
            }
            // Not in cache: fetch from network and cache for next time
            return fetch(event.request).then((networkResponse) => {
                if (event.request.method === 'GET' && networkResponse.status === 200) {
                    const clone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                }
                return networkResponse;
            });
        }).catch(() => {
            // If completely offline and not in cache, serve the app shell
            return caches.match('./index.html');
        })
    );
});
