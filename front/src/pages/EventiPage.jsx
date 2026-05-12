import { useState } from "react";
import CardPageEvent from "../components/CardPageEvent";

const eventiData = [
  {
    id: 1,
    title: "Rock Festival 2026",
    category: "Musica",
    date: "2026-06-15",
    location: "Roma",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop",
    description: "Un'esperienza musicale unica con artisti internazionali e band emergenti. Tre giorni di musica live, food truck e divertimento sotto le stelle.",
  },
  {
    id: 2,
    title: "Comedy Night Live",
    category: "Spettacolo",
    date: "2026-07-20",
    location: "Milano",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=600&h=400&fit=crop",
    description: "Una serata di risate con i migliori comici italiani. Stand-up comedy, improvvisazione e tanto divertimento per una notte indimenticabile.",
  },
  {
    id: 3,
    title: "Torneo di Calcio a 5",
    category: "Sport",
    date: "2026-08-10",
    location: "Napoli",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop",
    description: "Torneo amatoriale aperto a tutti. Squadre da 5 giocatori, premi per i primi tre classificati e barbecue finale per tutti i partecipanti.",
  },
  {
    id: 4,
    title: "Tech Conference 2026",
    category: "Tecnologia",
    date: "2026-09-05",
    location: "Torino",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    description: "Conferenza dedicata alle ultime innovazioni in ambito AI, blockchain e sviluppo web. Speaker di fama internazionale e workshop pratici.",
  },
  {
    id: 5,
    title: "Jazz sotto le Stelle",
    category: "Musica",
    date: "2026-07-28",
    location: "Firenze",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&h=400&fit=crop",
    description: "Una serata magica all'aperto con i migliori musicisti jazz. Atmosfera romantica, ottimo vino e musica che scalda l'anima.",
  },
  {
    id: 6,
    title: "Maratona Cittadina",
    category: "Sport",
    date: "2026-10-12",
    location: "Roma",
    image: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=600&h=400&fit=crop",
    description: "Corsa per tutti i livelli: 5km, 10km e maratona completa. Percorso panoramico attraverso i monumenti più belli della città eterna.",
  },
  {
    id: 7,
    title: "Teatro d'Avanguardia",
    category: "Spettacolo",
    date: "2026-06-30",
    location: "Bologna",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&h=400&fit=crop",
    description: "Spettacolo teatrale contemporaneo che mescola danza, recitazione e tecnologia. Un'esperienza immersiva che ridefinisce il concetto di palcoscenico.",
  },
  {
    id: 8,
    title: "Hackathon AI Innovation",
    category: "Tecnologia",
    date: "2026-11-15",
    location: "Milano",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    description: "48 ore di coding intenso per sviluppare soluzioni innovative basate sull'intelligenza artificiale. Premi per i progetti più creativi.",
  },
  {
    id: 9,
    title: "Festival Elettronica",
    category: "Musica",
    date: "2026-08-22",
    location: "Rimini",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop",
    description: "Il più grande festival di musica elettronica della riviera. DJ internazionali, light show spettacolari e party fino all'alba sulla spiaggia.",
  },
];

const categorie = [
  { nome: "Tutti", icona: "bi-grid-fill" },
  { nome: "Musica", icona: "bi-music-note-beamed" },
  { nome: "Spettacolo", icona: "bi-stars" },
  { nome: "Sport", icona: "bi-trophy" },
  { nome: "Tecnologia", icona: "bi-cpu" },
];

const locations = [...new Set(eventiData.map((e) => e.location))].sort();

