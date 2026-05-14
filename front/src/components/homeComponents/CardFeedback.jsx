// Card dei feedback mostrati nella homepage.
// Usa immagini locali e testi statici per le recensioni.
import img1 from "../../assets/img/1.webp";
import img2 from "../../assets/img/2.webp";
import img3 from "../../assets/img/3.webp";
import img4 from "../../assets/img/4.webp";

const feedbacks = [
  {
    text: "Con EventHub ho scoperto tanti eventi interessanti vicino a me. Piattaforma semplice e veloce da usare.",
    name: "Giacomo S.",
    city: "Milano",
    image: img1,
  },
  {
    text: "EventHub ha una grafica moderna e permette di trovare eventi in pochi clic.",
    name: "Giulia R.",
    city: "Roma",
    image: img2,
  },
  {
    text: "Organizzare eventi su EventHub e' stato davvero intuitivo. Ottima gestione dei partecipanti.",
    name: "Marco M.",
    city: "Napoli",
    image: img3,
  },
  {
    text: "Esperienza molto positiva con EventHub, sia come partecipante che come organizzatrice.",
    name: "Simona B.",
    city: "Palermo",
    image: img4,
  },
];

function CardFeedback() {
  return feedbacks.map((feedback) => (
    <div
      className="col-12 col-md-6 col-lg-3"
      key={`${feedback.name}-${feedback.city}`}
    >
      <article className="card bg-soft-dark border-0 shadow-sm h-100">
        <div className="card-body text-white d-flex flex-column justify-content-between">
          <p className="card-text feedback-text">{feedback.text}</p>

          <div className="d-flex align-items-center gap-3">
            <img
              src={feedback.image}
              alt={feedback.name}
              className="feedback-avatar"
            />

            <div>
              <h3 className="h6 mb-0">{feedback.name}</h3>
              <small className="text-light opacity-75">{feedback.city}</small>
            </div>
          </div>
        </div>
      </article>
    </div>
  ));
}

export default CardFeedback;
