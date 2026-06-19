import { cp, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const output = path.join(root, "public");
const entries = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.json",
  "service-worker.js",
  "robots.txt",
  "sitemap.xml",
  "googleb99b104558bbc069.html",
  "assets"
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const entry of entries) {
  await cp(path.join(root, entry), path.join(output, entry), { recursive: true });
}

console.log("Static PWA copied to public/ for Vercel.");
