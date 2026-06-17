# Lovable Handoff - MyAvezzano

Questo file serve per portare MyAvezzano su Lovable senza perdere il lavoro gia fatto.

## Obiettivo

Ricreare MyAvezzano in Lovable mantenendo:

- struttura prodotto: eventi, coupon, mappa, profilo, area commercianti, loyalty, onboarding;
- FX atmosferici giorno/notte;
- sfondi Avezzano day/night;
- card, coupon, pulsanti rapidi e stile da app locale;
- dati demo e contenuti gia presenti.

Il cambio principale deve essere il tema visivo, non la logica del prodotto.

## Asset da riusare

Caricare questi asset nel progetto Lovable, preferibilmente in `public/assets/`:

- `assets/app-icon.svg`
- `assets/avezzano-hero-day.jpg`
- `assets/avezzano-hero-night.jpg`
- `assets/home-actions/cena-light.png`
- `assets/home-actions/cena-dark.png`
- `assets/home-actions/aperitivo-light.png`
- `assets/home-actions/aperitivo-dark.png`
- `assets/home-actions/coupon-light.png`
- `assets/home-actions/coupon-dark.png`
- `assets/home-actions/serate-light.png`
- `assets/home-actions/serate-dark.png`
- `assets/home-actions/eventi-light.png`
- `assets/home-actions/eventi-dark.png`

## Prompt iniziale per Lovable

```text
Crea una web app/PWA chiamata MyAvezzano.

Deve essere un'app utile per vivere Avezzano, non un social network generico.
La home deve mettere subito in evidenza:
- sfondo hero Avezzano giorno/notte;
- pulsanti rapidi in alto: CENA, APERITIVO, COUPON, SERATE, EVENTI;
- dashboard locale con CTA "Esplora la mappa" e "Installa app";
- card per eventi, coupon, nuove aperture e consigli utili.

Mantieni queste sezioni:
- Home/Oggi
- Mappa
- Eventi
- Coupon
- Punti e premi
- Profilo utente
- Area commercianti
- Privacy e termini

Mantieni questi comportamenti:
- tema giorno/notte;
- effetti atmosferici leggeri;
- card in stile app mobile;
- coupon digitali;
- eventi e reminder demo;
- profilo utente demo;
- area commercianti con piano a pagamento da 12,99;
- onboarding/guida rapida.

Tema nuovo:
[INSERIRE QUI IL NUOVO TEMA CHE VOGLIO PROVARE]

Usa gli asset caricati in public/assets:
- hero giorno: /assets/avezzano-hero-day.jpg
- hero notte: /assets/avezzano-hero-night.jpg
- icone pulsanti rapidi in /assets/home-actions/

Non creare una landing page marketing.
La prima schermata deve sembrare gia l'app utilizzabile.
Non aggiungere social feed invasivo.
Priorita: eventi, sconti, serate, coupon, nuove aperture, mappa e utilita locali.
```

## Prompt di correzione dopo la prima generazione

```text
Rifinisci la UI mantenendo il prodotto MyAvezzano.

Controlla:
- i pulsanti rapidi devono stare subito sotto la hero;
- niente barra ricerca nella hero;
- rimuovi riquadri "Vicino a te", "Servizi utili" e statistiche Attivita/Stasera/Coupon dalla home;
- le card devono essere compatte, leggibili e mobile-first;
- nessun testo deve uscire dai contenitori;
- il tema giorno/notte deve cambiare anche le icone rapide;
- gli FX devono essere visibili ma sobri.
```

## Note tecniche

Il progetto attuale e una PWA statica con:

- `index.html`
- `styles.css`
- `app.js`
- `manifest.json`
- `service-worker.js`
- `assets/`

Lovable potrebbe ricreare il progetto con uno stack diverso. In quel caso il codice non va copiato 1:1: usa questo repository come riferimento di prodotto, UI e contenuti.

## Flusso consigliato

1. Crea nuovo progetto in Lovable.
2. Incolla il prompt iniziale.
3. Carica gli asset indicati.
4. Genera la prima versione.
5. Applica il prompt di correzione.
6. Collega il progetto Lovable a GitHub quando la base e stabile.
7. Confronta la versione Lovable con questo progetto e migra solo cio che migliora davvero.

