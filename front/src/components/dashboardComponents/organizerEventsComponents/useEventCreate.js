// Hook che gestisce la modale di creazione evento.
// Coordina form, immagine, chiamate API e aggiornamento lista eventi.
import { useState } from "react";
import { eventsAPI } from "../../../services/api";
import eventsPlaceholder from "../../../assets/img/events_placeholder.webp";
import { datiEventoVuoti, preparaDatiEvento } from "./organizerEventUtils";

function useEventCreate({ eventi, setEventi, mostraToast }) {
  const [mostraModaleCreazione, setMostraModaleCreazione] = useState(false);
  const [erroreModaleCreazione, setErroreModaleCreazione] = useState(null);
  const [caricamentoModaleCreazione, setCaricamentoModaleCreazione] = useState(false);
  const [immagineNuovoEvento, setImmagineNuovoEvento] = useState(null);
  const [anteprimaNuovaImmagine, setAnteprimaNuovaImmagine] = useState(null);
  const [datiFormCreazione, setDatiFormCreazione] = useState(datiEventoVuoti);

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
    setDatiFormCreazione((prev) => ({ ...prev, [name]: value }));
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
      const nuovoEvento = await eventsAPI.crea(preparaDatiEvento(datiFormCreazione));
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

  return {
    mostraModaleCreazione,
    erroreModaleCreazione,
    caricamentoModaleCreazione,
    immagineNuovoEvento,
    anteprimaNuovaImmagine,
    datiFormCreazione,
    apriModaleCreazione,
    chiudiModaleCreazione,
    gestisciCambioInputCreazione,
    gestisciCambioImmagineCreazione,
    gestisciSubmitCreazione,
  };
}

export default useEventCreate;
