import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

const forbidden = [
  "Registrati a MyAvezzano",
  "Crea account",
  "Recupera password",
  "Continua con Google",
  "Continua con Apple",
  "Attiva Starter",
  "Attiva Pro",
  "Attiva Gold",
  "Checkout negozio",
  "Partita IVA",
  "Codice SDI",
  "Abbonamento attivo",
  "Visite profilo",
  "Visualizzazioni 7gg",
  "Coupon usati 418",
  "Conversione 12,6%",
  "Prepara PDF",
  "Invia notifica"
];

function fail(message) {
  throw new Error(`Raw HTML QA failed: ${message}`);
}

function checkHtml(label, html) {
  for (const text of forbidden) {
    if (html.includes(text)) fail(`${label} contiene markup legacy: ${text}`);
  }
  if (!html.includes("Account in preparazione")) fail(`${label} non contiene il dialog account production-safe`);
  if (!html.includes("La versione pubblica non raccoglie credenziali o dati personali")) {
    fail(`${label} non esplicita che la versione pubblica non raccoglie credenziali`);
  }
  if (!html.includes("Nessun pagamento disponibile")) fail(`${label} non esplicita che i pagamenti non sono disponibili`);
}

const localHtml = await readFile(path.join(root, "public", "index.html"), "utf8");
checkHtml("public/index.html", localHtml);

if (process.env.RAW_HTML_URL) {
  const response = await fetch(process.env.RAW_HTML_URL, { cache: "no-store" });
  if (!response.ok) fail(`${process.env.RAW_HTML_URL} risponde ${response.status}`);
  checkHtml(process.env.RAW_HTML_URL, await response.text());
}

console.log("Raw HTML QA ok: index pubblico privo di markup legacy.");
