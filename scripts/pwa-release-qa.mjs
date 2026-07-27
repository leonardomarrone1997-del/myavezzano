import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const publicDir = path.join(root, "public");

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

function fail(message) {
  console.error(`PWA release QA failed: ${message}`);
  process.exit(1);
}

const referenceDate = process.env.MYAVEZZANO_NOW
  ? todayInRome(new Date(process.env.MYAVEZZANO_NOW))
  : todayInRome();

const [manifestRaw, serviceWorker, sitemap, eventsHtml] = await Promise.all([
  readFile(path.join(root, "manifest.json"), "utf8"),
  readFile(path.join(publicDir, "service-worker.js"), "utf8"),
  readFile(path.join(publicDir, "sitemap.xml"), "utf8"),
  readFile(path.join(publicDir, "eventi.html"), "utf8")
]);

const manifest = JSON.parse(manifestRaw);
const shortcutNames = (manifest.shortcuts || []).map((shortcut) => shortcut.name).join("|");
if (shortcutNames !== "Oggi|Esplora|Mappa|Salvati") {
  fail(`shortcut manifest non coerenti: ${shortcutNames}`);
}

if (/assets\/marketing|assets\/home-actions|avezzano-hero-(day|night)\.jpg|screenshot-(mobile|desktop)\.png/.test(serviceWorker)) {
  fail("service worker precarica asset secondari o immagini pesanti");
}

if (sitemap.includes("2026-07-17")) {
  fail("sitemap contiene ancora lastmod o URL legati al 2026-07-17");
}

if (!sitemap.includes(`<lastmod>${referenceDate}</lastmod>`)) {
  fail(`sitemap non contiene lastmod della build ${referenceDate}`);
}

const expiredTitles = [
  "Lievito Madre",
  "Laudato Si",
  "Io Mimmo M",
  "Ulisse e le donne",
  "ReQueen",
  "Il malato immaginario"
];
for (const title of expiredTitles) {
  if (eventsHtml.includes(title)) {
    fail(`eventi.html contiene evento scaduto: ${title}`);
  }
}

if (!eventsHtml.includes("Casa chiusa. Ma non troppo")) {
  fail("eventi.html non contiene il primo evento futuro singolo atteso ad Avezzano");
}

console.log(`PWA release QA ok: referenceDate=${referenceDate}, shortcuts=${shortcutNames}.`);
