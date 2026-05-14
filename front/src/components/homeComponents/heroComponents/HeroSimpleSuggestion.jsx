// Suggerimento semplice usato per location e date della hero.
// Mostra icona, testo e freccia per andare subito agli eventi filtrati.
import { Link } from "react-router-dom";

function HeroSimpleSuggestion({ icon, label, to, ariaLabel, onSelect }) {
  return (
    <div className="hero-search-result d-flex align-items-center gap-2 border-bottom">
      <button
        type="button"
        className="hero-search-result-value text-start border-0 bg-transparent px-3 py-2 flex-grow-1 fw-semibold"
        onClick={onSelect}
      >
        <i className={`bi ${icon} me-2 text-primary`}></i>
        {label}
      </button>
      <Link
        to={to}
        className="hero-search-result-arrow d-flex align-items-center justify-content-center text-primary text-decoration-none px-3 align-self-stretch"
        aria-label={ariaLabel}
      >
        <i className="bi bi-arrow-right"></i>
      </Link>
    </div>
  );
}

export default HeroSimpleSuggestion;
