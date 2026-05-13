import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { eventsAPI } from "../services/api";
import { Link } from "react-router-dom";
import eventsPlaceholder from "../assets/img/events_placeholder.webp";
import ProfiloToast from "./ProfiloToast";

const datiEventoVuoti = {
  title: "",
  description: "",
  date: "",
  location: "",
  indirizzo: "",
  price: "",
  max_seats: "",
  category: "",
};

const categorieEvento = [
  "Musica",
  "Sport",
  "Tecnologia",
  "Cultura e Spettacolo",
  "Enogastronomia",
];

const cittaEvento = [
  "Roma",
  "Napoli",
  "Firenze",
  "Ancona",
  "Milano",
];

const getPostiPrenotati = (evento) => Number(evento.seats_prenotati ?? 0);
const getPostiDisponibili = (evento) => Number(evento.max_seats ?? 0);
const getPostiTotali = (evento) => getPostiPrenotati(evento) + getPostiDisponibili(evento);
const getPrezzoEvento = (evento) => Number(evento.price ?? 0) === 0 ? "Gratis" : `${Number(evento.price).toFixed(2)} euro`;
const getImmagineEvento = (evento) => evento.image || eventsPlaceholder;

function MieiEventiOrganizzatore() {
  const { utente } = useAuth();
  const [eventi, setEventi] = useState([]);
  const [filtroEventi, setFiltroEventi] = useState("data_avvenimento");
  const [caricamento, setCaricamento] = useState(true);
  const [errore, setErrore] = useState(null);
  const [toast, setToast] = useState(null);

  // Stati per la modale di eliminazione
  const [eventoDaEliminare, setEventoDaEliminare] = useState(null);
  const [erroreElimina, setErroreElimina] = useState(null);
  const [caricamentoElimina, setCaricamentoElimina] = useState(false);

  // Stati per la modale di creazione
  const [mostraModaleCreazione, setMostraModaleCreazione] = useState(false);
  const [erroreModaleCreazione, setErroreModaleCreazione] = useState(null);
  const [caricamentoModaleCreazione, setCaricamentoModaleCreazione] = useState(false);
  const [immagineNuovoEvento, setImmagineNuovoEvento] = useState(null);
  const [anteprimaNuovaImmagine, setAnteprimaNuovaImmagine] = useState(null);
  const [datiFormCreazione, setDatiFormCreazione] = useState(datiEventoVuoti);

  // Stati per la modale di modifica
  const [eventoInModifica, setEventoInModifica] = useState(null);
  const [mostraModale, setMostraModale] = useState(false);
  const [erroreModale, setErroreModale] = useState(null);
  const [caricamentoModale, setCaricamentoModale] = useState(false);
  const [immagineEvento, setImmagineEvento] = useState(null);
  const [anteprimaImmagine, setAnteprimaImmagine] = useState(null);
  const [datiForm, setDatiForm] = useState(datiEventoVuoti);

  useEffect(() => {
    let annullato = false;

    const caricaDati = async () => {
      try {
        setCaricamento(true);
        const dati = utente.role === "admin"
          ? await eventsAPI.getAll()
          : await eventsAPI.getByOrganizerId(utente.id);
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
  }, [utente.id, utente.role]);

  const apriModaleElimina = (evento) => {
    setEventoDaEliminare(evento);
    setErroreElimina(null);
  };

  const chiudiModaleElimina = () => {
    setEventoDaEliminare(null);
    setErroreElimina(null);
  };

  const gestisciElimina = async () => {
    if (!eventoDaEliminare) return;

    setErroreElimina(null);
    setCaricamentoElimina(true);

    try {
      await eventsAPI.elimina(eventoDaEliminare.id);
      setEventi(eventi.filter(e => e.id !== eventoDaEliminare.id));
      chiudiModaleElimina();
      mostraToast("Evento eliminato con successo!");
    } catch (err) {
      setErroreElimina(err.message || "Errore durante l'eliminazione");
    } finally {
      setCaricamentoElimina(false);
    }
  };

  const mostraToast = (messaggio, tipo = "success") => {
    setToast({ messaggio, tipo });
    setTimeout(() => setToast(null), 3500);
  };

  // Funzioni per la modale di creazione
  const apriModaleCreazione = () => {
    setDatiFormCreazione(datiEventoVuoti);
    setImmagineNuovoEvento(null);
    setAnteprimaNuovaImmagine(eventsPlaceholder);
    setErroreModaleCreazione(null);
    setMostraModaleCreazione(true);
  };

  const chiudiModaleCreazione = () => {
    setMostraModaleCreazione(false);
    setDatiFormCreazione(datiEventoVuoti);
    setImmagineNuovoEvento(null);
    setAnteprimaNuovaImmagine(null);
    setErroreModaleCreazione(null);
  };

  const gestisciCambioInputCreazione = (e) => {
    const { name, value } = e.target;
    setDatiFormCreazione(prev => ({ ...prev, [name]: value }));
  };

  const gestisciCambioImmagineCreazione = (e) => {
    const file = e.target.files[0] || null;
    setImmagineNuovoEvento(file);
    setAnteprimaNuovaImmagine(file ? URL.createObjectURL(file) : eventsPlaceholder);
  };

  const gestisciSubmitCreazione = async (e) => {
    e.preventDefault();
    setErroreModaleCreazione(null);
    setCaricamentoModaleCreazione(true);

    try {
      const dati = {
        title: datiFormCreazione.title,
        description: datiFormCreazione.description,
        date: datiFormCreazione.date,
        location: datiFormCreazione.location,
        indirizzo: datiFormCreazione.indirizzo,
        ...(datiFormCreazione.price !== "" && { price: datiFormCreazione.price }),
        max_seats: datiFormCreazione.max_seats,
        category: datiFormCreazione.category,
      };

      const nuovoEvento = await eventsAPI.crea(dati);
      const eventoCreato = immagineNuovoEvento
        ? await eventsAPI.aggiornaImmagine(nuovoEvento.id, immagineNuovoEvento)
        : nuovoEvento;

      setEventi([eventoCreato, ...eventi]);
      chiudiModaleCreazione();
      mostraToast("Evento creato con successo!");
    } catch (err) {
      setErroreModaleCreazione(err.message || "Errore durante la creazione dell'evento");
    } finally {
      setCaricamentoModaleCreazione(false);
    }
  };

  const getEventiFiltrati = () => {
    const oggi = new Date();
    oggi.setHours(0, 0, 0, 0);

    let eventiFiltrati = [...eventi];

    if (filtroEventi === "in_corso") {
      eventiFiltrati = eventiFiltrati.filter(evento => new Date(evento.date) >= oggi);
    }

    if (filtroEventi === "passati") {
      eventiFiltrati = eventiFiltrati.filter(evento => new Date(evento.date) < oggi);
    }

    eventiFiltrati.sort((a, b) => {
      if (filtroEventi === "data_creazione") {
        return new Date(b.created_at) - new Date(a.created_at);
      }

      if (filtroEventi === "prenotazioni_piu") {
        return getPostiPrenotati(b) - getPostiPrenotati(a);
      }

      if (filtroEventi === "prenotazioni_meno") {
        return getPostiPrenotati(a) - getPostiPrenotati(b);
      }

      return new Date(a.date) - new Date(b.date);
    });

    return eventiFiltrati;
  };

  const eventiFiltrati = getEventiFiltrati();

  // Funzioni per la modale
  const apriModaleModifica = (evento) => {
    setEventoInModifica(evento);
    setDatiForm({
      title: evento.title || "",
      description: evento.description || "",
      date: evento.date ? new Date(evento.date).toISOString().split('T')[0] : "",
      location: evento.location || "",
      indirizzo: evento.indirizzo || "",
      price: evento.price ?? "",
      max_seats: evento.max_seats ?? "",
      category: evento.category || "",
    });
    setImmagineEvento(null);
    setAnteprimaImmagine(getImmagineEvento(evento));
    setErroreModale(null);
    setMostraModale(true);
  };

  const chiudiModale = () => {
    setMostraModale(false);
    setEventoInModifica(null);
    setErroreModale(null);
    setImmagineEvento(null);
    setAnteprimaImmagine(null);
  };

  const gestisciCambioInput = (e) => {
    const { name, value } = e.target;
    setDatiForm(prev => ({ ...prev, [name]: value }));
  };

  const gestisciCambioImmagine = (e) => {
    const file = e.target.files[0] || null;
    setImmagineEvento(file);
    setAnteprimaImmagine(file ? URL.createObjectURL(file) : getImmagineEvento(eventoInModifica));
  };

  const gestisciSubmitModifica = async (e) => {
    e.preventDefault();
    setErroreModale(null);
    setCaricamentoModale(true);

    try {
      const dati = {
        title: datiForm.title,
        description: datiForm.description,
        date: datiForm.date,
        location: datiForm.location,
        indirizzo: datiForm.indirizzo,
        ...(datiForm.price !== "" && { price: datiForm.price }),
        max_seats: datiForm.max_seats,
        category: datiForm.category,
      };

      const risposta = await eventsAPI.aggiorna(eventoInModifica.id, dati);
      const eventoAggiornato = immagineEvento
        ? await eventsAPI.aggiornaImmagine(eventoInModifica.id, immagineEvento)
        : risposta;

      setEventi(eventi.map(ev => ev.id === eventoInModifica.id ? eventoAggiornato : ev));
      chiudiModale();
      mostraToast("Evento aggiornato con successo!");
    } catch (err) {
      setErroreModale(err.message || "Errore durante l'aggiornamento dell'evento");
    } finally {
      setCaricamentoModale(false);
    }
  };

  if (caricamento) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  if (errore) return <div className="alert alert-danger m-4">{errore}</div>;

  return (
    <div className="miei-eventi-organizzatore">
      <ProfiloToast toast={toast} onClose={() => setToast(null)} />

      <div className="row align-items-start mb-4 g-3">
        <div className="col-md-4">
          <h2 className="fw-bold mb-1">
            Gestione <span className="text-primary">Eventi</span>
          </h2>
          <p className="text-muted mb-0">Visualizza e modifica gli eventi che hai creato</p>
        </div>
        <div className="col-md-4 d-flex justify-content-center">
          <select className="form-select rounded-pill" value={filtroEventi} onChange={(e) => setFiltroEventi(e.target.value)}>
            <option value="data_creazione">Data di creazione</option>
            <option value="data_avvenimento">Data di avvenimento</option>
            <option value="in_corso">In corso</option>
            <option value="passati">Passati</option>
            <option value="prenotazioni_piu">Piu prenotate</option>
            <option value="prenotazioni_meno">Meno prenotate</option>
          </select>
        </div>
        <div className="col-md-4 d-flex justify-content-center justify-content-md-end">
          <button type="button" className="btn btn-primary rounded-pill px-4" onClick={apriModaleCreazione}>
            <i className="bi bi-plus-lg me-2"></i>
            Crea evento
          </button>
        </div>
      </div>

      {eventi.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-4">
          <i className="bi bi-calendar-plus fs-1 text-muted mb-3 d-block"></i>
          <h5>Nessun evento creato</h5>
          <p className="text-muted">Non hai ancora creato nessun evento.</p>
        </div>
      ) : eventiFiltrati.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-4">
          <i className="bi bi-funnel fs-1 text-muted mb-3 d-block"></i>
          <h5>Nessun evento trovato</h5>
          <p className="text-muted">Non ci sono eventi per questo filtro.</p>
        </div>
      ) : (
        <>
          {/* Vista Desktop (Tabella) */}
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
                {eventiFiltrati.map((evento) => (
                  <tr key={evento.id}>
                    <td className="px-4 py-3 border-bottom-0 fw-semibold">
                      <div className="d-flex align-items-center gap-3">
                        <img src={getImmagineEvento(evento)} alt={evento.title} className="rounded-3 object-fit-cover" style={{ width: "58px", height: "58px" }} />
                        <div>
                          {evento.title}
                          <br/>
                          <span className="badge bg-secondary bg-opacity-10 text-secondary fw-normal mt-1">{evento.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 border-bottom-0 text-muted">
                      {new Date(evento.date).toLocaleDateString('it-IT')}
                    </td>
                    <td className="px-4 py-3 border-bottom-0 text-muted">
                      <span className="fw-semibold text-dark">{evento.location}</span>
                      <br />
                      <small>{evento.indirizzo || "-"}</small>
                    </td>
                    <td className="px-4 py-3 border-bottom-0">
                      <span className={`badge px-2 py-1 rounded-pill ${Number(evento.price ?? 0) === 0 ? 'bg-primary bg-opacity-10 text-primary' : 'bg-success bg-opacity-10 text-success'}`}>
                        {getPrezzoEvento(evento)}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-bottom-0">
                      <div className="d-flex flex-wrap gap-1">
                        <span className="badge px-2 py-1 rounded-pill bg-primary bg-opacity-10 text-primary">
                          {getPostiPrenotati(evento)} prenotati
                        </span>
                        <span className={`badge px-2 py-1 rounded-pill ${evento.available > 0 ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                          {getPostiDisponibili(evento)} disponibili
                        </span>
                        <span className="badge px-2 py-1 rounded-pill bg-secondary bg-opacity-10 text-secondary">
                          {getPostiTotali(evento)} totali
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 border-bottom-0 text-end text-nowrap">
                      <Link to={`/eventi/${evento.id}`} className="btn btn-sm btn-light text-primary rounded-pill me-2 shadow-sm" title="Vedi evento">
                        <i className="bi bi-eye"></i>
                      </Link>
                      <button onClick={() => apriModaleModifica(evento)} className="btn btn-sm btn-light text-secondary rounded-pill me-2 shadow-sm" title="Modifica">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button onClick={() => apriModaleElimina(evento)} className="btn btn-sm btn-light text-danger rounded-pill shadow-sm" title="Elimina">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Vista Tablet (Card su due righe) */}
          <div className="d-none d-md-block d-xl-none">
            <div className="d-flex flex-column gap-3">
              {eventiFiltrati.map((evento) => (
                <div key={evento.id} className="card border-0 shadow-sm rounded-4">
                  <div className="card-body">
                    <div className="row g-3 align-items-center pb-3 border-bottom">
                      <div className="col-5">
                        <div className="d-flex align-items-center gap-3">
                          <img src={getImmagineEvento(evento)} alt={evento.title} className="rounded-3 object-fit-cover flex-shrink-0" style={{ width: "58px", height: "58px" }} />
                          <div>
                            <h6 className="fw-bold mb-1">{evento.title}</h6>
                            <span className="badge bg-secondary bg-opacity-10 text-secondary fw-normal">{evento.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-3 text-muted small">
                        <i className="bi bi-calendar3 text-primary me-2"></i>
                        {new Date(evento.date).toLocaleDateString('it-IT')}
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
                        <span className={`badge px-2 py-1 rounded-pill ${Number(evento.price ?? 0) === 0 ? 'bg-primary bg-opacity-10 text-primary' : 'bg-success bg-opacity-10 text-success'}`}>
                          {getPrezzoEvento(evento)}
                        </span>
                      </div>
                      <div className="col-6">
                        <div className="d-flex flex-wrap gap-1">
                          <span className="badge px-2 py-1 rounded-pill bg-primary bg-opacity-10 text-primary">
                            {getPostiPrenotati(evento)} prenotati
                          </span>
                          <span className={`badge px-2 py-1 rounded-pill ${evento.available > 0 ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                            {getPostiDisponibili(evento)} disponibili
                          </span>
                          <span className="badge px-2 py-1 rounded-pill bg-secondary bg-opacity-10 text-secondary">
                            {getPostiTotali(evento)} totali
                          </span>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="d-flex justify-content-end gap-2 flex-nowrap">
                          <Link to={`/eventi/${evento.id}`} className="btn btn-sm btn-light text-primary rounded-pill shadow-sm flex-shrink-0" title="Vedi evento">
                            <i className="bi bi-eye"></i>
                          </Link>
                          <button onClick={() => apriModaleModifica(evento)} className="btn btn-sm btn-light text-secondary rounded-pill shadow-sm flex-shrink-0" title="Modifica">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button onClick={() => apriModaleElimina(evento)} className="btn btn-sm btn-light text-danger rounded-pill shadow-sm flex-shrink-0" title="Elimina">
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vista Mobile (Card) */}
          <div className="d-block d-md-none row g-3">
            {eventiFiltrati.map((evento) => (
              <div key={evento.id} className="col-12">
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="d-flex align-items-center gap-3">
                        <img src={getImmagineEvento(evento)} alt={evento.title} className="rounded-3 object-fit-cover" style={{ width: "58px", height: "58px" }} />
                        <h5 className="card-title fw-bold mb-0">{evento.title}</h5>
                      </div>
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
                        <i className="bi bi-geo-alt text-danger me-2"></i>
                        {evento.location} - {evento.indirizzo || "-"}
                      </span>
                      <span className="d-flex align-items-center">
                        <i className="bi bi-cash-coin text-success me-2"></i>
                        {getPrezzoEvento(evento)}
                      </span>
                      <span className="d-flex align-items-center flex-wrap gap-1">
                        <i className="bi bi-people text-info me-2"></i>
                        <span className="badge px-2 py-1 rounded-pill bg-primary bg-opacity-10 text-primary me-1">
                          {getPostiPrenotati(evento)} prenotati
                        </span>
                        <span className={`badge px-2 py-1 rounded-pill me-1 ${evento.available > 0 ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'}`}>
                          {getPostiDisponibili(evento)} disponibili
                        </span>
                        <span className="badge px-2 py-1 rounded-pill bg-secondary bg-opacity-10 text-secondary">
                          {getPostiTotali(evento)} totali
                        </span>
                      </span>
                    </div>
                    
                    <div className="d-flex gap-2 border-top pt-3 mt-2">
                      <button onClick={() => apriModaleModifica(evento)} className="btn btn-sm btn-outline-secondary flex-grow-1 rounded-pill">
                        <i className="bi bi-pencil me-2"></i> Modifica
                      </button>
                      <button onClick={() => apriModaleElimina(evento)} className="btn btn-sm btn-outline-danger flex-grow-1 rounded-pill">
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

      {/* Modale di Eliminazione */}
      {eventoDaEliminare && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 shadow border-0">
              <div className="modal-header border-0 pb-0 px-4 pt-4">
                <h5 className="modal-title fw-bold text-danger">
                  <i className="bi bi-trash me-2"></i>
                  Elimina evento
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={chiudiModaleElimina}
                  disabled={caricamentoElimina}
                ></button>
              </div>

              <div className="modal-body px-4 py-4">
                {erroreElimina && (
                  <div
                    className="alert alert-danger d-flex align-items-center gap-2 rounded-3"
                    role="alert"
                  >
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    {erroreElimina}
                  </div>
                )}

                <p className="mb-0">
                  Sei sicuro di voler eliminare l'evento <strong>{eventoDaEliminare.title}</strong>? Questa azione non puo essere annullata.
                </p>
              </div>

              <div className="modal-footer border-0 px-4 pb-4 pt-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-3 px-4"
                  onClick={chiudiModaleElimina}
                  disabled={caricamentoElimina}
                >
                  Annulla
                </button>
                <button
                  type="button"
                  className="btn btn-danger rounded-3 px-4 d-flex align-items-center gap-2"
                  onClick={gestisciElimina}
                  disabled={caricamentoElimina}
                >
                  {caricamentoElimina ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                      ></span>
                      Eliminazione...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-trash"></i>
                      Elimina
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modale di Creazione */}
      {mostraModaleCreazione && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content rounded-4 border-0 shadow">
                <div className="modal-header border-bottom-0 pb-0">
                  <h5 className="modal-title fw-bold">Crea Evento</h5>
                  <button type="button" className="btn-close" onClick={chiudiModaleCreazione} aria-label="Close"></button>
                </div>
                <div className="modal-body py-3">
                  <form onSubmit={gestisciSubmitCreazione}>
                    {erroreModaleCreazione && (
                      <div className="alert alert-danger" role="alert">
                        {erroreModaleCreazione}
                      </div>
                    )}
                    <div className="mb-3">
                      <img
                        src={anteprimaNuovaImmagine || eventsPlaceholder}
                        alt="Anteprima evento"
                        className="w-100 rounded-3 border shadow-sm"
                        style={{ height: "170px", objectFit: "cover" }}
                      />
                      <div className="d-flex align-items-center gap-2 flex-wrap mt-2">
                        <input
                          type="file"
                          className="d-none"
                          id="create-event-image"
                          name="image"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={gestisciCambioImmagineCreazione}
                        />
                        <label
                          htmlFor="create-event-image"
                          className="btn btn-outline-primary rounded-3 mb-0"
                        >
                          Scegli la foto
                        </label>
                        <span className="text-muted small">{immagineNuovoEvento?.name || "nessuna foto selezionata"}</span>
                      </div>
                    </div>
                    <div className="row g-2">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Titolo</label>
                        <input type="text" className="form-control" name="title" value={datiFormCreazione.title} onChange={gestisciCambioInputCreazione} required maxLength="500" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Categoria</label>
                        <select className="form-select" name="category" value={datiFormCreazione.category} onChange={gestisciCambioInputCreazione} required>
                          <option value="">Seleziona categoria</option>
                          {categorieEvento.map((categoria) => (
                            <option key={categoria} value={categoria}>{categoria}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Data</label>
                        <input type="date" className="form-control" name="date" value={datiFormCreazione.date} onChange={gestisciCambioInputCreazione} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Citta</label>
                        <select className="form-select" name="location" value={datiFormCreazione.location} onChange={gestisciCambioInputCreazione} required>
                          <option value="">Seleziona citta</option>
                          {cittaEvento.map((citta) => (
                            <option key={citta} value={citta}>{citta}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Indirizzo</label>
                        <input type="text" className="form-control" name="indirizzo" value={datiFormCreazione.indirizzo} onChange={gestisciCambioInputCreazione} maxLength="500" />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label fw-semibold">Prezzo</label>
                        <input type="number" className="form-control" name="price" value={datiFormCreazione.price} onChange={gestisciCambioInputCreazione} min="0" step="0.01" />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label fw-semibold">Posti Massimi</label>
                        <input type="number" className="form-control" name="max_seats" value={datiFormCreazione.max_seats} onChange={gestisciCambioInputCreazione} required min="1" />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">Descrizione</label>
                        <textarea className="form-control" name="description" rows="2" value={datiFormCreazione.description} onChange={gestisciCambioInputCreazione}></textarea>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-3 pt-3 border-top">
                      <button type="button" className="btn btn-light rounded-pill px-4" onClick={chiudiModaleCreazione}>Annulla</button>
                      <button type="submit" className="btn btn-primary rounded-pill px-4" disabled={caricamentoModaleCreazione}>
                        {caricamentoModaleCreazione ? "Salvataggio..." : "Crea Evento"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modale di Modifica */}
      {mostraModale && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content rounded-4 border-0 shadow">
                <div className="modal-header border-bottom-0 pb-0">
                  <h5 className="modal-title fw-bold">Modifica Evento</h5>
                  <button type="button" className="btn-close" onClick={chiudiModale} aria-label="Close"></button>
                </div>
                <div className="modal-body py-3">
                  <form onSubmit={gestisciSubmitModifica}>
                    {erroreModale && (
                      <div className="alert alert-danger" role="alert">
                        {erroreModale}
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
                          id="edit-event-image"
                          name="image"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={gestisciCambioImmagine}
                        />
                        <label
                          htmlFor="edit-event-image"
                          className="btn btn-outline-primary rounded-3 mb-0"
                        >
                          Scegli la foto
                        </label>
                        <span className="text-muted small">{immagineEvento?.name || "nessuna foto selezionata"}</span>
                      </div>
                    </div>
                    <div className="row g-2">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Titolo</label>
                        <input type="text" className="form-control" name="title" value={datiForm.title} onChange={gestisciCambioInput} required maxLength="500" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Categoria</label>
                        <select className="form-select" name="category" value={datiForm.category} onChange={gestisciCambioInput} required>
                          <option value="">Seleziona categoria</option>
                          {categorieEvento.map((categoria) => (
                            <option key={categoria} value={categoria}>{categoria}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Data</label>
                        <input type="date" className="form-control" name="date" value={datiForm.date} onChange={gestisciCambioInput} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Citta</label>
                        <select className="form-select" name="location" value={datiForm.location} onChange={gestisciCambioInput} required>
                          <option value="">Seleziona citta</option>
                          {cittaEvento.map((citta) => (
                            <option key={citta} value={citta}>{citta}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Indirizzo</label>
                        <input type="text" className="form-control" name="indirizzo" value={datiForm.indirizzo} onChange={gestisciCambioInput} maxLength="500" />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label fw-semibold">Prezzo</label>
                        <input type="number" className="form-control" name="price" value={datiForm.price} onChange={gestisciCambioInput} min="0" step="0.01" />
                      </div>
                      <div className="col-md-3">
                        <label className="form-label fw-semibold">Posti Massimi</label>
                        <input type="number" className="form-control" name="max_seats" value={datiForm.max_seats} onChange={gestisciCambioInput} required min="0" />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">Descrizione</label>
                        <textarea className="form-control" name="description" rows="2" value={datiForm.description} onChange={gestisciCambioInput}></textarea>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-3 pt-3 border-top">
                      <button type="button" className="btn btn-light rounded-pill px-4" onClick={chiudiModale}>Annulla</button>
                      <button type="submit" className="btn btn-primary rounded-pill px-4" disabled={caricamentoModale}>
                        {caricamentoModale ? "Salvataggio..." : "Salva Modifiche"}
                      </button>
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
