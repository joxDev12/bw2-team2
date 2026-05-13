import { NavLink, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = {
    name: "Mario Rossi",
    email: "mario.rossi@email.com",
    role: "user", // "user" | "organizer" | "admin"
    avatar: null,
  };

  const handleLogout = () => {
    navigate("/login");
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
      user: { label: "Utente", cls: "bg-primary" },
      organizer: { label: "Organizzatore", cls: "bg-success" },
      admin: { label: "Admin", cls: "bg-danger" },
    };
    return roles[role] || roles.user;
  };

  const roleBadge = getRoleBadge(user.role);

  return (
    <div className="dashboard-wrapper d-flex vh-100">
      {/* ── SIDEBAR ── */}
      <aside className="dashboard-sidebar d-none d-lg-flex flex-column bg-dark text-white border-end shadow-sm">
        <div className="sidebar-brand px-3 py-4 text-center">
          <NavLink to="/" className="text-white text-decoration-none">
            <i className="bi bi-calendar-event-fill fs-3 me-2 text-primary"></i>
            <span className="fw-bold fs-5">EventiHub</span>
          </NavLink>
        </div>

        <hr className="mx-3 my-0 opacity-25" />

        <div className="sidebar-profile text-center px-3 py-4">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="sidebar-avatar rounded-circle mb-3 border border-2 border-primary border-opacity-25 shadow-sm"
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
          <span className={`badge ${roleBadge.cls} rounded-pill px-3 shadow-sm`}>
            {roleBadge.label}
          </span>
        </div>

        <hr className="mx-3 my-0 opacity-25" />

        {/* Navigazione */}
        <nav className="sidebar-nav flex-grow-1 px-3 py-3 overflow-auto">
          <ul className="nav nav-pills flex-column gap-1">
            <li className="nav-item">
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) => 
                  `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all ${isActive ? 'active shadow-sm' : 'text-white-50 link-light'}`
                }
              >
                <i className="bi bi-person-fill fs-5"></i>
                <span>Profilo</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <button className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white-50 link-light border-0 w-100 bg-transparent text-start">
                <i className="bi bi-calendar2-week-fill fs-5"></i>
                <span>I Miei Eventi</span>
              </button>
            </li>

            <li className="nav-item">
              <button className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white-50 link-light border-0 w-100 bg-transparent text-start">
                <i className="bi bi-card-list fs-5"></i>
                <span>Lista Eventi</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Footer sidebar */}
        <div className="sidebar-footer px-3 py-3 bg-black bg-opacity-10">
          <hr className="my-2 opacity-25 d-lg-none" />
          <NavLink
            to="/"
            className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white-50 link-light mb-1"
          >
            <i className="bi bi-arrow-left-circle fs-5"></i>
            <span>Torna al sito</span>
          </NavLink>
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
          <span className="fw-bold text-white">EventiHub</span>
          <div style={{ width: "32px" }}></div>
        </header>

        {/* Area contenuto — qui andranno i futuri componenti */}
        <div className="dashboard-content p-4">
          <h2 className="fw-bold mb-1">
            Bentornato, <span className="text-primary">{user.name.split(" ")[0]}</span>
          </h2>
          <p className="text-muted">Ecco il tuo pannello di controllo</p>

          {/* Qui potrai aggiungere i componenti futuri */}
        </div>
      </main>

      {/* ── OFFCANVAS MOBILE ── */}
      <div
        className="offcanvas offcanvas-start dashboard-offcanvas"
        tabIndex="-1"
        id="mobileSidebar"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-white">
            <i className="bi bi-calendar-event me-2"></i>EventiHub
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body p-0 bg-dark text-white">
          <div className="text-center px-3 py-4">
            <div 
              className="sidebar-avatar-placeholder rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 bg-primary bg-gradient text-white shadow-sm"
              style={{ width: "80px", height: "80px" }}
            >
              <span className="fs-2 fw-bold text-white">
                {getInitials(user.name)}
              </span>
            </div>
            <h6 className="mb-1 fw-bold text-white">{user.name}</h6>
            <small className="text-white-50 d-block mb-3">{user.email}</small>
            <span className={`badge ${roleBadge.cls} rounded-pill px-3 shadow-sm`}>
              {roleBadge.label}
            </span>
          </div>
          <hr className="mx-3 opacity-25" />
          <nav className="px-3 py-2">
            <ul className="nav nav-pills flex-column gap-1">
              <li className="nav-item">
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) => 
                    `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all ${isActive ? 'active shadow-sm' : 'text-white-50 link-light'}`
                  }
                  data-bs-dismiss="offcanvas"
                >
                  <i className="bi bi-person-fill fs-5"></i>
                  <span>Profilo</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <button className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white-50 link-light border-0 w-100 bg-transparent text-start">
                  <i className="bi bi-calendar2-week-fill fs-5"></i>
                  <span>I Miei Eventi</span>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-white-50 link-light border-0 w-100 bg-transparent text-start">
                  <i className="bi bi-card-list fs-5"></i>
                  <span>Lista Eventi</span>
                </button>
              </li>
              <li className="nav-item mt-2">
                <button
                  onClick={handleLogout}
                  className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-danger border-0 w-100 text-start bg-transparent"
                >
                  <i className="bi bi-box-arrow-left fs-5"></i>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;