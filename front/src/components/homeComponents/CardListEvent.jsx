// Card evento usata nella lista eventi in evidenza della homepage.
// Mostra immagine, titolo e dettagli principali dell'evento.
import Event_culturali from "../../assets/img/Event_culturali.webp";

function CardListEvent() {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <article className="card bg-soft-dark border-0 shadow-sm h-100 animazione-card">
        <div className="card-body text-white">
          <p className="card-text">
            Con EventHub ho scoperto tanti eventi interessanti vicino a me.
            Piattaforma semplice e veloce da usare.
          </p>

          <img
            src={Event_culturali}
            alt="Evento culturale"
            className="feedback-avatar"
          />
        </div>
      </article>
    </div>
  );
}

export default CardListEvent;
