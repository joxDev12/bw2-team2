import {NavLink} from 'react-router-dom';


function Footer() {
  return (
    <footer className="navbar-dark bg-dark text-light py-4 custom-footer">
      <div className="container">

        <div className="row">

         
          <div className="col-md-4 mb-3">
           <NavLink className="navbar-brand fw-bold" to="/">
          EventiHub
        </NavLink>
            <p className="text-muted">
              La piattaforma per scoprire, organizzare e vivere eventi indimenticabili.
            </p>
          </div>


          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Navigazione</h6>
            <ul className="list-unstyled footer-links">
              <li><NavLink to="/" className="nav-link">Esplora</NavLink></li>
              <li><NavLink to="/chi-siamo" className="nav-link">Chi siamo</NavLink></li>
              <li><NavLink to="/eventi" className="nav-link">Eventi</NavLink></li>
              <li><NavLink to="/assistenza" className="nav-link">Assistenza</NavLink></li>
            </ul>
          </div>

  
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Contatti</h6>
            <p className="text-light mb-1">info@eventihub.com</p>
            <p className="text-light">Milano, Italia</p>
          </div>

        </div>

        <hr className="border-secondary" />

        <div className="text-center text-muted">
          © {new Date().getFullYear()} EventiHub — Tutti i diritti riservati
        </div>

      </div>
    </footer>
  );
}

export default Footer;
