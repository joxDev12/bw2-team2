import { useEffect, useState } from "react";
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

        const response = await fetch(
          `http://localhost:3000/api/events/${id}`
        );

        if (!response.ok) {
          throw new Error("Evento non trovato");
        }

        const data = await response.json();

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
        <div className="alert alert-danger">
          {errore}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="card border-0 shadow-lg overflow-hidden">

       
        <img
          src={evento.immagine}
          alt={evento.titolo}
          className="w-100"
          style={{
            height: "500px",
            objectFit: "cover",
          }}
        />

        <div className="card-body p-5">

         
          <span className="badge bg-primary px-3 py-2 mb-3">
            {evento.categoria}
          </span>

        
          <h1 className="fw-bold mb-4">
            {evento.titolo}
          </h1>

          
          <div className="row g-4 mb-5">

    
            <div className="col-md-4">
              <div className="border rounded-4 p-3 h-100">

                <div className="text-muted small mb-2">
                  Data Evento
                </div>

                <div className="fw-semibold">
                  <i className="bi bi-calendar3 me-2 text-primary"></i>

                  {evento.date}
                </div>
              </div>
            </div>

           
            <div className="col-md-4">
              <div className="border rounded-4 p-3 h-100">

                <div className="text-muted small mb-2">
                  Luogo
                </div>

                <div className="fw-semibold">
                  <i className="bi bi-geo-alt me-2 text-danger"></i>

                  {evento.luogo}
                </div>
              </div>
            </div>

     
            <div className="col-md-4">
              <div className="border rounded-4 p-3 h-100">

                <div className="text-muted small mb-2">
                  Posti Disponibili
                </div>

                <div className="fw-semibold">
                  <i className="bi bi-people me-2 text-success"></i>

                  {evento.postiMassimi}
                </div>
              </div>
            </div>
          </div>

         
          <div className="mb-5">

            <h3 className="fw-bold mb-3">
              Descrizione Evento
            </h3>

            <p className="lead text-muted">
              {evento.descrizione}
            </p>
          </div>

         
          <div className="mb-4">

            {evento.disponibile ? (
              <span className="badge bg-success px-4 py-3 fs-6">
                Disponibile
              </span>
            ) : (
              <span className="badge bg-danger px-4 py-3 fs-6">
                Sold Out
              </span>
            )}
          </div>

       
          <button
            className="btn btn-primary btn-lg rounded-pill px-5"
            disabled={!evento.disponibile}
          >
            <i className="bi bi-ticket-perforated me-2"></i>

            {evento.disponibile
              ? "Registrati all'evento"
              : "Evento non disponibile"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default EventiDettaglioPage;