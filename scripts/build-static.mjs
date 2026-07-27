import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const output = path.join(root, "public");
const baseUrl = "https://myavezzano.vercel.app";

function todayInRome(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Rome",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const get = (type) => parts.find((part) => part.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function buildVersion() {
  if (process.env.BUILD_VERSION) return process.env.BUILD_VERSION;
  try {
    return execSync("git rev-parse --short HEAD", { cwd: root, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return todayInRome().replaceAll("-", "");
  }
}

const buildDate = process.env.BUILD_DATE || todayInRome(process.env.MYAVEZZANO_NOW ? new Date(process.env.MYAVEZZANO_NOW) : new Date());
const assetVersion = buildVersion();
const entries = [
  "index.html",
  "offline.html",
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

function withBuildTokens(content) {
  return content.replaceAll("__BUILD_VERSION__", assetVersion);
}

function cleanOutput(content) {
  return content.replace(/[ \t]+$/gm, "");
}

function minifyCss(content) {
  return content
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>+~])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;"
}[character]));

const eventFallbackImage = "assets/social-preview.jpg";
const eventThemeImages = {
  Ambiente: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=78",
  Cultura: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=78",
  Famiglie: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=78",
  Gastronomia: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=78",
  Incontro: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=78",
  Motori: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=78",
  Musica: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=78",
  Segnalazione: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=78",
  Sport: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=78",
  Teatro: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=78",
  Territorio: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=78"
};
const eventAreaImages = {
  "Alba Fucens": "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=1200&q=78",
  Pescina: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=78",
  Tagliacozzo: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=78"
};
const importantEventKeywords = [
  "fedez",
  "francesco gabbani",
  "enrico brignano",
  "tony hadley",
  "rita pavone",
  "fred de palma",
  "le vibrazioni",
  "fausto leali",
  "sal da vinci",
  "leo gassmann",
  "bb day"
];

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

function eventUsesGenericImage(event = {}) {
  return !event.image || String(event.image).includes("social-preview.jpg");
}

function eventFallbackFor(event = {}) {
  return eventAreaImages[event.area] || eventThemeImages[event.category] || eventFallbackImage;
}

function isGenericSourceUrl(url = "") {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    const pathname = parsed.pathname.replace(/\/+$/, "");
    return !pathname || pathname === "";
  } catch {
    return false;
  }
}

function normalizedSourceType(event = {}, sourceUrl = "") {
  if (event.sourceType) return event.sourceType;
  if (event.officialUrl) return "official";
  return sourceUrl ? "secondary" : "";
}

function eventOfficialUrl(event = {}) {
  const sourceType = event.sourceType || "";
  const candidate = event.officialUrl || (sourceType === "official" ? event.sourceUrl : "");
  return candidate && !isGenericSourceUrl(candidate) ? candidate : "";
}

function eventIsVerified(event = {}) {
  const status = String(event.verificationStatus || event.status || "").toLowerCase();
  return Boolean(event.sourceType === "official" && eventOfficialUrl(event) && ["verified", "confermato", "confirmed"].includes(status));
}

function eventSortTime(event = {}) {
  const match = String(event.time || "").match(/(\d{1,2}):(\d{2})/);
  return match ? `${String(match[1]).padStart(2, "0")}:${match[2]}` : "99:99";
}

function sortEvents(events) {
  return [...events].sort((a, b) =>
    String(a.date || "").localeCompare(String(b.date || "")) ||
    eventSortTime(a).localeCompare(eventSortTime(b)) ||
    String(a.title || "").localeCompare(String(b.title || ""), "it")
  );
}

