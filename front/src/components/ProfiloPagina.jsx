import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usersAPI } from "../services/api";
import profilePlaceholder from "../assets/img/profile_placeholder.webp";
import ProfiloCampo from "./ProfiloCampo";
import ProfiloToast from "./ProfiloToast";
import ProfiloModificaModal from "./ProfiloModificaModal";
import ProfiloEliminaModal from "./ProfiloEliminaModal";

function ProfiloPagina() {
  const { utente, aggiornaUtente } = useAuth();

  const [mostraModale, setMostraModale] = useState(false);
  const [mostraModaleElimina, setMostraModaleElimina] = useState(false);
  const [form, setForm] = useState({});
  const [fotoProfilo, setFotoProfilo] = useState(null);
  const [anteprimaFoto, setAnteprimaFoto] = useState(null);
  const [toast, setToast] = useState(null);
  const [erroreForm, setErroreForm] = useState(null);
  const [erroreElimina, setErroreElimina] = useState(null);
  const [caricamento, setCaricamento] = useState(false);
  const [caricamentoElimina, setCaricamentoElimina] = useState(false);

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
    { label: "Nome", valore: utente.name || "-", icona: "bi-person" },
    { label: "Cognome", valore: utente.surname || "-", icona: "bi-person" },
    { label: "Username", valore: utente.username || "-", icona: "bi-at" },
    { label: "Email", valore: utente.email || "-", icona: "bi-envelope" },
    { label: "Localita", valore: utente.location || "-", icona: "bi-geo-alt" },
    { label: "Indirizzo", valore: utente.indirizzo || "-", icona: "bi-house" },
  ];

  const apriModale = () => {
    setForm({
      name: utente.name || "",
      surname: utente.surname || "",
      username: utente.username || "",
      email: utente.email || "",
      location: utente.location || "",
      indirizzo: utente.indirizzo || "",
      password: "",
      confermaPassword: "",
    });
    setFotoProfilo(null);
    setAnteprimaFoto(immagineProfilo);
    setToast(null);
    setErroreForm(null);
    setMostraModale(true);
  };

  const chiudiModale = () => {
    setMostraModale(false);
    setFotoProfilo(null);
    setAnteprimaFoto(null);
    setErroreForm(null);
  };

  const apriModaleElimina = () => {
    setErroreElimina(null);
    setMostraModaleElimina(true);
  };

  const chiudiModaleElimina = () => {
    setMostraModaleElimina(false);
    setErroreElimina(null);
  };

  const mostraToast = (messaggio, tipo = "success") => {
    setToast({ messaggio, tipo });
    setTimeout(() => setToast(null), 3500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    setFotoProfilo(file);
    setAnteprimaFoto(file ? URL.createObjectURL(file) : immagineProfilo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);
    setErroreForm(null);

    if (form.password || form.confermaPassword) {
      if (form.password !== form.confermaPassword) {
        setErroreForm("Le password non coincidono.");
        return;
      }
      if (form.password.length < 8) {
        setErroreForm("La password deve essere di almeno 8 caratteri.");
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
        location: form.location,
        indirizzo: form.indirizzo,
      };

      if (form.password) {
        dati.password_hash = form.password;
      }

      const risposta = await usersAPI.aggiorna(utente.id, dati);
      const rispostaFoto = fotoProfilo
        ? await usersAPI.aggiornaImmagineProfilo(utente.id, fotoProfilo)
        : null;

      aggiornaUtente(rispostaFoto || risposta || dati);
      chiudiModale();
      mostraToast("Profilo aggiornato con successo!");
    } catch (err) {
      setErroreForm(err.message || "Errore durante l'aggiornamento del profilo.");
    } finally {
      setCaricamento(false);
    }
  };

  const handleEliminaProfilo = async () => {
    setErroreElimina(null);
    setCaricamentoElimina(true);

    try {
      await usersAPI.elimina(utente.id);
      window.dispatchEvent(new Event('auth:unauthorized'));
    } catch (err) {
      setErroreElimina(err.message || "Errore durante l'eliminazione del profilo.");
    } finally {
      setCaricamentoElimina(false);
    }
  };

  return (
    <>
      <ProfiloToast toast={toast} onClose={() => setToast(null)} />

      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            Il mio <span className="text-primary">Profilo</span>
          </h2>
          <p className="text-muted mb-0">Visualizza i tuoi dati personali</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-primary d-flex align-items-center gap-2 rounded-3 shadow-sm"
            onClick={apriModale}
          >
            <i className="bi bi-pencil-square"></i>
            <span className="d-none d-sm-inline">Modifica</span>
          </button>
          <button
            type="button"
            className="btn btn-outline-danger rounded-3 d-flex align-items-center gap-2"
            onClick={apriModaleElimina}
          >
            <i className="bi bi-trash"></i>
            <span className="d-none d-sm-inline">Elimina</span>
          </button>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
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

        <div className="card-body bg-light p-4 p-md-5">
          <div className="row g-4">
            {campi.map((campo) => (
              <ProfiloCampo key={campo.label} campo={campo} />
            ))}
          </div>
        </div>
      </div>

      {mostraModale && (
        <ProfiloModificaModal
          form={form}
          anteprimaFoto={anteprimaFoto || immagineProfilo}
          nomeFotoProfilo={fotoProfilo?.name || "nessuna foto selezionata"}
          erroreForm={erroreForm}
          caricamento={caricamento}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          chiudiModale={chiudiModale}
        />
      )}

      {mostraModaleElimina && (
        <ProfiloEliminaModal
          erroreElimina={erroreElimina}
          caricamentoElimina={caricamentoElimina}
          chiudiModaleElimina={chiudiModaleElimina}
          handleEliminaProfilo={handleEliminaProfilo}
        />
      )}
    </>
  );
}

export default ProfiloPagina;
