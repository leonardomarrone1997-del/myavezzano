import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const reportsDir = path.join(rootDir, "reports");
const port = Number(process.env.HUMAN_QA_PORT || 4173);
const baseUrl = process.env.HUMAN_QA_URL || `http://127.0.0.1:${port}`;
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function startStaticServer() {
  if (process.env.HUMAN_QA_URL) return null;
  const serveBin = path.join(rootDir, "node_modules", "serve", "build", "main.js");
  const child = spawn(process.execPath, [serveBin, "public", "-l", String(port), "--single"], {
    cwd: rootDir,
    stdio: ["ignore", "pipe", "pipe"],
    shell: false
  });
  child.stdout.on("data", () => {});
  child.stderr.on("data", () => {});
  return child;
}

async function waitForServer(url, timeout = 15000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // server is still starting
    }
    await wait(400);
  }
  throw new Error(`Server non raggiungibile: ${url}`);
}

function createRun(viewportName) {
  const steps = [];
  const issues = [];
  const consoleMessages = [];
  const failedRequests = [];
  return {
    viewportName,
    steps,
    issues,
    consoleMessages,
    failedRequests,
    step(name, status, detail = "") {
      steps.push({ name, status, detail });
    },
    issue(severity, area, title, detail = "") {
      issues.push({ severity, area, title, detail });
    }
  };
}

async function safeStep(run, name, action) {
  try {
    const detail = await action();
    run.step(name, "ok", detail || "");
  } catch (error) {
    run.step(name, "fail", error.message);
    run.issue("critical", "Navigazione", name, error.message);
  }
}

async function expectVisible(run, page, selector, label, timeout = 4500) {
  const locator = page.locator(selector).first();
  await locator.waitFor({ state: "visible", timeout });
  const box = await locator.boundingBox();
  if (!box || box.width < 8 || box.height < 8) {
    run.issue("warning", "Layout", `${label} troppo piccolo`, `${selector} misura ${box?.width || 0}x${box?.height || 0}`);
  }
}

async function clickHuman(page, selector) {
  const candidates = page.locator(selector);
  const deadline = Date.now() + 6500;
  let target = null;
  while (Date.now() < deadline && !target) {
    const count = await candidates.count();
    for (let index = 0; index < count; index += 1) {
      const candidate = candidates.nth(index);
      if (await candidate.isVisible().catch(() => false)) {
        target = candidate;
        break;
      }
    }
    if (!target) await wait(200);
  }
  if (!target) throw new Error(`Nessun elemento visibile per selettore: ${selector}`);
  await target.hover({ timeout: 3000 }).catch(() => {});
  await wait(120);
  await target.click({ timeout: 6000 });
  await wait(350);
}

async function navigateHuman(page, view) {
  const selector = `[data-view='${view}'], [data-view-target='${view}']`;
  try {
    await clickHuman(page, selector);
    return;
  } catch (firstError) {
    const menuToggle = page.locator("#mobileMenuToggle").first();
    if (await menuToggle.isVisible().catch(() => false)) {
      await clickHuman(page, "#mobileMenuToggle");
      await clickHuman(page, selector);
      return;
    }
    throw firstError;
  }
}

async function checkActiveView(run, page, viewId) {
  await expectVisible(run, page, `#${viewId}.active`, `Vista ${viewId}`);
}

async function fillIfVisible(page, selector, value) {
  const input = page.locator(selector).first();
  if (await input.isVisible().catch(() => false)) {
    await input.fill(value);
  }
}