function normalizeEvent(event) {
  const id = event.id || eventSlug([event.title, event.date, event.place].filter(Boolean).join(" "));
  const fallbackImageUsed = eventUsesGenericImage(event);
  const image = fallbackImageUsed ? eventFallbackFor(event) : event.image;
  const isRealPhoto = Boolean(!fallbackImageUsed && event.image && event.isRealPhoto);
  const importance = event.importance || (event.featured ? "high" : "normal");
  const importantByTitle = importantEventKeywords.some((keyword) => String(event.title || "").toLowerCase().includes(keyword));
  const rawSourceUrl = event.sourceUrl || "";
  const sourceUrl = isGenericSourceUrl(rawSourceUrl) ? "" : rawSourceUrl;
  const sourceType = normalizedSourceType(event, sourceUrl);
  const officialUrl = sourceType === "official" && !isGenericSourceUrl(event.officialUrl || sourceUrl) ? (event.officialUrl || sourceUrl) : "";
  const defaultStatus = officialUrl ? "confermato" : (sourceUrl ? "segnalato" : "da verificare");
  const incomingStatus = String(event.status || event.verificationStatus || "").toLowerCase();
  const safeStatus = officialUrl || incomingStatus === "annullato" ? (event.status || defaultStatus) : defaultStatus;
  const safeVerificationStatus = officialUrl ? (event.verificationStatus || safeStatus) : defaultStatus;
  return {
    ...event,
    id,
    slug: event.slug || id,
    importance,
    featured: Boolean(event.featured || importance === "high" || importantByTitle),
    image,
    imageAlt: event.imageAlt || `${event.title} - ${event.place}`,
    imageSource: fallbackImageUsed ? "Immagine tematica MyAvezzano" : (event.imageSource || (isRealPhoto ? "Fonte evento" : "Fallback neutro MyAvezzano")),
    isRealPhoto,
    sourceUrl,
    sourceType,
    organizer: event.organizer || "",
    verificationStatus: safeVerificationStatus,
    status: safeStatus,
    officialUrl,
    ticketUrl: event.ticketUrl || "",
    lastVerifiedAt: event.lastVerifiedAt || event.updatedAt || "Non disponibile",
    coordinates: event.coordinates || null,
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

function eventJsonLd(event, url, imageUrl, locality, addressRegion) {
  if (!eventIsVerified(event)) return "";
  const dates = schemaDates(event);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: dates.startDate,
    ...(dates.endDate ? { endDate: dates.endDate } : {}),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: event.status === "annullato" ? "https://schema.org/EventCancelled" : "https://schema.org/EventScheduled",
    url,
    dateModified: event.updatedAt,
    ...(event.organizer ? { organizer: { "@type": "Organization", name: event.organizer } } : {}),
    ...(event.officialUrl ? { sameAs: event.officialUrl } : {}),
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
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2).replace(/</g, "\\u003c")}</script>`;
}

function eventPage(event) {
  const url = `${baseUrl}/eventi/${event.id}.html`;
  const locality = event.area === "Alba Fucens" ? "Massa d'Albe" : event.area;
  const imageUrl = assetUrl(event.image);
  const addressRegion = event.area === "Borgorose" || /\(RI\)/.test(event.place) ? "RI" : "AQ";
  const schemaJson = eventJsonLd(event, url, imageUrl, locality, addressRegion);
  const title = escapeHtml(event.title);
  const description = escapeHtml(event.detail);
  const dateLabel = escapeHtml(eventDateLabel(event));
  const place = escapeHtml(event.place);
  const time = escapeHtml(event.time);
  const price = escapeHtml(event.price);
  const imageAlt = escapeHtml(event.imageAlt);
  const imageSource = escapeHtml(event.imageSource);
  const isImportant = event.featured || event.importance === "high";
  const statusLabel = event.status === "confermato" ? "Confermato" : event.status === "annullato" ? "Annullato" : event.status === "segnalato" ? "Segnalato" : "Da verificare";
  const organizer = escapeHtml(event.organizer || "Organizzatore non disponibile");
  const lastVerified = escapeHtml(event.lastVerifiedAt || "Non disponibile");
  const sourceLink = event.officialUrl
    ? `<a class="seo-link" href="${escapeHtml(event.officialUrl)}" rel="nofollow noreferrer" target="_blank">Fonte ufficiale</a>`
    : event.sourceUrl
      ? `<a class="seo-link" href="${escapeHtml(event.sourceUrl)}" rel="nofollow noreferrer" target="_blank">Fonte consultata</a>`
      : `<span class="seo-link disabled">Fonte non disponibile</span>`;
  const robots = eventIsVerified(event) ? "index, follow" : "noindex, follow";

  return `<!doctype html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} | Eventi MyAvezzano</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="${robots}" />
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
    ${schemaJson}
    <link rel="stylesheet" href="../styles.css?v=__BUILD_VERSION__" />
  </head>
  <body class="seo-body${isImportant ? " seo-event-important" : ""}">
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
          <p class="seo-kicker">${escapeHtml(event.category)} · ${escapeHtml(event.area)}${isImportant ? ` <span class="seo-important-badge">Evento importante</span>` : ""}</p>
          <h1>${title}</h1>
          <p>${description}</p>
          <div class="seo-event-summary">
            <div><span>Data e ora</span><strong>${dateLabel} · ${time}</strong></div>
            <div><span>Luogo</span><strong>${place}</strong></div>
            <div><span>Prezzo / Biglietto</span><strong>${price}</strong></div>
            <div><span>Area</span><strong>${escapeHtml(event.area)}</strong></div>
            <div><span>Stato</span><strong>${statusLabel}</strong></div>
            <div><span>Organizzatore</span><strong>${organizer}</strong></div>
            <div><span>Ultima verifica</span><strong>${lastVerified}</strong></div>
          </div>
          <div class="seo-actions">${sourceLink}<a class="seo-link" href="../eventi.html">Torna al calendario</a></div>
        </section>
      </main>
      <footer class="seo-footer"><p>MyAvezzano raccoglie eventi e informazioni locali per Avezzano e area immediata. Scheda aggiornata il ${escapeHtml(event.updatedAt)}.</p><div class="seo-footer-links"><a href="../index.html">Home</a><a href="../sitemap.xml">Sitemap</a></div></footer>
    </div>
  </body>
