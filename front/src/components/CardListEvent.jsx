import Event_culturali from "../assets/img/Event_culturali.webp";
import img2 from "../assets/img/2.webp";
import img3 from "../assets/img/3.webp";
import img4 from "../assets/img/4.webp";


function CardListEvent() {

  return (
    <>
      <h4 className="text-light">Eventi in evidenza</h4>
      <div className="col-12 col-md-6 col-lg-4">
        <div className="feedback-card rounded-4 p-4 text-light d-flex flex-column justify-content-between bg-item border-1 border-black h-100">

          <p className="feedback-text mb-3 text-light">
            “Con EventHub ho scoperto tanti eventi interessanti vicino a me. Piattaforma semplice e veloce da usare.”
          </p>

            <img src={Event_culturali} alt="Laura B." className="feedback-avatar" />
        </div>
      </div>
    </>
  )
}

export default CardListEvent 