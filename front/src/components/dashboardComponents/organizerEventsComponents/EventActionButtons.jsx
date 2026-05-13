// Gruppo di pulsanti azione per un evento: dettaglio, modifica, elimina.
// Ha una variante mobile con pulsanti larghi e testuali.
import { Link } from "react-router-dom";

function EventActionButtons({ evento, apriModaleModifica, apriModaleElimina, mobile = false }) {
  if (mobile) {
    return (
      <div className="d-flex gap-2 border-top pt-3 mt-2">
        <button onClick={() => apriModaleModifica(evento)} className="btn btn-sm btn-outline-secondary flex-grow-1 rounded-pill">
          <i className="bi bi-pencil me-2"></i> Modifica
        </button>
        <button onClick={() => apriModaleElimina(evento)} className="btn btn-sm btn-outline-danger flex-grow-1 rounded-pill">
          <i className="bi bi-trash me-2"></i> Elimina
        </button>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-end gap-2 flex-nowrap">
      <Link to={`/eventi/${evento.id}`} className="btn btn-sm btn-light text-primary rounded-pill shadow-sm flex-shrink-0" title="Vedi evento">
        <i className="bi bi-eye"></i>
      </Link>
      <button onClick={() => apriModaleModifica(evento)} className="btn btn-sm btn-light text-secondary rounded-pill shadow-sm flex-shrink-0" title="Modifica">
        <i className="bi bi-pencil"></i>
      </button>
      <button onClick={() => apriModaleElimina(evento)} className="btn btn-sm btn-light text-danger rounded-pill shadow-sm flex-shrink-0" title="Elimina">
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
}

export default EventActionButtons;
