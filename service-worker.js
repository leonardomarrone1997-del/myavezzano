const CACHE_NAME = "myavezzano-__BUILD_VERSION__";
const APP_SHELL = [
  "./",
  "./index.html",
  "./offline.html",
  "./eventi.html",
  "./coupon.html",
  "./mappa.html",
  "./estate-2026.html",
  "./attivita-locali.html",
  "./styles.css?v=__BUILD_VERSION__",
  "./events-data.js?v=__BUILD_VERSION__",
  "./app.js?v=__BUILD_VERSION__",
  "./manifest.json",
  "./robots.txt",
  "./llms.txt",
  "./sitemap.xml",
  "./assets/app-icon.svg",
  "./assets/pwa/icon-192.png",
  "./assets/pwa/icon-512.png",
  "./assets/pwa/icon-maskable-512.png",
  "./assets/pwa/screenshot-mobile.png",
  "./assets/pwa/screenshot-desktop.png",
  "./assets/avezzano-hero-day.jpg",
  "./assets/avezzano-hero-night.jpg",
  "./assets/avezzano-hero-day-mobile.jpg",
  "./assets/avezzano-hero-night-mobile.jpg",
  "./assets/social-preview.jpg",
  "./assets/coupons/aperitivo-2x1.svg",
  "./assets/coupons/atelier-marsica-20.svg",
  "./assets/coupons/fitlab-prova-gratis.svg",
  "./assets/home-actions/cena-light.png",
  "./assets/home-actions/cena-dark.png",
  "./assets/home-actions/aperitivo-light.png",
  "./assets/home-actions/aperitivo-dark.png",
  "./assets/home-actions/coupon-light.png",
  "./assets/home-actions/coupon-dark.png",
  "./assets/home-actions/serate-light.png",
  "./assets/home-actions/serate-dark.png",
  "./assets/home-actions/eventi-light.png",
  "./assets/home-actions/eventi-dark.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(APP_SHELL.map((url) => cache.add(url))).then((results) => {
        const coreFailed = results.slice(0, 3).some((result) => result.status === "rejected");
        if (coreFailed) throw new Error("Core app shell cache failed");
      })
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok && response.type === "basic") {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./offline.html") || caches.match("./index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetched = fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          if (response.ok && event.request.url.startsWith(self.location.origin)) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached || Response.error());

      return cached || fetched;
    })
  );
});
