// Modale form riutilizzata per creare e modificare eventi.
// Gestisce campi testo, select, immagine e pulsanti di salvataggio.
import eventsPlaceholder from "../../../assets/img/events_placeholder.webp";

function EventFormModal({
  titolo,
  form,
  errore,
  caricamento,
  anteprimaImmagine,
  nomeImmagine,
  fileInputId,
  categorieEvento,
  cittaEvento,
  minPosti,
  testoBottone,
  testoCaricamento,
  onChange,
  onImageChange,
  onSubmit,
  onClose,
}) {
  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content rounded-4 border-0 shadow">
          <div className="modal-header border-bottom-0 pb-0">
            <h5 className="modal-title fw-bold">{titolo}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body py-3">
            <form onSubmit={onSubmit}>
              {errore && (
                <div className="alert alert-danger" role="alert">
                  {errore}
                </div>
              )}

              <div className="mb-3">
                <img
                  src={anteprimaImmagine || eventsPlaceholder}
                  alt="Anteprima evento"
                  className="w-100 rounded-3 border shadow-sm"
                  style={{ height: "170px", objectFit: "cover" }}
                />
                <div className="d-flex align-items-center gap-2 flex-wrap mt-2">
                  <input
                    type="file"
                    className="d-none"
                    id={fileInputId}
                    name="image"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={onImageChange}
                  />
                  <label
                    htmlFor={fileInputId}
                    className="btn btn-outline-primary rounded-3 mb-0"
                  >
                    Scegli la foto
                  </label>
                  <span className="small">
                    {nomeImmagine || "nessuna foto selezionata"}
                  </span>
                </div>
              </div>

              <div className="row g-2">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Titolo</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={form.title}
                    onChange={onChange}
                    required
                    maxLength="500"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Categoria</label>
                  <select
                    className="form-select"
                    name="category"
                    value={form.category}
                    onChange={onChange}
                    required
                  >
                    <option value="">Seleziona categoria</option>
                    {categorieEvento.map((categoria) => (
                      <option key={categoria} value={categoria}>
                        {categoria}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Data</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={form.date}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Citta</label>
                  <select
                    className="form-select"
                    name="location"
                    value={form.location}
                    onChange={onChange}
                    required
                  >
                    <option value="">Seleziona citta</option>
                    {cittaEvento.map((citta) => (
                      <option key={citta} value={citta}>
                        {citta}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Indirizzo</label>
                  <input
                    type="text"
                    className="form-control"
                    name="indirizzo"
                    value={form.indirizzo}
                    onChange={onChange}
                    maxLength="500"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Prezzo</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={form.price}
                    onChange={onChange}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">
                    Posti Massimi
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="max_seats"
                    value={form.max_seats}
                    onChange={onChange}
                    required
                    min={minPosti}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Descrizione</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="2"
                    value={form.description}
                    onChange={onChange}
                  ></textarea>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-3 pt-3 border-top">
                <button
                  type="button"
                  className="btn btn-light rounded-pill px-4"
                  onClick={onClose}
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="btn btn-primary rounded-pill px-4"
                  disabled={caricamento}
                >
                  {caricamento ? testoCaricamento : testoBottone}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventFormModal;
