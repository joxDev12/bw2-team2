// Header della gestione eventi con titolo, filtro e bottone crea.
// Riceve stato filtro e azione di apertura modale dal componente padre.
function OrganizerEventsHeader({ filtroEventi, setFiltroEventi, apriModaleCreazione }) {
  return (
    <div className="row align-items-start mb-4 g-3">
      <div className="col-md-4">
        <h2 className="fw-bold mb-1">
          Gestione <span className="text-primary">Eventi</span>
        </h2>
        <p className="text-muted mb-0">Visualizza e modifica gli eventi che hai creato</p>
      </div>

      <div className="col-md-4 d-flex justify-content-center">
        <select
          className="form-select rounded-pill"
          value={filtroEventi}
          onChange={(e) => setFiltroEventi(e.target.value)}
        >
          <option value="data_creazione">Data di creazione</option>
          <option value="data_avvenimento">Data di avvenimento</option>
          <option value="in_corso">In corso</option>
          <option value="passati">Passati</option>
          <option value="prenotazioni_piu">Piu prenotate</option>
          <option value="prenotazioni_meno">Meno prenotate</option>
        </select>
      </div>

      <div className="col-md-4 d-flex justify-content-center justify-content-md-end">
        <button type="button" className="btn btn-primary rounded-pill px-4" onClick={apriModaleCreazione}>
          <i className="bi bi-plus-lg me-2"></i>
          Crea evento
        </button>
      </div>
    </div>
  );
}

export default OrganizerEventsHeader;
