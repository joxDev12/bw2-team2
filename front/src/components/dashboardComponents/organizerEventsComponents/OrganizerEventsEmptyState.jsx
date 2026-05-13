// Stato vuoto della sezione eventi organizzatore.
// Cambia testo e icona se non ci sono eventi o se il filtro non trova risultati.
function OrganizerEventsEmptyState({ tipo }) {
  const isFiltroVuoto = tipo === "filtro";

  return (
    <div className="text-center py-5 bg-light rounded-4">
      <i className={`bi ${isFiltroVuoto ? "bi-funnel" : "bi-calendar-plus"} fs-1 text-muted mb-3 d-block`}></i>
      <h5>{isFiltroVuoto ? "Nessun evento trovato" : "Nessun evento creato"}</h5>
      <p className="text-muted">
        {isFiltroVuoto ? "Non ci sono eventi per questo filtro." : "Non hai ancora creato nessun evento."}
      </p>
    </div>
  );
}

export default OrganizerEventsEmptyState;
