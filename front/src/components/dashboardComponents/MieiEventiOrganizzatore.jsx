// Area dashboard per organizzatori/admin che gestiscono gli eventi creati.
// Coordina dati, filtri, viste responsive e modali usando componenti dedicati.
import { useState } from "react";
import ProfiloToast from "./ProfiloToast";
import EventDeleteModal from "./organizerEventsComponents/EventDeleteModal";
import EventFormModal from "./organizerEventsComponents/EventFormModal";
import OrganizerEventsEmptyState from "./organizerEventsComponents/OrganizerEventsEmptyState";
import OrganizerEventsHeader from "./organizerEventsComponents/OrganizerEventsHeader";
import OrganizerEventsMobileList from "./organizerEventsComponents/OrganizerEventsMobileList";
import OrganizerEventsTabletList from "./organizerEventsComponents/OrganizerEventsTabletList";
import OrganizerEventsTable from "./organizerEventsComponents/OrganizerEventsTable";
import {
  categorieEvento,
  cittaEvento,
  ordinaEFiltraEventi,
} from "./organizerEventsComponents/organizerEventUtils";
import useEventCreate from "./organizerEventsComponents/useEventCreate";
import useEventDelete from "./organizerEventsComponents/useEventDelete";
import useEventEdit from "./organizerEventsComponents/useEventEdit";
import useOrganizerEventsData from "./organizerEventsComponents/useOrganizerEventsData";
import { OrganizerEventsProvider } from "./organizerEventsComponents/OrganizerEventsContext";

function MieiEventiOrganizzatore() {
  const [filtroEventi, setFiltroEventi] = useState("data_avvenimento");
  const [toast, setToast] = useState(null);

  const { eventi, setEventi, caricamento, errore } = useOrganizerEventsData();
  const eventiFiltrati = ordinaEFiltraEventi(eventi, filtroEventi);

  const mostraToast = (messaggio, tipo = "success") => {
    setToast({ messaggio, tipo });
    setTimeout(() => setToast(null), 3500);
  };

  const creazione = useEventCreate({ eventi, setEventi, mostraToast });
  const modifica = useEventEdit({ eventi, setEventi, mostraToast });
  const eliminazione = useEventDelete({ eventi, setEventi, mostraToast });

  if (caricamento) {
    return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  }

  if (errore) {
    return <div className="alert alert-danger m-4">{errore}</div>;
  }

  return (
    <div className="miei-eventi-organizzatore">
      <ProfiloToast toast={toast} onClose={() => setToast(null)} />

      <OrganizerEventsProvider value={{
        eventi: eventiFiltrati,
        filtroEventi,
        setFiltroEventi,
        apriModaleCreazione: creazione.apriModaleCreazione,
        apriModaleModifica: modifica.apriModaleModifica,
        apriModaleElimina: eliminazione.apriModaleElimina
      }}>
        <OrganizerEventsHeader />

        {eventi.length === 0 ? (
          <OrganizerEventsEmptyState />
        ) : eventiFiltrati.length === 0 ? (
          <OrganizerEventsEmptyState tipo="filtro" />
        ) : (
          <OrganizerEventsViews />
        )}
      </OrganizerEventsProvider>

      <EventDeleteModal
        eventoDaEliminare={eliminazione.eventoDaEliminare}
        erroreElimina={eliminazione.erroreElimina}
        caricamentoElimina={eliminazione.caricamentoElimina}
        chiudiModaleElimina={eliminazione.chiudiModaleElimina}
        gestisciElimina={eliminazione.gestisciElimina}
      />

      {creazione.mostraModaleCreazione && (
        <EventFormModal
          titolo="Crea Evento"
          form={creazione.datiFormCreazione}
          errore={creazione.erroreModaleCreazione}
          caricamento={creazione.caricamentoModaleCreazione}
          anteprimaImmagine={creazione.anteprimaNuovaImmagine}
          nomeImmagine={creazione.immagineNuovoEvento?.name}
          fileInputId="create-event-image"
          categorieEvento={categorieEvento}
          cittaEvento={cittaEvento}
          minPosti="1"
          testoBottone="Crea Evento"
          testoCaricamento="Salvataggio..."
          onChange={creazione.gestisciCambioInputCreazione}
          onImageChange={creazione.gestisciCambioImmagineCreazione}
          onSubmit={creazione.gestisciSubmitCreazione}
          onClose={creazione.chiudiModaleCreazione}
        />
      )}

      {modifica.mostraModale && (
        <EventFormModal
          titolo="Modifica Evento"
          form={modifica.datiForm}
          errore={modifica.erroreModale}
          caricamento={modifica.caricamentoModale}
          anteprimaImmagine={modifica.anteprimaImmagine}
          nomeImmagine={modifica.immagineEvento?.name}
          fileInputId="edit-event-image"
          categorieEvento={categorieEvento}
          cittaEvento={cittaEvento}
          minPosti="0"
          testoBottone="Salva Modifiche"
          testoCaricamento="Salvataggio..."
          onChange={modifica.gestisciCambioInput}
          onImageChange={modifica.gestisciCambioImmagine}
          onSubmit={modifica.gestisciSubmitModifica}
          onClose={modifica.chiudiModale}
        />
      )}
    </div>
  );
}

// Raggruppa le tre viste responsive della lista eventi.
// Passa alle viste figlie le stesse funzioni e gli stessi helper.
function OrganizerEventsViews() {
  return (
    <>
      {/* Tre viste separate: tabella desktop, card tablet, card mobile. */}
      <OrganizerEventsTable />
      <OrganizerEventsTabletList />
      <OrganizerEventsMobileList />
    </>
  );
}

export default MieiEventiOrganizzatore;
