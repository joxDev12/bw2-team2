// Suggerimento organizzatore nella ricerca della hero con foto profilo.
// Compare dopo gli eventi e permette di filtrare per organizzatore.
import { Link } from "react-router-dom";
import profilePlaceholder from "../../../assets/img/profile_placeholder.webp";

function HeroOrganizerSuggestion({ organizzatore, to, onSelect }) {
    return (
        <div className="hero-search-result d-flex align-items-center gap-2 border-bottom">
            <button
                type="button"
                className="hero-search-result-value text-start border-0 bg-transparent px-3 py-2 flex-grow-1 d-flex align-items-center gap-2"
                onClick={onSelect}
            >
                <img
                    src={organizzatore.imgProfile || profilePlaceholder}
                    alt={organizzatore.nome}
                    className="hero-search-result-avatar rounded-circle"
                    onError={(e) => {
                        e.currentTarget.src = profilePlaceholder;
                    }}
                />
                <span>
                    <span className="d-block fw-semibold">{organizzatore.nome}</span>
                    <small className="text-muted">@{organizzatore.username}</small>
                </span>
            </button>
            <Link
                to={to}
                className="hero-search-result-arrow d-flex align-items-center justify-content-center text-primary text-decoration-none px-3 align-self-stretch"
                aria-label={`Cerca eventi di ${organizzatore.nome}`}
            >
                <i className="bi bi-arrow-right"></i>
            </Link>
        </div>
    );
}

export default HeroOrganizerSuggestion;
