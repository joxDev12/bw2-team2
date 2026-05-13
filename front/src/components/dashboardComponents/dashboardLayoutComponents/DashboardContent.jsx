// Decide quale contenuto mostrare nella dashboard in base alla tab attiva.
// La tab "miei eventi" cambia componente in base al ruolo utente.
import MieiEventiOrganizzatore from "../MieiEventiOrganizzatore";
import MieiEventiUtente from "../MieiEventiUtente";
import ProfiloPagina from "../ProfiloPagina";
import RegistrazioniUtenti from "../RegistrazioniUtenti";

function DashboardContent({ activeTab, userRole }) {
  return (
    <div className="dashboard-content p-4">
      {activeTab === "profilo" && <ProfiloPagina />}
      {activeTab === "miei-eventi" && (
        userRole === "partecipant" ? <MieiEventiUtente /> : <MieiEventiOrganizzatore />
      )}
      {activeTab === "registrazioni" && <RegistrazioniUtenti />}
    </div>
  );
}

export default DashboardContent;
