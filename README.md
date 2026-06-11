# MyAvezzano / LocalHub

Prototype web standalone della piattaforma MyAvezzano: un atlante locale per eventi, luoghi, coupon, servizi utili, profilo utente, commercianti e admin.

## Cosa contiene

- Home cittadina con eventi, sconti, nuove aperture e attivita vicine.
- Design minimal con testata chiara, card leggere e micro-widget meteo demo per Avezzano.
- Scorciatoie rapide per stasera, coupon, weekend, pranzo/cena e nuove aperture.
- Mappa reale OpenStreetMap con import automatico delle attivita di Avezzano, marker a goccia con logo/foto dove disponibile, cache locale e link a Google Maps.
- Eventi con prenotazioni e ticket digitali demo.
- Coupon digitali con QR Code demo.
- Sistema fedelta con livello, progress e premi.
- Sezione "Crea il tuo negozio" a pagamento, con piani da 12,99 EUR/mese e dashboard sbloccabile dopo checkout demo.
- Admin panel con moderazione e analytics citta.
- Icona app personalizzata in `assets/app-icon.svg`.
- Manifest PWA e service worker per installazione su Android/iOS.
- Registrazione demo attiva con email/password, Google, telefono e Apple usando storage locale.
- Pannello profilo utente con foto profilo, impostazioni, coupon, eventi, preferenze e creazione negozio.
- Pulsanti principali collegati a flussi demo con toast, salvataggi locali, prenotazioni, reminder, filtri, strumenti commerciante e riepilogo nel profilo utente.
- Demo guidata al primo ingresso, riapribile dal pulsante Guida e dalle impostazioni del profilo.
- Dashboard locale in home con quick search, smart cards, servizi utili, stato giornata e navigazione mobile app-like.
- Transizione tema giorno/notte con passaggio tramonto/alba e rispetto di `prefers-reduced-motion`.
- Atmosphere FX leggero: rondine rara nel tema giorno, stelle/scia notturna rara, pulviscolo estivo quasi invisibile, pausa automatica quando la tab non e visibile.

## Audit prodotto - versione corrente

### Funziona bene

- PWA statica senza build, facile da provare e pubblicare.
- Mappa reale con OpenStreetMap, cache e apertura Google Maps.
- Account demo, admin nascosto, profilo, coupon, eventi e merchant dashboard gia collegati a flussi locali.
- Direzione visiva "Atlante Vivo" con coordinate, pass, marker, WebGL e tema dark/light.

### Corretto e migliorato

- Home trasformata in dashboard locale con priorita chiare: cerca, esplora, salva, usa servizi.
- Navigazione mobile aggiunta come bottom nav, mantenendo menu laterale e profilo in alto.
- Ricerca globale resa piu visibile con suggerimenti rapidi e stato risultati.
- Aggiunta sezione "La tua giornata" alimentata da salvataggi, eventi e reminder locali.
- Footer reso piu professionale e coerente con una piattaforma reale.
- Service worker aggiornato con navigazioni network-first e fallback offline.
- Manifest aggiornato con start URL, shortcut Estate 2026 e descrizione piu chiara.

### Da completare per produzione reale

- Backend API, database server-side, sessioni sicure e rate limit.
- Foto reali proprietarie/CDN per tutte le attivita.
- Pagamenti reali per commercianti e fatturazione.
- Push notification reali tramite Web Push/FCM/APNs.
- Test Lighthouse, accessibilita e dispositivi fisici prima della pubblicazione.

## Come aprirla

Apri `index.html` nel browser:

`outputs/localhub/index.html`

Non richiede build, dipendenze o server locale.

Per testare PWA, service worker e storage in modo piu fedele:

`http://127.0.0.1:4178/`

## Accessi demo

- Admin: `admin@myavezzano.it`
- Password: `Admin123!`

L'app crea automaticamente l'account admin demo al primo avvio.

La voce Admin non compare nel menu pubblico. Dopo login con queste credenziali, nel profilo appare il pulsante `Pannello GOD`, che apre l'area riservata admin.

## Asset visuali

Lo sfondo sfocato di Avezzano usa una foto panoramica pubblica da Wikimedia Commons: `Avezzano_view.jpg`.
Se il sito viene pubblicato in produzione, e consigliato salvare l'immagine in locale/CDN e mantenere il credito autore/licenza nella pagina legale.

## IA interna invisibile

Il sito include `MyAvezzano Intelligence Layer`, un livello locale e invisibile che:

- interpreta ricerche come "pizza", "vestiti", "stasera", "palestra", "sconti";
- ordina attivita e lista "Vicino a te" con ranking smart;
- calcola un punteggio qualita per schede locali;
- mostra insight solo nel `Pannello GOD` admin;
- non espone chatbot o elementi visibili agli utenti normali.

## Database e sicurezza MVP

Questa versione resta una PWA statica. Il database demo usa `localStorage` con queste raccolte:

- `myavezzano_users_v1`
- `myavezzano_user`
- `myavezzano_theme`
- `myavezzano_password_resets_v1`
- `myavezzano_demo_state`
- `myavezzano_merchant_subscription`
- `myavezzano_merchant_notifications_v1`

Le password email/password vengono salvate come hash SHA-256 con salt tramite Web Crypto. Per produzione reale bisogna migrare utenti, ruoli, sessioni, reset password e admin verso backend API con database server-side, token/sessioni sicuri, rate limit e audit log.

## Nota tecnica

In questa sessione Flutter e npm non sono disponibili, quindi questo output e un MVP web statico pronto da provare. La struttura e pensata per essere convertita in:

- Flutter mobile/web per il frontend.
- Node.js/NestJS per backend API.
- PostgreSQL/PostGIS per dati e geolocalizzazione.
- Firebase Cloud Messaging per notifiche push.
- Cloud Storage per media.
