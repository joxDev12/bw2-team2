// Card evento usata nella pagina Eventi.
// Mostra immagine, info principali e link al dettaglio.
import { Link } from "react-router-dom";
import {useAuth} from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";
import eventsPlaceholder from "../../assets/img/events_placeholder.webp";

const CardPageEvent = ({ evento, formattaData, badgeColore, openModal }) => {
  const { user } = useAuth();
  const navigate = useNavigate();


  function handleRegistrati() {
if (!user) {
  navigate("/login");
  return;
}
openModal(evento);
  }

  return (
    <div className="col-12">
      <div className="card border-0 shadow-sm overflow-hidden animazione-card">
        <div className="row g-0 h-100">
          <div className="col-md-4 position-relative">
            <img
              src={evento.image || eventsPlaceholder}
              className="img-fluid w-100 h-100"
              alt={evento.title}
              style={{ objectFit: "cover", minHeight: "220px" }}
            />
            <span
              className={`badge ${badgeColore(
                evento.category,
              )} position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill shadow-sm`}
            >
              {evento.category}
            </span>
          </div>

          <div className="col-md-8">
            <div className="card-body d-flex flex-column h-100 p-4">
              <h4 className="card-title fw-bold mb-3">{evento.title}</h4>

              <div className="d-flex flex-wrap gap-4 small mb-4">
                <span className="d-flex align-items-center">
                  <i className="bi bi-calendar3 fs-5 me-2 text-primary"></i>
                  <span className="fs-6">{formattaData(evento.date)}</span>
                </span>
                <span className="d-flex align-items-center">
                  <i className="bi bi-geo-alt fs-5 me-2 text-danger"></i>
                  <span className="fs-6">{evento.location}</span>
                </span>
              </div>

              <p className="card-text fs-5 flex-grow-1">{evento.description}</p>

              <div className="d-flex gap-3 mt-4 pt-3 border-top">
                <button
                  className="btn btn-primary px-4 fw-semibold rounded-pill"
                  id={`registrati-evento-${evento.id}`}
                  onClick={handleRegistrati}
                >
                  <i className="bi bi-ticket-perforated me-2"></i>
                  Registrati all'evento
                </button>

                {/* Button non fa azzione */}

                {/* <button
                  className="btn btn-outline-secondary px-4 rounded-pill"
                  id={`info-evento-${evento.id}`}
                  title="Maggiori Informazioni"
                >
                  <i className="bi bi-info-circle me-2"></i>
                  Maggiori Info
                </button> */}

                {/* Link reindirizza alla routhe */}
                <Link
                  to={`/eventi/${evento.id}`}
                  className="btn btn-outline-secondary px-4 rounded-pill"
                  id={`info-evento-${evento.id}`}
                  title="Maggiori Informazioni"
                >
                  <i className="bi bi-info-circle me-2"></i>
                  Maggiori Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPageEvent;
