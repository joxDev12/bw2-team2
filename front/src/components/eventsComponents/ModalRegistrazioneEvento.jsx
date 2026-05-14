// Placeholder della modale di registrazione a un evento.
// Potra contenere il form di iscrizione o prenotazione posti.
const ModalRegistrazioneEvento = ({ show, onClose, evento }) => {
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
</div>

            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
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
