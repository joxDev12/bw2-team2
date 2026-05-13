// Vista tablet degli eventi organizzatore in formato card orizzontale.
// Mantiene le stesse azioni della tabella ma con layout piu compatto.
import EventActionButtons from "./EventActionButtons";
import EventPriceBadge from "./EventPriceBadge";
import EventSeatsBadges from "./EventSeatsBadges";
import EventTitleCell from "./EventTitleCell";

import { useOrganizerEventsContext } from "./OrganizerEventsContext";

function OrganizerEventsTabletList() {
  const { eventi } = useOrganizerEventsContext();
  return (
    <div className="d-none d-md-block d-xl-none">
      <div className="d-flex flex-column gap-3">
        {eventi.map((evento) => (
          <div key={evento.id} className="card border-0 shadow-sm rounded-4">
            <div className="card-body">
              <div className="row g-3 align-items-center pb-3 border-bottom">
                <div className="col-5">
                  <EventTitleCell evento={evento} />
                </div>
                <div className="col-3 text-muted small">
                  <i className="bi bi-calendar3 text-primary me-2"></i>
                  {new Date(evento.date).toLocaleDateString("it-IT")}
                </div>
                <div className="col-4 text-muted small">
                  <i className="bi bi-geo-alt text-danger me-2"></i>
                  <span className="fw-semibold text-dark">{evento.location}</span>
                  <br />
                  <span className="ms-4">{evento.indirizzo || "-"}</span>
                </div>
              </div>

              <div className="row g-3 align-items-center pt-3">
                <div className="col-2">
                  <EventPriceBadge evento={evento} />
                </div>
                <div className="col-6">
                  <EventSeatsBadges
                    evento={evento}
                  />
                </div>
                <div className="col-4">
                  <EventActionButtons
                    evento={evento}
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
