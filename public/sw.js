const CACHE_NAME = 'cityassist-v1';
const toCache = ['/','/home','/manifest.json'];
self.addEventListener('install', (e)=>{ e.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(toCache))); self.skipWaiting(); });
self.addEventListener('fetch', (e)=>{ e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))); });
