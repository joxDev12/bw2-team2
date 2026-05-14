import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import eventsPlaceholder from "../../assets/img/events_placeholder.webp";
import useSEO from "../../hooks/useSEO";
import { eventsAPI } from "../../services/api";

const EventiDettaglioPage = () => {
  const { id } = useParams();

  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState("");

  useSEO({
    title: evento ? evento.title : "Caricamento evento...",
    description: evento ? evento.description : "Dettagli dell'evento su EventHub."
  });

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        setLoading(true);
        const data = await eventsAPI.getById(id);
        setEvento(data);
      } catch (error) {
        setErrore(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [id]);


  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (errore) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{errore}</div>
      </div>
    );
  }

  if (!evento) {
    return (
      <div className="container py-5 text-center">Nessun evento trovato</div>
    );
  }
  return (
    <div className="container py-5">
      <div className="card border-0 shadow-lg overflow-hidden event-card">
        <img
          src={evento.image || eventsPlaceholder}
          alt={evento.title}
          className="w-100"
          style={{
            height: "500px",
            objectFit: "cover",
          }}
        />

        <div className="card-body p-5">
          <span className="badge bg-primary px-3 py-2 mb-3">
            {evento.category}
          </span>

          <h1 className="fw-bold mb-4">{evento.title}</h1>

          <div className="fade-in">
            <div className="row g-4 mb-5">
              <div className="col-md-4">
                <div className="event-info-box h-100">
                  <div className="small mb-2">Data Evento</div>

                  <div className="fw-semibold">
                    <i className="bi bi-calendar3 me-2 text-primary"></i>

                    {/* {new Date(evento.date).toLocaleDateString("it-IT")} */}
                    {new Date(evento.date).toLocaleDateString("it-IT", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="event-info-box h-100">
                  <div className="small mb-2">Luogo</div>
                  <div className="fw-semibold">
                    <i className="bi bi-geo-alt me-2 text-danger"></i>
                    {evento.location}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="event-info-box h-100">
                  <div className="small mb-2">Posti Disponibili</div>

                  <div className="fw-semibold">
                    <i className="bi bi-people me-2 text-success"></i>

                    {evento.max_seats}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="event-info-box h-100">
                  <div className="small mb-2">Indirizzo</div>
                  <div className="fw-semibold">
                    <i className="bi bi-map me-2 text-warning"></i>
                    {evento.indirizzo}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="event-info-box h-100">
                  <div className="small mb-2">Prezzo</div>
                  <div className="fw-semibold">
                    <i className="bi bi-cash-coin me-2 text-success"></i>
                    {evento.isfree ? "Gratuito" : `${evento.price} €`}
                  </div>
                </div>
              </div>

              {evento.isfree && (
                <span className="badge bg-info text-dark px-3 py-2 mb-3">
                  Evento gratuito
                </span>
              )}

              <div className="small">
                Pubblicato il:{""}
                {new Date(evento.created_at).toLocaleDateString("it-IT")}
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h3 className="fw-bold mb-3">Descrizione Evento</h3>

            <p className="lead">{evento.description}</p>
          </div>

          <div className="mb-4">
            {evento.available ? (
              <span className="badge bg-success px-4 py-3 fs-6 badge-glow">
                Disponibile
              </span>
            ) : (
              <span className="badge bg-danger px-4 py-3 fs-6">Sold Out</span>
            )}
          </div>

          <Link
            to="/register"
            className={`btn btn-primary btn-lg rounded-pill px-5 btn-pulse ${!evento.available ? "disabled" : ""}`}
            onClick={(e) => {
              if (!evento.available) e.preventDefault();
            }}
          >
            <i className="bi bi-ticket-perforated me-2"></i>

            {evento.available
              ? "Registrati all'evento"
              : "Evento non disponibile"}
          </Link>

          <div className="d-flex justify-content-start mt-4">
            <Link
              to="/eventi"
              className="btn mb-4 rounded-pill px-4 text-dark back-link"
            >
              ← Torna a tutti gli eventi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventiDettaglioPage;