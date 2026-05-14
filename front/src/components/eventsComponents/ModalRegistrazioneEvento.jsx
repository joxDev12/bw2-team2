// Placeholder della modale di registrazione a un evento.
// Potra contenere il form di iscrizione o prenotazione posti.
const ModalRegistrazioneEvento = ({show, onClose, evento}) => {
  return (
    <div
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h1 className="modal-title fs-5">
              Modal title
            </h1>
            <button type="button" className="btn-close"></button>
          </div>

          <div className="modal-body">
            ...
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary">
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Understood
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModalRegistrazioneEvento;
