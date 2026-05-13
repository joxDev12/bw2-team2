import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/img/logo.png";
import ProfiloPagina from "../components/ProfiloPagina";
import MieiEventiUtente from "../components/MieiEventiUtente";
import MieiEventiOrganizzatore from "../components/MieiEventiOrganizzatore";
import RegistrazioniUtenti from "../components/RegistrazioniUtenti";

function Dashboard() {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem("dashboardTab") || "profilo"); // "profilo", "miei-eventi", "registrazioni"

  const navigate = useNavigate();
  const { utente, logout } = useAuth();

  const user = {
    name: utente?.name
      ? `${utente.name} ${utente.surname || ""}`.trim()
      : "Utente",
    email: utente?.email || "",
    role: utente?.role || "partecipant", // "partecipant" | "organizer" | "admin"
    avatar: utente?.img_profile || null,
  };

  const handleLogout = () => {
    localStorage.removeItem("dashboardTab");
    logout();
    navigate("/login");
  };

  const handleTornaAlSito = () => {
    navigate("/");
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const getRoleBadge = (role) => {
    const roles = {
      partecipant: { label: "Utente", cls: "bg-primary" },
      organizer: { label: "Organizzatore", cls: "bg-success" },
      admin: { label: "Admin", cls: "bg-danger" },
    };
    return roles[role] || roles.partecipant;
  };

  const roleBadge = getRoleBadge(user.role);

  useEffect(() => {
    if (activeTab === "registrazioni" && user.role !== "admin" && user.role !== "organizer") {
      setActiveTab("profilo");
      localStorage.setItem("dashboardTab", "profilo");
      return;
    }

    localStorage.setItem("dashboardTab", activeTab);
  }, [activeTab, user.role]);

  const cambiaTab = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("dashboardTab", tab);
  };

  return (
    <div className="dashboard-wrapper d-flex vh-100">
      {/* ── SIDEBAR ── */}
      <aside className="dashboard-sidebar d-none d-lg-flex flex-column bg-dark text-white border-end shadow-sm overflow-y-auto custom-scrollbar">
        <div className="sidebar-brand px-3 py-4 text-center">
          <NavLink to="/" className="text-white text-decoration-none d-block">
            <img src={logo} alt="EventiHub Logo" className="dashboard-logo" />
          </NavLink>
        </div>

        <hr className="mx-3 my-0 opacity-25" />

        <div className="sidebar-profile text-center px-3 py-4">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="sidebar-avatar rounded-circle mb-3 border border-primary border-opacity-25 shadow-sm"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
          ) : (
            <div
              className="sidebar-avatar-placeholder rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 bg-primary bg-gradient text-white shadow-sm"
              style={{ width: "80px", height: "80px" }}
            >
              <span className="fs-2 fw-bold">{getInitials(user.name)}</span>
            </div>
          )}
          <h6 className="mb-1 fw-bold">{user.name}</h6>
          <small className="text-white-50 d-block mb-3">{user.email}</small>
          <span
            className={`badge ${roleBadge.cls} rounded-pill px-3 shadow-sm`}
          >
            {roleBadge.label}
          </span>
        </div>

        <hr className="mx-3 my-0 opacity-25" />

        {/* Navigazione */}
        <nav className="sidebar-nav flex-grow-1 flex-shrink-0 px-3 py-3">
          <ul className="nav nav-pills flex-column gap-1">
            <li className="nav-item">
              <button
                onClick={() => cambiaTab("profilo")}
                className={`nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all border-0 w-100 text-start ${activeTab === "profilo" ? "active shadow-sm" : "text-white-50 link-light bg-transparent"}`}
              >
                <i className="bi bi-person-fill fs-5"></i>
                <span>Profilo</span>
              </button>
            </li>

            <li className="nav-item">
              <button
                onClick={() => cambiaTab("miei-eventi")}
                className={`nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all border-0 w-100 text-start ${activeTab === "miei-eventi" ? "active shadow-sm" : "text-white-50 link-light bg-transparent"}`}
              >
                <i className="bi bi-calendar2-week-fill fs-5"></i>
                <span>I Miei Eventi</span>
              </button>
            </li>

            {(user.role === "admin" || user.role === "organizer") && (
              <li className="nav-item">
                <button
                  onClick={() => cambiaTab("registrazioni")}
                  className={`nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all border-0 w-100 text-start ${activeTab === "registrazioni" ? "active shadow-sm" : "text-white-50 link-light bg-transparent"}`}
                >
                  <i className="bi bi-people-fill fs-5"></i>
                  <span>Registrazioni</span>
                </button>
              </li>
            )}
          </ul>
        </nav>

        {/* Footer sidebar */}
        <div className="sidebar-footer flex-shrink-0 px-3 py-3 bg-black bg-opacity-10 mt-auto">
          <hr className="my-2 opacity-25 d-lg-none" />
          <button
            type="button"
            onClick={handleTornaAlSito}
            className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white-50 link-light mb-1 border-0 w-100 text-start bg-transparent"
          >
            <i className="bi bi-arrow-left-circle fs-5"></i>
            <span>Torna al sito</span>
          </button>
          <button
            onClick={handleLogout}
            className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-danger border-0 w-100 text-start bg-transparent"
          >
            <i className="bi bi-box-arrow-left fs-5"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── CONTENUTO PRINCIPALE ── */}
      <main className="dashboard-main flex-grow-1 overflow-auto">
        {/* Top bar mobile */}
        <header className="dashboard-topbar d-lg-none d-flex align-items-center justify-content-between px-3 py-2">
          <button
            className="btn btn-outline-light btn-sm"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
          >
            <i className="bi bi-list fs-5"></i>
          </button>
          <img src={logo} alt="EventiHub Logo" className="dashboard-topbar-logo" />
          <div style={{ width: "32px" }}></div>
        </header>

        {/* Area contenuto */}
        <div className="dashboard-content p-4">
          {activeTab === "profilo" && <ProfiloPagina />}
          {activeTab === "miei-eventi" &&
            (user.role === "partecipant" ? (
              <MieiEventiUtente />
            ) : (
              <MieiEventiOrganizzatore />
            ))}
          {activeTab === "registrazioni" && <RegistrazioniUtenti />}
        </div>
      </main>

      <div
        className="offcanvas offcanvas-start dashboard-offcanvas"
        tabIndex="-1"
        id="mobileSidebar"
      >
        <div className="offcanvas-header bg-dark justify-content-center position-relative px-3 py-4">
          <h5 className="offcanvas-title text-white mb-0">
            <img src={logo} alt="EventiHub Logo" className="dashboard-offcanvas-logo" />
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body p-0 bg-dark text-white d-flex flex-column">
          <div className="text-center px-3 py-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="sidebar-avatar rounded-circle mb-3 border border-primary border-opacity-25 shadow-sm"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
            ) : (
              <div
                className="sidebar-avatar-placeholder rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 bg-primary bg-gradient text-white shadow-sm"
                style={{ width: "80px", height: "80px" }}
              >
                <span className="fs-2 fw-bold text-white">
                  {getInitials(user.name)}
                </span>
              </div>
            )}
            <h6 className="mb-1 fw-bold text-white">{user.name}</h6>
            <small className="text-white-50 d-block mb-3">{user.email}</small>
            <span
              className={`badge ${roleBadge.cls} rounded-pill px-3 shadow-sm`}
            >
              {roleBadge.label}
            </span>
          </div>
          <hr className="mx-3 opacity-25" />
          <nav className="px-3 py-2">
            <ul className="nav nav-pills flex-column gap-1">
              <li className="nav-item">
                <button
                  onClick={() => cambiaTab("profilo")}
                  data-bs-dismiss="offcanvas"
                  className={`nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all border-0 w-100 text-start ${activeTab === "profilo" ? "active shadow-sm" : "text-white-50 link-light bg-transparent"}`}
                >
                  <i className="bi bi-person-fill fs-5"></i>
                  <span>Profilo</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => cambiaTab("miei-eventi")}
                  data-bs-dismiss="offcanvas"
                  className={`nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all border-0 w-100 text-start ${activeTab === "miei-eventi" ? "active shadow-sm" : "text-white-50 link-light bg-transparent"}`}
                >
                  <i className="bi bi-calendar2-week-fill fs-5"></i>
                  <span>I Miei Eventi</span>
                </button>
              </li>

              {(user.role === "admin" || user.role === "organizer") && (
                <li className="nav-item">
                  <button
                    onClick={() => cambiaTab("registrazioni")}
                    data-bs-dismiss="offcanvas"
                    className={`nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all border-0 w-100 text-start ${activeTab === "registrazioni" ? "active shadow-sm" : "text-white-50 link-light bg-transparent"}`}
                  >
                    <i className="bi bi-people-fill fs-5"></i>
                    <span>Registrazioni</span>
                  </button>
                </li>
              )}
            </ul>
          </nav>

          <div className="offcanvas-footer flex-shrink-0 px-3 py-3 bg-black bg-opacity-10 mt-auto">
            <button
              type="button"
              onClick={handleTornaAlSito}
              data-bs-dismiss="offcanvas"
              className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white-50 link-light mb-1 border-0 w-100 text-start bg-transparent"
            >
              <i className="bi bi-arrow-left-circle fs-5"></i>
              <span>Torna al sito</span>
            </button>
            <button
              onClick={handleLogout}
              className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-danger border-0 w-100 text-start bg-transparent"
            >
              <i className="bi bi-box-arrow-left fs-5"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
