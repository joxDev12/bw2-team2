// Hook che carica gli eventi visibili per admin o organizzatore.
// Espone lista eventi, stato loading, errore e setter per aggiornamenti locali.
import { useEffect, useState } from "react";
import { eventsAPI } from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";

function useOrganizerEventsData() {
  const { utente } = useAuth();
  const [eventi, setEventi] = useState([]);
  const [caricamento, setCaricamento] = useState(true);
  const [errore, setErrore] = useState(null);

  useEffect(() => {
    if (!utente) return;
    let annullato = false;

    const caricaDati = async () => {
      try {
        setCaricamento(true);
        const dati =
          utente.role === "admin"
            ? await eventsAPI.getAll()
            : await eventsAPI.getByOrganizerId(utente.id);

        if (!annullato) setEventi(dati);
      } catch (err) {
        if (annullato) return;

        if (err.status === 404) {
          setEventi([]);
        } else {
          setErrore(
            err.message || "Errore nel caricamento degli eventi creati",
          );
        }
      } finally {
        if (!annullato) setCaricamento(false);
      }
    };

    caricaDati();

    return () => {
      annullato = true;
    };
  }, [utente?.id, utente?.role]);

  return { eventi, setEventi, caricamento, errore };
}

export default useOrganizerEventsData;
