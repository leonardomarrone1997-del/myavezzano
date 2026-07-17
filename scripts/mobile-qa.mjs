import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, devices } from "playwright";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const publicDir = path.join(root, "public");
const artifactDir = path.join(root, "qa-artifacts", "mobile");
const port = Number(process.env.QA_MOBILE_PORT || 4178);

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
  throw new Error(`Mobile QA failed: ${message}`);
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

async function assertNoOverflow(page, label) {
  const overflow = await page.evaluate(() => Math.ceil(document.documentElement.scrollWidth - document.documentElement.clientWidth));
  if (overflow > 2) fail(`${label}: overflow orizzontale ${overflow}px`);
}

async function assertBottomNav(page, label) {
  const nav = page.locator(".bottom-nav");
  await nav.waitFor({ state: "visible" });
  const navBox = await nav.boundingBox();
  if (!navBox) fail(`${label}: bottom nav non misurabile`);
  const viewport = page.viewportSize();
  if (viewport && navBox.y + navBox.height > viewport.height + 1) fail(`${label}: bottom nav fuori viewport`);
  const items = await page.locator(".bottom-nav-item").all();
  if (items.length !== 4) fail(`${label}: bottom nav deve avere 4 destinazioni, trovate ${items.length}`);
  for (const item of items) {
    const box = await item.boundingBox();
    if (!box || box.width < 44 || box.height < 44) fail(`${label}: target touch sotto 44px`);
  }
  if (await page.locator(".bottom-nav-item[aria-current='page']").count() !== 1) {
    fail(`${label}: aria-current deve essere presente su una sola destinazione`);
  }
}

async function assertManifest(page, baseUrl) {
  const manifest = await page.request.get(`${baseUrl}/manifest.json`);
  if (!manifest.ok()) fail(`manifest non raggiungibile: ${manifest.status()}`);
  const data = await manifest.json();
  if (data.display !== "standalone") fail("manifest display non standalone");
  if (!data.icons?.some((icon) => icon.sizes === "192x192")) fail("icona 192 mancante");
  if (!data.icons?.some((icon) => icon.sizes === "512x512")) fail("icona 512 mancante");
  if (!data.icons?.some((icon) => String(icon.purpose || "").includes("maskable"))) fail("icona maskable mancante");
  const appleTouch = await page.locator("link[rel='apple-touch-icon']").getAttribute("href");
  if (!appleTouch || !appleTouch.includes("icon-192")) fail("Apple touch icon non coerente");
}

async function runMobileFlow(browser, baseUrl) {
  const context = await browser.newContext({
    ...devices["iPhone 13"],
    permissions: [],
    reducedMotion: "reduce",
    acceptDownloads: true
  });
  await context.addInitScript(() => {
    window.__geoCalls = 0;
    const fakeGeo = {
      getCurrentPosition(success) {
        window.__geoCalls += 1;
        success({ coords: { latitude: 42.0326, longitude: 13.4256 } });
      }
    };
    Object.defineProperty(navigator, "geolocation", { value: fakeGeo, configurable: true });
    Object.defineProperty(navigator, "share", {
      value: async () => {
        window.__shareCalls = (window.__shareCalls || 0) + 1;
      },
      configurable: true
    });
  });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto(`${baseUrl}/?prod=1`, { waitUntil: "networkidle" });
  await assertNoOverflow(page, "iPhone 13 home");
  await assertBottomNav(page, "iPhone 13 home");
  await page.screenshot({ path: path.join(artifactDir, "home-iphone13.png"), fullPage: true });

  if (await page.evaluate(() => window.__geoCalls) !== 0) fail("geolocalizzazione richiesta all'apertura");

  await page.locator(".bottom-nav-item[data-view-target='events']").click();
  await page.waitForSelector("#eventsView.active");
  await assertBottomNav(page, "iPhone 13 eventi");

  const openButton = page.locator("[data-action='event-sheet']:visible").first();
  await openButton.click();
  await page.locator("#eventBottomSheet").waitFor({ state: "visible" });
  await page.screenshot({ path: path.join(artifactDir, "event-sheet-iphone13.png") });
  await page.keyboard.press("Escape");
  await page.locator("#eventBottomSheet").waitFor({ state: "hidden" });

  const firstSave = page.locator("[data-action='save-event']:visible").first();
  await firstSave.click();
  const savedRows = await page.evaluate(() => JSON.parse(localStorage.getItem("myavezzano_local_saved_events_v1") || "[]").length);
  if (savedRows < 1) fail("salvataggio evento non persistito");
  await page.reload({ waitUntil: "networkidle" });
  if (await page.evaluate(() => JSON.parse(localStorage.getItem("myavezzano_local_saved_events_v1") || "[]").length) < 1) {
    fail("salvataggio evento non persiste dopo reload");
  }

  await page.locator("[data-action='event-sheet']:visible").first().click();
  await page.locator("#eventBottomSheet").waitFor({ state: "visible" });
  await page.locator("[data-action='share-event']:visible").click();
  if (await page.evaluate(() => window.__shareCalls || 0) < 1) fail("Web Share non invocato");
  const downloadPromise = page.waitForEvent("download");
  await page.locator("[data-action='event-ics']:visible").click();
  const download = await downloadPromise;
  if (!download.suggestedFilename().endsWith(".ics")) fail("download ICS non valido");
  await page.locator("#closeEventSheet").click();

  await page.locator(".bottom-nav-item[data-view-target='map']").click();
  await page.waitForSelector("#mapView.active");
  if (await page.evaluate(() => window.__geoCalls) !== 0) fail("geolocalizzazione richiesta prima del click esplicito");
  await page.locator("#useLocation").click();
  if (await page.evaluate(() => window.__geoCalls) !== 1) fail("geolocalizzazione non richiesta sul click esplicito");
  const storage = await page.evaluate(() => JSON.stringify(localStorage));
  if (storage.includes("latitude") || storage.includes("longitude")) fail("posizione precisa salvata in localStorage");

  await page.goto(`${baseUrl}/offline.html`, { waitUntil: "domcontentloaded" });
  await assertNoOverflow(page, "offline");
  await page.screenshot({ path: path.join(artifactDir, "offline-iphone13.png"), fullPage: true });
  await context.close();
  if (errors.length) fail(`console error: ${errors.join(" | ")}`);
}

const viewports = [
  ["320", { width: 320, height: 720, isMobile: true }],
  ["360", { width: 360, height: 800, isMobile: true }],
  ["375", { width: 375, height: 812, isMobile: true }],
  ["390", { width: 390, height: 844, isMobile: true }],
  ["412", { width: 412, height: 915, isMobile: true }],
  ["430", { width: 430, height: 932, isMobile: true }],
  ["768", { width: 768, height: 1024, isMobile: true }],
  ["1024", { width: 1024, height: 768 }],
  ["1440", { width: 1440, height: 900 }]
];

mkdirSync(artifactDir, { recursive: true });
const server = createStaticServer();
await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
const baseUrl = `http://127.0.0.1:${port}`;

const browser = await chromium.launch();
try {
  for (const [label, viewport] of viewports) {
    const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(`${baseUrl}/?prod=1`, { waitUntil: "networkidle" });
    await assertNoOverflow(page, `viewport ${label}`);
    if (viewport.width < 900) await assertBottomNav(page, `viewport ${label}`);
    await context.close();
  }
  const context = await browser.newContext({ ...devices["Pixel 7"], reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/?prod=1`, { waitUntil: "networkidle" });
  await assertManifest(page, baseUrl);
  await page.screenshot({ path: path.join(artifactDir, "home-pixel7.png"), fullPage: true });
  await context.close();

  await runMobileFlow(browser, baseUrl);
} finally {
  await browser.close();
  server.close();
}

console.log(`Mobile QA ok: screenshot in ${artifactDir}`);
