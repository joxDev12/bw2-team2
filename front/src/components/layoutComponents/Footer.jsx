// Footer del sito con link principali e informazioni finali.
// Viene mostrato nel layout pubblico sotto alle pagine.
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="navbar navbar-dark bg-dark text-light py-4 shadow-sm custom-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <NavLink className="navbar-brand fw-bold" to="/">
              <img
                src="../../src/assets/img/logo.png"
                alt="EventiHub"
                className="img-logo-navbar"
              />
            </NavLink>
            <p className="footer-text text-light py-3 fs-6">
              La piattaforma per scoprire, organizzare e vivere eventi
              indimenticabili.
            </p>
          </div>

          <div className="col-md-4 mb-3">
            <h6 className="fw-bold text-secondary">Navigazione</h6>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link py-0" to="/">
                  Esplora
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link py-0" to="/chi-siamo">
                  Chi siamo
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link py-0" to="/eventi">
                  Eventi
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link py-0" to="/contatti">
                  Contatti
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h6 className="fw-bold text-secondary">Contatti</h6>

            <p className="text-light mb-2">
              <i className="bi bi-envelope-fill me-2"></i>
              info@eventhub.com
            </p>

            <p className="text-light mb-3">
              <i className="bi bi-geo-alt-fill me-2"></i>
              Milano, Italia
            </p>
          </div>

          <hr
            className="bg-secondary border-0 opacity-50"
            style={{ height: "1px" }}
          />

          <div className="text-center text-lig fs-6">
            © {new Date().getFullYear()} EventiHub — Tutti i diritti riservati
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
