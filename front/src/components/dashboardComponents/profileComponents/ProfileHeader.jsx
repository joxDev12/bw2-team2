// Header della pagina profilo con titolo e bottoni azione.
// Apre le modali di modifica ed eliminazione account.
function ProfileHeader({ apriModale, apriModaleElimina }) {
  return (
    <div className="d-flex justify-content-between align-items-start mb-4">
      <div>
        <h2 className="fw-bold mb-1">
          Il mio <span className="text-primary">Profilo</span>
        </h2>
        <p className="text-muted mb-0">Visualizza i tuoi dati personali</p>
      </div>

      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-primary d-flex align-items-center gap-2 rounded-3 shadow-sm" onClick={apriModale}>
          <i className="bi bi-pencil-square"></i>
          <span className="d-none d-sm-inline">Modifica</span>
        </button>
        <button type="button" className="btn btn-outline-danger rounded-3 d-flex align-items-center gap-2" onClick={apriModaleElimina}>
          <i className="bi bi-trash"></i>
          <span className="d-none d-sm-inline">Elimina</span>
        </button>
      </div>
    </div>
  );
}

export default ProfileHeader;
