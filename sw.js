/**
 * =========================================================================
 * SI-MASJID — PWA Service Worker (sw.js)
 * =========================================================================
 * Mengikuti standar gas-pwa-github:
 * - Cache berkas statis (HTML, CSS, JS, Manifest, Font)
 * - Melewatkan (bypass) request ke script.google.com agar data selalu segar
 * =========================================================================
 */

const CACHE_NAME = 'si-masjid-pwa-v2.1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/config.js',
  './js/app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Permintaan ke Google Apps Script TIDAK boleh diambil dari cache service worker
  if (url.origin.includes('script.google.com')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // File statis diambil dari Cache terlebih dahulu (Cache-First)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
