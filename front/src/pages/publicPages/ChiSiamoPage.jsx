import { Link } from "react-router-dom";
import CardUtenti from "../../components/sharedComponents/CardUtenti";

const ChiSiamoPage = () => {
  return (
    <div className="chi-siamo-page">
      <section className="py-5 text-center">
        <div className="container mt-4">
          <h1 className="display-4 fw-bold mb-3 text-primary">Chi Siamo</h1>
          <p className="lead fs-4 mb-4 text-dark">
            Siamo EventHub, il cuore pulsante dei tuoi eventi migliori.
          </p>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <p className="text-muted mb-0">
                La nostra missione è connettere le persone attraverso esperienze indimenticabili. 
                Semplifichiamo l'organizzazione e la partecipazione agli eventi, offrendo una 
                piattaforma intuitiva e completa per creatori e partecipanti.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold">I Nostri Valori</h2>
            <p className="text-muted">Cosa ci guida ogni giorno nella creazione della nostra piattaforma.</p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className="display-4 text-primary mb-3">
                    <i className="bi bi-lightbulb"></i>
                  </div>
                  <h4 className="card-title fw-bold">Innovazione</h4>
                  <p className="card-text text-muted">
                    Sviluppiamo costantemente nuove funzionalità per rendere l'esperienza sempre più fluida e all'avanguardia.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className="display-4 text-primary mb-3">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <h4 className="card-title fw-bold">Affidabilità</h4>
                  <p className="card-text text-muted">
                    Garantiamo una piattaforma sicura e performante per organizzatori e partecipanti, senza imprevisti.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className="display-4 text-primary mb-3">
                    <i className="bi bi-people"></i>
                  </div>
                  <h4 className="card-title fw-bold">Community</h4>
                  <p className="card-text text-muted">
                    Crediamo nel potere della condivisione e nel valore delle connessioni umane attraverso gli eventi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Il Nostro Team</h2>
            <p className="text-muted">Le menti creative dietro EventHub.</p>
          </div>
          
          <div className="row g-4 justify-content-center">
            {[
              { name: "Michele", role: "Admin" },
              { name: "Giulia", role: "Organizer" },
              { name: "Marco", role: "Admin" },
              { name: "Sara", role: "Organizer" },
            ].map((member, index) => (
              <div className="col-md-3 col-sm-6" key={index}>
                <CardUtenti name={member.name} role={member.role} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark text-white py-5 text-center">
        <div className="container py-4">
          <h2 className="fw-bold mb-4">Pronto a vivere la tua prossima esperienza?</h2>
          <p className="lead mb-4">
            Unisciti a migliaia di utenti che usano EventHub ogni giorno.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/eventi" className="btn btn-primary btn-lg px-4 rounded-pill">Esplora Eventi</Link>
            <Link to="/register" className="btn btn-outline-light btn-lg px-4 rounded-pill">Registrati Ora</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChiSiamoPage;