</html>`;
}

function summerEventsSection(events) {
  const summer = sortEvents(events.filter((event) =>
    event.date >= "2026-06-21" &&
    event.date <= "2026-09-22" &&
    (event.endDate || event.date) >= buildDate
  ));
  const verified = summer.filter(eventIsVerified);
  const fallback = summer.filter((event) => !eventIsVerified(event));
  const selected = [...verified, ...fallback].slice(0, 12);
  const trustLabel = (event) => eventIsVerified(event) ? "Verificato" : (event.sourceUrl ? "Segnalato" : "Da verificare");
  const trustClass = (event) => eventIsVerified(event) ? "success" : "warning";
  if (!selected.length) {
    return `<section class="seo-section" id="summerSeoEvents"><p class="seo-kicker">Calendario</p><h2>Prossimi eventi dell'Estate 2026</h2><p>Non risultano eventi futuri pubblicabili in questo momento.</p></section>`;
  }
  return `<section class="seo-section" id="summerSeoEvents">
          <p class="seo-kicker">Calendario aggiornato</p>
          <h2>Prossimi eventi dell'Estate 2026</h2>
          <div class="seo-grid two">
            ${selected.map((event) => `
            <article class="seo-card">
              <span class="pill ${trustClass(event)}">${trustLabel(event)}</span>
              <h3>${escapeHtml(event.title)}</h3>
              <ul class="seo-meta">
                <li>${escapeHtml(eventDateLabel(event))}</li>
                <li>${escapeHtml(event.time || "Orario da verificare")}</li>
                <li>${escapeHtml(event.area || "Comune non disponibile")}</li>
              </ul>
              <p>${escapeHtml(event.place || "Luogo non disponibile")}</p>
              <a class="seo-link" href="eventi/${escapeHtml(event.id)}.html">Apri scheda evento</a>
            </article>`).join("")}
          </div>
        </section>`;
}