async function runHumanScenario(browser, viewportName, viewport) {
  const run = createRun(viewportName);
  const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      run.consoleMessages.push({ type: message.type(), text: message.text() });
    }
  });
  page.on("requestfailed", (request) => {
    run.failedRequests.push({ url: request.url(), failure: request.failure()?.errorText || "request failed" });
  });
  page.on("pageerror", (error) => {
    run.issue("critical", "JavaScript", "Errore pagina", error.message);
  });

  await safeStep(run, "Apre la home", async () => {
    await page.goto(baseUrl, { waitUntil: "networkidle", timeout: 30000 });
    await expectVisible(run, page, "#feedView.active", "Home");
    await expectVisible(run, page, "#pageTitle", "Titolo pagina");
    return await page.locator("#pageTitle").innerText();
  });

  await safeStep(run, "Controlla evento del giorno e weekend", async () => {
    await expectVisible(run, page, "#homeEventFocus", "Evento del giorno");
    const cards = await page.locator("#weekendHomeList .weekend-event-row, #homeEventFocus article, #homeEventFocus button, #homeEventFocus [data-action]").count();
    if (!cards) run.issue("warning", "Home", "Eventi non evidenti in home", "Nessuna card evento/weekend rilevata.");
    return `${cards} elementi evento trovati`;
  });

  await safeStep(run, "Cambia comune", async () => {
    await page.selectOption("#citySelector", "Celano");
    await wait(300);
    const meta = await page.locator("#citySelectorMeta").innerText();
    if (!/Celano/i.test(meta)) run.issue("warning", "Comune", "Cambio comune poco chiaro", meta);
    return meta;
  });

  await safeStep(run, "Apre notifiche", async () => {
    await clickHuman(page, "#notificationButton");
    await expectVisible(run, page, "#notificationMenu", "Centro notifiche");
    const items = await page.locator("#notificationMenuList > *").count();
    await page.keyboard.press("Escape").catch(() => {});
    return `${items} notifiche`;
  });

  await safeStep(run, "Prova tema giorno/notte", async () => {
    await clickHuman(page, "#themeToggle");
    const pressed = await page.locator("#themeToggle").getAttribute("aria-pressed");
    await clickHuman(page, "#themeToggle");
    return `aria-pressed=${pressed}`;
  });

  const views = [
    ["Mappa", "map", "mapView", ".map-layout"],
    ["Eventi", "events", "eventsView", ".agenda-month-list, #eventsAgenda"],
    ["Coupon", "coupons", "couponsView", "#couponsGrid .coupon-card"],
    ["Estate 2026", "summer", "summerView", "#summerAgenda, .summer-program"],
    ["Profilo", "profile", "profileView", "#profilePanelContent"],
    ["Area commercianti", "merchant", "merchantView", "#merchantPaywall, #merchantDashboard"]
  ];

  for (const [label, view, viewId, contentSelector] of views) {
    await safeStep(run, `Naviga: ${label}`, async () => {
      await navigateHuman(page, view);
      await checkActiveView(run, page, viewId);
      await expectVisible(run, page, contentSelector, `Contenuto ${label}`);
      return "vista attiva";
    });
  }

  await safeStep(run, "Filtra coupon", async () => {
    await navigateHuman(page, "coupons");
    await clickHuman(page, "[data-coupon-filter='bar']");
    const visible = await page.locator("#couponsGrid .coupon-card:not([hidden])").count();
    if (!visible) run.issue("warning", "Coupon", "Filtro bar senza risultati", "L'utente potrebbe percepire la sezione come vuota.");
    return `${visible} coupon visibili`;
  });

  await safeStep(run, "Salva un evento", async () => {
    await navigateHuman(page, "events");
    const visibleSave = page.locator("[data-action='save-event']").filter({ hasText: "Salva" });
    const count = await visibleSave.count();
    let title = "";
    for (let index = 0; index < count; index += 1) {
      const button = visibleSave.nth(index);
      if (await button.isVisible().catch(() => false)) {
        title = await button.getAttribute("data-title");
        await button.click();
        break;
      }
    }
    if (!title) throw new Error("Nessun pulsante Salva evento visibile");
    await wait(300);
    return title || "evento salvato";
  });

  await safeStep(run, "Apre registrazione e crea account test", async () => {
    await clickHuman(page, "#openSignup");
    await expectVisible(run, page, "#authOverlay .signup-panel", "Modal registrazione");
    const suffix = Date.now().toString().slice(-6);
    await fillIfVisible(page, "#signupName", "Tester");
    await fillIfVisible(page, "#signupSurname", "Umano");
    await fillIfVisible(page, "#signupEmail", `tester-${viewportName}-${suffix}@example.com`);
    await fillIfVisible(page, "#signupPassword", "Test12345!");
    await fillIfVisible(page, "#signupPasswordConfirm", "Test12345!");
    const legal = page.locator("#acceptLegal");
    if (await legal.isVisible().catch(() => false)) await legal.check({ force: true });
    await clickHuman(page, "#createAccount");
    await wait(600);
    const profileName = await page.locator("#topProfileName").innerText().catch(() => "");
    if (!/Tester|Ospite/i.test(profileName)) run.issue("warning", "Account", "Registrazione con feedback inatteso", profileName);
    return profileName || "account creato";
  });

  await safeStep(run, "Controlla responsive base", async () => {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 4) run.issue("warning", "Responsive", "Possibile scroll orizzontale", `${overflow}px oltre viewport`);
    return `overflow=${overflow}px`;
  });

  const screenshotPath = path.join(reportsDir, `human-qa-${viewportName}-${timestamp}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  run.screenshot = path.relative(rootDir, screenshotPath).replaceAll("\\", "/");
  await context.close();

  run.failedRequests
    .filter((item) => !item.url.startsWith("data:"))
    .slice(0, 8)
    .forEach((item) => run.issue("warning", "Network", "Richiesta fallita", `${item.url} - ${item.failure}`));
  run.consoleMessages
    .slice(0, 8)
    .forEach((item) => run.issue(item.type === "error" ? "critical" : "warning", "Console", item.type, item.text));

  return run;
}

function scoreReport(runs) {
  const allIssues = runs.flatMap((run) => run.issues);
  const critical = allIssues.filter((item) => item.severity === "critical").length;
  const warning = allIssues.filter((item) => item.severity === "warning").length;
  const score = Math.max(0, Math.min(100, 100 - critical * 14 - warning * 5));
  return { score, critical, warning, totalIssues: allIssues.length };
}

function markdownReport(report) {
  const lines = [
    "# MyAvezzano - Human QA Bot",
    "",
    `Data: ${new Date(report.generatedAt).toLocaleString("it-IT")}`,
    `URL testata: ${report.baseUrl}`,
    `Punteggio: ${report.summary.score}/100`,
    `Problemi critici: ${report.summary.critical}`,
    `Avvisi: ${report.summary.warning}`,
    "",
    "## Cosa ha fatto il bot",
    "",
    "- Ha aperto il sito come un visitatore reale.",
    "- Ha navigato tra home, mappa, eventi, coupon, Estate 2026, profilo e area commercianti.",
    "- Ha provato notifiche, tema giorno/notte, cambio comune, filtri coupon, salvataggio evento e registrazione account.",
    "- Ha ripetuto il flusso su desktop e mobile.",
    "",
    "## Risultati per viewport",
    ""
  ];
  report.runs.forEach((run) => {
    lines.push(`### ${run.viewportName}`, "");
    lines.push(`Screenshot: ${run.screenshot}`, "");
    run.steps.forEach((step) => {
      lines.push(`- ${step.status === "ok" ? "OK" : "FAIL"} - ${step.name}${step.detail ? `: ${step.detail}` : ""}`);
    });
    lines.push("");
    if (run.issues.length) {
      lines.push("Problemi rilevati:");
      run.issues.forEach((issue) => {
        lines.push(`- [${issue.severity}] ${issue.area} - ${issue.title}: ${issue.detail}`);
      });
    } else {
      lines.push("Nessun problema rilevante in questo viewport.");
    }
    lines.push("");
  });
  lines.push("## Prossime azioni", "");
  if (report.summary.critical) {
    lines.push("1. Correggere prima i problemi critici, poi rilanciare `npm run qa:human`.");
  }
  if (report.summary.warning) {
    lines.push("2. Valutare gli avvisi UX/layout e trasformarli in fix mirati.");
  }
  if (!report.summary.totalIssues) {
    lines.push("1. Nessun blocco rilevato: procedere con QA manuale finale e deploy.");
  }
  lines.push("");
  return lines.join("\n");
}

async function main() {
  await mkdir(reportsDir, { recursive: true });
  const server = startStaticServer();
  try {
    await waitForServer(baseUrl);
    const browser = await chromium.launch({ headless: true });
    const runs = [];
    runs.push(await runHumanScenario(browser, "desktop", { width: 1440, height: 950 }));
    runs.push(await runHumanScenario(browser, "mobile", { width: 390, height: 844 }));
    await browser.close();

    const report = {
      generatedAt: new Date().toISOString(),
      baseUrl,
      summary: scoreReport(runs),
      runs
    };
    const jsonPath = path.join(reportsDir, `human-qa-${timestamp}.json`);
    const mdPath = path.join(reportsDir, `human-qa-${timestamp}.md`);
    await writeFile(jsonPath, JSON.stringify(report, null, 2), "utf8");
    await writeFile(mdPath, markdownReport(report), "utf8");
    console.log(`Human QA completato: ${report.summary.score}/100`);
    console.log(`Report Markdown: ${path.relative(rootDir, mdPath)}`);
    console.log(`Report JSON: ${path.relative(rootDir, jsonPath)}`);
    if (report.summary.critical) process.exitCode = 1;
  } finally {
    if (server) server.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
