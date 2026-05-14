// Placeholder della modale di registrazione a un evento.
// Potra contenere il form di iscrizione o prenotazione posti.
import { useState } from "react";

const ModalRegistrazioneEvento = ({ show, onClose, evento }) => {

const [posti, setPosti] = useState(1);
const [loading, setLoading] = useState(false);
const [errore, setErrore] = useState("");
const [successo, setSuccesso] = useState(false);

async function handleSubmit() {
    try {
      setLoading(true);
      setErrore("");
      setSuccesso(false);

      const response = await fetch(`http://localhost:3000/api/events/${evento.id}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ posti: Number(posti) }),
      });

      if (!response.ok) throw new Error("Errore durante la registrazione");

      setSuccesso(true);

      setTimeout(() => onClose(), 1500);

} catch (err) {
      setErrore(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className={`modal fade ${show ? "show d-block" : ""}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-hidden={!show}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h1 className="modal-title fs-5">
                Modal title
              </h1>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              
  <h5 className="fw-bold mb-3">{evento?.title}</h5>

  <p className="text-muted mb-2">
    <i className="bi bi-calendar3 me-2 text-primary"></i>
    {new Date(evento.date).toLocaleDateString("it-IT")}
  </p>

  <p className="text-muted mb-4">
    <i className="bi bi-geo-alt me-2 text-danger"></i>
    {evento.location}
  </p>

  <p>{evento.description}</p>

<label className="form-label">Numero posti</label>
  <input
    type="number"
    min="1"
    className="form-control"
    value={posti}
    onChange={(e) => setPosti(e.target.value)}
  />






            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>


<button
  type="button"
  className="btn btn-primary"
  disabled={loading}
  onClick={handleSubmit}
>
  {loading ? "Invio..." : "Conferma registrazione"}
</button>




             
            </div>

          </div>
        </div>
      </div>

   
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default ModalRegistrazioneEvento;
