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
              ...
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

      {/* ← Добавляем backdrop вручную */}
      {show && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default ModalRegistrazioneEvento;
