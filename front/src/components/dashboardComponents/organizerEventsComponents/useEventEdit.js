// Hook che gestisce la modale di modifica evento.
// Precompila il form, aggiorna dati/immagine e sostituisce l'evento in lista.
import { useState } from "react";
import { eventsAPI } from "../../../services/api";
import {
  creaFormDaEvento,
  datiEventoVuoti,
  getImmagineEvento,
  preparaDatiEvento,
} from "./organizerEventUtils";

function useEventEdit({ eventi, setEventi, mostraToast }) {
  const [eventoInModifica, setEventoInModifica] = useState(null);
  const [mostraModale, setMostraModale] = useState(false);
  const [erroreModale, setErroreModale] = useState(null);
  const [caricamentoModale, setCaricamentoModale] = useState(false);
  const [immagineEvento, setImmagineEvento] = useState(null);
  const [anteprimaImmagine, setAnteprimaImmagine] = useState(null);
  const [datiForm, setDatiForm] = useState(datiEventoVuoti);

  const apriModaleModifica = (evento) => {
    setEventoInModifica(evento);
    setDatiForm(creaFormDaEvento(evento));
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
    setDatiForm((prev) => ({ ...prev, [name]: value }));
  };

  const gestisciCambioImmagine = (e) => {
    const file = e.target.files[0] || null;
    setImmagineEvento(file);
    setAnteprimaImmagine(
      file ? URL.createObjectURL(file) : getImmagineEvento(eventoInModifica),
    );
  };

  const gestisciSubmitModifica = async (e) => {
    e.preventDefault();
    setErroreModale(null);
    setCaricamentoModale(true);

    try {
      const risposta = await eventsAPI.aggiorna(
        eventoInModifica.id,
        preparaDatiEvento(datiForm),
      );
      const eventoAggiornato = immagineEvento
        ? await eventsAPI.aggiornaImmagine(eventoInModifica.id, immagineEvento)
        : risposta;

      setEventi(
        eventi.map((evento) =>
          evento.id === eventoInModifica.id ? eventoAggiornato : evento,
        ),
      );
      chiudiModale();
      mostraToast("Evento aggiornato con successo!");
    } catch (err) {
      setErroreModale(
        err.message || "Errore durante l'aggiornamento dell'evento",
      );
    } finally {
      setCaricamentoModale(false);
    }
  };

  return {
    mostraModale,
    erroreModale,
    caricamentoModale,
    immagineEvento,
    anteprimaImmagine,
    datiForm,
    apriModaleModifica,
    chiudiModale,
    gestisciCambioInput,
    gestisciCambioImmagine,
    gestisciSubmitModifica,
  };
}

export default useEventEdit;
