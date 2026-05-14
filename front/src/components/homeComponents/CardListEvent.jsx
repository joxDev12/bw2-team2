// Card evento usata nella lista eventi in evidenza della homepage.
// Mostra immagine, titolo e dettagli principali dell'evento.
import Event_culturali from "../../assets/img/Event_culturali.webp";
import Event_food from "../../assets/img/Event_food.webp";
import Event_intrattenimento from "../../assets/img/Event_intrattenimento.webp";
import Event_musicale from "../../assets/img/Event_musicali.webp";


function CardListEvent() {
  return (
    <>

      <div className="col-12 col-md-6 col-lg-4">
        <article className="card bg-soft-dark border-0 shadow-sm h-100 animazione-card">
          <div className="card-body text-white">
            <img src={Event_culturali} alt="Evento culturale" className="img-fluid" />
            <span className="badge bg-primary my-3">Evento culturale</span>
            <h5 className="card-title">Notte al Museo Digitale</h5>
            <p className="card-text">Un percorso immersivo tra arte, luci e installazioni interattive in una location suggestiva. Vivi un’esperienza culturale moderna tra mostre, performance e creatività dal vivo.</p>
            <div className="d-flex flex-column gap-3 mt-4">
              <div className="d-flex gap-2">
                <i class="bi bi-geo-alt"></i>
                <span>Palazzo delle Arti - Firenze</span>
              </div>
              <div className="d-flex gap-2">
                <i class="bi bi-coin"></i>
                <span>€ 18,00</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="col-12 col-md-6 col-lg-4">
        <article className="card bg-soft-dark border-0 shadow-sm h-100 animazione-card">
          <div className="card-body text-white">
            <img src={Event_food} alt="Evento food" className="img-fluid" />
            <span className="badge bg-primary my-3">Evento food</span>
            <h5 className="card-title">Street Food Experience</h5>
            <p className="card-text">Degustazioni gourmet, street food e birre artigianali in una location ricca di atmosfera. Scopri sapori autentici tra musica, convivialità ed esperienze culinarie..</p>
            <div className="d-flex flex-column gap-3 mt-4">
              <div className="d-flex gap-2">
                <i class="bi bi-geo-alt"></i>
                <span>Piazza del Mercato - Bologna</span>
              </div>
              <div className="d-flex gap-2">
                <i class="bi bi-coin"></i>
                <span>€ 12,00</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="col-12 col-md-6 col-lg-4">
        <article className="card bg-soft-dark border-0 shadow-sm h-100 animazione-card">
          <div className="card-body text-white">
            <img src={Event_intrattenimento} alt="Evento intrattenimento" className="img-fluid" />
            <span className="badge bg-primary my-3">Evento intrattenimento</span>
            <h5 className="card-title">Gaming Arena Night</h5>
            <p className="card-text">Sfide eSport, tornei multiplayer e postazioni gaming next-gen in un ambiente immersivo. Un evento dedicato a gamer, creator e appassionati di intrattenimento digitale.</p>
            <div className="d-flex flex-column gap-3 mt-4">
              <div className="d-flex gap-2">
                <i class="bi bi-geo-alt"></i>
                <span>Expo Gaming Center - Torino</span>
              </div>
              <div className="d-flex gap-2">
                <i class="bi bi-coin"></i>
                <span>€ 22,00</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="col-12 col-md-6 col-lg-4">
        <article className="card bg-soft-dark border-0 shadow-sm h-100 animazione-card">
          <div className="card-body text-white">
            <img src={Event_musicale} alt="Evento musicale" className="img-fluid" />
            <span className="badge bg-primary my-3">Evento musicale</span>
            <h5 className="card-title">Neon Sound Festival</h5>
            <p className="card-text">Un grande festival open-air con DJ set, live band e spettacoli di luci coinvolgenti. Vivi una serata di musica, energia e divertimento insieme a migliaia di persone.</p>
            <div className="d-flex flex-column gap-3 mt-4">
              <div className="d-flex gap-2">
                <i class="bi bi-geo-alt"></i>
                <span>Arena City Park - Milano</span>
              </div>
              <div className="d-flex gap-2">
                <i class="bi bi-coin"></i>
                <span>€ 35,00</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="col-12 col-md-6 col-lg-4">
        <article className="card bg-soft-dark border-0 shadow-sm h-100 animazione-card">
          <div className="card-body text-white">
            <img src={Event_musicale} alt="Evento musicale" className="img-fluid" />
            <span className="badge bg-primary my-3">Evento Turismo</span>
            <h5 className="card-title">Borghi al Tramonto</h5>
            <p className="card-text">Visite guidate, paesaggi mozzafiato e tradizioni locali da vivere al tramonto. Scopri luoghi autentici tra cultura, natura e sapori tipici del territorio italiano.</p>
            <div className="d-flex flex-column gap-3 mt-4">
              <div className="d-flex gap-2">
                <i class="bi bi-geo-alt"></i>
                <span>Lago di Como - Bellagio</span>
              </div>
              <div className="d-flex gap-2">
                <i class="bi bi-coin"></i>
                <span>€ 15,00</span>
              </div>
            </div>
          </div>
        </article>
      </div>






    </>
  );
}

export default CardListEvent;
