import { createServer } from "node:http";
import { readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const publicDir = path.join(root, "public");
const port = Number(process.env.QA_PORT || 4177);

const mime = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8"
};

function fail(message) {
  throw new Error(`Production QA failed: ${message}`);
}

function createStaticServer() {
  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url || "/", `http://127.0.0.1:${port}`);
      const cleanPath = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
      const absolutePath = path.normalize(path.join(publicDir, cleanPath));
      if (!absolutePath.startsWith(publicDir)) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
      }
      const target = existsSync(absolutePath) ? absolutePath : path.join(publicDir, "index.html");
      const content = await readFile(target);
      response.writeHead(200, {
        "content-type": mime[path.extname(target).toLowerCase()] || "application/octet-stream",
        "cache-control": "no-store"
      });
      response.end(content);
    } catch (error) {
      response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      response.end(String(error));
    }
  });
}

async function textMustNotContain(page, patterns, label) {
  const bodyText = await page.locator("body").innerText();
  for (const pattern of patterns) {
    if (bodyText.toLowerCase().includes(pattern.toLowerCase())) {
      fail(`${label} contiene testo non ammesso: ${pattern}`);
    }
  }
}

async function assertNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => Math.ceil(document.documentElement.scrollWidth - document.documentElement.clientWidth));
  if (overflow > 2) fail(`${label} ha overflow orizzontale di ${overflow}px`);
}

async function assertOkAsset(page, baseUrl, assetPath) {
  const response = await page.request.get(`${baseUrl}/${assetPath}`);
  if (!response.ok()) fail(`asset non raggiungibile: ${assetPath} (${response.status()})`);
}

async function readPublicText(relativePath) {
  return readFile(path.join(publicDir, relativePath), "utf8");
}

const server = createStaticServer();
await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));

const baseUrl = `http://127.0.0.1:${port}`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const consoleErrors = [];

page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});
page.on("pageerror", (error) => consoleErrors.push(error.message));

async function gotoChecked(target, label) {
  const start = consoleErrors.length;
  await page.goto(target, { waitUntil: "networkidle" });
  const newErrors = consoleErrors.slice(start);
  if (newErrors.length) fail(`${label} ha errori console: ${newErrors.join(" | ")}`);
}

