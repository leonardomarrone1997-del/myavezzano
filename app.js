const businesses = [
  {
    name: "Osteria Molo 7",
    category: "Ristorante",
    distance: "450 m",
    lat: 42.0336,
    lng: 13.4277,
    address: "Via Corradini, Avezzano",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
    caption: "Menu pranzo di stagione con calice incluso. Solo oggi punti doppi per chi prenota da MyAvezzano.",
    stats: "Aperto ora"
  },
  {
    name: "Caffe Risorgimento",
    category: "Bar",
    distance: "600 m",
    lat: 42.0320,
    lng: 13.4250,
    address: "Piazza Risorgimento, Avezzano",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80",
    caption: "Colazione in centro: brioche artigianale e cappuccino a prezzo speciale fino alle 10:30.",
    stats: "Sconto attivo"
  },
  {
    name: "Atelier Marsica",
    category: "Abbigliamento",
    distance: "900 m",
    lat: 42.0313,
    lng: 13.4218,
    address: "Via XX Settembre, Avezzano",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80",
    caption: "Preview saldi weekend: salva il coupon e mostra il QR in cassa per il 20% extra.",
    stats: "Nuovi arrivi"
  }
];

const userSubmittedBusinesses = [
  {
    name: "Marynda",
    category: "Abbigliamento",
    distance: "Centro",
    lat: 42.0357,
    lng: 13.4230,
    address: "Via Garibaldi 136, Avezzano",
    phone: "+3908631871946",
    stats: "Attivita inserita",
    logo: "assets/app-icon.svg",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    caption: "Negozio di abbigliamento inserito nella rete MyAvezzano."
  },
  {
    name: "Avezzano Center",
    category: "Shopping mall",
    distance: "Zona Tiburtina",
    lat: 42.0345,
    lng: 13.4384,
    address: "Via Tiburtina Valeria 112, Avezzano",
    phone: "+390863448059",
    stats: "Attivita inserita",
    photo: "https://www.fabricasgr.com/wp-content/uploads/2019/10/ipercoop_terni1-300x169.jpg",
    photoCredit: "Fabrica SGR",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80",
    caption: "Centro shopping locale inserito nella rete MyAvezzano."
  },
  {
    name: "Dell'Olio 1920",
    category: "Abbigliamento",
    distance: "Centro",
    lat: 42.0330,
    lng: 13.4256,
    address: "Via Camillo Corradini 172, Avezzano",
    phone: "+39086332128",
    stats: "Attivita inserita",
    photo: "https://dellolio1920avezzano.it/img/dellolio-storia-avezzano.jpg",
    logo: "https://dellolio1920avezzano.it/img/dellolio__logo-desktop.svg",
    photoCredit: "Dell'Olio 1920",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    caption: "Negozio di abbigliamento inserito nella rete MyAvezzano."
  },
  {
    name: "Renzo e Caterina",
    category: "Ristorante",
    distance: "Centro",
    lat: 42.0318,
    lng: 13.4269,
    address: "Via Orazio Mattei 27, Avezzano",
    phone: "+393477956213",
    stats: "Attivita inserita",
    logo: "assets/app-icon.svg",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    caption: "Ristorante inserito nella rete MyAvezzano."
  },
  {
    name: "Nithael Abbigliamento",
    category: "Abbigliamento",
    distance: "Zona Francia",
    lat: 42.0338,
    lng: 13.4191,
    address: "Via Francia 33, Avezzano",
    phone: "+393288827472",
    stats: "Attivita inserita",
    logo: "assets/app-icon.svg",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    caption: "Negozio di abbigliamento inserito nella rete MyAvezzano."
  },
  {
    name: "Shopping Park Ten",
    category: "Abbigliamento",
    distance: "Via XX Settembre",
    lat: 42.0274,
    lng: 13.4126,
    address: "Via XX Settembre 411, Avezzano",
    phone: "",
    stats: "Attivita inserita",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Shopping_Park_Ten.jpg/330px-Shopping_Park_Ten.jpg",
    photoCredit: "Wikimedia Commons",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    caption: "Attivita commerciale inserita nella rete MyAvezzano."
  },
  {
    name: "Tezenis",
    category: "Abbigliamento",
    distance: "Centro",
    lat: 42.0331,
    lng: 13.4252,
    address: "Via Camillo Corradini 115/117, Avezzano",
    phone: "+39086321855",
    stats: "Attivita inserita",
    logo: "assets/app-icon.svg",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    caption: "Negozio di abbigliamento inserito nella rete MyAvezzano."
  },
  {
    name: "Ristorante Pizzeria L'Acquario",
    category: "Ristorante",
    distance: "Zona Brunelleschi",
    lat: 42.0272,
    lng: 13.4198,
    address: "Via Filippo Brunelleschi 65, Avezzano",
    phone: "+39086325941",
    stats: "Attivita inserita",
    logo: "assets/app-icon.svg",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    caption: "Ristorante e pizzeria inserito nella rete MyAvezzano."
  },
  {
    name: "Libero Home",
    category: "Abbigliamento",
    distance: "Zona Bagnoli",
    lat: 42.0418,
    lng: 13.4269,
    address: "V. Monsignor Pio Marcello Bagnoli 75/79, Avezzano",
    phone: "+39086325280",
    stats: "Attivita inserita",
    logo: "assets/app-icon.svg",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    caption: "Attivita locale inserita nella rete MyAvezzano."
  },
  {
    name: "OMG SRL",
    category: "Shopping mall",
    distance: "Via XX Settembre",
    lat: 42.0279,
    lng: 13.4130,
    address: "Via XX Settembre 396, Avezzano",
    phone: "+39086338225",
    stats: "Attivita inserita",
    logo: "assets/app-icon.svg",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80",
    caption: "Attivita commerciale inserita nella rete MyAvezzano."
  },
  {
    name: "Rigatoni Avezzano",
    category: "Ristorante",
    distance: "Via Roma",
    lat: 42.0304,
    lng: 13.4142,
    address: "Via Roma 323, Avezzano",
    phone: "+390863451919",
    stats: "Attivita inserita",
    logo: "assets/app-icon.svg",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    caption: "Ristorante inserito nella rete MyAvezzano."
  }
];

const verifiedPartnerNames = new Set(userSubmittedBusinesses.map((place) => place.name));

let mapPlaces = businesses.concat(userSubmittedBusinesses, [
  {
    name: "Moon Club",
    category: "Discoteca",
    distance: "1,4 km",
    lat: 42.0372,
    lng: 13.4324,
    address: "Zona Nord, Avezzano",
    stats: "Evento stasera",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "FitLab Avezzano",
    category: "Palestra",
    distance: "1,8 km",
    lat: 42.0291,
    lng: 13.4292,
    address: "Via Roma, Avezzano",
    stats: "Prova gratuita",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Bakery Marsica",
    category: "Nuova apertura",
    distance: "700 m",
    lat: 42.0345,
    lng: 13.4240,
    address: "Centro Avezzano",
    stats: "Apre sabato",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Pub La Marsica",
    category: "Pub",
    distance: "850 m",
    lat: 42.0301,
    lng: 13.4266,
    address: "Corso della Liberta, Avezzano",
    stats: "Live music",
    image: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&w=500&q=80"
  }
]).map((place, index) => ({
  ...place,
  id: `place-${index}`
}));

const AVEZZANO_CENTER = { lat: 42.0326, lng: 13.4256 };
let interactiveMap;
let routeLine;
let userMarker;
let selectedPlace = mapPlaces[0];
let userPosition = null;
let mapMarkers = new Map();
let realPlacesLoaded = false;
let isLoadingRealPlaces = false;
let themeTransitionTimer = 0;
let installPromptEvent = null;
const atmosphereTimers = new Set();
let atmospherePaused = false;
let searchPlaceholderTimer = 0;
const searchPlaceholders = [
  "Cerca locali, eventi, servizi...",
  "Dove vuoi andare oggi?",
  "Scopri cosa fare ad Avezzano...",
  "Prova: aperitivo, coupon, farmacia"
];
const OSM_CACHE_KEY = "myavezzano_osm_businesses_v1";
const MAX_REAL_PLACES = 120;
const wikidataImageCache = new Map();
const DEMO_STATE_KEY = "myavezzano_demo_state";
const ONBOARDING_KEY = "myavezzano_onboarding_seen";
const THEME_STORAGE_KEY = "myavezzano_theme";

const categoryImages = {
  "Ristorante": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
  "Bar": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
  "Pub": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80",
  "Discoteca": "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80",
  "Abbigliamento": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
  "Palestra": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
  "Centro estetico": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
  "Farmacia": "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80",
  "Hotel": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
  "Negozio": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80",
  "Servizio": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=600&q=80",
  "Attivita locale": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
};

const quickActions = [
  ["Stasera", "Eventi e musica", "events", "moon"],
  ["Sconti", "Coupon vicini", "coupons", "percent"],
  ["Estate", "Agenda 2026", "summer", "sun"],
  ["Mappa", "Locali reali", "map", "pin"]
];

const cityHighlights = [
  {
    type: "Evento stasera",
    title: "Aperitivo lungo in centro",
    place: "Caffe Risorgimento",
    when: "Oggi - 19:30",
    detail: "Drink promo, tavoli disponibili e reminder automatico prima dell'inizio.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80",
    cta: "Prenota"
  },
  {
    type: "Sconto",
    title: "2x1 aperitivo entro le 20:00",
    place: "Caffe Risorgimento",
    when: "Scade oggi",
    detail: "Mostra il QR alla cassa, usa il coupon e accumula punti fedelta.",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80",
    cta: "Apri coupon"
  },
  {
    type: "Nuova apertura",
    title: "Bakery Marsica inaugura sabato",
    place: "Centro Avezzano",
    when: "Sabato - 10:00",
    detail: "Degustazione gratuita, promo lancio e indicazioni rapide per raggiungerla.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
    cta: "Salva"
  },
  {
    type: "Evento in disco",
    title: "Latin Party al Moon Club",
    place: "Moon Club",
    when: "Oggi - 22:45",
    detail: "Prevendita digitale, lista tavoli e reminder per l'ingresso.",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=80",
    cta: "Dettagli"
  },
  {
    type: "Shopping",
    title: "Saldi weekend da Atelier Marsica",
    place: "Atelier Marsica",
    when: "Valido fino a domenica",
    detail: "Extra 20% con coupon digitale e mappa per arrivare in negozio.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80",
    cta: "Usa sconto"
  },
  {
    type: "Sport",
    title: "Prova gratuita FitLab Avezzano",
    place: "FitLab Avezzano",
    when: "Prenota entro 48 ore",
    detail: "Ingresso prova, scheda iniziale e punti fedelta al check-in.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80",
    cta: "Prenota"
  }
];

const eventCategories = [
  ["Divertimento", "Tutto quello che anima la serata"],
  ["Feste", "Compleanni, party e feste a tema"],
  ["Serate", "Aperitivi, live music e karaoke"],
  ["Eventi in disco", "DJ set, guest e prevendite"],
  ["Calendario", "Programma completo della citta"]
];

const tonightEvents = [
  {
    title: "Aperitivo lungo in centro",
    place: "Caffe Risorgimento",
    time: "19:30",
    type: "Serata",
    meta: "Ingresso libero - coupon drink",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Latin Party",
    place: "Moon Club",
    time: "22:45",
    type: "Eventi in disco",
    meta: "Prevendita digitale - 130 prenotazioni",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Live acoustic night",
    place: "Pub La Marsica",
    time: "21:15",
    type: "Divertimento",
    meta: "Musica live - tavoli disponibili",
    image: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&w=900&q=80"
  }
];

const summerHighlights = [
  {
    title: "Aperitivo al tramonto",
    type: "Serata",
    place: "Caffe Risorgimento",
    text: "Tappa leggera dopo lavoro, coupon drink e percorso a piedi dal centro.",
    cta: "Salva tappa"
  },
  {
    title: "Shopping fresco in centro",
    type: "Shopping",
    place: "Dell'Olio 1920",
    text: "Locale verificato con selezione estiva e scheda completa in mappa.",
    cta: "Apri mappa"
  },
  {
    title: "Cena estate Marsica",
    type: "Food",
    place: "Renzo e Caterina",
    text: "Ristorante consigliato per una cena estiva con prenotazione demo.",
    cta: "Prenota"
  },
  {
    title: "Weekend al Shopping Park Ten",
    type: "Famiglia",
    place: "Shopping Park Ten",
    text: "Foto reale, percorso rapido e promemoria per il fine settimana.",
    cta: "Dettagli"
  }
];

const events = [
  ["Festa anni 90", "Ven 14 giugno - 22:30", "Disco - prevendite aperte", "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=900&q=80"],
  ["Street food in piazza", "Sab 15 giugno - 20:00", "Festa - 18 stand", "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80"],
  ["Karaoke night", "Dom 16 giugno - 21:00", "Serata - ingresso libero", "https://images.unsplash.com/photo-1521337581100-8ca9a73a5f79?auto=format&fit=crop&w=900&q=80"]
];

const coupons = [
  ["Aperitivo 2x1", "Caffe Risorgimento", "Scade oggi alle 20:00", "35 punti"],
  ["-20% nuova collezione", "Atelier Marsica", "Valido fino a domenica", "80 usi rimasti"],
  ["Ingresso prova gratuito", "FitLab Avezzano", "Prenota entro 48 ore", "50 punti"]
];

const rewards = [
  ["Cena locale", "1.500 punti", "Premio presso i ristoranti aderenti."],
  ["Beauty hour", "900 punti", "Trattamento express nei centri estetici partner."],
  ["Ticket evento", "1.200 punti", "Biglietto digitale per eventi selezionati."]
];

const savedProfileCoupons = [
  ["Aperitivo 2x1", "Caffe Risorgimento", "Scade oggi alle 20:00"],
  ["-20% nuova collezione", "Atelier Marsica", "Valido fino a domenica"],
  ["Prova gratuita", "FitLab Avezzano", "Prenota entro 48 ore"]
];

const savedProfileEvents = [
  ["Aperitivo lungo in centro", "Oggi - 19:30", "Reminder attivo"],
  ["Latin Party", "Oggi - 22:45", "Prenotazione salvata"],
  ["Street food in piazza", "Sabato - 20:00", "Da confermare"]
];

const userPreferences = ["Eventi", "Sconti", "Nuove aperture", "Ristoranti", "Palestre", "Shopping"];

