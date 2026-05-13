import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { eventsAPI, registrationsAPI } from "../services/api";
import profilePlaceholder from "../assets/img/profile_placeholder.webp";

const getImmagineUtente = (reg) => reg.user_img_profile || reg.img_profile || profilePlaceholder;

function RegistrazioniUtenti() {
  const { utente, token } = useAuth();
  const [registrazioni, setRegistrazioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrazioni = async () => {
      try {
        setLoading(true);
        setError(null);

        let tutteRegistrazioni = [];

        if (utente?.role === "admin") {
          const res = await registrationsAPI.getAll();
          tutteRegistrazioni = res.slice(0, 50);
        } else if (utente?.role === "organizer") {
          // 1. Fetch eventi dell'organizzatore
          try {
            const eventi = await eventsAPI.getByOrganizerId(utente.id);

            if (eventi && eventi.length > 0) {
              // 2. Fetch registrazioni per ogni evento
              const promesseRegistrazioni = eventi.map(async (evento) => {
                try {
                  return await registrationsAPI.getByEventId(evento.id);
                } catch (err) {
                  // Se l'errore è 404 (nessuna registrazione), ritorniamo array vuoto
                  if (err.status === 404) return [];
                  throw err;
                }
              });

              const arrayDiArray = await Promise.all(promesseRegistrazioni);
              tutteRegistrazioni = arrayDiArray.flat();

              // Ordiniamo per data di registrazione (dal più recente)
              tutteRegistrazioni.sort(
                (a, b) => new Date(b.registered_at) - new Date(a.registered_at),
              );
            }
          } catch (err) {
            if (err.status !== 404) throw err;
            // Se getByOrganizerId dà 404, significa che non ha eventi, quindi 0 registrazioni
            tutteRegistrazioni = [];
          }
        }

        setRegistrazioni(tutteRegistrazioni);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (utente && token) {
      fetchRegistrazioni();
    }
  }, [utente, token]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Caricamento...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </div>
    );
  }

  return (
    <div className="registrazioni-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">
          <i className="bi bi-people-fill me-2 text-primary"></i>
          {utente?.role === "admin"
            ? "Tutte le Registrazioni"
            : "Registrazioni ai tuoi Eventi"}
        </h2>
      </div>

      {registrazioni.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm border">
          <div className="mb-3">
            <i
              className="bi bi-inbox text-muted"
              style={{ fontSize: "3rem" }}
            ></i>
          </div>
          <h4 className="text-muted">Nessuna registrazione trovata</h4>
          <p className="text-muted mb-0">
            Non ci sono ancora utenti registrati.
          </p>
        </div>
      ) : (
        <div className="table-responsive bg-white rounded-4 shadow-sm border">
          <table className="table table-hover table-borderless align-middle mb-0">
            <thead className="table-light border-bottom">
              <tr>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Utente</th>
                <th className="px-4 py-3">Evento</th>
                <th className="px-4 py-3 text-center">Posti</th>
              </tr>
            </thead>
            <tbody>
              {registrazioni.map((reg) => (
                <tr key={reg.id} className="border-bottom">
                  <td className="px-4 py-3 text-muted">
                    {new Date(reg.registered_at).toLocaleDateString("it-IT", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={getImmagineUtente(reg)}
                        alt={reg.user_fullname}
                        className="rounded-circle border shadow-sm flex-shrink-0"
                        style={{ width: "46px", height: "46px", objectFit: "cover" }}
                        onError={(e) => {
                          e.currentTarget.src = profilePlaceholder;
                        }}
                      />
                      <div>
                        <div className="fw-bold">{reg.user_fullname}</div>
                        <small className="text-muted">{reg.user_email}</small>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="fw-bold text-primary">
                      {reg.event_title}
                    </div>
                    <small className="text-muted">
                      <i className="bi bi-geo-alt-fill me-1"></i>
                      {reg.event_location}
                    </small>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="badge bg-secondary rounded-pill px-3 py-2">
                      {reg.seats}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RegistrazioniUtenti;