function formattaData(dataStr) {
  const data = new Date(dataStr);
  return data.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function badgeColore(categoria) {
  switch (categoria) {
    case "Musica": return "bg-primary";
    case "Spettacolo": return "bg-danger";
    case "Sport": return "bg-success";
    case "Tecnologia": return "bg-info text-dark";
    default: return "bg-secondary";
  }
}

const EventiPage = () => {
  const [categoriaAttiva, setCategoriaAttiva] = useState("Tutti");
  const [filtroData, setFiltroData] = useState("");
  const [filtroLocation, setFiltroLocation] = useState("");

  const eventiFiltrati = eventiData.filter((evento) => {
    const matchCategoria = categoriaAttiva === "Tutti" || evento.category === categoriaAttiva;
    const matchData = filtroData === "" || evento.date === filtroData;
    const matchLocation = filtroLocation === "" || evento.location === filtroLocation;
    return matchCategoria && matchData && matchLocation;
  });

  const resetFiltri = () => {
    setCategoriaAttiva("Tutti");
    setFiltroData("");
    setFiltroLocation("");
  };

  const filtriAttivi = categoriaAttiva !== "Tutti" || filtroData !== "" || filtroLocation !== "";

  return (
    <div className="eventi-page">
      <div className="container py-4 mt-3">
        <h1 className="display-5 fw-bold mb-2 text-primary">
          <i className="bi bi-calendar-event me-3"></i>
          Tutti gli Eventi
        </h1>
        <p className="lead text-muted mb-0">
          Esplora la nostra selezione di eventi. Usa i filtri per trovare quello perfetto per te.
        </p>
      </div>

      <section className="bg-light border-bottom shadow-sm sticky-top" style={{ zIndex: 1020 }}>
        <div className="container py-3">
          <div className="row align-items-center g-3">
            <div className="col-12 col-lg-auto">
              <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start">
                {categorie.map((cat) => (
                  <button
                    key={cat.nome}
                    id={`filter-${cat.nome.toLowerCase()}`}
                    className={`btn btn-sm rounded-pill px-3 fw-semibold ${
                      categoriaAttiva === cat.nome ? "btn-primary shadow-sm" : "btn-outline-secondary"
                    }`}
                    onClick={() => setCategoriaAttiva(cat.nome)}
                  >
                    <i className={`bi ${cat.icona} me-1`}></i>
                    {cat.nome}
                  </button>
                ))}
              </div>
            </div>

            <div className="d-none d-lg-block col-lg-auto">
              <div className="vr" style={{ height: "30px" }}></div>
            </div>
            
            <div className="col-6 col-sm-auto">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-calendar3 text-muted"></i>
                </span>
                <input
                  type="date"
                  id="filter-data"
                  className="form-control border-start-0"
                  value={filtroData}
                  onChange={(e) => setFiltroData(e.target.value)}
                />
              </div>
            </div>

            <div className="col-6 col-sm-auto">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-geo-alt text-muted"></i>
                </span>
                <select
                  id="filter-location"
                  className="form-select border-start-0"
                  value={filtroLocation}
                  onChange={(e) => setFiltroLocation(e.target.value)}
                >
                  <option value="">Tutte le città</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            {filtriAttivi && (
              <div className="col-12 col-sm-auto text-center">
                <button
                  id="filter-reset"
                  className="btn btn-sm btn-outline-danger rounded-pill px-3"
                  onClick={resetFiltri}
                >
                  <i className="bi bi-x-circle me-1"></i>
                  Resetta Filtri
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <p className="text-muted mb-0">
              <strong>{eventiFiltrati.length}</strong>{" "}
              {eventiFiltrati.length === 1 ? "evento trovato" : "eventi trovati"}
              {categoriaAttiva !== "Tutti" && (
                <span className="ms-2">
                  in <span className={`badge ${badgeColore(categoriaAttiva)}`}>{categoriaAttiva}</span>
                </span>
              )}
              {filtroLocation && (
                <span className="ms-2">
                  a <strong>{filtroLocation}</strong>
                </span>
              )}
            </p>
          </div>

          {eventiFiltrati.length > 0 ? (
            <div className="row g-4">
              {eventiFiltrati.map((evento) => (
                <CardPageEvent 
                  key={evento.id} 
                  evento={evento} 
                  formattaData={formattaData} 
                  badgeColore={badgeColore} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="display-1 text-muted mb-3">
                <i className="bi bi-search"></i>
              </div>
              <h3 className="fw-bold text-muted">Nessun evento trovato</h3>
              <p className="text-muted mb-4">Prova a modificare i filtri per trovare altri eventi.</p>
              <button className="btn btn-primary rounded-pill px-4" onClick={resetFiltri}>
                <i className="bi bi-arrow-counterclockwise me-2"></i> Mostra tutti gli eventi
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EventiPage;