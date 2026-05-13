// Suggerimento evento nella ricerca della hero.
// Clic sul testo compila l'input, clic sulla freccia avvia la ricerca.
import { Link } from "react-router-dom";

function HeroEventSuggestion({ evento, to, onSelect }) {
    return (
        <div className="hero-search-result d-flex align-items-center gap-2 border-bottom">
            <button
                type="button"
                className="hero-search-result-value text-start border-0 bg-transparent px-3 py-2 flex-grow-1"
                onClick={onSelect}
            >
                <div className="fw-semibold">{evento.title}</div>
                <small className="text-muted">
                    {evento.organizer_fullname} - {evento.location} - {new Date(evento.date).toLocaleDateString("it-IT")}
                </small>
            </button>
            <Link
                to={to}
                className="hero-search-result-arrow d-flex align-items-center justify-content-center text-primary text-decoration-none px-3 align-self-stretch"
                aria-label={`Cerca eventi per ${evento.title}`}
            >
                <i className="bi bi-arrow-right"></i>
            </Link>
        </div>
    );
}

export default HeroEventSuggestion;
