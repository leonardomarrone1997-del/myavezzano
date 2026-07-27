import { createServer } from "node:http";
import { copyFile, mkdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const publicDir = path.join(root, "public");
const artifactDir = path.join(root, "qa-artifacts", "visual", "after");
const pwaDir = path.join(root, "assets", "pwa");
const publicPwaDir = path.join(publicDir, "assets", "pwa");
const referenceNow = process.env.MYAVEZZANO_NOW || "2026-07-27T10:00:00+02:00";

const mime = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8"
};

function fail(message) {
  throw new Error(`Visual QA failed: ${message}`);
}

function createStaticServer() {
  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url || "/", "http://127.0.0.1");
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

function luminance(hex) {
  const channels = [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255);
  const linear = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

function contrast(foreground, background) {
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

function assertPaletteContrast() {
  const pairs = [
    ["testo chiaro su fondo", "#08233b", "#edf5f7"],
    ["testo chiaro su superficie", "#08233b", "#ffffff"],
    ["secondario chiaro su superficie", "#52697a", "#ffffff"],
    ["pulsante primario", "#ffffff", "#057180"],
    ["corallo accessibile", "#06233e", "#f15a52"],
    ["pulsante primario notte", "#03223b", "#44d3de"],
    ["testo notte su fondo", "#f7f8f5", "#03172b"],
    ["secondario notte su fondo", "#b8cbd5", "#03172b"],
    ["testo notte su superficie", "#f7f8f5", "#08243d"],
    ["secondario notte su superficie", "#b8cbd5", "#08243d"]
  ];
  for (const [label, foreground, background] of pairs) {
    const ratio = contrast(foreground, background);
    if (ratio < 4.5) fail(`${label}: contrasto ${ratio.toFixed(2)}:1`);
  }
}

async function prepareContext(browser, viewport, theme = "light") {
  const context = await browser.newContext({
    viewport,
    reducedMotion: "reduce",
    colorScheme: theme
  });
  await context.addInitScript(({ selectedTheme, now }) => {
    window.MYAVEZZANO_NOW = now;
    localStorage.setItem("myavezzano_onboarding_seen", "true");
    localStorage.setItem("myavezzano_theme", selectedTheme);
  }, { selectedTheme: theme, now: referenceNow });
  return context;
}

async function waitForApp(page, activeView = "feed") {
  await page.waitForSelector(`#${activeView}View.active`);
  const readySelector = {
    feed: "#feedView.active #homeEventFocus .home-event-main",
    events: "#eventsView.active .agenda-event",
    campaign: "#campaignView.active .campaign-hero"
  }[activeView] || `#${activeView}View.active`;
  await page.waitForSelector(readySelector);
  await page.evaluate(() => document.fonts?.ready);
}

async function assertPageVisualRules(page, label, { mobile = false, campaign = false } = {}) {
  const measurements = await page.evaluate(() => {
    const visible = (element) => Boolean(element && element.getClientRects().length);
    const headings = [...document.querySelectorAll("h1")].filter(visible);
    const clipped = [...document.querySelectorAll("h1, h2, h3, button, a, .pill")]
      .filter(visible)
      .filter((element) => {
        const style = getComputedStyle(element);
        return style.overflow === "hidden"
          && (element.scrollWidth > element.clientWidth + 2 || element.scrollHeight > element.clientHeight + 2);
      })
      .map((element) => element.textContent.trim().slice(0, 80));
    const forbiddenWeights = [...document.querySelectorAll("body *")]
      .filter(visible)
      .filter((element) => {
        const weight = Number.parseInt(getComputedStyle(element).fontWeight, 10);
        return weight >= 800 && !element.closest(".brand");
      })
      .map((element) => `${element.tagName}.${element.className}`.slice(0, 100));
    const gradientPrimaries = [...document.querySelectorAll(".primary-action")]
      .filter(visible)
      .filter((element) => getComputedStyle(element).backgroundImage !== "none")
      .length;
    const blurredCards = [...document.querySelectorAll(".panel, .home-event-focus, .upcoming-event-card, .shortcut-card, .home-campaign-card, .campaign-feature")]
      .filter(visible)
      .filter((element) => {
        const style = getComputedStyle(element);
        const filters = [style.backdropFilter, style.webkitBackdropFilter].filter(Boolean);
        return filters.some((value) => value !== "none");
      })
      .length;
    const nav = document.querySelector(".bottom-nav");
    const navBox = nav?.getBoundingClientRect();
    const bodyPaddingBottom = Number.parseFloat(getComputedStyle(document.querySelector(".main")).paddingBottom);
    const campaignImages = [...document.querySelectorAll(".campaign-visual img, .campaign-feature img")]
      .filter(visible)
      .map((image) => {
        const box = image.getBoundingClientRect();
        return {
          source: image.getAttribute("src"),
          objectFit: getComputedStyle(image).objectFit,
          renderedRatio: box.height ? box.width / box.height : 0,
          naturalRatio: image.naturalHeight ? image.naturalWidth / image.naturalHeight : 0
        };
      });
    return {
      overflow: Math.ceil(document.documentElement.scrollWidth - document.documentElement.clientWidth),
      h1Sizes: headings.map((heading) => Number.parseFloat(getComputedStyle(heading).fontSize)),
      clipped,
      forbiddenWeights,
      gradientPrimaries,
      blurredCards,
      campaignHeight: document.querySelector(".campaign-hero")?.getBoundingClientRect().height || 0,
      navVisible: Boolean(navBox && navBox.width && navBox.height),
      navBottom: navBox ? navBox.bottom : 0,
      viewportHeight: window.innerHeight,
      bodyPaddingBottom,
      campaignImages
    };
  });

  if (measurements.overflow > 2) fail(`${label}: overflow orizzontale ${measurements.overflow}px`);
  const h1Limit = mobile ? 38 : 52;
  if (measurements.h1Sizes.some((size) => size > h1Limit + 0.1)) {
    fail(`${label}: H1 oltre ${h1Limit}px (${measurements.h1Sizes.join(", ")})`);
  }
  if (measurements.clipped.length) fail(`${label}: testo tagliato (${measurements.clipped.join(" | ")})`);
  if (measurements.forbiddenWeights.length) fail(`${label}: font-weight 800/900 (${measurements.forbiddenWeights.join(" | ")})`);
  if (measurements.gradientPrimaries) fail(`${label}: pulsante primario con gradiente`);
  if (measurements.blurredCards) fail(`${label}: card con backdrop-filter`);
  if (campaign && !mobile && measurements.campaignHeight > 390) {
    fail(`${label}: hero Campagna alto ${Math.round(measurements.campaignHeight)}px`);
  }
  if (campaign && mobile) {
    const croppedImages = measurements.campaignImages.filter((image) => (
      image.objectFit === "cover"
      || !image.renderedRatio
      || !image.naturalRatio
      || Math.abs(image.renderedRatio - image.naturalRatio) > 0.03
    ));
    if (croppedImages.length) {
      fail(`${label}: immagini Campagna ritagliate (${croppedImages.map((image) => image.source).join(" | ")})`);
    }
  }
  if (mobile) {
    if (!measurements.navVisible) fail(`${label}: bottom navigation non visibile`);
    if (measurements.navBottom > measurements.viewportHeight + 1) fail(`${label}: bottom navigation fuori viewport`);
    if (measurements.bodyPaddingBottom < 80) fail(`${label}: spazio finale insufficiente per bottom navigation`);
  }
}

async function captureScenario(browser, baseUrl, scenario) {
  const context = await prepareContext(browser, scenario.viewport, scenario.theme);
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto(`${baseUrl}/?prod=1#${scenario.view}`, { waitUntil: "networkidle" });
  await waitForApp(page, scenario.view);
  await assertPageVisualRules(page, scenario.name, {
    mobile: scenario.viewport.width < 900,
    campaign: scenario.view === "campaign"
  });
  await page.screenshot({ path: path.join(artifactDir, scenario.file) });

  if (errors.length) fail(`${scenario.name}: errori console (${errors.join(" | ")})`);
  await context.close();
}

async function assertCampaignNavigation(browser, baseUrl) {
  const context = await prepareContext(browser, { width: 390, height: 844 });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/?prod=1#feed`, { waitUntil: "networkidle" });
  await waitForApp(page, "feed");
  await page.locator("#homeCampaignCard [data-view-target='campaign']").click();
  await page.waitForSelector("#campaignView.active");
  if (new URL(page.url()).hash !== "#campaign") fail("Campagna: hash non aggiornato dal click in Home");
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForSelector("#campaignView.active");
  if (await page.locator(".campaign-hero").count() !== 1) fail("Campagna: hero non disponibile dopo reload");
  if (await page.locator("#campaignView h1").innerText() !== "MyAvezzano fuori dallo schermo") {
    fail("Campagna: H1 errato dopo reload");
  }
  if (await page.locator(".nav-item[data-view='campaign']").getAttribute("aria-current") !== "page") {
    fail("Campagna: aria-current non mantenuto dopo reload");
  }
  await context.close();
}

async function assertCampaignImageLightbox(browser, baseUrl) {
  const context = await prepareContext(browser, { width: 390, height: 844 });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto(`${baseUrl}/?prod=1&campaign-lightbox=1#campaign`, { waitUntil: "networkidle" });
  await waitForApp(page, "campaign");

  const triggers = page.locator("#campaignView .campaign-image-trigger");
  if (await triggers.count() !== 4) fail("Campagna: attesi quattro visual ingrandibili");
  const firstTrigger = triggers.first();
  await firstTrigger.click();

  const lightbox = page.locator("#campaignImageLightbox");
  await lightbox.waitFor({ state: "visible" });
  if (!await page.locator("body").evaluate((body) => body.classList.contains("campaign-image-open"))) {
    fail("Campagna: blocco scroll non attivo con lightbox aperto");
  }
  const preview = page.locator("#campaignImagePreview");
  if (!await preview.getAttribute("src") || !await preview.getAttribute("alt")) {
    fail("Campagna: immagine o testo alternativo non trasferiti nel lightbox");
  }

  await page.locator("[data-action='campaign-image-zoom-in']").click();
  await page.locator("[data-action='campaign-image-zoom-in']").click();
  if (await page.locator("#campaignImageZoomLevel").textContent() !== "200%") {
    fail("Campagna: controllo zoom non aggiornato");
  }
  const zoomedWidth = await preview.evaluate((image) => image.style.width);
  if (zoomedWidth !== "200%") fail(`Campagna: zoom immagine non applicato (${zoomedWidth})`);

  await page.locator("[data-action='campaign-image-zoom-reset']").click();
  if (await page.locator("#campaignImageZoomLevel").textContent() !== "100%") {
    fail("Campagna: ripristino zoom non riuscito");
  }
  await page.keyboard.press("Escape");
  await lightbox.waitFor({ state: "hidden" });
  if (!await firstTrigger.evaluate((trigger) => trigger === document.activeElement)) {
    fail("Campagna: focus non ripristinato dopo la chiusura");
  }
  if (errors.length) fail(`Campagna lightbox: errori console (${errors.join(" | ")})`);
  await context.close();
}

async function assertDeepLinkFirstRender(browser, baseUrl) {
  const context = await prepareContext(browser, { width: 390, height: 844 });
  const expectedViews = {
    campaign: "campaign",
    events: "events",
    map: "map",
    saved: "profile"
  };

  for (const [route, expectedView] of Object.entries(expectedViews)) {
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto(`${baseUrl}/?prod=1&deep=${route}#${route}`, { waitUntil: "domcontentloaded" });
    const shell = await page.evaluate(() => {
      const visible = (element) => Boolean(element && element.getClientRects().length && getComputedStyle(element).visibility !== "hidden");
      return {
        initialView: document.documentElement.dataset.initialView,
        activeView: document.querySelector(".view.active")?.id || "",
        firstVisibleH1: [...document.querySelectorAll("h1")].find(visible)?.textContent?.trim() || "",
        campaignCurrent: document.querySelector(".nav-item[data-view='campaign']")?.getAttribute("aria-current") || "",
        feedActive: document.querySelector("#feedView")?.classList.contains("active") || false
      };
    });
    if (shell.initialView !== expectedView || shell.activeView !== `${expectedView}View`) {
      fail(`Deep-link #${route}: shell iniziale non risolta (${shell.initialView}/${shell.activeView})`);
    }
    if (shell.feedActive) fail(`Deep-link #${route}: Home attiva nel primo rendering`);
    if (route === "campaign") {
      if (shell.firstVisibleH1 !== "MyAvezzano fuori dallo schermo") {
        fail(`Deep-link Campagna: primo H1 visibile errato (${shell.firstVisibleH1})`);
      }
      if (shell.campaignCurrent !== "page") fail("Deep-link Campagna: aria-current iniziale mancante");
    }
    await waitForApp(page, expectedView);
    if (errors.length) fail(`Deep-link #${route}: errori console (${errors.join(" | ")})`);
    await page.close();
  }

  await context.close();
}

async function assertMobileHeroCopy(browser, baseUrl) {
  const expected = "Eventi e luoghi utili, con fonti sempre visibili.";
  for (const width of [320, 360, 390]) {
    const context = await prepareContext(browser, { width, height: 844 });
    const page = await context.newPage();
    await page.goto(`${baseUrl}/?prod=1&copy=${width}#feed`, { waitUntil: "networkidle" });
    await waitForApp(page, "feed");
    const result = await page.locator("#pageCopyMobile").evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        text: element.textContent.trim(),
        visible: Boolean(element.getClientRects().length),
        clipped: element.scrollWidth > element.clientWidth + 1 || element.scrollHeight > element.clientHeight + 1,
        lineClamp: style.webkitLineClamp,
        textOverflow: style.textOverflow
      };
    });
    if (result.text !== expected || !result.visible) fail(`Hero ${width}px: copy mobile non corretta`);
    if (result.clipped || result.lineClamp !== "none" || result.textOverflow === "ellipsis") {
      fail(`Hero ${width}px: copy mobile troncata`);
    }
    await context.close();
  }
}

