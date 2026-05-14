// Modale di conferma eliminazione per un evento organizzatore.
// Mostra errore, stato caricamento e pulsanti annulla/elimina.
function EventDeleteModal({
  eventoDaEliminare,
  erroreElimina,
  caricamentoElimina,
  chiudiModaleElimina,
  gestisciElimina,
}) {
  if (!eventoDaEliminare) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 shadow border-0">
          <div className="modal-header border-0 pb-0 px-4 pt-4">
            <h5 className="modal-title fw-bold text-danger">
              <i className="bi bi-trash me-2"></i>
              Elimina evento
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={chiudiModaleElimina}
              disabled={caricamentoElimina}
            ></button>
          </div>

          <div className="modal-body px-4 py-4">
            {erroreElimina && (
              <div
                className="alert alert-danger d-flex align-items-center gap-2 rounded-3"
                role="alert"
              >
                <i className="bi bi-exclamation-triangle-fill"></i>
                {erroreElimina}
              </div>
            )}

            <p className="mb-0">
              Sei sicuro di voler eliminare l'evento{" "}
              <strong>{eventoDaEliminare.title}</strong>? Questa azione non puo
              essere annullata.
            </p>
          </div>

          <div className="modal-footer border-0 px-4 pb-4 pt-2">
            <button
              type="button"
              className="btn btn-outline-secondary rounded-3 px-4"
              onClick={chiudiModaleElimina}
              disabled={caricamentoElimina}
            >
              Annulla
            </button>
            <button
              type="button"
              className="btn btn-danger rounded-3 px-4 d-flex align-items-center gap-2"
              onClick={gestisciElimina}
              disabled={caricamentoElimina}
            >
              {caricamentoElimina ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></span>
                  Eliminazione...
                </>
              ) : (
                <>
                  <i className="bi bi-trash"></i>
                  Elimina
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDeleteModal;