const pageMeta = {
  feed: {
    eyebrow: "MyAvezzano live",
    title: "La citta, a portata di giornata",
    copy: "Eventi, locali, negozi e piccole scoperte di Avezzano raccolti in una home semplice, bella da aprire e veloce da usare."
  },
  map: {
    eyebrow: "Cartografia viva",
    title: "La città diventa navigabile",
    copy: "Punti reali, partner verificati e percorsi rapidi: la mappa non decora, serve a trasformare l'interesse in movimento."
  },
  events: {
    eyebrow: "Palinsesto urbano",
    title: "La sera ha una regia",
    copy: "Eventi e serate letti come una programmazione: orari, ritmo, prenotazioni demo e reminder senza dispersione."
  },
  coupons: {
    eyebrow: "Valore immediato",
    title: "Sconti che sembrano oggetti",
    copy: "Ogni coupon e trattato come un pass: leggibile, riscattabile, salvabile, con QR e punti come parte dell'esperienza."
  },
  loyalty: {
    eyebrow: "Credito locale",
    title: "La fedeltà diventa patrimonio",
    copy: "Punti, premi e vantaggi visualizzati come una piccola dashboard finanziaria della vita in città."
  },
  profile: {
    eyebrow: "Pass personale",
    title: "Il tuo archivio di città",
    copy: "Preferenze, eventi, coupon, profilo e attività salvate convergono in una sola area personale."
  },
  merchant: {
    eyebrow: "Sistema commercianti",
    title: "Apri una presenza che lavora",
    copy: "Non una scheda statica: un pannello per pubblicare offerte, leggere segnali e trasformare visibilità in azioni."
  },
  admin: {
    eyebrow: "Pannello GOD",
    title: "Regia operativa MyAvezzano",
    copy: "Utenti, contenuti, insight invisibili e strumenti di controllo raccolti in una cabina di comando essenziale."
  },
  summer: {
    eyebrow: "Estate 2026",
    title: "La stagione come percorso",
    copy: "Serate, negozi, ristoranti e tappe leggere organizzati come un itinerario estivo, non come una lista."
  },
  legal: {
    eyebrow: "Fiducia e regole",
    title: "Chiarezza prima della crescita",
    copy: "Privacy, termini e cookie restano leggibili, asciutti e vicini al prodotto: niente burocrazia nascosta."
  }
};

const titles = {
  feed: pageMeta.feed.title,
  map: pageMeta.map.title,
  events: pageMeta.events.title,
  coupons: pageMeta.coupons.title,
  loyalty: pageMeta.loyalty.title,
  profile: pageMeta.profile.title,
  merchant: pageMeta.merchant.title,
  admin: pageMeta.admin.title,
  summer: pageMeta.summer.title,
  legal: pageMeta.legal.title
};

const citySignatures = {
  feed: ["AVZ-01", "Centro / 42.0326 N", "Prima pagina urbana", "12 segnali"],
  map: ["AVZ-02", "13.4256 E / raggio 2 km", "Carta operativa", "OSM live"],
  events: ["AVZ-03", "Dalle 19:30 / notte", "Palinsesto", "Serate"],
  coupons: ["AVZ-04", "Valore / QR / punti", "Pass riscattabile", "Attivo"],
  loyalty: ["AVZ-05", "Saldo / premi / progressi", "Credito locale", "Punti"],
  profile: ["AVZ-06", "ID personale / archivio", "Tessera cittadina", "Privato"],
  merchant: ["AVZ-07", "Scheda / campagne / checkout", "Console business", "B2B"],
  admin: ["AVZ-GOD", "Insight / utenti / controllo", "Cabina di regia", "Riservato"],
  summer: ["AVZ-26", "Estate / tappe / luce", "Itinerario", "2026"],
  legal: ["AVZ-00", "Privacy / termini / cookie", "Registro fiducia", "Chiaro"]
};

const onboardingSteps = [
  {
    view: "feed",
    eyebrow: "Primo ingresso",
    title: "La home ti mostra cosa conta oggi",
    copy: "MyAvezzano non e pensata come un social infinito: apre subito su eventi, sconti, nuove aperture e cose utili in citta.",
    points: ["Scorri le card principali", "Salva quello che ti interessa", "Apri subito mappa, coupon o eventi"]
  },
  {
    view: "events",
    eyebrow: "Serate",
    title: "Trova cosa fare questa sera",
    copy: "La sezione Eventi raccoglie divertimento, feste, serate, disco e calendario, con prenotazione demo e reminder.",
    points: ["Filtra per tipo di evento", "Prenota una serata", "Attiva un reminder automatico"]
  },
  {
    view: "map",
    eyebrow: "Mappa",
    title: "Scopri locali e negozi vicino a te",
    copy: "La mappa usa segnaposto a goccia con logo/foto del locale e puo aprire Google Maps per la navigazione reale.",
    points: ["Importa attivita reali da OpenStreetMap", "Usa la tua posizione", "Apri la destinazione in Google Maps"]
  },
  {
    view: "coupons",
    eyebrow: "Vantaggi",
    title: "Usa coupon QR e raccogli punti",
    copy: "I coupon digitali si salvano nel profilo, possono essere scansionati in demo e alimentano il sistema fedelta.",
    points: ["Apri i coupon disponibili", "Scansiona un QR demo", "Riscatta premi con i punti"]
  },
  {
    view: "profile",
    eyebrow: "Profilo",
    title: "Tutto resta nel tuo pannello utente",
    copy: "Dopo la registrazione trovi coupon, eventi, preferenze, foto profilo e il percorso per creare il tuo negozio a pagamento.",
    points: ["Registrati con Google, Apple, telefono o email", "Gestisci preferenze e salvataggi", "Crea una scheda negozio da 12,99 EUR/mese"]
  }
];

