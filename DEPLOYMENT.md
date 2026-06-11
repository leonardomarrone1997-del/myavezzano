# Deployment Workflow — MyAvezzano / LocalHub

Questo documento spiega il flusso professionale per lavorare in locale, salvare su GitHub e pubblicare con Vercel.

## Mentalità corretta

- **Locale** = laboratorio di sviluppo.
- **GitHub** = archivio ufficiale del codice.
- **Branch** = spazio separato per lavorare su una modifica.
- **Pull Request** = revisione prima della pubblicazione.
- **Vercel Preview** = anteprima live automatica.
- **Production** = sito pubblico reale.

## Flusso consigliato

```bash
git status
git checkout -b feature/nome-modifica
```

Lavora in locale, poi:

```bash
git status
git add .
git commit -m "Descrivi chiaramente la modifica"
git push origin feature/nome-modifica
```

Vercel dovrebbe creare una Preview Deployment per il branch.

Quando la preview è corretta:

```bash
git checkout main
git pull
git merge feature/nome-modifica
git push origin main
```

Il push su `main` aggiorna la Production Deployment su Vercel.

## Comandi locali

Prima volta:

```bash
npm install
```

Avvio locale:

```bash
npm run dev
```

Controllo base:

```bash
npm run check
```

## Checklist prima del deploy

Prima di fare merge su `main`, controlla:

- [ ] Il sito carica correttamente.
- [ ] Tema giorno funzionante.
- [ ] Tema notte funzionante.
- [ ] Transizione giorno/notte fluida.
- [ ] Mobile ok.
- [ ] Menu mobile ok.
- [ ] Immagini e asset caricati.
- [ ] Manifest PWA valido.
- [ ] Service worker non blocca aggiornamenti.
- [ ] Nessun errore in console.
- [ ] Link principali funzionanti.
- [ ] Vercel Preview controllata su desktop.
- [ ] Vercel Preview controllata su smartphone.
- [ ] Performance accettabile.

## Cache e PWA

Il file `vercel.json` imposta:

- `index.html` con `no-cache`, così gli aggiornamenti arrivano prima.
- `service-worker.js` con `no-cache`, per evitare che la PWA resti bloccata su vecchie versioni.
- `assets/` con cache lunga, perché immagini e icone cambiano meno spesso.

Quando modifichi il service worker, aggiorna anche il nome/versione della cache interna, se presente.

## Rollback

Se qualcosa va storto in produzione:

1. Entra nel progetto su Vercel.
2. Apri la lista Deployments.
3. Trova una deployment precedente funzionante.
4. Usa l’opzione di rollback/promote se disponibile nel tuo piano/interfaccia.

In alternativa, da GitHub puoi fare revert del commit problematico e pushare di nuovo su `main`.

## Regola d’oro

Non pubblicare direttamente esperimenti importanti su `main`.

Usa sempre:

```text
Idea → Branch → Preview Vercel → Controllo → Merge → Production
```