async function assertThemeModes(browser, baseUrl) {
  for (const theme of ["light", "dark"]) {
    const context = await prepareContext(browser, { width: 390, height: 844 }, theme);
    const page = await context.newPage();
    await page.goto(`${baseUrl}/?prod=1&theme=${theme}#feed`, { waitUntil: "networkidle" });
    await waitForApp(page, "feed");
    const isDark = await page.evaluate(() => document.body.classList.contains("theme-dark"));
    if (isDark !== (theme === "dark")) fail(`Tema ${theme}: stato iniziale errato`);
    await context.close();
  }
}

async function assertSavedEvent(browser, baseUrl) {
  const context = await prepareContext(browser, { width: 390, height: 844 });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/?prod=1#feed`, { waitUntil: "networkidle" });
  await waitForApp(page, "feed");
  const saveButton = page.locator("#homeEventFocus [data-action='save-event']").first();
  await saveButton.click();
  if (await saveButton.getAttribute("aria-pressed") !== "true") fail("Salvati: stato aria-pressed non aggiornato");
  const countBefore = await page.evaluate(() => JSON.parse(localStorage.getItem("myavezzano_local_saved_events_v1") || "[]").length);
  if (countBefore !== 1) fail(`Salvati: atteso 1 evento, trovati ${countBefore}`);
  await page.reload({ waitUntil: "networkidle" });
  await waitForApp(page, "feed");
  const countAfter = await page.evaluate(() => JSON.parse(localStorage.getItem("myavezzano_local_saved_events_v1") || "[]").length);
  if (countAfter !== 1) fail("Salvati: evento non persistito dopo reload");
  await context.close();
}

