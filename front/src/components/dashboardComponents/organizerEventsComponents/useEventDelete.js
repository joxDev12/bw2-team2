// Hook che gestisce apertura modale ed eliminazione di un evento.
// Tiene separati stato loading/errore e aggiorna la lista dopo la cancellazione.
import { useState } from "react";
import { eventsAPI } from "../../../services/api";

function useEventDelete({ eventi, setEventi, mostraToast }) {
  const [eventoDaEliminare, setEventoDaEliminare] = useState(null);
  const [erroreElimina, setErroreElimina] = useState(null);
  const [caricamentoElimina, setCaricamentoElimina] = useState(false);

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
      setEventi(eventi.filter((evento) => evento.id !== eventoDaEliminare.id));
      chiudiModaleElimina();
      mostraToast("Evento eliminato con successo!");
    } catch (err) {
      setErroreElimina(err.message || "Errore durante l'eliminazione");
    } finally {
      setCaricamentoElimina(false);
    }
  };

  return {
    eventoDaEliminare,
    erroreElimina,
    caricamentoElimina,
    apriModaleElimina,
    chiudiModaleElimina,
    gestisciElimina,
  };
}

export default useEventDelete;
