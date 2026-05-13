// Pagina profilo dentro dashboard con dati, modifica ed eliminazione account.
// Coordina modali, toast e aggiornamento del contesto utente.
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { usersAPI } from "../../services/api";
import profilePlaceholder from "../../assets/img/profile_placeholder.webp";
import ProfiloToast from "./ProfiloToast";
import ProfiloModificaModal from "./ProfiloModificaModal";
import ProfiloEliminaModal from "./ProfiloEliminaModal";
import ProfileCard from "./profileComponents/ProfileCard";
import ProfileHeader from "./profileComponents/ProfileHeader";

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
      partecipant: { label: "Utente", cls: "bg-primary", icon: "bi-person-fill" },
      organizer: {
        label: "Organizzatore",
        cls: "bg-success",
        icon: "bi-calendar-star",
      },
      admin: { label: "Admin", cls: "bg-danger", icon: "bi-shield-lock-fill" },
    };
    return roles[role] || roles.partecipant;
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

  // Preparo il form partendo dai dati correnti dell'utente.
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

    // La password e opzionale: la valido solo se l'utente la compila.
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

      // Se e stata caricata una foto, uso quella risposta; altrimenti uso i dati profilo.
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
      localStorage.removeItem("dashboardTab");
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

      <ProfileHeader apriModale={apriModale} apriModaleElimina={apriModaleElimina} />

      <ProfileCard
        nomeCompleto={nomeCompleto}
        immagineProfilo={immagineProfilo}
        roleBadge={roleBadge}
        campi={campi}
      />

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
