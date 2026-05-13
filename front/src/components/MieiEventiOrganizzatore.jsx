import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { eventsAPI } from "../services/api";
import { Link } from "react-router-dom";

function MieiEventiOrganizzatore() {
  const { utente } = useAuth();
  const [eventi, setEventi] = useState([]);
  const [caricamento, setCaricamento] = useState(true);
  const [errore, setErrore] = useState(null);

  // Stati per la modale di modifica
  const [eventoInModifica, setEventoInModifica] = useState(null);
  const [mostraModale, setMostraModale] = useState(false);
  const [datiForm, setDatiForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    max_seats: "",
    category: "",
    image: ""
  });

  useEffect(() => {
    let annullato = false;

    const caricaDati = async () => {
      try {
        setCaricamento(true);
        const dati = await eventsAPI.getByOrganizerId(utente.id);
        if (!annullato) setEventi(dati);
      } catch (err) {
        if (!annullato) {
          if (err.status === 404) {
            setEventi([]);
          } else {
            setErrore(err.message || "Errore nel caricamento degli eventi creati");
          }
        }
      } finally {
        if (!annullato) setCaricamento(false);
      }
    };

    caricaDati();

    return () => {
      annullato = true;
    };
  }, [utente.id]);

  const gestisciElimina = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo evento?")) {
      try {
        await eventsAPI.elimina(id);
        setEventi(eventi.filter(e => e.id !== id));
      } catch (err) {
        alert(err.message || "Errore durante l'eliminazione");
      }
    }
  };

  // Funzioni per la modale
  const apriModaleModifica = (evento) => {
    setEventoInModifica(evento);
    setDatiForm({
      title: evento.title || "",
      description: evento.description || "",
      date: evento.date ? new Date(evento.date).toISOString().split('T')[0] : "",
      location: evento.location || "",
      max_seats: evento.max_seats || "",
      category: evento.category || "",
      image: evento.image || ""
    });
    setMostraModale(true);
  };

  const chiudiModale = () => {
    setMostraModale(false);
    setEventoInModifica(null);
  };

  const gestisciCambioInput = (e) => {
    const { name, value } = e.target;
    setDatiForm(prev => ({ ...prev, [name]: value }));
  };

  const gestisciSubmitModifica = async (e) => {
    e.preventDefault();
    try {
      const eventoAggiornato = await eventsAPI.aggiorna(eventoInModifica.id, datiForm);
      setEventi(eventi.map(ev => ev.id === eventoInModifica.id ? eventoAggiornato : ev));
      chiudiModale();
      alert("Evento aggiornato con successo!");
    } catch (err) {
      alert(err.message || "Errore durante l'aggiornamento dell'evento");
    }
  };

  if (caricamento) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  if (errore) return <div className="alert alert-danger m-4">{errore}</div>;

  return (
    <div className="miei-eventi-organizzatore">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            Gestione <span className="text-primary">Eventi</span>
          </h2>
          <p className="text-muted mb-0">Visualizza e modifica gli eventi che hai creato</p>
        </div>
      </div>

      {eventi.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-4">
          <i className="bi bi-calendar-plus fs-1 text-muted mb-3 d-block"></i>
          <h5>Nessun evento creato</h5>
          <p className="text-muted">Non hai ancora creato nessun evento.</p>
        </div>
      ) : (
        <>
          {/* Vista Desktop (Tabella) */}
          <div className="table-responsive bg-white rounded-4 shadow-sm border border-light d-none d-md-block">
            <table className="table table-hover align-middle mb-0 border-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3 border-0 rounded-start-3">Titolo</th>
                  <th className="px-4 py-3 border-0">Data</th>
                  <th className="px-4 py-3 border-0">Posti</th>
                  <th className="px-4 py-3 border-0 text-end rounded-end-3">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {eventi.map((evento) => (
                  <tr key={evento.id}>
                    <td className="px-4 py-3 border-bottom-0 fw-semibold">
                      {evento.title}
                      <br/>
                      <span className="badge bg-secondary bg-opacity-10 text-secondary fw-normal mt-1">{evento.category}</span>
                    </td>
                    <td className="px-4 py-3 border-bottom-0 text-muted">
                      {new Date(evento.date).toLocaleDateString('it-IT')}
                    </td>
                    <td className="px-4 py-3 border-bottom-0">
                      <span className={`badge px-2 py-1 rounded-pill ${evento.available > 0 ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                        {evento.max_seats - evento.available} / {evento.max_seats} occupati
                      </span>
                    </td>
                    <td className="px-4 py-3 border-bottom-0 text-end">
                      <Link to={`/eventi/${evento.id}`} className="btn btn-sm btn-light text-primary rounded-pill me-2 shadow-sm" title="Vedi evento">
                        <i className="bi bi-eye"></i>
                      </Link>
                      <button onClick={() => apriModaleModifica(evento)} className="btn btn-sm btn-light text-secondary rounded-pill me-2 shadow-sm" title="Modifica">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button onClick={() => gestisciElimina(evento.id)} className="btn btn-sm btn-light text-danger rounded-pill shadow-sm" title="Elimina">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Vista Mobile (Card) */}
          <div className="d-block d-md-none row g-3">
            {eventi.map((evento) => (
              <div key={evento.id} className="col-12">
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title fw-bold mb-0">{evento.title}</h5>
                      <Link to={`/eventi/${evento.id}`} className="btn btn-sm btn-light text-primary rounded-pill shadow-sm">
                        <i className="bi bi-eye"></i>
                      </Link>
                    </div>
                    <span className="badge bg-secondary bg-opacity-10 text-secondary fw-normal mb-3 d-inline-block">{evento.category}</span>
                    
                    <div className="d-flex flex-column gap-2 text-muted small mb-3">
                      <span className="d-flex align-items-center">
                        <i className="bi bi-calendar3 text-primary me-2"></i>
                        {new Date(evento.date).toLocaleDateString('it-IT')}
                      </span>
                      <span className="d-flex align-items-center">
                        <i className="bi bi-people text-info me-2"></i>
                        {evento.max_seats - evento.available} / {evento.max_seats} occupati
                      </span>
                    </div>
                    
                    <div className="d-flex gap-2 border-top pt-3 mt-2">
                      <button onClick={() => apriModaleModifica(evento)} className="btn btn-sm btn-outline-secondary flex-grow-1 rounded-pill">
                        <i className="bi bi-pencil me-2"></i> Modifica
                      </button>
                      <button onClick={() => gestisciElimina(evento.id)} className="btn btn-sm btn-outline-danger flex-grow-1 rounded-pill">
                        <i className="bi bi-trash me-2"></i> Elimina
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modale di Modifica */}
      {mostraModale && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content rounded-4 border-0 shadow">
                <div className="modal-header border-bottom-0 pb-0">
                  <h5 className="modal-title fw-bold">Modifica Evento</h5>
                  <button type="button" className="btn-close" onClick={chiudiModale} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={gestisciSubmitModifica}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Titolo</label>
                        <input type="text" className="form-control" name="title" value={datiForm.title} onChange={gestisciCambioInput} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Categoria</label>
                        <input type="text" className="form-control" name="category" value={datiForm.category} onChange={gestisciCambioInput} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Data</label>
                        <input type="date" className="form-control" name="date" value={datiForm.date} onChange={gestisciCambioInput} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Luogo</label>
                        <input type="text" className="form-control" name="location" value={datiForm.location} onChange={gestisciCambioInput} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Posti Massimi</label>
                        <input type="number" className="form-control" name="max_seats" value={datiForm.max_seats} onChange={gestisciCambioInput} required min="1" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">URL Immagine</label>
                        <input type="url" className="form-control" name="image" value={datiForm.image} onChange={gestisciCambioInput} />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">Descrizione</label>
                        <textarea className="form-control" name="description" rows="3" value={datiForm.description} onChange={gestisciCambioInput} required></textarea>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                      <button type="button" className="btn btn-light rounded-pill px-4" onClick={chiudiModale}>Annulla</button>
                      <button type="submit" className="btn btn-primary rounded-pill px-4">Salva Modifiche</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MieiEventiOrganizzatore;
