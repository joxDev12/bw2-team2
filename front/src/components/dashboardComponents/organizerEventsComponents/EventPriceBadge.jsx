// Badge prezzo per un evento organizzatore.
// Distingue eventi gratuiti e a pagamento con colori diversi.
function EventPriceBadge({ evento, getPrezzoEvento }) {
  const className = Number(evento.price ?? 0) === 0
    ? "bg-primary bg-opacity-10 text-primary"
    : "bg-success bg-opacity-10 text-success";

  return (
    <span className={`badge px-2 py-1 rounded-pill ${className}`}>
      {getPrezzoEvento(evento)}
    </span>
  );
}

export default EventPriceBadge;