function getDemoState() {
  try {
    return JSON.parse(localStorage.getItem(DEMO_STATE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveDemoState(state) {
  localStorage.setItem(DEMO_STATE_KEY, JSON.stringify(state));
}

function addDemoItem(key, item) {
  const state = getDemoState();
  const list = state[key] || [];
  if (!list.some((entry) => entry.title === item.title)) {
    list.push({ ...item, savedAt: new Date().toISOString() });
  }
  state[key] = list;
  saveDemoState(state);
  return list.length;
}

function showToast(message, type = "info") {
  const stack = document.querySelector("#toastStack");
  if (!stack) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  stack.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

function smartImageUrl(url, width = 640) {
  if (!url || !url.includes("images.unsplash.com")) return url || "assets/app-icon.svg";
  const next = new URL(url);
  next.searchParams.set("auto", "format");
  next.searchParams.set("fit", "crop");
  next.searchParams.set("w", String(width));
  next.searchParams.set("q", "58");
  return next.toString();
}

function mediaAttrs(url, width = 640) {
  return `data-bg="${smartImageUrl(url, width)}"`;
}

function hydrateLazyMedia(scope = document, eager = false) {
  const nodes = [...scope.querySelectorAll("[data-bg]:not(.is-loaded)")];
  if (!nodes.length) return;

  const load = (node) => {
    node.style.backgroundImage = `url('${node.dataset.bg}')`;
    node.classList.add("is-loaded");
  };

  if (eager || !("IntersectionObserver" in window)) {
    nodes.forEach(load);
    return;
  }

  const observer = new IntersectionObserver((entries, io) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      load(entry.target);
      io.unobserve(entry.target);
    });
  }, { rootMargin: "160px" });

  nodes.forEach((node) => observer.observe(node));
}

let onboardingIndex = 0;

function renderOnboardingStep() {
  const step = onboardingSteps[onboardingIndex];
  if (!step) return;

  document.querySelector("#onboardingEyebrow").textContent = step.eyebrow;
  document.querySelector("#onboardingTitle").textContent = step.title;
  document.querySelector("#onboardingCopy").textContent = step.copy;
  document.querySelector("#onboardingPoints").innerHTML = step.points.map((point) => `<li>${point}</li>`).join("");
  document.querySelector("#onboardingProgress").style.width = `${((onboardingIndex + 1) / onboardingSteps.length) * 100}%`;
  document.querySelector("#onboardingDots").innerHTML = onboardingSteps.map((_, index) => `
    <button class="${index === onboardingIndex ? "active" : ""}" data-onboarding-step="${index}" type="button" aria-label="Step ${index + 1}"></button>
  `).join("");
  document.querySelector("#prevOnboarding").disabled = onboardingIndex === 0;
  document.querySelector("#nextOnboarding").textContent = onboardingIndex === onboardingSteps.length - 1 ? "Inizia" : "Avanti";

  switchView(step.view);
}

function openOnboarding(reset = false) {
  if (reset) onboardingIndex = 0;
  const overlay = document.querySelector("#onboardingOverlay");
  overlay.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");
  renderOnboardingStep();
  animateActiveView(overlay);
}

function closeOnboarding(markSeen = true) {
  const overlay = document.querySelector("#onboardingOverlay");
  overlay.classList.remove("active");
  overlay.setAttribute("aria-hidden", "true");
  if (markSeen) localStorage.setItem(ONBOARDING_KEY, "true");
}

function maybeStartOnboarding(delay = 700) {
  if (localStorage.getItem(ONBOARDING_KEY)) return;
  setTimeout(() => {
    localStorage.setItem(ONBOARDING_KEY, "hinted");
    showToast("Guida rapida disponibile dal pulsante Guida.");
  }, delay);
}

const intelligenceLexicon = {
  food: ["mangiare", "cena", "pranzo", "pizza", "pizzeria", "ristorante", "aperitivo", "food", "bere", "bar"],
  shopping: ["vestiti", "abbigliamento", "negozi", "shopping", "moda", "scarpe", "casa", "home"],
  night: ["stasera", "serata", "discoteca", "musica", "party", "live", "evento"],
  fitness: ["palestra", "sport", "fitness", "allenamento", "benessere"],
  deals: ["sconto", "coupon", "offerta", "promo", "risparmio"]
};

function normalizeText(value = "") {
  return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function intelligenceIntent(term = "") {
  const normalized = normalizeText(term);
  return Object.entries(intelligenceLexicon)
    .filter(([, words]) => words.some((word) => normalized.includes(word)))
    .map(([intent]) => intent);
}

function placeQualityScore(place) {
  let score = 0;
  if (place.name) score += 15;
  if (place.category) score += 15;
  if (place.address) score += 15;
  if (place.phone) score += 15;
  if (place.lat && place.lng) score += 15;
  if (place.photo) score += 20;
  if (place.website) score += 5;
  return Math.min(score, 100);
}

function placeMatchesIntent(place, intents) {
  const text = normalizeText([place.name, place.category, place.address, place.stats, place.caption].filter(Boolean).join(" "));
  return intents.some((intent) => {
    if (intent === "food") return /ristorante|pizzeria|bar|pub|caffe|aperitivo/.test(text);
    if (intent === "shopping") return /abbigliamento|shopping|negozio|home|tezenis/.test(text);
    if (intent === "night") return /evento|discoteca|live|party|serata/.test(text);
    if (intent === "fitness") return /palestra|fitness|sport|benessere/.test(text);
    if (intent === "deals") return /coupon|sconto|promo|offerta/.test(text);
    return false;
  });
}

function intelligencePlaceScore(place, term = "") {
  const intents = intelligenceIntent(term);
  const text = normalizeText([place.name, place.category, place.address, place.stats, place.caption].filter(Boolean).join(" "));
  let score = placeQualityScore(place);
  if (term && text.includes(normalizeText(term))) score += 60;
  if (intents.length && placeMatchesIntent(place, intents)) score += 45;
  if (place.photo) score += 8;
  if (place.stats?.toLowerCase().includes("aperto")) score += 5;
  return score;
}

function intelligentPlaces(term = "", limit = mapPlaces.length) {
  return [...mapPlaces]
    .map((place) => ({ place, score: intelligencePlaceScore(place, term) }))
    .sort((a, b) => b.score - a.score || distanceInKm(AVEZZANO_CENTER, a.place) - distanceInKm(AVEZZANO_CENTER, b.place))
    .slice(0, limit)
    .map((entry) => entry.place);
}

function intelligenceInsights() {
  const missingPhotos = mapPlaces.filter((place) => !place.photo).length;
  const missingPhones = mapPlaces.filter((place) => !place.phone).length;
  const lowQuality = mapPlaces
    .map((place) => ({ ...place, quality: placeQualityScore(place) }))
    .filter((place) => place.quality < 60)
    .sort((a, b) => a.quality - b.quality)
    .slice(0, 5);
  return [
    [`${missingPhotos} schede senza foto reale`, "Priorita media"],
    [`${missingPhones} schede senza telefono`, "Priorita alta"],
    [`${lowQuality.length} schede sotto qualita 60/100`, lowQuality.map((place) => place.name).join(", ") || "Nessuna"],
    ["Ranking invisibile attivo", "Ricerca, mappa e vicino a te usano intenti locali"]
  ];
}

function smartHomeCards() {
  const topFood = intelligentPlaces("ristorante aperto", 1)[0];
  const topShopping = intelligentPlaces("shopping coupon", 1)[0];
  const liveEvent = tonightEvents[0];
  return [
    {
      label: "Consiglio ora",
      title: topFood ? topFood.name : "Cena in centro",
      text: topFood ? `${topFood.category} - ${topFood.distance || "Avezzano"}` : "Apri la mappa e scegli un locale vicino.",
      action: "open-map-place",
      place: topFood?.name,
      cta: "Apri"
    },
    {
      label: "Da non perdere",
      title: liveEvent?.title || "Eventi stasera",
      text: liveEvent ? `${liveEvent.place} - ${liveEvent.time}` : "Musica, aperitivi e serate in un solo elenco.",
      view: "events",
      cta: "Vedi eventi"
    },
    {
      label: "Vantaggio",
      title: topShopping ? topShopping.name : "Coupon locali",
      text: topShopping ? `${topShopping.category} - promo e shopping` : "Sconti e QR pronti da salvare.",
      view: "coupons",
      cta: "Scopri"
    }
  ];
}

function renderSmartStrip() {
  const strip = document.querySelector("#smartStrip");
  if (!strip) return;
  strip.innerHTML = smartHomeCards().map((item) => `
    <article class="smart-card">
      <span>${item.label}</span>
      <strong>${item.title}</strong>
      <small>${item.text}</small>
      <button ${item.view ? `data-view-target="${item.view}"` : `data-action="${item.action}" data-place="${item.place || ""}"`} type="button">${item.cta}</button>
    </article>
  `).join("");
}

function renderDayPlan() {
  const grid = document.querySelector("#dayPlanGrid");
  if (!grid) return;
  const state = getDemoState();
  const coupons = profileCouponRows();
  const events = profileEventRows();
  const reminders = state.reminders || [];
  const rows = [
    {
      label: "Coupon salvati",
      value: coupons.length,
      text: coupons.length ? coupons[0].title : "Salva un vantaggio dalla home.",
      view: "coupons"
    },
    {
      label: "Eventi in agenda",
      value: events.length,
      text: events.length ? events[0].title : "Prenota o salva una serata.",
      view: "events"
    },
    {
      label: "Reminder",
      value: reminders.length,
      text: reminders.length ? "Promemoria attivi per oggi." : "Attiva un reminder per stasera.",
      action: "create-reminder"
    }
  ];
  grid.innerHTML = rows.map((item) => `
    <button class="day-plan-item" ${item.view ? `data-view-target="${item.view}"` : `data-action="${item.action}"`} type="button">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
      <small>${item.text}</small>
    </button>
  `).join("");
}

function render() {
  document.querySelector("#stories").innerHTML = quickActions.map(([title, text, view, icon]) => `
    <button class="shortcut-card" data-view-target="${view}" type="button">
      <span class="shortcut-icon shortcut-icon-${icon}" aria-hidden="true"></span>
      <strong>${title}</strong>
      <span>${text}</span>
    </button>
  `).join("");

  renderSmartStrip();
  renderDayPlan();
  const homeBusinessCount = document.querySelector("#homeBusinessCount");
  if (homeBusinessCount) homeBusinessCount.textContent = mapPlaces.length.toLocaleString("it-IT");

  document.querySelector("#feedList").innerHTML = cityHighlights.map((item) => {
    const relatedPlace = findPlaceByName(item.place);
    const searchText = [item.type, item.title, item.place, item.when, item.detail, item.cta, relatedPlace?.category, relatedPlace?.stats].filter(Boolean).join(" ");
    return `
    <article class="post utility-card" data-search="${searchText.toLowerCase()}">
      <div class="post-top">
        <div class="utility-badge">${item.type}</div>
        <div>
          <strong>${item.title}</strong>
          <span>${item.place} - ${item.when}</span>
        </div>
      </div>
      <div class="post-media lazy-media" ${mediaAttrs(item.image, 720)}></div>
      <div class="post-body">
        <p>${item.detail}</p>
        <div class="post-actions">
          <button data-action="highlight-primary" data-title="${item.title}" data-type="${item.type}" type="button">${item.cta}</button>
          <button data-action="open-map-place" data-place="${item.place}" type="button">Apri mappa</button>
          <button class="save-action" data-action="save-highlight" data-title="${item.title}" data-type="${item.type}" type="button">Salva</button>
        </div>
      </div>
    </article>
  `;
  }).join("");

  renderNearbyList();

  renderMapBusinessList();

  document.querySelector("#eventCategories").innerHTML = eventCategories.map(([title, text], index) => `
    <button class="event-chip ${index === 0 ? "active" : ""}" data-action="event-category" data-category="${title}" type="button">
      <strong>${title}</strong>
      <span>${text}</span>
    </button>
  `).join("");

  document.querySelector("#tonightGrid").innerHTML = tonightEvents.map((item) => `
    <article class="tonight-card">
      <div class="tonight-media lazy-media" ${mediaAttrs(item.image, 720)}></div>
      <div class="tonight-body">
        <div class="tonight-time">${item.time}</div>
        <p class="eyebrow">${item.type}</p>
        <h2>${item.title}</h2>
        <p>${item.place} - ${item.meta}</p>
        <div class="post-actions">
          <button data-action="book-event" data-title="${item.title}" type="button">Prenota</button>
          <button data-action="save-event" data-title="${item.title}" type="button">Salva</button>
        </div>
      </div>
    </article>
  `).join("");

  document.querySelector("#eventsGrid").innerHTML = events.map(([title, date, meta, image]) => `
    <article class="event-card">
      <div class="card-media lazy-media" ${mediaAttrs(image, 640)}></div>
      <div class="card-body">
        <h2>${title}</h2>
        <p>${date}</p>
        <span class="pill">${meta}</span>
      </div>
    </article>
  `).join("");

  document.querySelector("#summerGrid").innerHTML = summerHighlights.map((item) => {
    const place = findPlaceByName(item.place);
    const verified = place && isVerifiedPartner(place);
    return `
      <article class="summer-card" data-search="${[item.title, item.type, item.place, item.text, place?.category].filter(Boolean).join(" ").toLowerCase()}">
        <div class="summer-icon">☀</div>
        <div>
          <p class="eyebrow">${item.type}</p>
          <h2>${item.title}</h2>
          <p>${item.text}</p>
          <div class="summer-meta">
            <span>${item.place}</span>
            ${verified ? `<span class="verified-badge" aria-label="Verificato" title="Verificato">✓</span>` : ""}
          </div>
          <div class="post-actions">
            <button data-action="open-map-place" data-place="${item.place}" type="button">${item.cta}</button>
            <button class="save-action" data-action="save-highlight" data-title="${item.title}" data-type="Estate 2026" type="button">Salva</button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  document.querySelector("#couponsGrid").innerHTML = coupons.map(([title, place, expires, meta]) => `
    <article class="coupon-card">
      <div class="card-body">
        <p class="eyebrow">${place}</p>
        <h2>${title}</h2>
        <p>${expires}</p>
        <span class="pill success">${meta}</span>
        <div class="qr" aria-label="QR Code demo"></div>
      </div>
    </article>
  `).join("");

  document.querySelector("#rewardsGrid").innerHTML = rewards.map(([title, points, text]) => `
    <article class="reward-card">
      <div class="card-body">
        <p class="eyebrow">${points}</p>
        <h2>${title}</h2>
        <p>${text}</p>
        <button class="ghost" data-action="redeem-reward" data-title="${title}" type="button">Riscatta</button>
      </div>
    </article>
  `).join("");

  renderUserProfile("settings");
  renderMerchantArea();
  applySearchFilter();
  hydrateLazyMedia(document.querySelector(".view.active") || document, true);
  stampCityArtifacts(document);
  animateGlobalSurfaces();
}

function profileRows(items) {
  return items.map(([title, meta, status]) => `
    <div class="profile-row">
      <div>
        <strong>${title}</strong>
        <span>${meta}</span>
      </div>
      <span class="pill">${status}</span>
    </div>
  `).join("");
}

function uniqueProfileRows(rows) {
  const seen = new Set();
  return rows.filter(([title]) => {
    const key = title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function profileCouponRows() {
  const state = getDemoState();
  return uniqueProfileRows([
    ...savedProfileCoupons,
    ...(state.coupons || []).map((item) => [item.title, item.type || "Coupon salvato", "Salvato"]),
    ...(state.couponRedemptions || []).map((item) => [item.title, "Scansione QR", "Usato"])
  ]);
}

function profileEventRows() {
  const state = getDemoState();
  return uniqueProfileRows([
    ...savedProfileEvents,
    ...(state.events || []).map((item) => [item.title, item.type || "Evento MyAvezzano", "Salvato"]),
    ...(state.reminders || []).map((item) => [item.title, "Notifica eventi", "Reminder attivo"])
  ]);
}

function settingsPanel(user) {
  if (!user) {
    return `
      <div class="empty-profile">
        <strong>Accedi per gestire il tuo profilo</strong>
        <span>Registrandoti puoi salvare coupon, eventi, preferenze e creare una scheda negozio.</span>
        <button class="primary-action" id="profilePanelSignup" type="button">Registrati ora</button>
      </div>
    `;
  }

  return `
    <div class="settings-list">
      <form class="profile-edit-form" id="profileEditForm">
        <div class="checkout-grid">
          <label class="field">
            <span>Nome</span>
            <input name="name" type="text" value="${user.name || ""}" required />
          </label>
          <label class="field">
            <span>Cognome</span>
            <input name="surname" type="text" value="${user.surname || ""}" required />
          </label>
          <label class="field">
            <span>Email</span>
            <input name="email" type="email" value="${user.email || ""}" required />
          </label>
          <label class="field">
            <span>Telefono</span>
            <input name="phone" type="tel" value="${user.phone || ""}" />
          </label>
        </div>
        <button class="primary-action full-button" type="submit">Salva profilo</button>
      </form>
      <label class="setting-toggle">
        <span>Notifiche eventi e serate</span>
        <input type="checkbox" checked />
      </label>
      <label class="setting-toggle">
        <span>Coupon in scadenza</span>
        <input type="checkbox" checked />
      </label>
      <label class="setting-toggle">
        <span>Nuove aperture vicino a me</span>
        <input type="checkbox" checked />
      </label>
      <label class="setting-toggle">
        <span>Newsletter settimanale</span>
        <input type="checkbox" />
      </label>
      <button class="ghost full-button" data-action="open-onboarding" type="button">Rivedi demo guidata</button>
      <button class="ghost full-button" id="profileOpenAccountModal" type="button">Gestisci account e logout</button>
    </div>
  `;
}

function preferencesPanel() {
  return `
    <div class="preference-chips">
      ${userPreferences.map((item, index) => `<button class="${index < 4 ? "active" : ""}" data-action="toggle-preference" type="button">${item}</button>`).join("")}
    </div>
  `;
}

function renderProfileActions() {
  const user = getStoredUser();
  const adminAction = isAdmin(user)
    ? `
      <button class="profile-action-card god-action" data-view-target="admin" type="button">
        <strong>Pannello GOD</strong>
        <span>Controllo admin completo</span>
      </button>
    `
    : "";

  document.querySelector(".profile-actions-grid").innerHTML = `
    <button class="profile-action-card active" data-profile-panel="settings" type="button">
      <strong>Impostazioni</strong>
      <span>Account, privacy e notifiche</span>
    </button>
    ${adminAction}
    <button class="profile-action-card" data-view-target="merchant" type="button">
      <strong>Crea il tuo negozio</strong>
      <span>Piani da 12,99 EUR/mese</span>
    </button>
    <button class="profile-action-card" data-profile-panel="coupons" type="button">
      <strong>I miei coupon</strong>
      <span>Sconti salvati e QR</span>
    </button>
    <button class="profile-action-card" data-profile-panel="events" type="button">
      <strong>I miei eventi</strong>
      <span>Prenotazioni e reminder</span>
    </button>
    <button class="profile-action-card" data-profile-panel="preferences" type="button">
      <strong>Preferenze</strong>
      <span>Categorie e interessi</span>
    </button>
    <button class="profile-action-card" data-view-target="map" type="button">
      <strong>Luoghi salvati</strong>
      <span>Attivita e percorsi</span>
    </button>
  `;
}

function renderProfilePanel(panel = "settings") {
  const user = getStoredUser();
  const couponRows = profileCouponRows();
  const eventRows = profileEventRows();
  const titleMap = {
    settings: ["Impostazioni", "Account"],
    coupons: ["I miei coupon", `${couponRows.length} salvati`],
    events: ["I miei eventi", `${eventRows.length} attivi`],
    preferences: ["Preferenze", "Categorie"]
  };
  const [title, badge] = titleMap[panel] || titleMap.settings;
  document.querySelector("#profilePanelTitle").textContent = title;
  document.querySelector("#profilePanelBadge").textContent = badge;

  const content = {
    settings: settingsPanel(user),
    coupons: profileRows(couponRows),
    events: profileRows(eventRows),
    preferences: preferencesPanel()
  }[panel] || settingsPanel(user);

  document.querySelector("#profilePanelContent").innerHTML = content;

  const signupButton = document.querySelector("#profilePanelSignup");
  if (signupButton) signupButton.addEventListener("click", openSignup);
  const accountButton = document.querySelector("#profileOpenAccountModal");
  if (accountButton) accountButton.addEventListener("click", openSignup);
}

function prestigeState(user = getStoredUser()) {
  if (!user) return { level: "Base", progress: 18, points: 0 };
  if (user.role === "admin") return { level: "GOD", progress: 96, points: 9990 };
  const basePoints = 1240 + profileCouponRows().length * 110 + profileEventRows().length * 90;
  const progress = Math.min(92, 42 + Math.round((basePoints % 900) / 18));
  return { level: basePoints > 1600 ? "Gold" : "Silver", progress, points: basePoints };
}

function renderTopProfileStatus() {
  const user = getStoredUser();
  const state = prestigeState(user);
  const status = document.querySelector("#topProfileStatus");
  if (!status) return;
  document.querySelector("#topProfileAvatar").src = user?.avatar || "assets/app-icon.svg";
  document.querySelector("#topProfileName").textContent = user ? user.name : "Ospite";
  document.querySelector("#topProfileLevel").textContent = `${state.level} - ${state.progress}%`;
  status.style.setProperty("--prestige-progress", `${state.progress}%`);
  status.classList.toggle("is-admin", user?.role === "admin");
}

function notificationItems() {
  const user = getStoredUser();
  const merchantItems = getMerchantNotifications().slice(-2).reverse().map((item) => ({
    title: item.title,
    text: `${item.targetLabel} - ${item.status}`,
    tone: "gold"
  }));
  return [
    { title: "Aperitivo lungo in centro", text: "Inizia alle 19:30. Puoi salvarlo tra gli eventi.", tone: "event" },
    { title: "Coupon in scadenza", text: "2x1 aperitivo valido fino alle 20:00.", tone: "coupon" },
    {
      title: user ? `Ciao ${user.name}` : "Profilo non attivo",
      text: user ? "Il tuo livello prestigio e aggiornato." : "Accedi per salvare notifiche e preferenze.",
      tone: user ? "profile" : "quiet"
    },
    ...merchantItems
  ];
}

function renderNotificationMenu() {
  const list = document.querySelector("#notificationMenuList");
  if (!list) return;
  list.innerHTML = notificationItems().map((item) => `
    <button class="notification-menu-item ${item.tone}" data-notification-open type="button">
      <span aria-hidden="true"></span>
      <div>
        <strong>${item.title}</strong>
        <small>${item.text}</small>
      </div>
    </button>
  `).join("");
}

function closeNotificationMenu() {
  document.querySelector("#notificationMenu")?.setAttribute("hidden", "");
  document.querySelector("#notificationButton")?.setAttribute("aria-expanded", "false");
}

function toggleNotificationMenu() {
  const menu = document.querySelector("#notificationMenu");
  const button = document.querySelector("#notificationButton");
  if (!menu || !button) return;
  const willOpen = menu.hasAttribute("hidden");
  if (willOpen) {
    renderNotificationMenu();
    menu.removeAttribute("hidden");
  } else {
    menu.setAttribute("hidden", "");
  }
  button.setAttribute("aria-expanded", String(willOpen));
}

function renderUserProfile(panel = "settings") {
  const user = getStoredUser();
  const prestige = prestigeState(user);
  const avatar = user?.avatar || "assets/app-icon.svg";
  document.querySelector("#profileAvatar").src = avatar;
  document.querySelector("#profileName").textContent = user ? user.name : "Accedi a MyAvezzano";
  document.querySelector("#profileMeta").textContent = user
    ? `${user.provider} - ${user.email || user.phone || "account locale"}`
    : "Crea un account per salvare coupon, eventi e preferenze.";
  document.querySelector("#profileCouponCount").textContent = user ? profileCouponRows().length : 0;
  document.querySelector("#profileEventCount").textContent = user ? profileEventRows().length : 0;
  document.querySelector("#profilePointCount").textContent = user ? prestige.points.toLocaleString("it-IT") : 0;
  document.querySelector("#profileLevel").textContent = prestige.level;
  document.querySelector("#profileSignupButton").hidden = Boolean(user);
  renderProfileActions();
  renderProfilePanel(panel);
  renderTopProfileStatus();
}

function renderMerchantArea() {
  const subscription = getMerchantSubscription();
  const user = getStoredUser();
  const hasActiveMerchantPlan = Boolean(subscription && user && subscription.userId === user.id);
  const paywall = document.querySelector("#merchantPaywall");
  const dashboard = document.querySelector("#merchantDashboard");
  if (!paywall || !dashboard) return;

  paywall.hidden = hasActiveMerchantPlan;
  dashboard.hidden = !hasActiveMerchantPlan;

  if (!hasActiveMerchantPlan) return;

  document.querySelector("#merchantSubscriptionTitle").textContent = `${subscription.plan} - ${subscription.businessName}`;
  document.querySelector("#merchantSubscriptionMeta").textContent = `${subscription.price} EUR/mese - ${subscription.category} - attivo dal ${subscription.startedAt}`;
  document.querySelector("#merchantPlanPill").textContent = subscription.plan;
  const notificationPanel = document.querySelector("#merchantNotificationPanel");
  const notificationGate = document.querySelector("#merchantNotificationGate");
  const isGold = isGoldMerchant(subscription);
  if (notificationPanel) notificationPanel.classList.toggle("is-locked", !isGold);
  if (notificationGate) {
    notificationGate.textContent = isGold ? "Gold attivo" : "Richiede Gold";
    notificationGate.className = `pill ${isGold ? "success" : "warning"}`;
  }
  document.querySelectorAll("#merchantNotificationTitle, #merchantNotificationBody, #merchantNotificationTarget, #sendMerchantNotification, #previewMerchantNotification")
    .forEach((item) => { item.disabled = !isGold; });
  setMerchantNotificationFeedback(isGold ? "Canale notifiche pronto. Il filtro contenuti e attivo." : "Le notifiche promozionali sono disponibili solo per account Gold.", isGold ? "success" : "info");
  renderMerchantNotificationLog();
}

function isAdmin(user = getStoredUser()) {
  return user?.role === "admin";
}

function renderAdminDashboard() {
  const root = document.querySelector("#adminDashboard");
  if (!root) return;
  const current = getStoredUser();
  if (!isAdmin(current)) {
    root.innerHTML = `
      <section class="panel empty-profile">
        <strong>Area riservata agli amministratori</strong>
        <span>Accedi con un account admin per gestire utenti, contenuti e statistiche.</span>
        <button class="primary-action" id="adminLoginButton" type="button">Login admin</button>
      </section>
    `;
    document.querySelector("#adminLoginButton")?.addEventListener("click", () => openSignup("login"));
    return;
  }

  const users = getUsers();
  const state = getDemoState();
  const requests = [
    ...(state.events || []).map((item) => ["Prenotazione", item.title, "Utente"]),
    ...(state.coupons || []).map((item) => ["Coupon", item.title, "Salvato"]),
    ...(state.campaigns || []).map((item) => ["Campagna", item.title, "Demo"])
  ];
  const aiInsights = intelligenceInsights();

  root.innerHTML = `
    <div class="admin-shell">
      <section class="panel admin-hero god-hero">
        <div>
          <p class="eyebrow">GOD mode</p>
          <h2>Pannello GOD MyAvezzano</h2>
          <p>Controllo riservato all'account admin: utenti, ruoli, contenuti, richieste, sicurezza e dati locali.</p>
        </div>
        <button class="ghost" data-admin-action="logout" type="button">Logout</button>
      </section>
      <section class="metrics">
        <div><span>Utenti</span><strong>${users.filter((user) => user.status !== "deleted").length}</strong></div>
        <div><span>Admin</span><strong>${users.filter((user) => user.role === "admin").length}</strong></div>
        <div><span>Richieste</span><strong>${requests.length}</strong></div>
        <div><span>Attivita</span><strong>${mapPlaces.length}</strong></div>
      </section>
      <section class="panel intelligence-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">IA invisibile</p>
            <h2>MyAvezzano Intelligence Layer</h2>
          </div>
          <span class="pill success">Attivo</span>
        </div>
        <div class="campaign-list">
          ${aiInsights.map(([title, status]) => `<div><strong>${title}</strong><span>${status}</span></div>`).join("")}
        </div>
      </section>
      <section class="panel god-command">
        <div>
          <strong>Azioni rapide GOD</strong>
          <span>Strumenti demo per controllo totale del prototipo.</span>
        </div>
        <div class="composer-actions">
          <button class="ghost" data-admin-action="export-data" type="button">Esporta dati</button>
          <button class="ghost" data-admin-action="seed-demo" type="button">Ripristina demo</button>
          <button class="ghost" data-admin-action="clear-demo-state" type="button">Pulisci azioni demo</button>
          <button class="ghost" data-admin-action="refresh-ai" type="button">Ricalcola IA</button>
        </div>
      </section>
      <div class="admin-grid">
        <section class="panel">
          <div class="panel-head">
            <h2>Utenti registrati</h2>
            <span class="pill">${users.length} account</span>
          </div>
          <div class="admin-table-wrap">
            <table>
              <thead><tr><th>Utente</th><th>Ruolo</th><th>Stato</th><th>Azioni</th></tr></thead>
              <tbody>
                ${users.map((user) => `
                  <tr>
                    <td><strong>${user.name} ${user.surname || ""}</strong><br><span>${user.email || user.phone || "senza email"}</span></td>
                    <td>${user.role}</td>
                    <td><span class="pill ${user.status === "blocked" ? "warning" : "success"}">${user.status}</span></td>
                    <td>
                      <button class="ghost compact-button" data-admin-action="toggle-role" data-user-id="${user.id}" type="button">${user.role === "admin" ? "Utente" : "Admin"}</button>
                      <button class="ghost compact-button" data-admin-action="toggle-status" data-user-id="${user.id}" type="button">${user.status === "blocked" ? "Sblocca" : "Blocca"}</button>
                      <button class="ghost compact-button" data-admin-action="delete-user" data-user-id="${user.id}" type="button">Elimina</button>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </section>
        <section class="panel">
          <div class="panel-head">
            <h2>Richieste e contenuti</h2>
            <span class="pill warning">${requests.length || 3} in coda</span>
          </div>
          <div class="campaign-list">
            ${(requests.length ? requests : [["Moderazione", "Moon Club", "Da verificare"], ["Contenuto", "Commento segnalato", "Urgente"], ["Offerta", "Coupon palestra", "Ok"]]).map(([type, title, status]) => `
              <div><strong>${title}</strong><span>${type} - ${status}</span></div>
            `).join("")}
          </div>
        </section>
        <section class="panel">
          <h2>Analytics citta</h2>
          <div class="bar-chart">
            <span style="height:48%"></span>
            <span style="height:72%"></span>
            <span style="height:58%"></span>
            <span style="height:90%"></span>
            <span style="height:66%"></span>
            <span style="height:84%"></span>
          </div>
        </section>
        <section class="panel">
          <h2>Controlli sicurezza</h2>
          <div class="settings-list">
            <div class="profile-row"><div><strong>Password hash</strong><span>SHA-256 con salt per MVP statico</span></div><span class="pill success">Attivo</span></div>
            <div class="profile-row"><div><strong>Admin protetto</strong><span>Accesso solo ruolo admin</span></div><span class="pill success">Attivo</span></div>
            <div class="profile-row"><div><strong>Database locale</strong><span>localStorage, pronto per migrazione API</span></div><span class="pill warning">MVP</span></div>
          </div>
        </section>
      </div>
    </div>
  `;
}

function handleAdminAction(button) {
  if (!isAdmin()) {
    showToast("Accesso admin richiesto.", "error");
    openSignup("login");
    return;
  }

  if (button.dataset.adminAction === "logout") {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    updateAuthUi();
    switchView("feed");
    showToast("Logout admin completato.", "success");
    return;
  }

  if (button.dataset.adminAction === "export-data") {
    const payload = {
      users: getUsers().map(publicUser),
      demoState: getDemoState(),
      merchant: getMerchantSubscription(),
      exportedAt: new Date().toISOString()
    };
    console.info("MyAvezzano GOD export", payload);
    showToast("Export GOD generato in console browser.", "success");
    return;
  }

  if (button.dataset.adminAction === "seed-demo") {
    seedAdminUser().then(() => {
      renderAdminDashboard();
      showToast("Account admin demo verificato.", "success");
    });
    return;
  }

  if (button.dataset.adminAction === "clear-demo-state") {
    localStorage.removeItem(DEMO_STATE_KEY);
    renderAdminDashboard();
    renderUserProfile("settings");
    showToast("Azioni demo pulite.", "success");
    return;
  }

  if (button.dataset.adminAction === "refresh-ai") {
    renderAdminDashboard();
    showToast("IA invisibile ricalcolata.", "success");
    return;
  }

  const users = getUsers();
  const user = users.find((item) => item.id === button.dataset.userId);
  if (!user || user.id === "admin-demo" && button.dataset.adminAction === "delete-user") {
    showToast("Operazione non disponibile su questo account.", "error");
    return;
  }

  if (button.dataset.adminAction === "toggle-role") {
    user.role = user.role === "admin" ? "user" : "admin";
  }
  if (button.dataset.adminAction === "toggle-status") {
    user.status = user.status === "blocked" ? "active" : "blocked";
  }
  if (button.dataset.adminAction === "delete-user") {
    user.status = "deleted";
  }
  saveUsers(users);
  renderAdminDashboard();
  showToast("Utente aggiornato.", "success");
}

const legalCopy = {
  privacy: ["Privacy Policy", "MyAvezzano MVP salva dati account, preferenze, coupon ed eventi in storage locale del browser. In produzione i dati saranno trattati su server sicuro con consenso, finalita esplicite e strumenti di cancellazione."],
  terms: ["Termini e condizioni", "Il prototipo mostra funzionalita demo per utenti, commercianti e admin. Coupon, pagamenti, prenotazioni e statistiche non generano obblighi reali finche non saranno collegati a servizi certificati."],
  cookies: ["Cookie Policy", "La versione statica non usa cookie di tracciamento proprietari. Usa localStorage per sessione, preferenze, cache demo e PWA. Servizi esterni come mappe o immagini possono applicare proprie policy."]
};

function renderLegalPanel(tab = "privacy") {
  const panel = document.querySelector("#legalPanel");
  if (!panel) return;
  document.querySelectorAll(".legal-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.legalTab === tab);
  });
  const [title, text] = legalCopy[tab] || legalCopy.privacy;
  panel.innerHTML = `
    <p class="eyebrow">Documento legale</p>
    <h2>${title}</h2>
    <p>${text}</p>
    <div class="settings-list">
      <div class="profile-row"><div><strong>Titolare demo</strong><span>MyAvezzano MVP</span></div><span class="pill">Demo</span></div>
      <div class="profile-row"><div><strong>Ultimo aggiornamento</strong><span>5 giugno 2026</span></div><span class="pill success">Attivo</span></div>
    </div>
  `;
}

function toRadians(value) {
  return value * Math.PI / 180;
}

function distanceInKm(from, to) {
  const earthRadiusKm = 6371;
  const dLat = toRadians(to.lat - from.lat);
  const dLng = toRadians(to.lng - from.lng);
  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(to.lat);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(place) {
  const origin = userPosition || AVEZZANO_CENTER;
  const distance = distanceInKm(origin, place);
  return distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1).replace(".", ",")} km`;
}

function navigationUrl(place) {
  const destination = `${place.lat},${place.lng}`;
  const origin = userPosition ? `&origin=${userPosition.lat},${userPosition.lng}` : "";
  return `https://www.google.com/maps/dir/?api=1${origin}&destination=${destination}&travelmode=walking`;
}

function isVerifiedPartner(place) {
  return verifiedPartnerNames.has(place?.name);
}

function markerTone(place) {
  if (place.category.includes("Ristorante") || place.category.includes("Bar") || place.category.includes("Pub")) return "food";
  if (place.category.includes("Discoteca")) return "night";
  if (place.category.includes("Abbigliamento") || place.category.includes("Nuova")) return "shop";
  if (place.category.includes("Palestra")) return "sport";
  return "default";
}

function categoryFromTags(tags) {
  const amenity = tags.amenity;
  const shop = tags.shop;
  const leisure = tags.leisure;
  const tourism = tags.tourism;

  if (amenity === "restaurant" || amenity === "fast_food" || amenity === "ice_cream") return "Ristorante";
  if (amenity === "bar" || amenity === "cafe") return "Bar";
  if (amenity === "pub" || amenity === "biergarten") return "Pub";
  if (amenity === "nightclub") return "Discoteca";
  if (amenity === "pharmacy") return "Farmacia";
  if (leisure === "fitness_centre" || leisure === "sports_centre") return "Palestra";
  if (shop === "clothes" || shop === "shoes" || shop === "fashion" || shop === "boutique") return "Abbigliamento";
  if (shop === "hairdresser" || shop === "beauty" || shop === "cosmetics") return "Centro estetico";
  if (tourism === "hotel" || tourism === "guest_house" || tourism === "apartment") return "Hotel";
  if (shop) return "Negozio";
  if (tags.office || tags.craft || tags.healthcare) return "Servizio";
  return "Attivita locale";
}

function addressFromTags(tags) {
  const street = tags["addr:street"] || tags["addr:place"];
  const number = tags["addr:housenumber"];
  if (street && number) return `${street} ${number}, Avezzano`;
  if (street) return `${street}, Avezzano`;
  return "Avezzano";
}

function commonsFilePath(fileName) {
  const cleanName = fileName.replace(/^File:/, "").trim();
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(cleanName)}`;
}

async function wikidataImage(wikidataId) {
  if (!wikidataId) return "";
  if (wikidataImageCache.has(wikidataId)) return wikidataImageCache.get(wikidataId);

  try {
    const response = await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${wikidataId}.json`);
    if (!response.ok) throw new Error("Wikidata image not available");
    const data = await response.json();
    const fileName = data.entities?.[wikidataId]?.claims?.P18?.[0]?.mainsnak?.datavalue?.value;
    const image = fileName ? commonsFilePath(fileName) : "";
    wikidataImageCache.set(wikidataId, image);
    return image;
  } catch {
    wikidataImageCache.set(wikidataId, "");
    return "";
  }
}

async function imageFromOsmTags(tags, category) {
  const directImage = tags.image || tags.logo;
  const commons = tags.wikimedia_commons;

  if (directImage?.startsWith("http")) return directImage;
  if (directImage?.startsWith("File:")) return commonsFilePath(directImage);
  if (commons?.startsWith("File:")) return commonsFilePath(commons);

  const wikidata = await wikidataImage(tags.wikidata);
  return wikidata || categoryImages[category] || categoryImages["Attivita locale"];
}

async function osmElementToPlace(element, index) {
  const tags = element.tags || {};
  const lat = element.lat || element.center?.lat;
  const lng = element.lon || element.center?.lon;
  const category = categoryFromTags(tags);

  return {
    id: `osm-${element.type}-${element.id}`,
    name: tags.name,
    category,
    distance: "",
    lat,
    lng,
    address: addressFromTags(tags),
    stats: tags.opening_hours ? "Orari disponibili" : tags.website || tags["contact:website"] ? "Sito disponibile" : "Dato reale OSM",
    image: await imageFromOsmTags(tags, category),
    phone: tags.phone || tags["contact:phone"] || "",
    website: tags.website || tags["contact:website"] || "",
    osmType: element.type,
    osmId: element.id,
    source: "OpenStreetMap",
    sortIndex: index
  };
}

function createMapIcon(place) {
  const logo = place.photo || place.logo || place.image || "assets/app-icon.svg";

  return L.divIcon({
    className: "google-map-marker-shell",
    html: `<span class="google-map-marker ${markerTone(place)}"><img src="${logo}" alt=""></span>`,
    iconSize: [48, 58],
    iconAnchor: [24, 56],
    popupAnchor: [0, -46]
  });
}

function renderMapBusinessList() {
  const term = document.querySelector("#searchInput")?.value.trim() || "";
  const places = term ? intelligentPlaces(term) : mapPlaces;
  document.querySelector("#mapBusinessList").innerHTML = places.map((place) => `
    <button class="destination-item ${selectedPlace.id === place.id ? "active" : ""}" data-place-id="${place.id}" type="button">
      <img class="destination-logo" src="${smartImageUrl(place.photo || place.logo || place.image, 96)}" alt="" loading="lazy" decoding="async" />
      <span class="destination-copy">
        <strong>${place.name}</strong>
        <span>${place.category} - ${formatDistance(place)}</span>
        ${isVerifiedPartner(place) ? `<span class="verified-badge" aria-label="Verificato" title="Verificato">✓</span>` : ""}
        <small>${[place.address, place.phone, place.photo ? "Foto reale" : "", place.stats].filter(Boolean).join(" - ")}</small>
      </span>
    </button>
  `).join("");
  document.querySelector("#realBusinessCount").textContent = realPlacesLoaded ? `${mapPlaces.length} reali` : "Demo";
  applySearchFilter();
}

function renderNearbyList() {
  document.querySelector("#nearbyList").innerHTML = intelligentPlaces("", 6).map((item) => `
    <div><strong>${item.name}</strong><span>${item.category}</span></div>
  `).join("");
}

function rebuildMapMarkers() {
  if (!interactiveMap || !window.L) return;

  mapMarkers.forEach((marker) => marker.remove());
  mapMarkers.clear();

  mapPlaces.forEach((place) => {
    const marker = L.marker([place.lat, place.lng], { icon: createMapIcon(place) }).addTo(interactiveMap);
    marker.bindPopup(`<strong>${place.name}</strong><br>${place.category}<br>${place.address}`, {
      closeButton: false,
      className: "google-popup"
    });
    marker.on("click", () => selectMapPlace(place.id, false));
    mapMarkers.set(place.id, marker);
  });
}

function applyImportedPlaces(places, statusText) {
  if (!places.length) return;

  const curated = businesses.concat(userSubmittedBusinesses).map((place, index) => ({
    ...place,
    id: place.id || `curated-${index}`
  }));
  const seen = new Set(curated.map((place) => `${place.name.toLowerCase()}-${place.address.toLowerCase()}`));
  const imported = places.filter((place) => {
    const key = `${place.name.toLowerCase()}-${place.address.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  mapPlaces = curated.concat(imported).slice(0, MAX_REAL_PLACES);
  selectedPlace = mapPlaces[0];
  realPlacesLoaded = true;
  renderMapBusinessList();
  renderNearbyList();

  if (interactiveMap && window.L) {
    rebuildMapMarkers();
    const bounds = L.latLngBounds(mapPlaces.map((place) => [place.lat, place.lng]));
    interactiveMap.fitBounds(bounds, { padding: [34, 34], maxZoom: 15 });
  }

  selectMapPlace(selectedPlace.id, false);
  document.querySelector("#mapStatus").textContent = statusText;
}

function cachedOsmPlaces() {
  try {
    return JSON.parse(localStorage.getItem(OSM_CACHE_KEY)) || [];
  } catch {
    return [];
  }
}

function overpassQuery() {
  const radius = 7500;
  return `
    [out:json][timeout:35];
    (
      nwr(around:${radius},${AVEZZANO_CENTER.lat},${AVEZZANO_CENTER.lng})["name"]["shop"];
      nwr(around:${radius},${AVEZZANO_CENTER.lat},${AVEZZANO_CENTER.lng})["name"]["amenity"~"restaurant|bar|cafe|pub|fast_food|ice_cream|biergarten|nightclub|cinema|theatre|pharmacy|bank|fuel|clinic|doctors|dentist|veterinary|marketplace"];
      nwr(around:${radius},${AVEZZANO_CENTER.lat},${AVEZZANO_CENTER.lng})["name"]["leisure"~"fitness_centre|sports_centre|dance|bowling_alley"];
      nwr(around:${radius},${AVEZZANO_CENTER.lat},${AVEZZANO_CENTER.lng})["name"]["tourism"~"hotel|guest_house|apartment|attraction|museum"];
      nwr(around:${radius},${AVEZZANO_CENTER.lat},${AVEZZANO_CENTER.lng})["name"]["craft"];
      nwr(around:${radius},${AVEZZANO_CENTER.lat},${AVEZZANO_CENTER.lng})["name"]["office"];
      nwr(around:${radius},${AVEZZANO_CENTER.lat},${AVEZZANO_CENTER.lng})["name"]["healthcare"];
    );
    out center;
  `;
}

async function loadRealAvezzanoBusinesses(force = false) {
  if (isLoadingRealPlaces || (realPlacesLoaded && !force)) return;

  const status = document.querySelector("#mapStatus");
  isLoadingRealPlaces = true;
  status.textContent = "Importazione attivita reali da OpenStreetMap in corso...";

  if (!force) {
    const cached = cachedOsmPlaces();
    if (cached.length) {
      applyImportedPlaces(cached, `${cached.length} attivita caricate dalla cache locale. Aggiornamento online in corso...`);
    }
  }

  try {
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: new URLSearchParams({ data: overpassQuery() })
    });

    if (!response.ok) throw new Error("Overpass non disponibile");
    const data = await response.json();
    const seen = new Set();
    const elements = (data.elements || []).filter((element) => {
      const tags = element.tags || {};
      const lat = element.lat || element.center?.lat;
      const lng = element.lon || element.center?.lon;
      if (!tags.name || !lat || !lng) return false;
      const key = `${tags.name.toLowerCase()}-${lat.toFixed(4)}-${lng.toFixed(4)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const places = (await Promise.all(elements.map(osmElementToPlace)))
      .sort((a, b) => distanceInKm(AVEZZANO_CENTER, a) - distanceInKm(AVEZZANO_CENTER, b))
      .slice(0, MAX_REAL_PLACES);

    if (!places.length) throw new Error("Nessuna attivita trovata");
    localStorage.setItem(OSM_CACHE_KEY, JSON.stringify(places));
    applyImportedPlaces(places, `${places.length} attivita reali importate da OpenStreetMap. Le foto sono reali dove disponibili, altrimenti categoria demo.`);
  } catch {
    const cached = cachedOsmPlaces();
    if (cached.length) {
      applyImportedPlaces(cached, `${cached.length} attivita caricate dalla cache locale. Import online non riuscito.`);
    } else {
      status.textContent = "Import online non riuscito. La demo resta con dati locali; riprova con connessione attiva.";
    }
  } finally {
    isLoadingRealPlaces = false;
  }
}

function updateRouteLine() {
  if (!interactiveMap || !selectedPlace || !window.L) return;
  if (routeLine) routeLine.remove();

  if (userPosition) {
    routeLine = L.polyline(
      [[userPosition.lat, userPosition.lng], [selectedPlace.lat, selectedPlace.lng]],
      { color: "#007aff", weight: 6, opacity: 0.82, dashArray: "10 10" }
    ).addTo(interactiveMap);
  }
}

function selectMapPlace(placeId, shouldPan = true) {
  const place = mapPlaces.find((item) => item.id === placeId) || mapPlaces[0];
  selectedPlace = place;

  document.querySelector("#mapCard").innerHTML = `
    <strong>${place.name}</strong>
      <span>${[place.category, isVerifiedPartner(place) ? "Verificato" : "", place.phone, place.photo ? "foto reale" : "", formatDistance(place)].filter(Boolean).join(" · ")}</span>
  `;
  document.querySelector("#navigationLink").href = navigationUrl(place);
  document.querySelector("#mapStatus").textContent = userPosition
    ? `Percorso da posizione attuale a ${place.name}. Apri Google Maps per la navigazione turn-by-turn.`
    : `Destinazione selezionata: ${place.name}. Usa la tua posizione o apri Google Maps.`;

  renderMapBusinessList();
  updateRouteLine();

  if (interactiveMap && shouldPan) {
    interactiveMap.setView([place.lat, place.lng], 16);
    const marker = mapMarkers.get(place.id);
    if (marker) marker.openPopup();
  }

  mapMarkers.forEach((marker, id) => {
    const element = marker.getElement();
    if (element) element.classList.toggle("selected", id === place.id);
  });
}

function initInteractiveMap() {
  const mapElement = document.querySelector("#realMap");
  const status = document.querySelector("#mapStatus");
  if (!mapElement || !status) return;

  if (!window.L) {
    mapElement.classList.add("map-offline");
    status.textContent = "Mappa online non disponibile: controlla la connessione o usa Avvia navigazione per aprire Google Maps.";
    selectMapPlace(selectedPlace.id, false);
    return;
  }

  if (interactiveMap) {
    interactiveMap.invalidateSize();
    const cached = cachedOsmPlaces();
    if (cached.length && !realPlacesLoaded) {
      applyImportedPlaces(cached.slice(0, MAX_REAL_PLACES), `${Math.min(cached.length, MAX_REAL_PLACES)} attivita caricate dalla cache locale.`);
    }
    return;
  }

  interactiveMap = L.map("realMap", {
    zoomControl: false,
    scrollWheelZoom: true
  }).setView([AVEZZANO_CENTER.lat, AVEZZANO_CENTER.lng], 14);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    subdomains: "abcd",
    maxZoom: 20,
    attribution: "&copy; OpenStreetMap &copy; CARTO"
  }).addTo(interactiveMap);

  L.control.zoom({ position: "topright" }).addTo(interactiveMap);

  rebuildMapMarkers();

  selectMapPlace(selectedPlace.id, false);
  const cached = cachedOsmPlaces();
  if (cached.length) {
    applyImportedPlaces(cached.slice(0, MAX_REAL_PLACES), `${Math.min(cached.length, MAX_REAL_PLACES)} attivita caricate dalla cache locale. Usa "Importa attivita reali" per aggiornare.`);
  } else {
    status.textContent = "Demo veloce attiva. Usa Importa attivita reali per aggiornare da OpenStreetMap.";
  }
  setTimeout(() => interactiveMap.invalidateSize(), 80);
}

function switchView(view, updateHash = true) {
  if (view === "admin" && !isAdmin()) {
    showToast("Area admin riservata. Accedi come amministratore.", "error");
    openSignup("login");
    return;
  }

  const targetView = document.querySelector(`#${view}View`);
  if (!targetView) return;

  document.body.classList.forEach((className) => {
    if (className.startsWith("view-")) document.body.classList.remove(className);
  });
  document.body.classList.add(`view-${view}`);
  document.querySelectorAll(".view").forEach((el) => el.classList.remove("active"));
  targetView.classList.add("active");
  document.querySelectorAll(".nav-item").forEach((item) => {
    const isActive = item.dataset.view === view;
    item.classList.toggle("active", isActive);
    item.toggleAttribute("aria-current", isActive);
  });
  document.querySelectorAll(".bottom-nav-item").forEach((item) => {
    const isActive = item.dataset.view === view;
    item.classList.toggle("active", isActive);
    item.toggleAttribute("aria-current", isActive);
  });
  const meta = pageMeta[view] || pageMeta.feed;
  const signature = citySignatures[view] || citySignatures.feed;
  document.querySelector("#pageEyebrow").textContent = meta.eyebrow;
  document.querySelector("#pageTitle").textContent = meta.title;
  document.querySelector("#pageCopy").textContent = meta.copy;
  document.querySelector("#pageCode").textContent = signature[0];
  document.querySelector("#pageCoords").textContent = signature[1];
  document.querySelector("#pageArtifact").textContent = signature[2];
  document.querySelector("#pagePulse").textContent = signature[3];
  hydrateLazyMedia(targetView, true);
  applySearchFilter();

  if (updateHash && window.location.hash !== `#${view}`) {
    history.replaceState(null, "", `#${view}`);
  }

  if (view === "map") {
    setTimeout(initInteractiveMap, 80);
  }

  if (view === "profile") {
    renderUserProfile();
  }

  if (view === "admin") {
    renderAdminDashboard();
  }

  if (view === "legal") {
    renderLegalPanel();
  }

  stampCityArtifacts(targetView);
  animateActiveView(targetView);
  closeMobileMenu();
}

function animateActiveView(scope = document.querySelector(".view.active")) {
  if (!scope || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const animatedItems = scope.querySelectorAll(`
    .topbar,
    .shortcut-card,
    .post,
    .panel,
    .profile-card,
    .tonight-card,
    .event-chip,
    .event-card,
    .coupon-card,
    .reward-card,
    .summer-card,
    .destination-item,
    .map-panel,
    .map-card,
    .profile-detail-panel,
    .profile-action-card,
    .legal-card,
    .legal-tab,
    .merchant-pricing-hero,
    .pricing-card,
    .admin-hero,
    .signup-panel,
    .demo-panel
  `);

  animatedItems.forEach((item, index) => {
    item.classList.remove("motion-ready", "motion-item");
    item.style.setProperty("--stagger", Math.min(index, 16));
    window.requestAnimationFrame(() => {
      item.classList.add("motion-item");
      window.setTimeout(() => item.classList.add("motion-ready"), 620 + Math.min(index, 16) * 42);
    });
  });
}

function animateGlobalSurfaces() {
  animateActiveView();
  const topbar = document.querySelector(".topbar");
  if (topbar) {
    topbar.classList.remove("motion-ready", "motion-item");
    topbar.style.setProperty("--stagger", 0);
    window.requestAnimationFrame(() => topbar.classList.add("motion-item"));
  }
}

function preferredTheme() {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme = preferredTheme()) {
  const isDark = theme === "dark";
  document.body.classList.toggle("theme-dark", isDark);
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#07111f" : "#f7f8fb");
  const toggle = document.querySelector("#themeToggle");
  const label = document.querySelector("#themeToggleLabel");
  if (toggle) {
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Attiva tema giorno" : "Attiva tema notturno");
  }
  if (label) label.textContent = isDark ? "Giorno" : "Notte";
}

function toggleTheme() {
  const nextTheme = document.body.classList.contains("theme-dark") ? "light" : "dark";
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  if (!prefersReducedMotion) {
    clearTimeout(themeTransitionTimer);
    document.body.classList.remove("theme-transition", "theme-to-dark", "theme-to-light", "theme-transitioning", "sunset-transition", "sunrise-transition", "night-entering", "day-entering");
    document.body.offsetHeight;
    document.body.classList.add(
      "theme-transition",
      "theme-transitioning",
      nextTheme === "dark" ? "theme-to-dark" : "theme-to-light",
      nextTheme === "dark" ? "sunset-transition" : "sunrise-transition",
      nextTheme === "dark" ? "night-entering" : "day-entering"
    );
    themeTransitionTimer = window.setTimeout(() => {
      document.body.classList.remove("theme-transition", "theme-to-dark", "theme-to-light", "theme-transitioning", "sunset-transition", "sunrise-transition", "night-entering", "day-entering");
    }, 1450);
  }
  applyTheme(nextTheme);
  updateAtmosphereForTheme();
  showToast(nextTheme === "dark" ? "Tema notturno attivato." : "Tema giorno attivato.", "success");
}

function respectsReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clearAtmosphereTimers() {
  atmosphereTimers.forEach((timer) => clearTimeout(timer));
  atmosphereTimers.clear();
}

function scheduleAtmosphere(callback, minDelay = 18000, maxDelay = 36000) {
  if (atmospherePaused || respectsReducedMotion()) return;
  const delay = minDelay + Math.random() * (maxDelay - minDelay);
  const timer = window.setTimeout(() => {
    atmosphereTimers.delete(timer);
    callback();
  }, delay);
  atmosphereTimers.add(timer);
}

function atmosphereRoot() {
  return document.querySelector("#atmosphereFx");
}

function spawnSwallow() {
  const root = atmosphereRoot();
  if (!root || document.body.classList.contains("theme-dark") || atmospherePaused || respectsReducedMotion()) {
    scheduleSwallow();
    return;
  }
  const bird = document.createElement("span");
  bird.className = "fx-swallow";
  bird.style.setProperty("--fly-y", `${9 + Math.random() * 13}vh`);
  bird.style.setProperty("--fly-duration", `${17 + Math.random() * 8}s`);
  bird.style.setProperty("--fly-scale", `${0.56 + Math.random() * 0.22}`);
  root.appendChild(bird);
  bird.addEventListener("animationend", () => bird.remove(), { once: true });
  scheduleSwallow();
}

function scheduleSwallow(initial = false) {
  scheduleAtmosphere(spawnSwallow, initial ? 2600 : 22000, initial ? 6400 : 46000);
}

function spawnShootingStar() {
  const root = atmosphereRoot();
  if (!root || !document.body.classList.contains("theme-dark") || atmospherePaused || respectsReducedMotion()) {
    scheduleShootingStar();
    return;
  }
  const star = document.createElement("span");
  star.className = "fx-shooting-star";
  star.style.setProperty("--star-x", `${52 + Math.random() * 32}vw`);
  star.style.setProperty("--star-y", `${9 + Math.random() * 18}vh`);
  star.style.setProperty("--star-duration", `${1.05 + Math.random() * 0.5}s`);
  root.appendChild(star);
  star.addEventListener("animationend", () => star.remove(), { once: true });
  scheduleShootingStar();
}

function scheduleShootingStar(initial = false) {
  scheduleAtmosphere(spawnShootingStar, initial ? 3400 : 26000, initial ? 9000 : 52000);
}

function updateAtmosphereForTheme() {
  clearAtmosphereTimers();
  if (atmospherePaused || respectsReducedMotion()) {
    document.body.classList.add("fx-paused");
    return;
  }
  document.body.classList.remove("fx-paused");
  if (document.body.classList.contains("theme-dark")) scheduleShootingStar(true);
  else scheduleSwallow(true);
}

function pauseFXWhenHidden() {
  document.addEventListener("visibilitychange", () => {
    atmospherePaused = document.hidden;
    document.body.classList.toggle("fx-paused", atmospherePaused);
    if (atmospherePaused) {
      clearAtmosphereTimers();
      document.querySelectorAll(".fx-swallow, .fx-shooting-star").forEach((item) => item.remove());
    } else {
      updateAtmosphereForTheme();
    }
  });
}

function initAtmosphereFX() {
  const root = atmosphereRoot();
  if (!root) return;
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionQuery.addEventListener?.("change", updateAtmosphereForTheme);
  pauseFXWhenHidden();
  updateAtmosphereForTheme();
}

function initHeroMicroParallax() {
  const topbar = document.querySelector(".topbar");
  if (!topbar || respectsReducedMotion()) return;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!canHover) return;
  window.addEventListener("pointermove", (event) => {
    const x = ((event.clientX / window.innerWidth) - 0.5) * 8;
    const y = ((event.clientY / window.innerHeight) - 0.5) * 5;
    topbar.style.setProperty("--hero-parallax-x", `${x.toFixed(2)}px`);
    topbar.style.setProperty("--hero-parallax-y", `${y.toFixed(2)}px`);
  }, { passive: true });
}

function initScrollAtmosphere() {
  const update = () => {
    document.body.classList.toggle("is-scrolled", window.scrollY > 18);
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initSearchPlaceholderCycle() {
  const input = document.querySelector("#searchInput");
  if (!input) return;
  let index = 0;
  clearInterval(searchPlaceholderTimer);
  searchPlaceholderTimer = window.setInterval(() => {
    if (document.hidden || input.value || document.activeElement === input) return;
    index = (index + 1) % searchPlaceholders.length;
    input.setAttribute("placeholder", searchPlaceholders[index]);
  }, 7200);
}

function stampCityArtifacts(scope = document) {
  const items = scope.querySelectorAll(".post, .event-card, .coupon-card, .reward-card, .summer-card, .destination-item, .profile-action-card, .pricing-card");
  items.forEach((item, index) => {
    item.style.setProperty("--artifact-index", `"${String(index + 1).padStart(2, "0")}"`);
  });
}

function setMobileMenu(open) {
  const toggle = document.querySelector("#mobileMenuToggle");
  const backdrop = document.querySelector("#mobileMenuBackdrop");
  if (open && backdrop) backdrop.hidden = false;
  window.requestAnimationFrame(() => {
    document.body.classList.toggle("menu-open", open);
  });
  if (toggle) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Chiudi menu" : "Apri menu");
  }
  if (!open && backdrop) {
    window.setTimeout(() => {
      if (!document.body.classList.contains("menu-open")) backdrop.hidden = true;
    }, 180);
  }
}

function closeMobileMenu() {
  setMobileMenu(false);
}

document.querySelector("#mobileMenuToggle")?.addEventListener("click", () => {
  setMobileMenu(!document.body.classList.contains("menu-open"));
});

document.querySelector("#mobileMenuBackdrop")?.addEventListener("click", closeMobileMenu);

document.querySelector("#mainNav").addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (button) switchView(button.dataset.view);
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-view-target]");
  if (button) switchView(button.dataset.viewTarget);
});

