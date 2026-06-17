# MyAvezzano - Google Maps ufficiale

Nel prototipo attuale la mappa usa Leaflet con tile OpenStreetMap/CARTO e look Google-like. Questo evita API key e funziona subito.

Per usare Google Maps ufficiale in produzione serve:

1. Creare un progetto su Google Cloud.
2. Abilitare Maps JavaScript API.
3. Creare una API key con restrizione dominio.
4. Sostituire il layer Leaflet con Google Maps JavaScript API.
5. Usare Google Places API per ricerca attivita e autocomplete.
6. Usare Directions API o link Google Maps per percorsi.

## Perche non uso tile Google diretti

I tile di Google Maps non vanno usati direttamente dentro Leaflet senza Google Maps Platform, perche non e il modo autorizzato. Il prototipo usa quindi una resa simile, mentre la navigazione reale apre Google Maps.

## Prossimo step consigliato

Quando hai la API key, conviene creare un file `config.js` non versionato:

```js
window.IAVEZZANO_GOOGLE_MAPS_API_KEY = "INSERISCI_API_KEY";
```

Poi si puo convertire la sezione mappa da Leaflet a Google Maps JavaScript API mantenendo gli stessi dati `mapPlaces`.
