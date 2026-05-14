// Navbar principale del sito con link di navigazione e area utente.
// Cambia azioni mostrate in base allo stato di login.
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import UserBanner from "./UserBanner";
import profilePlaceholder from "../../assets/img/profile_placeholder.webp";

function Navbar() {
  const { utente, logout } = useAuth();
  const navigate = useNavigate();

  const nomeCompleto = [utente?.name, utente?.surname]
    .filter(Boolean)
    .join(" ");
  const nomeVisualizzato = nomeCompleto || utente?.username || "Nome Utente";
  const immagineProfilo = utente?.img_profile || profilePlaceholder;
  const ruoli = {
    partecipant: "Utente",
    organizer: "Organizzatore",
    admin: "Admin",
  };
  const ruoloVisualizzato = ruoli[utente?.role] || "Utente";

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm custom-navbar" style={{ zIndex: 1030 }}>
      <div className="container-fluid">
        <NavLink className="navbar-img navbar-brand fw-bold" to="/">
          <img
            src="../../src/assets/img/logo.png"
            alt="EventiHub"
            className="img-logo-navbar"
          />
        </NavLink>

        <div className="d-flex align-items-center gap-2 ms-auto d-lg-none">
          <button
            className={`navbar-toggler ${utente ? "navbar-user-toggler d-flex align-items-center gap-2" : ""}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-label="Apri menu"
          >
            {utente && (
              <>
                <span className="user-banner__name mb-0 text-white fw-bold">
                  {nomeVisualizzato}
                </span>
                <img
                  src={immagineProfilo}
                  alt="Immagine profilo utente"
                  className="user-banner__avatar rounded-circle"
                />
              </>
            )}
            {!utente && <span className="navbar-toggler-icon"></span>}
          </button>
        </div>

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

            {utente && (
              <>
                <li className="nav-item d-lg-none py-2">
                  <hr className="border-secondary opacity-50 my-2" />
                </li>
                <li className="nav-item d-lg-none">
                  <NavLink
                    className="nav-link d-flex align-items-center justify-content-between gap-3"
                    to="/dashboard"
                  >
                    <span>Dashboard</span>
                    <span className="badge bg-primary rounded-pill">
                      {ruoloVisualizzato}
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item d-lg-none">
                  <button
                    type="button"
                    className="nav-link text-danger border-0 bg-transparent px-0"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>

          {utente ? (
            <div className="d-none d-lg-block">
              <UserBanner />
            </div>
          ) : (
            <div className="d-flex gap-2">
              <NavLink className="btn btn-outline-light" to="/login">
                Accedi
              </NavLink>

              <NavLink className="btn btn-primary" to="/register">
                Registrati
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
