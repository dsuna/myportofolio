const CACHE = 'arka-portfolio-v1';

// Semua asset yang di-cache saat install
const PRECACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/style.css',
  '/assets/js/main.js',
  '/assets/img/instagramposmockt.jpg',
  '/assets/img/favicon.svg',
  '/assets/img/icon-192.svg',
  '/assets/img/icon-512.svg',
  '/assets/video/21-2_psu.mp4',
  // Google Fonts di-cache saat online, fallback ke system font jika offline
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;800&display=swap'
];

// Install: cache semua asset utama
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      // Cache satu per satu agar satu gagal tidak block semua
      return Promise.allSettled(
        PRECACHE.map(url => cache.add(url).catch(() => console.warn('Cache miss:', url)))
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate: hapus cache lama
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first untuk asset, network-first untuk navigasi
self.addEventListener('fetch', e => {
  const { request } = e;
  const url = new URL(request.url);

  // Skip non-GET dan chrome-extension
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') return;

  // Video: range request — jangan cache, langsung network
  if (request.headers.get('range')) {
    e.respondWith(fetch(request));
    return;
  }

  // Navigasi HTML: network-first, fallback ke cache
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Semua lainnya: cache-first, fallback ke network lalu simpan
  e.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(res => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(request, clone));
        return res;
      });
    })
  );
});
