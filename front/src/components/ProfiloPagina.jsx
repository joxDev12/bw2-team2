import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usersAPI } from "../services/api";
import profilePlaceholder from "../assets/img/profile_placeholder.webp";

function ProfiloPagina() {
  const { utente, aggiornaUtente } = useAuth();

  const [mostraModale, setMostraModale] = useState(false);
  const [form, setForm] = useState({});
  const [errore, setErrore] = useState(null);
  const [successo, setSuccesso] = useState(null);
  const [caricamento, setCaricamento] = useState(false);

  if (!utente) return null;

  const getRoleBadge = (role) => {
    const roles = {
      user: { label: "Utente", cls: "bg-primary", icon: "bi-person-fill" },
      organizer: {
        label: "Organizzatore",
        cls: "bg-success",
        icon: "bi-calendar-star",
      },
      admin: { label: "Admin", cls: "bg-danger", icon: "bi-shield-lock-fill" },
    };
    return roles[role] || roles.user;
  };

  const roleBadge = getRoleBadge(utente.role);
  const nomeCompleto = [utente.name, utente.surname].filter(Boolean).join(" ");
  const immagineProfilo = utente.img_profile || profilePlaceholder;

  const campi = [
    { label: "Nome", valore: utente.name || "—", icona: "bi-person" },
    { label: "Cognome", valore: utente.surname || "—", icona: "bi-person" },
    { label: "Username", valore: utente.username || "—", icona: "bi-at" },
    { label: "Email", valore: utente.email || "—", icona: "bi-envelope" },
  ];

  // Gestione Modale
  const apriModale = () => {
    setForm({
      name: utente.name || "",
      surname: utente.surname || "",
      username: utente.username || "",
      email: utente.email || "",
      img_profile: utente.img_profile || "",
      password: "",
      confermaPassword: "",
    });
    setErrore(null);
    setSuccesso(null);
    setMostraModale(true);
  };

  const chiudiModale = () => {
    setMostraModale(false);
    setErrore(null);
    setSuccesso(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrore(null);
    setSuccesso(null);

    // Validazione password
    if (form.password || form.confermaPassword) {
      if (form.password !== form.confermaPassword) {
        setErrore("Le password non coincidono.");
        return;
      }
      if (form.password.length < 8) {
        setErrore("La password deve essere di almeno 8 caratteri.");
        return;
      }
    }

    setCaricamento(true);

    try {
      const dati = {
        name: form.name,
        surname: form.surname,
        username: form.username,
        email: form.email,
        img_profile: form.img_profile,
      };

      if (form.password) {
        dati.password_hash = form.password;
      }

      const risposta = await usersAPI.aggiorna(utente.id, dati);

      // Aggiorna il contesto con i nuovi dati
      aggiornaUtente(risposta || dati);
      setSuccesso("Profilo aggiornato con successo!");

      // Chiudi il modale dopo un breve ritardo
      setTimeout(() => chiudiModale(), 1500);
    } catch (err) {
      setErrore(err.message || "Errore durante l'aggiornamento del profilo.");
    } finally {
      setCaricamento(false);
    }
  };

  return (
    <>
      {/* ── Intestazione con pulsante Modifica ── */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            Il mio <span className="text-primary">Profilo</span>
          </h2>
          <p className="text-muted mb-0">Visualizza i tuoi dati personali</p>
        </div>
        <button
          className="btn btn-primary d-flex align-items-center gap-2 rounded-3 shadow-sm"
          onClick={apriModale}
        >
          <i className="bi bi-pencil-square"></i>
          <span className="d-none d-sm-inline">Modifica</span>
        </button>
      </div>

      {/* ── Card Profilo ── */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
        {/* Header Bootstrap */}
        <div className="bg-primary bg-gradient text-white text-center py-5 px-3">
          <img
            src={immagineProfilo}
            alt={nomeCompleto || "Profilo"}
            className="profilo-avatar rounded-circle border border-white shadow mb-3"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          <h4 className="mb-2 fw-bold">{nomeCompleto || "Utente"}</h4>
          <span
            className={`badge ${roleBadge.cls} rounded-pill px-3 py-2 shadow-sm fs-6`}
          >
            <i className={`bi ${roleBadge.icon} me-2`}></i>
            {roleBadge.label}
          </span>
        </div>

        {/* Body con i campi Bootstrap */}
        <div className="card-body bg-light p-4 p-md-5">
          <div className="row g-4">
            {campi.map((campo) => (
              <div key={campo.label} className="col-12 col-md-6">
                <div className="card border-0 shadow-sm h-100 profilo-campo">
                  <div className="card-body d-flex align-items-center gap-4 p-3 p-xl-4">
                    <div
                      className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: "56px", height: "56px" }}
                    >
                      <i className={`bi ${campo.icona} fs-3`}></i>
                    </div>
                    <div className="min-width-0">
                      <small className="text-muted text-uppercase fw-bold d-block mb-1">
                        {campo.label}
                      </small>
                      <span className="fw-semibold text-dark fs-5 text-break">
                        {campo.valore}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modale Modifica Profilo */}
      {mostraModale && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 shadow border-0">
              {/* Header */}
              <div className="modal-header border-0 pb-0 px-4 pt-4">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-pencil-square text-primary me-2"></i>
                  Modifica Profilo
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={chiudiModale}
                  disabled={caricamento}
                ></button>
              </div>

              {/* Body */}
              <form onSubmit={handleSubmit}>
                <div className="modal-body px-4 py-4">
                  {/* Alert errore */}
                  {errore && (
                    <div
                      className="alert alert-danger d-flex align-items-center gap-2 rounded-3"
                      role="alert"
                    >
                      <i className="bi bi-exclamation-triangle-fill"></i>
                      {errore}
                    </div>
                  )}

                  {/* Alert successo */}
                  {successo && (
                    <div
                      className="alert alert-success d-flex align-items-center gap-2 rounded-3"
                      role="alert"
                    >
                      <i className="bi bi-check-circle-fill"></i>
                      {successo}
                    </div>
                  )}

                  {/* ── Dati personali ── */}
                  <h6
                    className="text-muted text-uppercase fw-bold mb-3"
                    style={{ fontSize: "0.8rem" }}
                  >
                    <i className="bi bi-person me-2"></i>Dati Personali
                  </h6>

                  <div className="row g-3 mb-4">
                    <div className="col-12 col-md-6">
                      <label
                        htmlFor="edit-name"
                        className="form-label fw-semibold"
                      >
                        Nome
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        id="edit-name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label
                        htmlFor="edit-surname"
                        className="form-label fw-semibold"
                      >
                        Cognome
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        id="edit-surname"
                        name="surname"
                        value={form.surname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label
                        htmlFor="edit-username"
                        className="form-label fw-semibold"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        id="edit-username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label
                        htmlFor="edit-email"
                        className="form-label fw-semibold"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control rounded-3"
                        id="edit-email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label
                        htmlFor="edit-img"
                        className="form-label fw-semibold"
                      >
                        URL Immagine Profilo
                      </label>
                      <input
                        type="url"
                        className="form-control rounded-3"
                        id="edit-img"
                        name="img_profile"
                        value={form.img_profile}
                        onChange={handleChange}
                        placeholder="https://esempio.com/foto.jpg"
                      />
                    </div>
                  </div>

                  {/* ── Cambio Password ── */}
                  <hr className="my-3" />
                  <h6
                    className="text-muted text-uppercase fw-bold mb-3"
                    style={{ fontSize: "0.8rem" }}
                  >
                    <i className="bi bi-shield-lock me-2"></i>Cambio Password
                    <small className="text-muted fw-normal ms-2">
                      (lascia vuoto per non modificarla)
                    </small>
                  </h6>

                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label
                        htmlFor="edit-password"
                        className="form-label fw-semibold"
                      >
                        Nuova Password
                      </label>
                      <input
                        type="password"
                        className="form-control rounded-3"
                        id="edit-password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        autoComplete="new-password"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label
                        htmlFor="edit-conferma"
                        className="form-label fw-semibold"
                      >
                        Conferma Password
                      </label>
                      <input
                        type="password"
                        className="form-control rounded-3"
                        id="edit-conferma"
                        name="confermaPassword"
                        value={form.confermaPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="modal-footer border-0 px-4 pb-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-3 px-4"
                    onClick={chiudiModale}
                    disabled={caricamento}
                  >
                    Annulla
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary rounded-3 px-4 d-flex align-items-center gap-2"
                    disabled={caricamento}
                  >
                    {caricamento ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                        ></span>
                        Aggiornamento...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-lg"></i>
                        Aggiorna
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfiloPagina;