async function assertSeoAndPwa(browser, baseUrl) {
  const context = await prepareContext(browser, { width: 390, height: 844 });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/?prod=1#feed`, { waitUntil: "networkidle" });
  const result = await page.evaluate(() => ({
    title: document.title,
    canonical: document.querySelector("link[rel='canonical']")?.href || "",
    manifest: document.querySelector("link[rel='manifest']")?.href || "",
    serviceWorker: "serviceWorker" in navigator,
    description: document.querySelector("meta[name='description']")?.content || ""
  }));
  if (!result.title || !result.canonical || !result.manifest || !result.description) fail("SEO/PWA: metadati root incompleti");
  if (!result.serviceWorker) fail("PWA: Service Worker API non disponibile");
  await context.close();
}

async function capturePwaScreenshots(browser, baseUrl) {
  const mobileContext = await prepareContext(browser, { width: 390, height: 844 });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(`${baseUrl}/?prod=1#feed`, { waitUntil: "networkidle" });
  await waitForApp(mobilePage, "feed");
  await mobilePage.screenshot({ path: path.join(pwaDir, "screenshot-mobile.png") });
  await mobileContext.close();

  const desktopContext = await prepareContext(browser, { width: 1440, height: 900 });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(`${baseUrl}/?prod=1#feed`, { waitUntil: "networkidle" });
  await waitForApp(desktopPage, "feed");
  await desktopPage.screenshot({ path: path.join(pwaDir, "screenshot-desktop.png") });
  await desktopContext.close();

  if (existsSync(publicPwaDir)) {
    await copyFile(path.join(pwaDir, "screenshot-mobile.png"), path.join(publicPwaDir, "screenshot-mobile.png"));
    await copyFile(path.join(pwaDir, "screenshot-desktop.png"), path.join(publicPwaDir, "screenshot-desktop.png"));
  }
}

