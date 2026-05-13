import { useState, useEffect } from "react";

import CardPageEvent from "../components/CardPageEvent";


const categorie = [
  { nome: "Tutti", icona: "bi-grid-fill" },
  { nome: "Musica", icona: "bi-music-note-beamed" },
  { nome: "Spettacolo", icona: "bi-stars" },
  { nome: "Sport", icona: "bi-trophy" },
  { nome: "Tecnologia", icona: "bi-cpu" },
];



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
const [eventiData, setEventiData] = useState([]);

  const [categoriaAttiva, setCategoriaAttiva] = useState("Tutti");
  const [filtroData, setFiltroData] = useState("");
  const [filtroLocation, setFiltroLocation] = useState("");


  const locations = [...new Set(eventiData.map((e) => e.location))].sort();

useEffect(() => {
  fetch("http://localhost:3000/api/events")
    .then((res) => res.json())
    .then((data) => {

 console.log("DATA FROM BACKEND:", data);

setEventiData(data.dati);
      
    })
    .catch((err) => {
      console.error("Errore caricamento eventi:", err);
      setEventiData([]);
    });
}, []);



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