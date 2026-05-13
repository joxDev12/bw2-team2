// Cella/card con immagine, titolo e categoria dell'evento.
// Viene usata in tabella desktop e nelle card responsive.
import { getImmagineEvento } from "./organizerEventUtils";

function EventTitleCell({ evento, heading = false }) {
  const TitleTag = heading ? "h5" : "span";

  return (
    <div className="d-flex align-items-center gap-3">
      <img
        src={getImmagineEvento(evento)}
        alt={evento.title}
        className="rounded-3 object-fit-cover flex-shrink-0"
        style={{ width: "58px", height: "58px" }}
      />
      <div>
        <TitleTag className={heading ? "card-title fw-bold mb-0" : "fw-semibold"}>
          {evento.title}
        </TitleTag>
        {!heading && <br />}
        <span className="badge bg-secondary bg-opacity-10 text-secondary fw-normal mt-1">
          {evento.category}
        </span>
      </div>
    </div>
  );
}

export default EventTitleCell;