function findPlaceByName(name) {
  const lower = name.toLowerCase();
  return mapPlaces.find((place) => place.name.toLowerCase().includes(lower) || lower.includes(place.name.toLowerCase()));
}

function handleAction(button) {
  const action = button.dataset.action;
  if (!action) return;

  if (action === "open-onboarding") {
    openOnboarding(true);
    return;
  }

  if (action === "install-app") {
    if (!installPromptEvent) {
      showToast("Installa MyAvezzano dal menu del browser o aggiungila alla schermata Home.", "success");
      return;
    }
    installPromptEvent.prompt();
    installPromptEvent.userChoice.finally(() => {
      installPromptEvent = null;
    });
    return;
  }

  if (action === "notifications") {
    toggleNotificationMenu();
    return;
  }

  if (action === "filter-nearby") {
    mapPlaces = [...mapPlaces].sort((a, b) => distanceInKm(AVEZZANO_CENTER, a) - distanceInKm(AVEZZANO_CENTER, b));
    renderNearbyList();
    showToast("Lista vicina a te ordinata per distanza dal centro di Avezzano.");
    return;
  }

  if (action === "create-reminder") {
    const total = addDemoItem("reminders", { title: "Reminder eventi di stasera" });
    renderDayPlan();
    showToast(`Reminder attivato. Totale reminder: ${total}.`, "success");
    switchView("profile");
    renderProfilePanel("events");
    return;
  }

  if (action === "calendar-month") {
    showToast("Vista mensile demo: 3 eventi questa settimana e 8 nel mese.");
    return;
  }

  if (action === "scan-qr") {
    const total = addDemoItem("couponRedemptions", { title: "QR demo scansionato" });
    showToast(`QR demo letto correttamente. Scansioni salvate: ${total}.`, "success");
    return;
  }

  if (action === "highlight-primary") {
    const title = button.dataset.title;
    const type = button.dataset.type || "";
    if (type.includes("Sconto") || type.includes("Shopping")) {
      addDemoItem("coupons", { title });
      showToast(`Coupon salvato: ${title}.`, "success");
      switchView("coupons");
      return;
    }
    addDemoItem("events", { title });
    showToast(`Prenotazione demo salvata: ${title}.`, "success");
    switchView("profile");
    renderProfilePanel("events");
    return;
  }

  if (action === "save-highlight") {
    const title = button.dataset.title;
    const type = button.dataset.type || "Elemento";
    const key = type.includes("Sconto") || type.includes("Shopping") ? "coupons" : "saved";
    addDemoItem(key, { title, type });
    button.textContent = "Salvato";
    button.classList.add("is-saved");
    renderDayPlan();
    showToast(`Salvato: ${title}.`, "success");
    return;
  }

  if (action === "open-map-place") {
    const place = findPlaceByName(button.dataset.place || "");
    switchView("map");
    setTimeout(() => {
      if (place) selectMapPlace(place.id);
      showToast(place ? `Mappa aperta su ${place.name}.` : "Mappa aperta. Seleziona una destinazione.");
    }, 120);
    return;
  }

  if (action === "event-category") {
    document.querySelectorAll(".event-chip").forEach((chip) => chip.classList.toggle("active", chip === button));
    showToast(`Filtro eventi attivo: ${button.dataset.category}.`);
    return;
  }

  if (action === "book-event") {
    const total = addDemoItem("events", { title: button.dataset.title });
    button.textContent = "Prenotato";
    renderDayPlan();
    showToast(`Evento prenotato. Totale eventi salvati: ${total}.`, "success");
    return;
  }

  if (action === "save-event") {
    addDemoItem("events", { title: button.dataset.title });
    button.textContent = "Salvato";
    button.classList.add("is-saved");
    renderDayPlan();
    showToast(`Evento salvato: ${button.dataset.title}.`, "success");
    return;
  }

  if (action === "redeem-reward") {
    const total = addDemoItem("rewards", { title: button.dataset.title });
    button.textContent = "Richiesto";
    showToast(`Premio richiesto: ${button.dataset.title}. Richieste: ${total}.`, "success");
    return;
  }

  if (action === "toggle-preference") {
    button.classList.toggle("active");
    showToast(`Preferenza ${button.textContent.trim()} ${button.classList.contains("active") ? "attivata" : "disattivata"}.`);
    return;
  }

  if (action === "upload-media") {
    showToast("Upload demo pronto: in produzione aprira galleria/camera.");
    return;
  }

  if (action === "create-coupon") {
    addDemoItem("merchantCoupons", { title: "Nuovo coupon QR demo" });
    showToast("Coupon QR demo creato e aggiunto alla campagna.", "success");
    return;
  }

  if (action === "new-campaign") {
    addDemoItem("campaigns", { title: "Nuova campagna demo" });
    showToast("Nuova campagna demo creata.", "success");
    return;
  }

  if (action === "summer-plan") {
    const total = addDemoItem("summerPlans", { title: "Itinerario Estate 2026" });
    showToast(`Itinerario Estate 2026 creato. Totale: ${total}.`, "success");
    switchView("map");
  }
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  handleAction(button);
});

