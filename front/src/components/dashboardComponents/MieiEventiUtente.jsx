// Area dashboard per partecipanti con la lista degli eventi prenotati.
// Recupera le registrazioni dell'utente e mostra link ai dettagli evento.
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { registrationsAPI } from "../../services/api";
import { Link } from "react-router-dom";

function MieiEventiUtente() {
  const { utente } = useAuth();
  const [registrazioni, setRegistrazioni] = useState([]);
  const [caricamento, setCaricamento] = useState(true);
  const [errore, setErrore] = useState(null);

  useEffect(() => {
    let annullato = false;

    const caricaDati = async () => {
      try {
        setCaricamento(true);
        const dati = await registrationsAPI.getByUserId(utente.id);
        if (!annullato) setRegistrazioni(dati);
      } catch (err) {
        if (!annullato) {
          if (err.status === 404) {
            setRegistrazioni([]);
          } else {
            setErrore(err.message || "Errore nel caricamento delle registrazioni");
          }
        }
      } finally {
        if (!annullato) setCaricamento(false);
      }
    };

    caricaDati();

    return () => {
      annullato = true;
    };
  }, [utente.id]);

  if (caricamento) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  if (errore) return <div className="alert alert-danger m-4">{errore}</div>;

  return (
    <div className="miei-eventi-utente">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            I Miei <span className="text-primary">Eventi</span>
          </h2>
          <p className="text-muted mb-0">Visualizza gli eventi a cui sei iscritto</p>
        </div>
      </div>

      {registrazioni.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-4">
          <i className="bi bi-calendar-x fs-1 text-muted mb-3 d-block"></i>
          <h5>Nessun evento</h5>
          <p className="text-muted">Non ti sei ancora iscritto a nessun evento.</p>
          <Link to="/eventi" className="btn btn-primary mt-2">Sfoglia Eventi</Link>
        </div>
      ) : (
        <div className="row g-4">
          {registrazioni.map((reg) => (
            <div key={reg.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-body p-4 d-flex flex-column">
                  <span className="badge bg-primary bg-opacity-10 text-primary mb-3 align-self-start rounded-pill px-3 py-2">
                    {reg.event_category || 'Evento'}
                  </span>
                  <h5 className="card-title fw-bold mb-3">{reg.event_title}</h5>
                  <div className="d-flex flex-column gap-2 text-muted small mb-4 flex-grow-1">
                    <span className="d-flex align-items-center">
                      <i className="bi bi-calendar3 text-primary me-2"></i>
                      {new Date(reg.event_date).toLocaleDateString('it-IT')}
                    </span>
                    <span className="d-flex align-items-center">
                      <i className="bi bi-geo-alt text-danger me-2"></i>
                      {reg.event_location}
                    </span>
                    <span className="d-flex align-items-center">
                      <i className="bi bi-ticket-perforated text-success me-2"></i>
                      Posti prenotati: <strong className="ms-1">{reg.seats}</strong>
                    </span>
                  </div>
                  <Link to={`/eventi/${reg.event_id}`} className="btn btn-outline-primary w-100 rounded-pill mt-auto">
                    Vai all'evento
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MieiEventiUtente;
