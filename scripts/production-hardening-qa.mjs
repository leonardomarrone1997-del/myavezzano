import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
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

const server = createStaticServer();
await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));

const baseUrl = `http://127.0.0.1:${port}`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

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
    "school of rock"
  ];

  await page.goto(`${baseUrl}/?prod=1`, { waitUntil: "networkidle" });
  if (await page.evaluate(() => window.MYAVEZZANO_IS_DEMO)) fail("la modalità produzione locale non è attiva con ?prod=1");
  await textMustNotContain(page, forbiddenPublicText, "home produzione");

  const profileCounts = await page.locator("#homeProfileCoupons, #homeProfileEvents, #homeProfilePoints").evaluateAll((nodes) => nodes.map((node) => node.textContent?.trim()));
  if (profileCounts.some((value) => value !== "0")) fail(`profilo ospite non vuoto in home: ${profileCounts.join(", ")}`);

  await page.goto(`${baseUrl}/?prod=1`, { waitUntil: "networkidle" });
  await page.locator("[data-view-target='coupons']:visible").first().click();
  await page.locator("#couponsGrid .coupon-card").first().waitFor({ state: "visible", timeout: 5000 });
  await textMustNotContain(page, forbiddenPublicText, "coupon produzione");
  if (await page.locator("text=QR dimostrativo non valido").count() < 1) fail("manca etichetta QR dimostrativo non valido");
  if (await page.locator("button:visible", { hasText: "Scansiona QR" }).count() > 0) fail("azione scansione QR visibile in produzione");

  await page.goto(`${baseUrl}/?prod=1#events`, { waitUntil: "networkidle" });
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

  await page.goto(`${baseUrl}/?prod=1#profile`, { waitUntil: "networkidle" });
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

  for (const viewport of [
    { width: 320, height: 740 },
    { width: 390, height: 844 },
    { width: 768, height: 900 },
    { width: 1440, height: 900 }
  ]) {
    await page.setViewportSize(viewport);
    await page.goto(`${baseUrl}/?prod=1`, { waitUntil: "networkidle" });
    await assertNoHorizontalOverflow(page, `${viewport.width}px home`);
    await page.goto(`${baseUrl}/?prod=1#events`, { waitUntil: "networkidle" });
    await assertNoHorizontalOverflow(page, `${viewport.width}px eventi`);
  }

  await page.goto(`${baseUrl}/?demo=1`, { waitUntil: "networkidle" });
  if (!(await page.evaluate(() => window.MYAVEZZANO_IS_DEMO))) fail("modalità demo non attivabile con ?demo=1");

  console.log("Production QA ok: modalità produzione pulita, PWA asset presenti, nessun overflow critico.");
} finally {
  await browser.close();
  server.close();
}