document.querySelector("#closeOnboarding").addEventListener("click", () => {
  closeOnboarding(true);
});

document.querySelector("#skipOnboarding").addEventListener("click", () => {
  closeOnboarding(true);
  showToast("Demo guidata completata. Puoi riaprirla da Guida o dal profilo.");
});

document.querySelector("#prevOnboarding").addEventListener("click", () => {
  if (onboardingIndex === 0) return;
  onboardingIndex -= 1;
  renderOnboardingStep();
});

document.querySelector("#nextOnboarding").addEventListener("click", () => {
  if (onboardingIndex === onboardingSteps.length - 1) {
    closeOnboarding(true);
    showToast("Perfetto, MyAvezzano e pronto da esplorare.", "success");
    return;
  }
  onboardingIndex += 1;
  renderOnboardingStep();
});

document.querySelector("#onboardingDots").addEventListener("click", (event) => {
  const dot = event.target.closest("[data-onboarding-step]");
  if (!dot) return;
  onboardingIndex = Number(dot.dataset.onboardingStep);
  renderOnboardingStep();
});

document.querySelector("#onboardingOverlay").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) closeOnboarding(true);
});

document.addEventListener("keydown", (event) => {
  const overlay = document.querySelector("#onboardingOverlay");
  if (event.key === "Escape" && overlay.classList.contains("active")) {
    closeOnboarding(true);
  }
  if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
    closeMobileMenu();
  }
});

