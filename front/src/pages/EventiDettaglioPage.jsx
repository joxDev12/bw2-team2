import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const EventiDettaglioPage = () => {
  const { id } = useParams();

  const [evento, setEvento] = useState(null);

  const [loading, setLoading] = useState(true);

  const [errore, setErrore] = useState("");

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        setLoading(true);

        const response = await fetch(`http://localhost:3000/api/events/${id}`);

        if (!response.ok) {
          throw new Error("Evento non trovato");
        }

        const data = await response.json();

        setEvento(data.dati || data[0] || data);
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
          src={evento.image}
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
                <div className="text-muted small mb-2">Data Evento</div>

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
                <div className="text-muted small mb-2">Luogo</div>
                <div className="fw-semibold">
                  <i className="bi bi-geo-alt me-2 text-danger"></i>
                  {evento.location}
                </div>
              </div>
            </div>
            

            <div className="col-md-4">
              <div className="event-info-box h-100">
                <div className="text-muted small mb-2">Posti Disponibili</div>

                <div className="fw-semibold">
                  <i className="bi bi-people me-2 text-success"></i>

                  {evento.max_seats}
                </div>
              </div>
            </div>
</div>


          </div>

          <div className="mb-5">
            <h3 className="fw-bold mb-3">Descrizione Evento</h3>

            <p className="lead text-muted">{evento.description}</p>
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

          <button
            className="btn btn-primary btn-lg rounded-pill px-5 btn-pulse"
            disabled={!evento.available}
          >
            <i className="bi bi-ticket-perforated me-2"></i>

            {evento.available
              ? "Registrati all'evento"
              : "Evento non disponibile"}
          </button>

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