assertPaletteContrast();
await mkdir(artifactDir, { recursive: true });
await mkdir(pwaDir, { recursive: true });

const server = createStaticServer();
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const address = server.address();
if (!address || typeof address === "string") fail("server QA non avviato");
const baseUrl = `http://127.0.0.1:${address.port}`;
const browser = await chromium.launch();

const scenarios = [
  { name: "Home chiara mobile", file: "home-light-mobile.png", view: "feed", theme: "light", viewport: { width: 390, height: 844 } },
  { name: "Home scura mobile", file: "home-dark-mobile.png", view: "feed", theme: "dark", viewport: { width: 390, height: 844 } },
  { name: "Eventi mobile", file: "events-mobile.png", view: "events", theme: "light", viewport: { width: 390, height: 844 } },
  { name: "Campagna mobile", file: "campaign-mobile.png", view: "campaign", theme: "light", viewport: { width: 390, height: 844 } },
  { name: "Home desktop", file: "home-desktop.png", view: "feed", theme: "light", viewport: { width: 1440, height: 900 } },
  { name: "Campagna desktop", file: "campaign-desktop.png", view: "campaign", theme: "light", viewport: { width: 1440, height: 900 } }
];

try {
  for (const scenario of scenarios) {
    await captureScenario(browser, baseUrl, scenario);
  }
  await assertDeepLinkFirstRender(browser, baseUrl);
  await assertMobileHeroCopy(browser, baseUrl);
  await assertCampaignNavigation(browser, baseUrl);
  await assertCampaignImageLightbox(browser, baseUrl);
  await assertSavedEvent(browser, baseUrl);
  await assertThemeModes(browser, baseUrl);
  await assertSeoAndPwa(browser, baseUrl);
  await capturePwaScreenshots(browser, baseUrl);
} finally {
  await browser.close();
  server.close();
}

console.log(`Visual QA ok: ${scenarios.length} scenari, screenshot in ${artifactDir}`);