document.querySelector("#mapBusinessList").addEventListener("click", (event) => {
  const item = event.target.closest("[data-place-id]");
  if (item) selectMapPlace(item.dataset.placeId);
});

document.querySelector("#useLocation").addEventListener("click", () => {
  const status = document.querySelector("#mapStatus");
  if (!navigator.geolocation) {
    status.textContent = "Geolocalizzazione non disponibile su questo browser.";
    return;
  }

  status.textContent = "Richiesta posizione in corso...";
  navigator.geolocation.getCurrentPosition(
    (position) => {
      userPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      if (interactiveMap && window.L) {
        if (userMarker) userMarker.remove();
        userMarker = L.circleMarker([userPosition.lat, userPosition.lng], {
          radius: 10,
          color: "#ffffff",
          weight: 4,
          fillColor: "#007aff",
          fillOpacity: 1
        }).addTo(interactiveMap).bindPopup("La tua posizione");

        interactiveMap.fitBounds(
          [[userPosition.lat, userPosition.lng], [selectedPlace.lat, selectedPlace.lng]],
          { padding: [52, 52], maxZoom: 16 }
        );
      }

      selectMapPlace(selectedPlace.id, false);
    },
    () => {
      status.textContent = "Posizione non autorizzata. Puoi comunque avviare la navigazione verso la destinazione selezionata.";
    },
    { enableHighAccuracy: true, timeout: 9000, maximumAge: 60000 }
  );
});

document.querySelector("#recenterMap").addEventListener("click", () => {
  if (interactiveMap) {
    interactiveMap.setView([AVEZZANO_CENTER.lat, AVEZZANO_CENTER.lng], 14);
  }
  document.querySelector("#mapStatus").textContent = "Mappa centrata sul centro di Avezzano.";
});

document.querySelector("#importRealBusinesses").addEventListener("click", () => {
  loadRealAvezzanoBusinesses(true);
});

function applySearchFilter() {
  const searchInput = document.querySelector("#searchInput");
  const clearSearch = document.querySelector("#clearSearch");
  const searchStatus = document.querySelector("#searchStatus");
  const term = searchInput.value.trim().toLowerCase();
  const intents = intelligenceIntent(term);
  const searchable = document.querySelectorAll(".post, .tonight-card, .event-card, .coupon-card, .reward-card, .summer-card, .destination-item");
  searchable.forEach((item) => {
    const haystack = `${item.dataset.search || ""} ${item.textContent}`.toLowerCase();
    const relatedPlace = item.dataset.placeId ? mapPlaces.find((place) => place.id === item.dataset.placeId) : null;
    const semanticMatch = relatedPlace ? placeMatchesIntent(relatedPlace, intents) : intents.some((intent) => {
      if (intent === "food") return /ristorante|pizzeria|aperitivo|cena|pranzo/.test(haystack);
      if (intent === "shopping") return /shopping|abbigliamento|negozi|coupon/.test(haystack);
      if (intent === "night") return /stasera|evento|serata|live|discoteca/.test(haystack);
      if (intent === "fitness") return /palestra|fitness|sport/.test(haystack);
      if (intent === "deals") return /coupon|sconto|offerta/.test(haystack);
      return false;
    });
    item.hidden = Boolean(term) && !haystack.includes(term) && !semanticMatch;
  });

  if (clearSearch) clearSearch.hidden = !term;

  if (searchStatus) {
    const activeView = document.querySelector(".view.active");
    const activeResults = [...activeView.querySelectorAll(".post, .tonight-card, .event-card, .coupon-card, .reward-card, .summer-card, .destination-item")]
      .filter((item) => !item.hidden);
    searchStatus.hidden = !term;
    searchStatus.classList.toggle("is-empty", Boolean(term) && activeResults.length === 0);
    searchStatus.textContent = activeResults.length
      ? `${activeResults.length} risultati per "${searchInput.value.trim()}"`
      : `Non ho trovato nulla per "${searchInput.value.trim()}". Prova con una categoria o un luogo vicino.`;
  }

  if (term && document.querySelector("#feedView").classList.contains("active")) {
    const bestPlace = intelligentPlaces(term, 1)[0] || findPlaceByName(term);
    if (bestPlace) {
      document.querySelector("#navigationLink").href = navigationUrl(bestPlace);
    }
  }
}

