import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useSEO from "../../hooks/useSEO";

import CardPageEvent from "../../components/eventsComponents/CardPageEvent";
import { eventsAPI } from "../../services/api";

import ModalRegistrazioneEvento from "../../components/eventsComponents/ModalRegistrazioneEvento";

const iconeCategorie = {
  Musica: "bi-music-note-beamed",
  Sport: "bi-trophy",
  Tecnologia: "bi-cpu",
  "Cultura e Spettacolo": "bi-stars",
  Enogastronomia: "bi-cup-hot",
};

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
    case "Musica":
      return "bg-primary";
    case "Cultura e Spettacolo":
      return "bg-danger";
    case "Sport":
      return "bg-success";
    case "Tecnologia":
      return "bg-info text-dark";
    default:
      return "bg-secondary";
  }
}

function bottoneCategoriaColore(categoria) {
  switch (categoria) {
    case "Musica":
      return "btn-outline-primary";
    case "Cultura e Spettacolo":
      return "btn-outline-danger";
    case "Sport":
      return "btn-outline-success";
    case "Tecnologia":
      return "btn-outline-info";
    default:
      return "btn-outline-secondary";
  }
}

const EventiPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [eventoSelezionato, setEventoSelezionato] = useState(null);

  function openModal(evento) {
    setEventoSelezionato(evento);
    setShowModal(true);
  }
  function closeModal() {
    setEventoSelezionato(null);
    setShowModal(false);
  }
  useSEO({
    title: "Tutti gli Eventi",
    description:
      "Esplora la nostra vasta selezione di eventi. Usa i filtri per trovare l'evento perfetto per te in base a categoria, luogo o data.",
  });

  const [eventiData, setEventiData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [categoriaAttiva, setCategoriaAttiva] = useState(searchParams.get("category") || "Tutti");
  const filtroTesto = searchParams.get("q") || "";
  const filtroLocation = searchParams.get("location") || "";
  const filtroData = searchParams.get("date") || "";

  const categorie = [...new Set(eventiData.map((e) => e.category))]
    .filter(Boolean)
    .sort();
  const locations = [...new Set(eventiData.map((e) => e.location))].sort();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventsAPI.getAll();
        setEventiData(data);
      } catch (err) {
        console.error("Errore caricamento eventi:", err);
        setEventiData([]);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    setCategoriaAttiva(searchParams.get("category") || "Tutti");
  }, [searchParams]);


  const aggiornaFiltroLocation = (location) => {
    setSearchParams((params) => {
      const nuoviParams = new URLSearchParams(params);

      if (location) {
        nuoviParams.set("location", location);
      } else {
        nuoviParams.delete("location");
      }

      return nuoviParams;
    });
  };

  const aggiornaFiltroCategoria = (categoria) => {
    setCategoriaAttiva(categoria);
    setSearchParams((params) => {
      const nuoviParams = new URLSearchParams(params);

      if (categoria !== "Tutti") {
        nuoviParams.set("category", categoria);
      } else {
        nuoviParams.delete("category");
      }

      return nuoviParams;
    });
  };

  const aggiornaFiltroData = (date) => {
    setSearchParams((params) => {
      const nuoviParams = new URLSearchParams(params);

      if (date) {
        nuoviParams.set("date", date);
      } else {
        nuoviParams.delete("date");
      }

      return nuoviParams;
    });
  };

  const getDataEvento = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate(),
    ).padStart(2, "0")}`;
  };

  const eventiFiltrati = eventiData.filter((evento) => {
    const testo = filtroTesto.toLowerCase().trim();
    const matchCategoria =
      categoriaAttiva === "Tutti" || evento.category === categoriaAttiva;
    const matchTesto =
      testo === "" ||
      evento.title?.toLowerCase().includes(testo) ||
      evento.organizer_fullname?.toLowerCase().includes(testo) ||
      evento.organizer_username?.toLowerCase().includes(testo) ||
      evento.location?.toLowerCase().includes(testo);
    const matchData =
      filtroData === "" || getDataEvento(evento.date) === filtroData;
    const matchLocation =
      filtroLocation === "" || evento.location === filtroLocation;
    return matchCategoria && matchTesto && matchData && matchLocation;
  });

  const resetFiltri = () => {
    setCategoriaAttiva("Tutti");
    setSearchParams(new URLSearchParams());
  };

  const filtriAttivi =
    categoriaAttiva !== "Tutti" ||
    filtroTesto !== "" ||
    filtroData !== "" ||
    filtroLocation !== "";

  return (
    <div className="eventi-page">
      <div className="container py-4">
        <h1 className="display-5 fw-bold text-primary">
          <i className="bi bi-calendar-event me-3"></i>
          Tutti gli Eventi
        </h1>
        <p className="lead text-white mb-0">
          Esplora la nostra selezione di eventi. Usa i filtri per trovare quello
          perfetto per te.
        </p>
      </div>

      <section className="bg-dark shadow-sm sticky-top" style={{ zIndex: 100 }}>
        <div className="container py-3">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-2 gap-md-3">
            <button
              id="filter-tutti"
              className={`btn btn-sm rounded-pill px-3 fw-semibold ${categoriaAttiva === "Tutti"
                ? "btn-primary shadow-sm"
                : "btn-outline-light"
                }`}
              onClick={() => aggiornaFiltroCategoria("Tutti")}
            >
              <i className="bi bi-grid-fill me-1"></i>
              Tutti
            </button>

            {categorie.map((cat) => (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase()}`}
                className={`btn btn-sm rounded-pill px-3 fw-semibold ${categoriaAttiva === cat
                  ? "btn-primary shadow-sm"
                  : bottoneCategoriaColore(cat)
                  }`}
                onClick={() => aggiornaFiltroCategoria(cat)}
              >
                <i className={`bi ${iconeCategorie[cat] || "bi-grid-fill"} me-1`}></i>
                {cat}
              </button>
            ))}

            <div className="d-none d-lg-block"></div>

            <div className="col-auto">
              <div className="input-group input-group-sm rounded-pill">
                <span className="input-group-text bg-dark text-light border-light rounded-start-pill">
                  <i className="bi bi-calendar3"></i>
                </span>
                <input
                  type="date"
                  id="filter-data"
                  className="form-control bg-dark text-light border-light border-start-0 rounded-end-pill fw-semibold w-auto"
                  value={filtroData}
                  onChange={(e) => aggiornaFiltroData(e.target.value)}
                />
              </div>
            </div>

            <div className="col-auto">
              <div className="input-group input-group-sm rounded-pill w-auto">
                <span className="input-group-text bg-dark text-light border-light rounded-start-pill">
                  <i className="bi bi-geo-alt"></i>
                </span>
                <select
                  id="filter-location"
                  className="form-select bg-dark text-light border-light border-start-0 rounded-end-pill fw-semibold w-auto"
                  value={filtroLocation}
                  onChange={(e) => aggiornaFiltroLocation(e.target.value)}
                >
                  <option value="">Tutte le città</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
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
            <p className="text-white mb-0">
              <strong>{eventiFiltrati.length}</strong>{" "}
              {eventiFiltrati.length === 1
                ? "evento trovato"
                : "eventi trovati"}
              {categoriaAttiva !== "Tutti" && (
                <span className="ms-2">
                  in{" "}
                  <span className={`badge ${badgeColore(categoriaAttiva)}`}>
                    {categoriaAttiva}
                  </span>
                </span>
              )}
              {filtroTesto && (
                <span className="ms-2">
                  per <strong>{filtroTesto}</strong>
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
                  openModal={openModal}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="fs-1 mb-3">
                <i className="bi bi-search"></i>
              </div>
              <h3 className="fw-bold">Nessun evento trovato</h3>
              <p className="mb-4">
                Prova a modificare i filtri per trovare altri eventi.
              </p>
              <button
                className="btn btn-primary rounded-pill px-4"
                onClick={resetFiltri}
              >
                <i className="bi bi-arrow-counterclockwise me-2"></i> Mostra
                tutti gli eventi
              </button>
            </div>
          )}
          {showModal && (
            <ModalRegistrazioneEvento
              show={showModal}
              onClose={closeModal}
              evento={eventoSelezionato}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default EventiPage;
