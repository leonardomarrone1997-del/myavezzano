# Sezione consigliata da aggiungere al README.md

## Sviluppo locale

Installa le dipendenze:

```bash
npm install
```

Avvia il sito in locale:

```bash
npm run dev
```

## Workflow GitHub + Vercel

Il progetto usa GitHub come repository principale e Vercel per deploy automatici.

Flusso consigliato:

1. Crea un branch per ogni modifica.
2. Sviluppa e testa in locale.
3. Fai commit e push su GitHub.
4. Controlla la Preview Deployment generata da Vercel.
5. Se tutto è corretto, fai merge su `main`.
6. Vercel aggiorna automaticamente la produzione.

Per i dettagli completi, consulta `DEPLOYMENT.md`.

## Note PWA

Dopo modifiche a `service-worker.js`, controlla sempre che il sito non resti bloccato su una vecchia versione cacheata.
