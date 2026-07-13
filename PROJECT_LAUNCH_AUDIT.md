# MyAvezzano - Audit pre-lancio

Data audit: 10 luglio 2026

## Sintesi prodotto

MyAvezzano ha già una base ricca: home con eventi e scorciatoie, calendario esteso alla Marsica, coupon QR, mappa, profilo utente, area commercianti, pannello admin, pagine SEO statiche e PWA deployabile su Vercel.

La priorità ora non è aggiungere ancora molte feature, ma trasformare la percezione da prototipo/demo a prodotto locale credibile, leggero e pronto per essere mostrato a utenti, commercianti e Comune/partner.

## Priorità P0 - Prima di mostrare il sito pubblicamente

1. Rimuovere testi "demo" dalle pagine pubbliche SEO
   - File coinvolti: `coupon.html`, `attivita-locali.html`, `mappa.html`, `README.md`, copie in `public/`.
   - Impatto: alto. Le parole "demo", "prototipo", "contenuti demo" abbassano fiducia e conversione.
   - Intervento: sostituire con copy tipo "esempi iniziali", "partner in fase di attivazione", "contenuti dimostrativi interni" solo se nascosti in development.

2. Rendere coerente la promessa principale
   - Concetto guida: "Cosa faccio oggi / stasera ad Avezzano e dintorni?"
   - Impatto: alto. L'app non deve sembrare un social network generico.
   - Intervento: mantenere tre CTA dominanti: Eventi, Mappa, Coupon; usare profilo e feed come supporto, non come centro.

3. Ripulire area admin e account da riferimenti sviluppo
   - File coinvolti: `app.js`, `index.html`.
   - Impatto: alto. Anche se alcune voci sono protette, il linguaggio deve essere professionale.
   - Intervento: rinominare "Ripristina dati sviluppo" e "Pulisci azioni locali" in strumenti tecnici riservati; evitare "admin-demo" visibile o esportabile in contesti pubblici.

4. Verificare privacy/termini con copy non-prototipo
   - File coinvolti: pannello legal in `app.js`, sezione Privacy e termini.
   - Impatto: alto per fiducia e commercianti.
   - Intervento: dichiarare chiaramente che account, coupon e salvataggi oggi sono locali nel browser, senza promettere servizi non ancora attivi.

## Priorità P1 - Qualità percepita e conversione

1. Home più decisionale
   - Stato attuale: molti moduli utili, ma ancora tanta densità.
   - Intervento: ordinare la home con gerarchia stabile:
     - evento del giorno;
     - Questo weekend;
     - scorciatoie Cena, Aperitivo, Coupon, Serate, Eventi;
     - coupon/occasioni;
     - pannello account leggero.

2. Coupon più credibili
   - Stato attuale: QR SVG presenti e funzionali come asset statici.
   - Intervento: migliorare testi e stati: valido fino a, condizioni, locale, distanza, "mostra QR".
   - Rischio: senza backend non c'è tracciamento reale; presentarlo come MVP locale.

3. Area commercianti più orientata alla vendita
   - Stato attuale: piano da 12,99 EUR/mese già presente.
   - Intervento: spiegare meglio cosa ottiene il commerciante: scheda, coupon QR, eventi, notifiche, statistiche base, visibilità mappa.

4. Mappa e comuni limitrofi
   - Stato attuale: selezione comune e dati locali già impostati.
   - Intervento: rendere "Eventi vicino a te" più evidente quando si sceglie un comune diverso da Avezzano.

## Priorità P2 - SEO, PWA e contenuti

1. Sitemap sorgente e sitemap pubblica
   - Stato attuale: `public/sitemap.xml` contiene 84 URL con eventi; `sitemap.xml` sorgente contiene solo 6 URL.
   - Impatto: medio. Vercel serve `public/sitemap.xml`, quindi il deploy è corretto, ma il repo può confondere.
   - Intervento: generare o allineare anche la sitemap sorgente, oppure documentare che la sitemap deployata è quella in `public/`.

2. Pagine evento SEO
   - Stato attuale: 78 pagine evento generate, con canonical e JSON-LD Event.
   - Intervento: migliorare immagini solo quando reali; evitare immagini casuali; mantenere fallback neutro.

3. Manifest PWA
   - Stato attuale: configurato con nome, icone, shortcut, start_url.
   - Intervento: verificare icone PNG maskable per Android/iOS oltre a SVG, se si vuole una installazione più robusta.

4. Search Console
   - Dopo deploy: reinviare `https://myavezzano.vercel.app/sitemap.xml`.
   - Controllare: indicizzazione Home, Eventi, Estate 2026, Coupon, Mappa, Attività locali, prime pagine evento importanti.

## Priorità P3 - Performance

1. CSS e JS grandi
   - `app.js`: circa 205 KB.
   - `styles.css`: circa 225 KB.
   - Impatto: medio su mobile, soprattutto dispositivi economici.
   - Intervento: non rifattorizzare tutto ora; prima ridurre CSS morto, blocchi storici, effetti non più usati e duplicazioni.

2. Asset marketing pesanti
   - PNG marketing sopra 2 MB presenti in `assets/marketing/`.
   - Esistono versioni WebP più leggere già usate nella UI.
   - Intervento: valutare se tenere i PNG nel repo solo come sorgenti, ma non nel pacchetto pubblico, oppure spostarli in documentazione/archivio.

3. Effetti visivi
   - Stato attuale: modalità light di default e riduzione effetti già introdotte.
   - Intervento: mantenere solo transizione giorno/notte e microinterazioni leggere.

## Strategia prodotto consigliata

### Utente cittadino

Domanda chiave: "Cosa posso fare oggi, stasera o nel weekend vicino a me?"

Valore:
- eventi affidabili;
- offerte e coupon utili;
- mappa semplice;
- salvataggi e reminder;
- comuni limitrofi senza confusione.

### Commerciante

Domanda chiave: "Perché dovrei pagare 12,99 EUR/mese?"

Valore da comunicare:
- presenza nella mappa locale;
- pubblicazione offerte/coupon QR;
- eventi e nuove aperture;
- visibilità nella home;
- statistiche essenziali;
- canale diretto verso utenti locali.

### Admin

Domanda chiave: "Cosa devo controllare ogni giorno?"

Dashboard utile:
- eventi più salvati;
- coupon più aperti;
- comuni più attivi;
- locali più cliccati;
- contenuti da moderare;
- notifiche in programma;
- anomalie: eventi senza immagine, coupon scaduti, schede incomplete.

## Roadmap operativa consigliata

### Sprint 1 - Pulizia pubblica

- Rimuovere copy demo/prototipo dalle pagine pubbliche.
- Sistemare README e documenti pubblici.
- Rendere privacy/termini più credibili.
- Verificare nessun riferimento demo visibile in produzione.

### Sprint 2 - Home e conversione

- Rifinire home mobile.
- Rafforzare evento del giorno e Questo weekend.
- Rendere il pannello account utile ma non invasivo.
- Rendere area commercianti più commerciale.

### Sprint 3 - SEO locale

- Allineare sitemap sorgente/pubblica.
- Migliorare title/description delle pagine evento importanti.
- Aggiungere pagine/landing per comuni limitrofi se il calendario crescerà.

### Sprint 4 - Performance

- Rimuovere CSS non più usato.
- Spostare asset marketing pesanti non usati fuori dal build pubblico.
- Valutare split leggero dei dati/eventi se la lista continua a crescere.

## Prossima azione consigliata

Partire dallo Sprint 1: rimuovere tutti i riferimenti "demo/prototipo" visibili al pubblico e rendere il copy coerente con un MVP reale in fase di lancio.