try {
  const forbiddenPublicText = [
    "persone parteciperanno",
    "qr univoco",
    "codice:",
    "paga e crea negozio",
    "fatturazione b2b",
    "scarica fattura",
    "checkout demo",
    "metodo pagamento demo",
    "utenti demo",
    "annulla demo",
    "street green fest",
    "stracittadina",
    "school of rock",
    "caff\u00e8 risorgimento",
    "2 tavoli aperitivo",
    "bakery marsica",
    "coupon benvenuto",
    "aperitivo lungo in centro",
    "saldi weekend",
    "fitlab avezzano",
    "Extra saldo weekend",
    "Solo con QR MyAvezzano",
    "AVZ-DELLOLIO-WEEKEND",
    "Consiglio ora",
    "promo e shopping",
    "95 appuntamenti"
  ];

  await gotoChecked(`${baseUrl}/?prod=1`, "home produzione");
  if (await page.evaluate(() => window.MYAVEZZANO_IS_DEMO)) fail("la modalità produzione locale non è attiva con ?prod=1");
  await textMustNotContain(page, forbiddenPublicText, "home produzione");
  const homeVisibleText = await page.locator("body").innerText();
  if (/Dell'Olio 1920/i.test(homeVisibleText)) fail("home produzione mostra Dell'Olio 1920 come contenuto promozionale");
  if (/I Cinque Pini[\s\S]{0,80}Consiglio ora/i.test(homeVisibleText)) fail("home produzione mostra I Cinque Pini come consiglio non verificato");

  await page.locator("[data-view-target='summer']").click();
  await page.locator("#summerGrid .agenda-event").first().waitFor({ state: "visible", timeout: 5000 });
  await page.locator("#citySelector").selectOption("all");
  await page.waitForTimeout(150);
  const metricCheck = await page.evaluate(() => {
    const today = new Date().toISOString().slice(0, 10);
    const events = window.MYAVEZZANO_EVENTS || [];
    const isLongRunningProgram = (event) => {
      const start = new Date(`${event.date}T12:00:00`);
      const end = new Date(`${event.endDate || event.date}T12:00:00`);
      const duration = Math.max(1, Math.round((end - start) / 86400000) + 1);
      const text = [event.title, event.time, event.detail, event.price, event.category].filter(Boolean).join(" ").toLowerCase();
      return duration > 7 || /date variabili|orari vari|centro estivo|centri estivi|iscrizioni|programma|voucher/.test(text);
    };
    const future = events.filter((event) =>
      String(event.date || "") >= today ||
      (!isLongRunningProgram(event) && String(event.date || "") <= today && String(event.endDate || event.date || "") >= today)
    );
    const summer = future.filter((event) => String(event.date || "") >= "2026-06-21" && String(event.date || "") <= "2026-09-22");
    const avezzano = future.filter((event) => event.area === "Avezzano");
    const alba = future.filter((event) => event.area === "Alba Fucens");
    const readMetric = (id) => {
      const row = document.querySelector(id);
      return {
        label: row?.querySelector("span")?.textContent?.trim() || "",
        value: Number(row?.querySelector("strong")?.textContent?.trim() || "NaN")
      };
    };
    return {
      expected: { future: future.length, summer: summer.length, avezzano: avezzano.length, alba: alba.length },
      actual: {
        future: readMetric("#summerMetricFuture"),
        summer: readMetric("#summerMetricProgram"),
        avezzano: readMetric("#summerMetricAvezzano"),
        alba: readMetric("#summerMetricAlba")
      }
    };
  });
  if (metricCheck.actual.future.value !== metricCheck.expected.future || !/Eventi futuri nella Marsica/.test(metricCheck.actual.future.label)) {
    fail(`conteggio Marsica incoerente: ${JSON.stringify(metricCheck)}`);
  }
  if (metricCheck.actual.summer.value !== metricCheck.expected.summer || !/cartellone Estate 2026/.test(metricCheck.actual.summer.label)) {
    fail(`conteggio Estate incoerente: ${JSON.stringify(metricCheck)}`);
  }
  if (metricCheck.actual.avezzano.value !== metricCheck.expected.avezzano || !/Eventi futuri ad Avezzano/.test(metricCheck.actual.avezzano.label)) {
    fail(`conteggio Avezzano incoerente: ${JSON.stringify(metricCheck)}`);
  }
  if (metricCheck.actual.alba.value !== metricCheck.expected.alba || !/Eventi futuri ad Alba Fucens/.test(metricCheck.actual.alba.label)) {
    fail(`conteggio Alba Fucens incoerente: ${JSON.stringify(metricCheck)}`);
  }

  await page.locator("#citySelector").selectOption("Avezzano");
  await page.waitForTimeout(150);
  const avezzanoMetric = await page.evaluate(() => {
    const row = document.querySelector("#summerMetricFuture");
    return {
      label: row?.querySelector("span")?.textContent?.trim() || "",
      value: row?.querySelector("strong")?.textContent?.trim() || "",
      duplicateVisible: !document.querySelector("#summerMetricAvezzano")?.hidden
    };
  });
  if (!/eventi futuri ad Avezzano/i.test(avezzanoMetric.label) || avezzanoMetric.duplicateVisible) {
    fail(`metrica Avezzano duplicata o non chiara: ${JSON.stringify(avezzanoMetric)}`);
  }

  const profileCounts = await page.locator("#homeProfileCoupons, #homeProfileEvents, #homeProfilePoints").evaluateAll((nodes) => nodes.map((node) => node.textContent?.trim()));
  if (profileCounts.some((value) => value !== "0")) fail(`profilo ospite non vuoto in home: ${profileCounts.join(", ")}`);

  await gotoChecked(`${baseUrl}/?prod=1#coupons`, "coupon produzione");
  await page.locator("#couponsGrid .coupon-card").first().waitFor({ state: "visible", timeout: 5000 });
  await textMustNotContain(page, forbiddenPublicText, "coupon produzione");
  if (await page.locator("text=QR dimostrativo non valido").count() < 1) fail("manca etichetta QR dimostrativo non valido");
  if (await page.locator("button:visible", { hasText: "Scansiona QR" }).count() > 0) fail("azione scansione QR visibile in produzione");

  await gotoChecked(`${baseUrl}/?prod=1#events`, "eventi produzione");
  await textMustNotContain(page, forbiddenPublicText, "eventi produzione");
  if (await page.locator(".agenda-trust").count() < 1) fail("mancano campi fiducia evento");
  if (await page.locator("button[data-action='event-reminder']").count() > 0) fail("promemoria simulato visibile in produzione");
  const firstSave = page.locator("button[data-action='save-event']:visible").first();
  await firstSave.click();
  await page.waitForTimeout(200);
  const savedRows = await page.evaluate(() => JSON.parse(localStorage.getItem("myavezzano_local_saved_events_v1") || "[]").length);
  if (savedRows < 1) fail("salvataggio evento locale non registrato");
  const demoState = await page.evaluate(() => localStorage.getItem("myavezzano_demo_state_v1"));
  if (demoState) fail("lo stato demo è stato scritto in produzione");

  await gotoChecked(`${baseUrl}/?prod=1#profile`, "profilo produzione");
  const profileCouponCount = await page.locator("#profileCouponCount").innerText();
  const profilePointCount = await page.locator("#profilePointCount").innerText();
  if (profileCouponCount.trim() !== "0" || profilePointCount.trim() !== "0") {
    fail(`profilo produzione mostra dati precompilati: coupon ${profileCouponCount}, punti ${profilePointCount}`);
  }

  for (const asset of [
    "manifest.json",
    "service-worker.js",
    "assets/pwa/icon-192.png",
    "assets/pwa/icon-512.png",
    "assets/pwa/icon-maskable-512.png",
    "assets/pwa/screenshot-mobile.png",
    "assets/pwa/screenshot-desktop.png"
  ]) {
    await assertOkAsset(page, baseUrl, asset);
  }

  const serviceWorkerText = await (await page.request.get(`${baseUrl}/service-worker.js`)).text();
  if (/v=100|v=101|__BUILD_VERSION__/.test(serviceWorkerText)) fail("service worker contiene versioni obsolete o token non sostituiti");

  const indexText = await readPublicText("index.html");
  const indexVersion = indexText.match(/styles\.css\?v=([a-z0-9.-]+)/i)?.[1];
  const appVersion = indexText.match(/app\.js\?v=([a-z0-9.-]+)/i)?.[1];
  const workerVersion = serviceWorkerText.match(/myavezzano-([a-z0-9.-]+)/i)?.[1];
  if (!indexVersion || !appVersion || !workerVersion || indexVersion !== appVersion || indexVersion !== workerVersion) {
    fail(`versioni asset non allineate: css ${indexVersion}, app ${appVersion}, sw ${workerVersion}`);
  }

  const estateText = await readPublicText("estate-2026.html");
  if (!estateText.includes('id="summerSeoEvents"')) fail("estate-2026 non contiene la sezione eventi generata");
  if (/"@type":\s*"Event"/.test(estateText)) fail("estate-2026 contiene Event JSON-LD statico non verificato");

  const eventFiles = (await readdir(path.join(publicDir, "eventi"))).filter((file) => file.endsWith(".html"));
  let unverifiedPages = 0;
  const unverifiedUrls = [];
  for (const file of eventFiles) {
    const html = await readPublicText(path.join("eventi", file));
    const hasEventJsonLd = /"@type":\s*"Event"/.test(html);
    const isIndexable = /<meta name="robots" content="index, follow"/.test(html);
    const isNoindex = /<meta name="robots" content="noindex, follow"/.test(html);
    if (/"availability":\s*"https:\/\/schema\.org\/InStock"/.test(html)) fail(`${file} contiene disponibilita InStock fittizia`);
    if (/"name":\s*"Non disponibile"/.test(html)) fail(`${file} contiene organizer JSON-LD fittizio`);
    if (/sameAs":\s*"https:\/\/www\.festivalinitalia\.it\/?"/.test(html)) fail(`${file} contiene sameAs verso homepage generica`);
    if (/https:\/\/www\.festivalinitalia\.it\/?["<]/.test(html)) fail(`${file} contiene fonte generica Festival in Italia`);
    if (html.includes("Fonte ufficiale") && html.includes("festivalinitalia.it")) fail(`${file} mostra Fonte ufficiale per una fonte secondaria`);
    if (html.includes("Fonte consultata") && (hasEventJsonLd || isIndexable)) fail(`${file} indicizza o struttura un evento con sola fonte secondaria`);
    if (!html.includes("Prezzo / Biglietto")) fail(`${file} non mostra il campo prezzo/biglietto`);
    if (isNoindex && !hasEventJsonLd) {
      unverifiedPages += 1;
      unverifiedUrls.push(`/eventi/${file}`);
    }
  }
  if (!unverifiedPages) fail("nessuna pagina evento non verificata con noindex");

  const sitemapText = await readPublicText("sitemap.xml");
  if (sitemapText.includes("festivalinitalia.it")) fail("sitemap contiene riferimenti a fonti secondarie");
  for (const url of unverifiedUrls) {
    if (sitemapText.includes(url)) fail(`sitemap contiene evento non verificato: ${url}`);
  }

  await gotoChecked(`${baseUrl}/?prod=1#events`, "ordine eventi");
  const eventTitles = await page.locator("#eventsGrid .agenda-event h3").evaluateAll((nodes) => nodes.map((node) => node.textContent?.trim()).filter(Boolean));
  const lievitoIndex = eventTitles.findIndex((title) => title.includes("Lievito Madre"));
  const laudatoIndex = eventTitles.findIndex((title) => title.includes("Laudato"));
  if (lievitoIndex >= 0 && laudatoIndex >= 0 && lievitoIndex > laudatoIndex) fail("gli eventi dello stesso giorno non sono ordinati per ora");

  await gotoChecked(`${baseUrl}/eventi.html`, "eventi statici");
  const staticEventTitles = await page.locator("#eventsSeoList .seo-card h3").evaluateAll((nodes) => nodes.map((node) => node.textContent?.trim()).filter(Boolean));
  const staticLievitoIndex = staticEventTitles.findIndex((title) => title.includes("Lievito Madre"));
  const staticLaudatoIndex = staticEventTitles.findIndex((title) => title.includes("Laudato"));
  if (staticLievitoIndex >= 0 && staticLaudatoIndex >= 0 && staticLievitoIndex > staticLaudatoIndex) {
    fail("eventi.html non ordina gli eventi del 17 luglio per orario");
  }

  const eventsDataText = await readPublicText("events-data.js");
  if (eventsDataText.includes('"sourceUrl": "https://www.festivalinitalia.it/"')) fail("events-data contiene homepage generica Festival in Italia");

  for (const viewport of [
    { width: 320, height: 740 },
    { width: 390, height: 844 },
    { width: 768, height: 900 },
    { width: 1440, height: 900 }
  ]) {
    await page.setViewportSize(viewport);
    await gotoChecked(`${baseUrl}/?prod=1`, "home produzione");
    await assertNoHorizontalOverflow(page, `${viewport.width}px home`);
    await gotoChecked(`${baseUrl}/?prod=1#events`, "eventi produzione");
    await assertNoHorizontalOverflow(page, `${viewport.width}px eventi`);
  }

  for (const pathName of ["/eventi.html", "/estate-2026.html", "/coupon.html", "/mappa.html", "/attivita-locali.html"]) {
    await gotoChecked(`${baseUrl}${pathName}`, pathName);
  }

  await gotoChecked(`${baseUrl}/?demo=1`, "modalita demo");
  if (!(await page.evaluate(() => window.MYAVEZZANO_IS_DEMO))) fail("modalità demo non attivabile con ?demo=1");

  console.log("Production QA ok: modalità produzione pulita, PWA asset presenti, nessun overflow critico.");
} finally {
  await browser.close();
  server.close();
}