document.querySelector("#searchInput").addEventListener("input", () => {
  applySearchFilter();
});

document.addEventListener("click", (event) => {
  const quickSearch = event.target.closest("[data-search-term]");
  if (!quickSearch) return;
  const searchInput = document.querySelector("#searchInput");
  searchInput.value = quickSearch.dataset.searchTerm;
  if (!document.querySelector("#feedView").classList.contains("active")) switchView("feed");
  applySearchFilter();
  searchInput.focus();
  showToast(`Ricerca rapida: ${quickSearch.dataset.searchTerm}`, "success");
});

document.querySelector("#clearSearch").addEventListener("click", () => {
  const searchInput = document.querySelector("#searchInput");
  searchInput.value = "";
  applySearchFilter();
  searchInput.focus();
});

document.addEventListener("click", (event) => {
  const legalTarget = event.target.closest("[data-legal-target]");
  if (!legalTarget) return;
  renderLegalPanel(legalTarget.dataset.legalTarget);
});

document.querySelector(".legal-menu")?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-legal-tab]");
  if (!button) return;
  renderLegalPanel(button.dataset.legalTab);
});

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-admin-action]");
  if (!action) return;
  handleAdminAction(action);
});

document.addEventListener("submit", (event) => {
  if (event.target.id !== "profileEditForm") return;
  event.preventDefault();
  const current = getStoredUser();
  if (!current) return;
  const users = getUsers();
  const user = users.find((item) => item.id === current.id);
  if (!user) return;
  const form = new FormData(event.target);
  const nextEmail = String(form.get("email")).trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
    showToast("Email profilo non valida.", "error");
    return;
  }
  if (users.some((item) => item.id !== user.id && item.email.toLowerCase() === nextEmail)) {
    showToast("Questa email e gia usata da un altro account.", "error");
    return;
  }
  user.name = String(form.get("name")).trim();
  user.surname = String(form.get("surname")).trim();
  user.email = nextEmail;
  user.phone = String(form.get("phone")).trim();
  saveUsers(users);
  persistSession(user);
  showToast("Profilo aggiornato.", "success");
  renderUserProfile("settings");
});

document.querySelector("#publishDemo").addEventListener("click", () => {
  const button = document.querySelector("#publishDemo");
  addDemoItem("merchantPosts", { title: "Nuovo contenuto commerciante" });
  button.textContent = "Pubblicato";
  showToast("Contenuto demo pubblicato nella dashboard commerciante.", "success");
  setTimeout(() => { button.textContent = "Pubblica"; }, 1600);
});

function merchantNotificationDraft() {
  const title = document.querySelector("#merchantNotificationTitle")?.value.trim() || "";
  const body = document.querySelector("#merchantNotificationBody")?.value.trim() || "";
  const target = document.querySelector("#merchantNotificationTarget")?.value || "nearby";
  return { title, body, target };
}

function validateMerchantNotificationDraft({ title, body }) {
  if (title.length < 4) return "Inserisci un titolo di almeno 4 caratteri.";
  if (body.length < 12) return "Inserisci un messaggio di almeno 12 caratteri.";
  const blocked = findBlockedWords(`${title} ${body}`);
  if (blocked.length) return `Messaggio bloccato: contiene linguaggio offensivo (${blocked.join(", ")}).`;
  return "";
}

document.querySelector("#previewMerchantNotification")?.addEventListener("click", () => {
  const subscription = getMerchantSubscription();
  if (!isGoldMerchant(subscription)) {
    setMerchantNotificationFeedback("Serve un account Gold per usare le notifiche promozionali.", "error");
    return;
  }
  const draft = merchantNotificationDraft();
  const error = validateMerchantNotificationDraft(draft);
  if (error) {
    setMerchantNotificationFeedback(error, "error");
    return;
  }
  showToast(`${draft.title}: ${draft.body}`, "success");
  setMerchantNotificationFeedback("Anteprima pulita: nessuna parola bloccata trovata.", "success");
});

document.querySelector("#sendMerchantNotification")?.addEventListener("click", async () => {
  const user = getStoredUser();
  const subscription = getMerchantSubscription();
  if (!user || !subscription || subscription.userId !== user.id) {
    setMerchantNotificationFeedback("Accedi con l'account commerciante per inviare notifiche.", "error");
    openSignup("login");
    return;
  }
  if (!isGoldMerchant(subscription)) {
    setMerchantNotificationFeedback("Funzione riservata agli account Gold.", "error");
    return;
  }

  const draft = merchantNotificationDraft();
  const error = validateMerchantNotificationDraft(draft);
  if (error) {
    setMerchantNotificationFeedback(error, "error");
    return;
  }

  const channel = await maybeSendBrowserNotification(draft.title, draft.body);
  const notification = {
    id: randomId("notification"),
    merchantId: user.id,
    businessName: subscription.businessName,
    title: draft.title,
    body: draft.body,
    target: draft.target,
    targetLabel: targetLabel(draft.target),
    channel,
    status: channel === "browser" ? "Inviata" : "Web app",
    createdAt: new Date().toLocaleString("it-IT")
  };
  const notifications = getMerchantNotifications();
  notifications.push(notification);
  saveMerchantNotifications(notifications);
  addDemoItem("merchantNotifications", { title: draft.title, type: notification.targetLabel });
  renderMerchantNotificationLog();
  setMerchantNotificationFeedback(`Notifica approvata e inviata via ${channel === "browser" ? "browser" : "web app demo"}.`, "success");
  showToast(`Promo Gold inviata: ${draft.title}`, "success");
});

const authOverlay = document.querySelector("#authOverlay");
const openSignupButtons = [document.querySelector("#openSignup"), document.querySelector("#openSignupMini")];
const AUTH_STORAGE_KEY = "myavezzano_user";
const USERS_STORAGE_KEY = "myavezzano_users_v1";
const RESET_STORAGE_KEY = "myavezzano_password_resets_v1";
const MERCHANT_STORAGE_KEY = "myavezzano_merchant_subscription";
const MERCHANT_NOTIFICATIONS_KEY = "myavezzano_merchant_notifications_v1";
const authFeedback = document.querySelector("#authFeedback");
const signupCopy = document.querySelector("#signupCopy");
const phoneField = document.querySelector("#phoneField");
const signupName = document.querySelector("#signupName");
const signupSurname = document.querySelector("#signupSurname");
const signupEmail = document.querySelector("#signupEmail");
const signupPassword = document.querySelector("#signupPassword");
const signupPasswordConfirm = document.querySelector("#signupPasswordConfirm");
const signupPhone = document.querySelector("#signupPhone");
const acceptLegal = document.querySelector("#acceptLegal");
const createAccountButton = document.querySelector("#createAccount");
const loginAccountButton = document.querySelector("#loginAccount");
const recoverPasswordButton = document.querySelector("#recoverPassword");
const logoutAccountButton = document.querySelector("#logoutAccount");
const merchantCheckout = document.querySelector("#merchantCheckout");
const merchantCheckoutFeedback = document.querySelector("#merchantCheckoutFeedback");
const merchantNotificationFeedback = document.querySelector("#merchantNotificationFeedback");
let selectedMerchantPlan = { plan: "Starter", price: "12,99" };
let authMode = "register";

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getUsers() {
  return readJson(USERS_STORAGE_KEY, []);
}

function saveUsers(users) {
  writeJson(USERS_STORAGE_KEY, users);
}

function publicUser(user) {
  if (!user) return null;
  const { passwordHash, passwordSalt, ...safeUser } = user;
  return safeUser;
}

function randomId(prefix = "id") {
  return `${prefix}-${crypto.randomUUID ? crypto.randomUUID() : Date.now()}`;
}

async function sha256(value) {
  const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function hashPassword(password, salt = randomId("salt")) {
  return { salt, hash: await sha256(`${salt}:${password}`) };
}

async function seedAdminUser() {
  const users = getUsers();
  if (users.some((user) => user.role === "admin")) return;
  const password = await hashPassword("Admin123!");
  users.push({
    id: "admin-demo",
    name: "Admin",
    surname: "MyAvezzano",
    email: "admin@myavezzano.it",
    phone: "",
    role: "admin",
    provider: "Email",
    passwordHash: password.hash,
    passwordSalt: password.salt,
    acceptedLegalAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    status: "active"
  });
  saveUsers(users);
}

function persistSession(user) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(publicUser(user)));
}

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
  } catch {
    return null;
  }
}

function saveUser(user) {
  const users = getUsers();
  const index = users.findIndex((item) => item.id === user.id);
  if (index >= 0) {
    users[index] = { ...users[index], ...user };
    saveUsers(users);
    persistSession(users[index]);
  } else {
    persistSession(user);
  }
}

function getMerchantSubscription() {
  try {
    return JSON.parse(localStorage.getItem(MERCHANT_STORAGE_KEY));
  } catch {
    return null;
  }
}

function saveMerchantSubscription(subscription) {
  localStorage.setItem(MERCHANT_STORAGE_KEY, JSON.stringify(subscription));
}

const profanityDictionary = [
  "cazzo", "cazz", "merda", "stronzo", "stronza", "vaffanculo", "fanculo",
  "puttana", "troia", "bastardo", "bastarda", "coglione", "coglioni",
  "cretino", "deficiente", "porco", "schifo"
];

function normalizeModerationText(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[0@]/g, "o")
    .replace(/[1!|]/g, "i")
    .replace(/[3]/g, "e")
    .replace(/[4]/g, "a")
    .replace(/[5$]/g, "s")
    .replace(/[^a-z0-9]+/g, " ");
}

function findBlockedWords(value = "") {
  const normalized = normalizeModerationText(value);
  return profanityDictionary.filter((word) => new RegExp(`\\b${word}\\b`, "i").test(normalized));
}

function isGoldMerchant(subscription) {
  return subscription?.plan === "Gold" || subscription?.plan === "Premium";
}

function getMerchantNotifications() {
  return readJson(MERCHANT_NOTIFICATIONS_KEY, []);
}

function saveMerchantNotifications(notifications) {
  writeJson(MERCHANT_NOTIFICATIONS_KEY, notifications);
}

function setMerchantNotificationFeedback(message, type = "info") {
  if (!merchantNotificationFeedback) return;
  merchantNotificationFeedback.textContent = message;
  merchantNotificationFeedback.className = `auth-feedback ${type}`;
}

function renderMerchantNotificationLog() {
  const log = document.querySelector("#merchantNotificationLog");
  if (!log) return;
  const notifications = getMerchantNotifications().slice(-4).reverse();
  log.innerHTML = notifications.length ? notifications.map((item) => `
    <div class="notification-log-item">
      <div>
        <strong>${item.title}</strong>
        <span>${item.targetLabel} - ${item.createdAt}</span>
      </div>
      <span class="pill success">${item.status}</span>
    </div>
  `).join("") : `<p class="muted">Nessuna notifica Gold inviata in questa demo.</p>`;
}

function targetLabel(value) {
  return {
    nearby: "Utenti vicino al negozio",
    saved: "Utenti coupon",
    events: "Utenti eventi",
    all: "Tutti gli utenti demo"
  }[value] || "Utenti demo";
}

async function maybeSendBrowserNotification(title, body) {
  if (!("Notification" in window)) return "web-app";
  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }
  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "assets/app-icon.svg",
      tag: `myavezzano-merchant-${Date.now()}`
    });
    return "browser";
  }
  return "web-app";
}

function setFeedback(message, type = "info") {
  authFeedback.textContent = message;
  authFeedback.className = `auth-feedback ${type}`;
}

function setMerchantFeedback(message, type = "info") {
  merchantCheckoutFeedback.textContent = message;
  merchantCheckoutFeedback.className = `auth-feedback ${type}`;
}

function closeSignup() {
  authOverlay.classList.remove("active");
  authOverlay.setAttribute("aria-hidden", "true");
}

function setAuthMode(mode) {
  authMode = mode;
  const user = getStoredUser();
  document.querySelector("#showRegisterMode").classList.toggle("active", mode === "register");
  document.querySelector("#showLoginMode").classList.toggle("active", mode === "login");
  document.querySelector("#signupTitle").textContent = mode === "login" ? "Accedi a MyAvezzano" : "Registrati a MyAvezzano";
  signupCopy.textContent = mode === "login"
    ? "Accedi con email e password per continuare."
    : "Crea il tuo account per salvare eventi, coupon, nuove aperture e reminder cittadini.";
  document.querySelectorAll(".register-only").forEach((item) => { item.hidden = mode === "login" || Boolean(user); });
  document.querySelector("#socialSignupActions").hidden = mode === "login" || Boolean(user);
  document.querySelector("#authDivider").hidden = mode === "login" || Boolean(user);
  createAccountButton.hidden = mode !== "register" || Boolean(user);
  loginAccountButton.hidden = mode !== "login" || Boolean(user);
  recoverPasswordButton.hidden = mode !== "login" || Boolean(user);
  signupName.closest(".field").hidden = mode === "login" || Boolean(user);
  phoneField.hidden = true;
}

function openSignup(mode = "register") {
  const user = getStoredUser();
  authOverlay.classList.add("active");
  authOverlay.setAttribute("aria-hidden", "false");
  setFeedback(user ? `Accesso attivo come ${user.name}.` : "");
  setAuthMode(user ? "login" : mode);
  updateAuthUi();
  animateActiveView(authOverlay);
}

function updateAuthUi() {
  const user = getStoredUser();
  const accountLabel = user ? "Account" : "Entra";
  const miniLabel = user ? "Account" : "Accedi";

  document.querySelector("#openSignup").textContent = accountLabel;
  document.querySelector("#openSignupMini").textContent = miniLabel;
  signupCopy.textContent = user
    ? `Ciao ${user.name}, il tuo account ${user.role === "admin" ? "admin" : "utente"} e attivo.`
    : "Crea il tuo account per salvare eventi, coupon, nuove aperture e reminder cittadini.";

  logoutAccountButton.hidden = !user;
  document.querySelectorAll(".field, .legal-check, .signup-actions, .divider, #createAccount, #loginAccount, #recoverPassword").forEach((item) => {
    item.hidden = Boolean(user) || item.hidden;
  });
  if (!user) setAuthMode(authMode);
  renderUserProfile("settings");
  renderMerchantArea();
  renderAdminDashboard();
}

