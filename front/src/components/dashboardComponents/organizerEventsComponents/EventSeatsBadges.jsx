// Gruppo badge con posti prenotati, disponibili e totali.
// Riceve le funzioni di calcolo dal componente organizzatore.
function EventSeatsBadges({
  evento,
  getPostiPrenotati,
  getPostiDisponibili,
  getPostiTotali,
}) {
  return (
    <div className="d-flex flex-wrap gap-1">
      <span className="badge px-2 py-1 rounded-pill bg-primary bg-opacity-10 text-primary">
        {getPostiPrenotati(evento)} prenotati
      </span>
      <span
        className={`badge px-2 py-1 rounded-pill ${evento.available > 0 ? "bg-success bg-opacity-10 text-success" : "bg-danger bg-opacity-10 text-danger"}`}
      >
        {getPostiDisponibili(evento)} disponibili
      </span>
      <span className="badge px-2 py-1 rounded-pill bg-secondary bg-opacity-10 text-secondary">
        {getPostiTotali(evento)} totali
      </span>
    </div>
  );
}

export default EventSeatsBadges;