function eventsPageSection(events) {
  const selected = sortEvents(events.filter((event) => (event.endDate || event.date) >= buildDate)).slice(0, 18);
  if (!selected.length) {
    return `<section class="seo-section" id="eventsSeoList"><p class="seo-kicker">In evidenza</p><h2>Prossimi appuntamenti</h2><p>Non risultano eventi futuri pubblicabili in questo momento.</p></section>`;
  }
  return `<section class="seo-section" id="eventsSeoList">
          <p class="seo-kicker">In evidenza</p>
          <h2>Prossimi appuntamenti</h2>
          <div class="seo-grid">
            ${selected.map((event) => `
            <article class="seo-card">
              <span class="pill ${eventIsVerified(event) ? "success" : "warning"}">${eventIsVerified(event) ? "Verificato" : (event.sourceUrl ? "Segnalato" : "Da verificare")}</span>
              <h3><a href="eventi/${escapeHtml(event.id)}.html">${escapeHtml(event.title)}</a></h3>
              <ul class="seo-meta">
                <li>${escapeHtml(eventDateLabel(event))} · ${escapeHtml(event.time || "Orario da verificare")}</li>
                <li>${escapeHtml(event.place || "Luogo non disponibile")}</li>
              </ul>
              <p>${escapeHtml(event.detail || "Informazioni evento in aggiornamento.")}</p>
            </article>`).join("")}
          </div>
        </section>`;
}

function sitemapXml(events) {
  const upcomingEvents = sortEvents(events.filter((event) => (event.endDate || event.date) >= buildDate && eventIsVerified(event)));
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
    ...upcomingEvents.map((event) => ({ url: `${baseUrl}/eventi/${event.id}.html`, changefreq: "weekly", priority: "0.7", lastmod: event.updatedAt || buildDate }))
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

await Promise.all([
  "index.html",
  "eventi.html",
  "coupon.html",
  "mappa.html",
  "estate-2026.html",
  "attivita-locali.html",
  "service-worker.js"
].map(async (file) => {
  const target = path.join(output, file);
  const content = await readFile(target, "utf8");
  await writeFile(target, cleanOutput(withBuildTokens(content)), "utf8");
}));

const cssPath = path.join(output, "styles.css");
await writeFile(cssPath, minifyCss(withBuildTokens(await readFile(cssPath, "utf8"))), "utf8");

const eventsSource = await readFile(path.join(root, "events-data.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(eventsSource, sandbox);
const events = uniqueEvents(sandbox.window.MYAVEZZANO_EVENTS || []);
const publicEvents = sortEvents(events.filter((event) => (event.endDate || event.date) >= buildDate));
const eventOutput = path.join(output, "eventi");
await mkdir(eventOutput, { recursive: true });

const estatePagePath = path.join(output, "estate-2026.html");
const estatePage = await readFile(estatePagePath, "utf8");
await writeFile(estatePagePath, cleanOutput(estatePage.replace("<!-- SUMMER_EVENTS_PLACEHOLDER -->", summerEventsSection(publicEvents))), "utf8");

const eventsPagePath = path.join(output, "eventi.html");
const eventsPage = await readFile(eventsPagePath, "utf8");
await writeFile(eventsPagePath, cleanOutput(eventsPage.replace("<!-- EVENTS_LIST_PLACEHOLDER -->", eventsPageSection(publicEvents))), "utf8");

await Promise.all(publicEvents.map((event) => writeFile(path.join(eventOutput, `${event.id}.html`), cleanOutput(withBuildTokens(eventPage(event))), "utf8")));
await writeFile(path.join(output, "sitemap.xml"), cleanOutput(sitemapXml(publicEvents)), "utf8");

console.log(`Static PWA copied to public/ with ${publicEvents.length} event pages.`);