async function completeRegistration(provider, details = {}) {
  const name = details.name || provider;
  const email = (details.email || "").toLowerCase();
  const users = getUsers();
  const existing = email ? users.find((user) => user.email.toLowerCase() === email) : null;
  if (existing) {
    persistSession(existing);
    setFeedback(`Accesso completato come ${existing.name}.`, "success");
    updateAuthUi();
    setTimeout(closeSignup, 700);
    return;
  }
  const user = {
    id: randomId("user"),
    name,
    surname: details.surname || "",
    email,
    phone: details.phone || "",
    role: "user",
    provider,
    acceptedLegalAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    status: "active"
  };
  users.push(user);
  saveUsers(users);

  persistSession(user);
  setFeedback(`Registrazione completata con ${provider}. Benvenuto, ${name}.`, "success");
  updateAuthUi();
  setTimeout(closeSignup, 900);
  maybeStartOnboarding(1100);
}

openSignupButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (getStoredUser()) {
      switchView("profile");
      return;
    }
    openSignup();
  });
});

document.querySelector("#topProfileStatus")?.addEventListener("click", () => {
  if (getStoredUser()) {
    switchView("profile");
    renderProfilePanel("settings");
    closeNotificationMenu();
    return;
  }
  openSignup("login");
});

document.querySelector("#closeNotificationMenu")?.addEventListener("click", closeNotificationMenu);

document.querySelector("#notificationMenu")?.addEventListener("click", (event) => {
  const item = event.target.closest("[data-notification-open]");
  if (!item) return;
  closeNotificationMenu();
  if (item.classList.contains("coupon")) switchView("coupons");
  else if (item.classList.contains("event")) switchView("events");
  else switchView(getStoredUser() ? "profile" : "feed");
});

document.addEventListener("click", (event) => {
  const menu = document.querySelector("#notificationMenu");
  if (!menu || menu.hasAttribute("hidden")) return;
  if (event.target.closest("#notificationMenu") || event.target.closest("#notificationButton")) return;
  closeNotificationMenu();
});

document.querySelector("#closeSignup").addEventListener("click", () => {
  closeSignup();
});

authOverlay.addEventListener("click", (event) => {
  if (event.target === authOverlay) {
    closeSignup();
  }
});

document.querySelectorAll("[data-auth-provider]").forEach((button) => {
  button.addEventListener("click", () => {
    completeRegistration(button.dataset.authProvider, {
      name: `${button.dataset.authProvider} User`,
      email: `${button.dataset.authProvider.toLowerCase()}@demo.myavezzano.it`
    });
  });
});

document.querySelector("#showRegisterMode").addEventListener("click", () => {
  setAuthMode("register");
  setFeedback("");
});

document.querySelector("#showLoginMode").addEventListener("click", () => {
  setAuthMode("login");
  setFeedback("");
});

document.querySelector("#phoneSignupMode").addEventListener("click", () => {
  phoneField.hidden = false;
  signupPhone.focus();
  setFeedback("Inserisci il numero di telefono e premi Crea account.", "info");
});

createAccountButton.addEventListener("click", async () => {
  const name = signupName.value.trim();
  const surname = signupSurname.value.trim();
  const email = signupEmail.value.trim().toLowerCase();
  const password = signupPassword.value.trim();
  const confirm = signupPasswordConfirm.value.trim();
  const phone = signupPhone.value.trim();
  const phoneMode = !phoneField.hidden;

  if (phoneMode) {
    if (!/^\+?\d[\d\s]{7,}$/.test(phone)) {
      setFeedback("Inserisci un numero di telefono valido.", "error");
      return;
    }
    if (!acceptLegal.checked) {
      setFeedback("Accetta privacy e termini per registrarti.", "error");
      return;
    }
    await completeRegistration("Telefono", { name: name || "Utente MyAvezzano", surname, phone });
    return;
  }

  if (name.length < 2) {
    setFeedback("Inserisci il nome.", "error");
    return;
  }

  if (surname.length < 2) {
    setFeedback("Inserisci il cognome.", "error");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setFeedback("Inserisci un indirizzo email valido.", "error");
    return;
  }

  if (getUsers().some((user) => user.email.toLowerCase() === email)) {
    setFeedback("Esiste gia un account con questa email. Vai al login.", "error");
    setAuthMode("login");
    return;
  }

  if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    setFeedback("La password deve avere almeno 8 caratteri, una maiuscola e un numero.", "error");
    return;
  }

  if (password !== confirm) {
    setFeedback("Le password non coincidono.", "error");
    return;
  }

  if (!acceptLegal.checked) {
    setFeedback("Accetta privacy e termini per registrarti.", "error");
    return;
  }

  const passwordData = await hashPassword(password);
  const users = getUsers();
  const user = {
    id: randomId("user"),
    name,
    surname,
    email,
    phone: "",
    role: "user",
    provider: "Email",
    passwordHash: passwordData.hash,
    passwordSalt: passwordData.salt,
    acceptedLegalAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    status: "active"
  };
  users.push(user);
  saveUsers(users);
  persistSession(user);
  setFeedback("Registrazione completata. Ti porto al profilo.", "success");
  updateAuthUi();
  setTimeout(() => {
    closeSignup();
    switchView("profile");
  }, 800);
});

loginAccountButton.addEventListener("click", async () => {
  const email = signupEmail.value.trim().toLowerCase();
  const password = signupPassword.value.trim();
  const user = getUsers().find((item) => item.email.toLowerCase() === email);

  if (!user || user.status === "deleted") {
    setFeedback("Email o password non corretti.", "error");
    return;
  }

  if (user.status === "blocked") {
    setFeedback("Account bloccato. Contatta l'amministratore.", "error");
    return;
  }

  const passwordHash = user.passwordSalt ? (await hashPassword(password, user.passwordSalt)).hash : "";
  if (passwordHash !== user.passwordHash) {
    setFeedback("Email o password non corretti.", "error");
    return;
  }

  user.lastLoginAt = new Date().toISOString();
  saveUsers(getUsers().map((item) => item.id === user.id ? user : item));
  persistSession(user);
  setFeedback("Login completato.", "success");
  updateAuthUi();
  setTimeout(() => {
    closeSignup();
    switchView(user.role === "admin" ? "admin" : "profile");
  }, 700);
});

recoverPasswordButton.addEventListener("click", () => {
  const email = signupEmail.value.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setFeedback("Inserisci la tua email per recuperare la password.", "error");
    return;
  }
  const resets = readJson(RESET_STORAGE_KEY, []);
  resets.push({ email, token: randomId("reset"), createdAt: new Date().toISOString(), used: false });
  writeJson(RESET_STORAGE_KEY, resets);
  setFeedback("Richiesta registrata. In produzione invieremo una email sicura di reset.", "success");
});

logoutAccountButton.addEventListener("click", () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  signupName.value = "";
  signupSurname.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
  signupPasswordConfirm.value = "";
  signupPhone.value = "";
  acceptLegal.checked = false;
  setFeedback("Sei uscito dall'account.", "info");
  setAuthMode("login");
  updateAuthUi();
  switchView("feed");
});

document.querySelector("#profileSignupButton").addEventListener("click", () => openSignup("register"));

document.querySelector(".profile-actions-grid").addEventListener("click", (event) => {
  const button = event.target.closest("[data-profile-panel]");
  if (!button) return;

  document.querySelectorAll(".profile-action-card").forEach((item) => {
    item.classList.toggle("active", item === button);
  });
  renderProfilePanel(button.dataset.profilePanel);
});

document.querySelector("#profilePhotoInput").addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  const user = getStoredUser();

  if (!user) {
    openSignup();
    return;
  }

  if (!file || !file.type.startsWith("image/")) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    user.avatar = reader.result;
    saveUser(user);
    renderUserProfile();
    setFeedback("Foto profilo aggiornata.", "success");
  });
  reader.readAsDataURL(file);
});

document.querySelectorAll(".start-plan").forEach((button) => {
  button.addEventListener("click", () => {
    const user = getStoredUser();
    selectedMerchantPlan = {
      plan: button.dataset.plan,
      price: button.dataset.price
    };

    document.querySelector("#selectedPlanBadge").textContent = `${selectedMerchantPlan.plan} - ${selectedMerchantPlan.price} EUR/mese`;
    merchantCheckout.hidden = false;
    merchantCheckout.scrollIntoView({ behavior: "smooth", block: "center" });

    if (!user) {
      setMerchantFeedback("Per creare un negozio devi prima registrarti o accedere.", "error");
      openSignup();
      return;
    }

    setMerchantFeedback(`Piano ${selectedMerchantPlan.plan} selezionato. Completa il checkout demo.`, "info");
  });
});

document.querySelector("#confirmMerchantPayment").addEventListener("click", () => {
  const user = getStoredUser();
  const businessName = document.querySelector("#merchantBusinessName").value.trim();
  const category = document.querySelector("#merchantBusinessCategory").value.trim();
  const paymentMethod = document.querySelector("#merchantPaymentMethod").value.trim();

  if (!user) {
    setMerchantFeedback("Accedi prima di completare il pagamento.", "error");
    openSignup();
    return;
  }

  if (businessName.length < 2) {
    setMerchantFeedback("Inserisci il nome della tua attivita.", "error");
    return;
  }

  if (category.length < 2) {
    setMerchantFeedback("Inserisci la categoria della tua attivita.", "error");
    return;
  }

  if (paymentMethod.length < 4) {
    setMerchantFeedback("Inserisci un metodo di pagamento demo.", "error");
    return;
  }

  saveMerchantSubscription({
    userId: user.id,
    businessName,
    category,
    plan: selectedMerchantPlan.plan,
    price: selectedMerchantPlan.price,
    status: "active",
    startedAt: new Date().toLocaleDateString("it-IT")
  });

  setMerchantFeedback("Pagamento demo completato. Dashboard negozio attivata.", "success");
  setTimeout(renderMerchantArea, 700);
});

document.querySelector("#cancelMerchantPlan").addEventListener("click", () => {
  localStorage.removeItem(MERCHANT_STORAGE_KEY);
  merchantCheckout.hidden = true;
  setMerchantFeedback("Abbonamento demo annullato.", "info");
  renderMerchantArea();
});

function initWebglAura() {
  const canvas = document.querySelector("#webglAura");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canvas || reduceMotion) return;

  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    powerPreference: "high-performance"
  });

  if (!gl) return;

  const vertexSource = `
    attribute vec2 a_position;
    varying vec2 v_uv;
    void main() {
      v_uv = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentSource = `
    precision highp float;
    varying vec2 v_uv;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_pointer;

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.52;
      mat2 rotate = mat2(0.82, -0.57, 0.57, 0.82);
      for (int i = 0; i < 5; i++) {
        value += amplitude * noise(p);
        p = rotate * p * 2.05 + 0.13;
        amplitude *= 0.48;
      }
      return value;
    }

    float particleField(vec2 uv, float t) {
      vec2 grid = uv * vec2(18.0, 10.0);
      vec2 cell = floor(grid);
      vec2 local = fract(grid) - 0.5;
      float seed = hash(cell);
      vec2 drift = vec2(sin(t * 0.7 + seed * 6.283), cos(t * 0.55 + seed * 4.1)) * 0.22;
      float d = length(local - drift);
      return smoothstep(0.115, 0.0, d) * smoothstep(0.42, 1.0, seed);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      vec2 centered = uv - 0.5;
      centered.x *= u_resolution.x / u_resolution.y;

      vec2 pointer = u_pointer;
      pointer.x *= u_resolution.x / u_resolution.y;
      float pointerGlow = smoothstep(0.72, 0.0, distance(centered, pointer));

      float t = u_time * 0.12;
      float waveA = fbm(centered * 2.2 + vec2(t, -t * 0.5));
      float waveB = fbm(centered * 4.0 + vec2(-t * 1.3, t * 0.8));
      float ribbon = smoothstep(0.18, 0.88, waveA + waveB * 0.46);
      float sweep = smoothstep(0.68, 0.02, abs(centered.y + sin(centered.x * 2.2 + u_time * 0.22) * 0.16));
      float particles = particleField(uv + vec2(sin(u_time * 0.03), cos(u_time * 0.04)) * 0.03, u_time);

      vec3 blue = vec3(0.10, 0.34, 0.95);
      vec3 green = vec3(0.05, 0.66, 0.48);
      vec3 coral = vec3(0.95, 0.26, 0.20);
      vec3 gold = vec3(1.00, 0.72, 0.23);

      vec3 color = mix(blue, green, smoothstep(-0.45, 0.55, centered.x + waveB * 0.42));
      color = mix(color, coral, smoothstep(0.68, 1.0, ribbon) * 0.42);
      color += gold * particles * 0.65;
      color += vec3(0.40, 0.72, 1.0) * pointerGlow * 0.32;
      color += vec3(1.0) * sweep * 0.08;

      float alpha = 0.16 + ribbon * 0.28 + sweep * 0.12 + particles * 0.24 + pointerGlow * 0.10;
      alpha *= smoothstep(1.08, 0.22, length(centered));
      gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.62));
    }
  `;

  function createShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vertexShader = createShader(gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) return;

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn(gl.getProgramInfoLog(program));
    return;
  }

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const timeLocation = gl.getUniformLocation(program, "u_time");
  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  const pointerLocation = gl.getUniformLocation(program, "u_pointer");
  const pointer = { x: 0.12, y: -0.16 };
  let animationFrame = 0;
  let startTime = performance.now();
  let isVisible = true;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.15 : 1.55);
    const width = Math.max(1, Math.floor(window.innerWidth * ratio));
    const height = Math.max(1, Math.floor(window.innerHeight * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  }

  function render(now) {
    if (!isVisible) return;
    resize();
    gl.useProgram(program);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1f(timeLocation, (now - startTime) * 0.001);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform2f(pointerLocation, pointer.x, pointer.y);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    animationFrame = requestAnimationFrame(render);
  }

  function updatePointer(clientX, clientY) {
    pointer.x = clientX / window.innerWidth - 0.5;
    pointer.y = 0.5 - clientY / window.innerHeight;
  }

  window.addEventListener("pointermove", (event) => updatePointer(event.clientX, event.clientY), { passive: true });
  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", () => {
    isVisible = !document.hidden;
    if (isVisible) {
      startTime = performance.now();
      animationFrame = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrame);
    }
  });

  document.body.classList.add("webgl-ready");
  animationFrame = requestAnimationFrame(render);
}

async function bootApp() {
  applyTheme();
  initAtmosphereFX();
  initHeroMicroParallax();
  initScrollAtmosphere();
  initSearchPlaceholderCycle();
  initWebglAura();
  await seedAdminUser();
  render();
  renderLegalPanel();
  selectMapPlace(selectedPlace.id, false);
  updateAuthUi();

  const initialView = window.location.hash.replace("#", "");
  switchView(titles[initialView] ? initialView : "feed", false);

  maybeStartOnboarding();

  window.addEventListener("hashchange", () => {
    const view = window.location.hash.replace("#", "");
    if (titles[view]) switchView(view, false);
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {
        // Service workers require http(s) or localhost; file:// previews can ignore this.
      });
    });
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPromptEvent = event;
    showToast("MyAvezzano puo essere installata come app.", "success");
  });

  window.addEventListener("offline", () => showToast("Sei offline: uso dati salvati e funzioni locali.", "error"));
  window.addEventListener("online", () => showToast("Connessione ripristinata.", "success"));
}

document.querySelector("#themeToggle")?.addEventListener("click", toggleTheme);

bootApp();
