import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm custom-navbar">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">
          EventiHub
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/chi-siamo">
                Chi siamo
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/eventi">
                Eventi
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contatti">
                Contatti
              </NavLink>
            </li>
          </ul>

          <div className="d-flex gap-2">
            <NavLink className="btn btn-outline-light" to="/login">
              Accedi
            </NavLink>

            <NavLink className="btn btn-primary" to="/register">
              Registrati
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;