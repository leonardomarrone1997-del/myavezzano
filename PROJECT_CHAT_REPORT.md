# Report progetto MyAvezzano / LocalHub

Data report: 11 giugno 2026  
Cartella ufficiale di lavoro: `C:\MyAvezzano`  
Repository GitHub: `https://github.com/leonardomarrone1997-del/myavezzano.git`  
Branch principale: `main`

## Scopo del progetto

MyAvezzano nasce come evoluzione del concept LocalHub: una PWA cittadina dedicata ad Avezzano, pensata per aiutare utenti e commercianti a scoprire eventi, sconti, nuove aperture, coupon, attivita locali e luoghi vicini.

L'app non deve essere principalmente un social network, ma una guida utile e quotidiana per vivere la citta.

## Stato infrastrutturale

Il progetto e stato spostato e stabilizzato in:

`C:\MyAvezzano`

Sono stati installati e verificati:

- Node.js `v24.16.0`
- npm `11.3.0`
- Git `2.54.0.windows.1`

Il sito e stato avviato correttamente in locale.

E stato risolto un problema con il percorso Windows contenente caratteri speciali nel nome utente `Niccolo`. Per evitare problemi con Git, il progetto e stato copiato in `C:\MyAvezzano`.

## Git e GitHub

Il progetto e stato inizializzato con Git:

```bash
git init
git add .
git config --global user.name "AZProject"
git config --global user.email "leonardomarrone@tcitaly.com"
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/leonardomarrone1997-del/myavezzano.git
git push -u origin main
```

Commit iniziale creato correttamente:

```text
f5b28ad Initial commit
```

Stato:

- Locale completato
- Git completato
- GitHub completato
- Vercel da collegare / verificare

## Stack attuale

Il progetto attuale e una PWA/statica con file principali:

- `index.html`
- `styles.css`
- `app.js`
- `manifest.json`
- `service-worker.js`
- `assets/`
- `package.json`
- `vercel.json`
- `DEPLOYMENT.md`
- `CHANGELOG.md`
- `README.md`
- `GOOGLE_MAPS_SETUP.md`
- `MOBILE_RELEASE.md`
- `MYAVEZZANO_ART_DIRECTION.md`

Stack target del concept originale:

- Frontend Flutter mobile/web
- Backend Node.js
- Database PostgreSQL/PostGIS
- Firebase Cloud Messaging
- Cloud Storage per foto e video

## Funzionalita implementate nel prototipo

### Identita e branding

- Nome app aggiornato in `iAvezzano` / `MyAvezzano`.
- Icona app personalizzata inserita in `assets/app-icon.svg`.
- Manifest PWA configurato per installazione su Android/iOS.
- Service worker presente con cache versionata.

### Home

- Home cittadina focalizzata su utilita: eventi, sconti, nuove aperture, attivita vicine.
- Card principali con CTA funzionanti.
- Scorciatoie rapide per eventi, coupon, weekend, pranzo/cena e nuove aperture.
- Design aggiornato in direzione piu minimal.
- Micro-widget meteo demo nella testata.

### Registrazione e account

- Modale di registrazione/login demo.
- Accesso simulato con Google, Apple, telefono o email/password.
- Stato utente salvato in `localStorage`.
- Logout demo funzionante.

### Profilo utente

- Pannello profilo con foto profilo caricabile.
- Sezioni: impostazioni, crea negozio, coupon, eventi, preferenze, luoghi salvati.
- Coupon, eventi e reminder salvati dalla demo compaiono nel profilo.
- Pulsante per riaprire la demo guidata.

### Demo guidata

- Onboarding automatico al primo ingresso.
- Step dedicati a Home, Eventi, Mappa, Coupon/Fedelta e Profilo.
- Navigazione avanti/indietro, salta e chiudi.
- Riapertura manuale dal pulsante `Guida`.
- Stato visto salvato in `localStorage`.

### Eventi

