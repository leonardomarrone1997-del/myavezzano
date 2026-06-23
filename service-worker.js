const CACHE_NAME = "myavezzano-v84";
const APP_SHELL = [
  "./",
  "./index.html",
  "./eventi.html",
  "./coupon.html",
  "./mappa.html",
  "./estate-2026.html",
  "./attivita-locali.html",
  "./styles.css?v=84",
  "./events-data.js?v=84",
  "./app.js?v=84",
  "./manifest.json",
  "./robots.txt",
  "./llms.txt",
  "./sitemap.xml",
  "./assets/app-icon.svg",
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
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
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
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
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
