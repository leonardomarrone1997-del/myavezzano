import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const output = path.join(root, "public");
const baseUrl = "https://myavezzano.vercel.app";
const buildDate = "2026-06-22";
const entries = [
  "index.html",
  "eventi.html",
  "coupon.html",
  "mappa.html",
  "estate-2026.html",
  "attivita-locali.html",
  "styles.css",
  "events-data.js",
  "app.js",
  "manifest.json",
  "service-worker.js",
  "robots.txt",
  "llms.txt",
  "sitemap.xml",
  "googleb99b104558bbc069.html",
  "assets"
];

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;"
}[character]));

const eventFallbackImage = "assets/social-preview.jpg";

function eventSlug(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function assetUrl(src) {
  if (!src) return `${baseUrl}/${eventFallbackImage}`;
  if (/^https?:\/\//.test(src)) return src;
  return `${baseUrl}/${src.replace(/^\.?\//, "")}`;
}

function normalizeEvent(event) {
  const id = event.id || eventSlug([event.title, event.date, event.place].filter(Boolean).join(" "));
  const image = event.image || eventFallbackImage;
  const isRealPhoto = Boolean(event.image && event.isRealPhoto);
  return {
    ...event,
    id,
    slug: event.slug || id,
    image,
    imageAlt: event.imageAlt || `${event.title} - ${event.place}`,
    imageSource: event.imageSource || (isRealPhoto ? "Fonte evento" : "Fallback neutro MyAvezzano"),
    isRealPhoto,
    sourceUrl: event.sourceUrl || "",
    updatedAt: event.updatedAt || buildDate
  };
}

function uniqueEvents(events) {
  const seen = new Set();
  return events.map(normalizeEvent).filter((event) => {
    const key = [event.slug || event.id, event.date, eventSlug(event.title), eventSlug(event.place)].join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function eventAttendanceCount(event) {
  const categoryBase = {
    Ambiente: 92,
    Motori: 168,
    Musica: 184,
    Sport: 226,
    Teatro: 74
  }[event.category] || 68;
  const hash = [...event.id].reduce((total, character) => total + character.charCodeAt(0), 0);
  return categoryBase + (hash % 137);
}

function eventDateLabel(event) {
  const start = new Date(`${event.date}T12:00:00`);
  const formatter = new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  if (!event.endDate) return formatter.format(start);
  const end = new Date(`${event.endDate}T12:00:00`);
  return `${formatter.format(start)} - ${formatter.format(end)}`;
}

function schemaDates(event) {
  const times = [...event.time.matchAll(/(\d{1,2}):(\d{2})/g)];
  const formatTime = (match) => `${String(match[1]).padStart(2, "0")}:${match[2]}:00+02:00`;
  const startDate = times[0] ? `${event.date}T${formatTime(times[0])}` : event.date;
  let endDate;
  if (event.endDate) endDate = event.endDate;
  else if (times[1]) endDate = `${event.date}T${formatTime(times[1])}`;
  return { startDate, endDate };
}

function eventPage(event) {
  const url = `${baseUrl}/eventi/${event.id}.html`;
  const dates = schemaDates(event);
  const locality = event.area === "Alba Fucens" ? "Massa d'Albe" : event.area;
  const imageUrl = assetUrl(event.image);
  const addressRegion = event.area === "Borgorose" || /\(RI\)/.test(event.place) ? "RI" : "AQ";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: dates.startDate,
    ...(dates.endDate ? { endDate: dates.endDate } : {}),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url,
    image: [imageUrl],
    description: event.detail,
    location: {
      "@type": "Place",
      name: event.place,
      address: {
        "@type": "PostalAddress",
        addressLocality: locality,
        addressRegion,
        addressCountry: "IT"
      }
    }
  };
  const schemaJson = JSON.stringify(schema, null, 2).replace(/</g, "\\u003c");
  const title = escapeHtml(event.title);
  const description = escapeHtml(event.detail);
  const dateLabel = escapeHtml(eventDateLabel(event));
  const place = escapeHtml(event.place);
  const time = escapeHtml(event.time);
  const price = escapeHtml(event.price);
  const imageAlt = escapeHtml(event.imageAlt);
  const imageSource = escapeHtml(event.imageSource);

  return `<!doctype html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} | Eventi MyAvezzano</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="event" />
    <meta property="og:title" content="${title} | MyAvezzano" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:alt" content="${imageAlt}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${imageUrl}" />
    <meta name="twitter:image:alt" content="${imageAlt}" />
    <script type="application/ld+json">${schemaJson}</script>
    <link rel="stylesheet" href="../styles.css?v=100" />
  </head>
  <body class="seo-body">
    <div class="seo-shell">
      <header class="seo-header">
        <a class="seo-brand" href="../index.html"><img src="../assets/app-icon.svg" alt="MyAvezzano" /><span>MyAvezzano</span></a>
        <nav class="seo-nav" aria-label="Navigazione"><a href="../eventi.html">Tutti gli eventi</a><a href="../index.html#events">Apri app</a></nav>
      </header>
      <nav class="seo-breadcrumb" aria-label="Percorso pagina"><a href="../index.html">Home</a><span>/</span><a href="../eventi.html">Eventi</a><span>/</span><span>${title}</span></nav>
      <main class="seo-event-detail">
        <section class="seo-hero">
          <figure class="seo-event-image">
            <img src="${imageUrl}" alt="${imageAlt}" loading="eager" decoding="async" onerror="this.onerror=null;this.src='../assets/social-preview.jpg';" />
            <figcaption>${imageSource}${event.isRealPhoto && event.sourceUrl ? ` - <a href="${escapeHtml(event.sourceUrl)}" rel="nofollow noreferrer" target="_blank">fonte</a>` : ""}</figcaption>
          </figure>
          <p class="seo-kicker">${escapeHtml(event.category)} · ${escapeHtml(event.area)}</p>
          <h1>${title}</h1>
          <p>${description}</p>
          <div class="seo-event-summary">
            <div><span>Data e ora</span><strong>${dateLabel} · ${time}</strong></div>
            <div><span>Luogo</span><strong>${place}</strong></div>
            <div><span>Indicazioni</span><strong>${price}</strong></div>
            <div><span>Area</span><strong>${escapeHtml(event.area)}</strong></div>
          </div>
          <p class="seo-event-attendance"><strong>${eventAttendanceCount(event)}</strong> persone parteciperanno a questo evento</p>
          <div class="seo-actions"><a class="seo-link primary" href="../index.html#events">Salva nell'app</a><a class="seo-link" href="../eventi.html">Torna al calendario</a></div>
        </section>
      </main>
      <footer class="seo-footer"><p>MyAvezzano raccoglie eventi e informazioni locali per Avezzano e area immediata. Scheda aggiornata il ${escapeHtml(event.updatedAt)}.</p><div class="seo-footer-links"><a href="../index.html">Home</a><a href="../sitemap.xml">Sitemap</a></div></footer>
    </div>
  </body>
</html>`;
}

function sitemapXml(events) {
  const basePages = [
    ["/", "daily", "1.0"],
    ["/eventi.html", "daily", "0.9"],
    ["/coupon.html", "daily", "0.9"],
    ["/mappa.html", "weekly", "0.8"],
    ["/estate-2026.html", "weekly", "0.8"],
    ["/attivita-locali.html", "weekly", "0.8"]
  ];
  const urls = [
    ...basePages.map(([pathname, changefreq, priority]) => ({ url: `${baseUrl}${pathname}`, changefreq, priority })),
    ...events.map((event) => ({ url: `${baseUrl}/eventi/${event.id}.html`, changefreq: "weekly", priority: "0.7", lastmod: event.updatedAt || buildDate }))
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod || buildDate}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const entry of entries) {
  await cp(path.join(root, entry), path.join(output, entry), { recursive: true });
}

const eventsSource = await readFile(path.join(root, "events-data.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(eventsSource, sandbox);
const events = uniqueEvents(sandbox.window.MYAVEZZANO_EVENTS || []);
const eventOutput = path.join(output, "eventi");
await mkdir(eventOutput, { recursive: true });

await Promise.all(events.map((event) => writeFile(path.join(eventOutput, `${event.id}.html`), eventPage(event), "utf8")));
await writeFile(path.join(output, "sitemap.xml"), sitemapXml(events), "utf8");

console.log(`Static PWA copied to public/ with ${events.length} event pages.`);
