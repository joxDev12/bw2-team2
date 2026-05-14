// Vista mobile degli eventi organizzatore in formato card.
// Mostra dettagli compatti e azioni principali per ogni evento.
import { Link } from "react-router-dom";
import EventActionButtons from "./EventActionButtons";
import EventPriceBadge from "./EventPriceBadge";
import EventSeatsBadges from "./EventSeatsBadges";
import EventTitleCell from "./EventTitleCell";

import { useOrganizerEventsContext } from "./OrganizerEventsContext";

function OrganizerEventsMobileList() {
  const { eventi } = useOrganizerEventsContext();
  return (
    <div className="d-block d-md-none row g-3">
      {eventi.map((evento) => (
        <div key={evento.id} className="col-12">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <EventTitleCell evento={evento} heading />
                <Link to={`/eventi/${evento.id}`} className="btn btn-sm btn-light text-primary rounded-pill shadow-sm">
                  <i className="bi bi-eye"></i>
                </Link>
              </div>

              <div className="d-flex flex-column gap-2 small mb-3">
                <span className="d-flex align-items-center">
                  <i className="bi bi-calendar3 text-primary me-2"></i>
                  {new Date(evento.date).toLocaleDateString("it-IT")}
                </span>
                <span className="d-flex align-items-center">
                  <i className="bi bi-geo-alt text-danger me-2"></i>
                  {evento.location} - {evento.indirizzo || "-"}
                </span>
                <span className="d-flex align-items-center">
                  <i className="bi bi-cash-coin text-success me-2"></i>
                  <EventPriceBadge evento={evento} />
                </span>
                <span className="d-flex align-items-center flex-wrap gap-1">
                  <i className="bi bi-people text-info me-2"></i>
                  <EventSeatsBadges
                    evento={evento}
                  />
                </span>
              </div>

              <EventActionButtons
                evento={evento}
                mobile
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrganizerEventsMobileList;