- Sezione eventi con categorie: divertimento, feste, serate, eventi in disco, calendario.
- Area "Cosa c'e questa sera?".
- Prenotazione demo eventi.
- Salvataggio eventi.
- Reminder demo.

### Mappa

- Mappa interattiva basata su Leaflet.
- Stile visivo simile a Google Maps.
- Import automatico attivita reali da OpenStreetMap / Overpass.
- Cache locale delle attivita importate.
- Marker a forma di goccia con foto/logo del locale dove disponibile.
- Pulsante per aprire destinazione in Google Maps.
- Uso posizione utente dove autorizzato.

Nota: le attivita reali e le foto dipendono dalla qualita dei dati OpenStreetMap/Wikidata. Per avere copertura completa e foto ufficiali serve una fonte dati/licenza dedicata, ad esempio Google Places API o dataset commerciale/autorizzato.

### Coupon e fedelta

- Coupon digitali demo.
- QR code demo.
- Scansione QR simulata.
- Sistema fedelta con punti, livello e premi.
- Riscatto premi demo.

### Commercianti

- Sezione "Crea il tuo negozio" resa a pagamento.
- Piano base da `12,99 EUR/mese`.
- Piani demo: Starter, Pro, Premium.
- Checkout demo senza addebiti reali.
- Dashboard commerciante sbloccata dopo pagamento demo.
- Strumenti demo: pubblicazione contenuti, foto/video, coupon QR, campagne.

### Admin

- Admin panel demo con moderazione contenuti e analytics citta.

## Design e UX

Evoluzione effettuata:

- Da social stile Instagram a guida cittadina utile.
- Layout alternativo piu operativo e meno social.
- Palette aggiornata.
- Design recente piu minimal:
  - testata chiara;
  - navigazione piu pulita;
  - card piu leggere;
  - meno gradienti;
  - ombre ridotte;
  - widget meteo compatto.

## Workflow consigliato

Da ora in poi usare sempre:

```text
C:\MyAvezzano
```

Workflow operativo:

```bash
cd C:\MyAvezzano
npm run dev
git status
git add .
git commit -m "Descrizione modifica"
git push
```

Dopo il push, Vercel dovrebbe distribuire automaticamente se collegato al repository GitHub.

## Prossime priorita

1. Collegare repository GitHub a Vercel.
2. Verificare primo deploy pubblico.
3. Controllare tema giorno/notte.
4. Controllare mobile responsive.
5. Controllare manifest PWA.
6. Controllare service worker e cache.
7. Usare workflow locale -> git add -> commit -> push -> Vercel.
8. Importare lista Excel delle attivita fornite dall'utente.
9. Collegare dati attivita Excel a home, mappa, categorie e profili negozio.
10. Valutare API meteo reale per sostituire il widget demo.

## Preparazione import Excel attivita

Quando viene fornito il file Excel, le colonne consigliate sono:

- `nome`
- `categoria`
- `indirizzo`
- `telefono`
- `sito_web`
- `instagram`
- `descrizione`
- `latitudine`
- `longitudine`
- `logo`
- `foto`
- `orari`
- `offerta`
- `evento`

Se latitudine/longitudine mancano, serve geocoding tramite servizio esterno o completamento manuale.

## Prompt di continuita per nuove conversazioni

Usare questo contesto per riprendere il lavoro:

```text
Stiamo lavorando sul progetto MyAvezzano, cartella ufficiale C:\MyAvezzano.
Il progetto e una PWA/statica gia inizializzata con Git e collegata a GitHub:
https://github.com/leonardomarrone1997-del/myavezzano.git

Non usare piu la vecchia cartella Documents\Codex\outputs.
File principali: index.html, styles.css, app.js, manifest.json, service-worker.js.
Branch principale: main.

Stato: locale, Git e GitHub completati. Vercel da collegare/verificare.
L'app e una guida cittadina per Avezzano con eventi, coupon, mappa, profilo utente,
registrazione demo, onboarding, piani commerciante a pagamento e design minimal.
Prossimo obiettivo: collegare Vercel e/o importare lista Excel delle attivita.
```

