import img1 from "../assets/img/1.webp";
import img2 from "../assets/img/2.webp";
import img3 from "../assets/img/3.webp";
import img4 from "../assets/img/4.webp";

function CardFeedback() {
    return (
        <>
            <h4 className="text-center text-light">Cosa dicono di noi</h4>
            
            <div className="col-12 col-md-6 col-lg-4">
                <div className="feedback-card rounded-4 p-4 text-light d-flex flex-column justify-content-between bg-item border-1 border-black h-100">

                    <p className="feedback-text mb-3 text-light">
                        “Con EventHub ho scoperto tanti eventi interessanti vicino a me. Piattaforma semplice e veloce da usare.”
                    </p>

                    <div className="feedback-user d-flex align-items-center gap-3">
                        <img src={img1} alt="Laura B." className="feedback-avatar" />

                        <div>
                            <h6 className="mb-0 fw-bold">Giacomo S.</h6>
                            <small>Milano</small>
                        </div>
                    </div>

                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
                <div className="feedback-card rounded-4 p-4 text-light d-flex flex-column justify-content-between bg-item border-1 border-black h-100">

                    <p className="feedback-text mb-3 text-light">
                        “EventHub ha una grafica moderna e permette di trovare eventi in pochi clic.”
                    </p>

                    <div className="feedback-user d-flex align-items-center gap-3">
                        <img src={img2} alt="Giulia R." className="feedback-avatar" />

                        <div>
                            <h6 className="mb-0 fw-bold">Giulia R.</h6>
                            <small>Roma</small>
                        </div>
                    </div>

                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
                <div className="feedback-card rounded-4 p-4 text-light d-flex flex-column justify-content-between bg-item border-1 border-black h-100">

                    <p className="feedback-text mb-3 text-light">
                        “Organizzare eventi su EventHub è stato davvero intuitivo. Ottima gestione dei partecipanti.”
                    </p>

                    <div className="feedback-user d-flex align-items-center gap-3">
                        <img src={img3} alt="Marco M." className="feedback-avatar" />

                        <div>
                            <h6 className="mb-0 fw-bold">Marco M.</h6>
                            <small>Napoli</small>
                        </div>
                    </div>

                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
                <div className="feedback-card rounded-4 p-4 text-light d-flex flex-column justify-content-between bg-item border-1 border-black h-100">

                    <p className="feedback-text mb-3 text-light">
                        “Esperienza molto positiva con EventHub, sia come partecipante che come organizzatrice.”
                    </p>

                    <div className="feedback-user d-flex align-items-center gap-3">
                        <img src={img4} alt="Simona B." className="feedback-avatar" />

                        <div>
                            <h6 className="mb-0 fw-bold">Simona B.</h6>
                            <small>Palermo</small>
                        </div>
                    </div>

                </div>
            </div>     

            <div className="col-12 col-md-6 col-lg-4">
                <div className="feedback-card rounded-4 p-4 text-light d-flex flex-column justify-content-between bg-item border-1 border-black h-100">

                    <p className="feedback-text mb-3 text-light">
                        “Esperienza molto positiva con EventHub, sia come partecipante che come organizzatrice.”
                    </p>

                    <div className="feedback-user d-flex align-items-center gap-3">
                        <img src={img4} alt="Simona B." className="feedback-avatar" />

                        <div>
                            <h6 className="mb-0 fw-bold">Simona B.</h6>
                            <small>Palermo</small>
                        </div>
                    </div>

                </div>
            </div> 

            <div className="col-12 col-md-6 col-lg-4">
                <div className="feedback-card rounded-4 p-4 text-light d-flex flex-column justify-content-between bg-item border-1 border-black h-100">

                    <p className="feedback-text mb-3 text-light">
                        “Esperienza molto positiva con EventHub, sia come partecipante che come organizzatrice.”
                    </p>

                    <div className="feedback-user d-flex align-items-center gap-3">
                        <img src={img4} alt="Simona B." className="feedback-avatar" />

                        <div>
                            <h6 className="mb-0 fw-bold">Simona B.</h6>
                            <small>Palermo</small>
                        </div>
                    </div>

                </div>
            </div>        
        </>
    );

}

export default CardFeedback;