# Project Status - MyAvezzano / LocalHub

Updated: 2026-06-15

## Official Project

- Local folder: `C:\MyAvezzano`
- Official GitHub repository: `https://github.com/leonardomarrone1997-del/myavezzano-clean`
- Main branch: `main`
- App type: static PWA

Do not use any legacy repository as the main repository for this project.
Do not use the old Codex output folder as the working project.

## Current Stack

- Static HTML/CSS/JavaScript
- PWA manifest
- Service worker
- Vercel static hosting target

Main files:

- `index.html`
- `styles.css`
- `app.js`
- `manifest.json`
- `service-worker.js`
- `vercel.json`
- `package.json`

## Vercel Import Settings

Use these settings when importing the project as a new Vercel project:

- Repository: `myavezzano`
- Framework Preset: `Other`
- Root Directory: `./`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `public`
- Production branch: `main`

## Cache Status

- Service worker cache: `myavezzano-v68`
- CSS cache bust: `styles.css?v=68`
- Build output: `public/`
- `index.html`, `/`, `app.js`, `styles.css` and `service-worker.js` are configured with `Cache-Control: no-cache`.
- `assets/` uses long immutable cache.

## Local Checks

Recommended checks before push:

```bash
cd C:\MyAvezzano
node --check app.js
npm.cmd run check
npm.cmd run build
```

## Deploy Checklist

- [ ] Import the official `myavezzano` repository into Vercel.
- [ ] Confirm the project is not connected to a legacy repository.
- [ ] Confirm static build settings.
- [ ] Deploy from `main`.
- [ ] Open the generated Vercel URL.
- [ ] Check desktop and mobile.
- [ ] Check day/night theme.
- [ ] Check service worker registration.
- [ ] Check manifest detection.
- [ ] Hard refresh and confirm latest CSS/JS.
