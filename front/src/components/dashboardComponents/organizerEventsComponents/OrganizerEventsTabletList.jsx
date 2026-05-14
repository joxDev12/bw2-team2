// Vista tablet degli eventi organizzatore in formato card orizzontale.
// Mantiene le stesse azioni della tabella ma con layout piu compatto.
import EventActionButtons from "./EventActionButtons";
import EventPriceBadge from "./EventPriceBadge";
import EventSeatsBadges from "./EventSeatsBadges";
import EventTitleCell from "./EventTitleCell";

function OrganizerEventsTabletList({
  eventi,
  getImmagineEvento,
  getPrezzoEvento,
  getPostiPrenotati,
  getPostiDisponibili,
  getPostiTotali,
  apriModaleModifica,
  apriModaleElimina,
}) {
  return (
    <div className="d-none d-md-block d-xl-none">
      <div className="d-flex flex-column gap-3">
        {eventi.map((evento) => (
          <div key={evento.id} className="card border-0 shadow-sm rounded-4">
            <div className="card-body">
              <div className="row g-3 align-items-center pb-3 border-bottom">
                <div className="col-5">
                  <EventTitleCell
                    evento={evento}
                    getImmagineEvento={getImmagineEvento}
                  />
                </div>
                <div className="col-3 small">
                  <i className="bi bi-calendar3 text-primary me-2"></i>
                  {new Date(evento.date).toLocaleDateString("it-IT")}
                </div>
                <div className="col-4 small">
                  <i className="bi bi-geo-alt text-danger me-2"></i>
                  <span className="fw-semibold text-dark">
                    {evento.location}
                  </span>
                  <br />
                  <span className="ms-4">{evento.indirizzo || "-"}</span>
                </div>
              </div>

              <div className="row g-3 align-items-center pt-3">
                <div className="col-2">
                  <EventPriceBadge
                    evento={evento}
                    getPrezzoEvento={getPrezzoEvento}
                  />
                </div>
                <div className="col-6">
                  <EventSeatsBadges
                    evento={evento}
                    getPostiPrenotati={getPostiPrenotati}
                    getPostiDisponibili={getPostiDisponibili}
                    getPostiTotali={getPostiTotali}
                  />
                </div>
                <div className="col-4">
                  <EventActionButtons
                    evento={evento}
                    apriModaleModifica={apriModaleModifica}
                    apriModaleElimina={apriModaleElimina}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrganizerEventsTabletList;
