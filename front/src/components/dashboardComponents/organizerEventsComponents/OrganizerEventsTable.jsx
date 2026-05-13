// Vista desktop degli eventi organizzatore in formato tabella.
// Usa componenti piccoli per titolo, prezzo, posti e azioni.
import EventActionButtons from "./EventActionButtons";
import EventPriceBadge from "./EventPriceBadge";
import EventSeatsBadges from "./EventSeatsBadges";
import EventTitleCell from "./EventTitleCell";

function OrganizerEventsTable({
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
    <div className="table-responsive bg-white rounded-4 shadow-sm border border-light d-none d-xl-block">
      <table className="table table-hover align-middle mb-0 border-0">
        <thead className="table-light">
          <tr>
            <th className="px-4 py-3 border-0 rounded-start-3">Titolo</th>
            <th className="px-4 py-3 border-0">Data</th>
            <th className="px-4 py-3 border-0">Luogo</th>
            <th className="px-4 py-3 border-0">Prezzo</th>
            <th className="px-4 py-3 border-0">Posti</th>
            <th className="px-4 py-3 border-0 text-end rounded-end-3">Azioni</th>
          </tr>
        </thead>
        <tbody>
          {eventi.map((evento) => (
            <tr key={evento.id}>
              <td className="px-4 py-3 border-bottom-0">
                <EventTitleCell evento={evento} getImmagineEvento={getImmagineEvento} />
              </td>
              <td className="px-4 py-3 border-bottom-0 text-muted">
                {new Date(evento.date).toLocaleDateString("it-IT")}
              </td>
              <td className="px-4 py-3 border-bottom-0 text-muted">
                <span className="fw-semibold text-dark">{evento.location}</span>
                <br />
                <small>{evento.indirizzo || "-"}</small>
              </td>
              <td className="px-4 py-3 border-bottom-0">
                <EventPriceBadge evento={evento} getPrezzoEvento={getPrezzoEvento} />
              </td>
              <td className="px-4 py-3 border-bottom-0">
                <EventSeatsBadges
                  evento={evento}
                  getPostiPrenotati={getPostiPrenotati}
                  getPostiDisponibili={getPostiDisponibili}
                  getPostiTotali={getPostiTotali}
                />
              </td>
              <td className="px-4 py-3 border-bottom-0 text-end text-nowrap">
                <EventActionButtons
                  evento={evento}
                  apriModaleModifica={apriModaleModifica}
                  apriModaleElimina={apriModaleElimina}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrganizerEventsTable;
