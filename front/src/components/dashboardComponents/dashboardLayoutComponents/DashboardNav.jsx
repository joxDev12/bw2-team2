// Renderizza i pulsanti di navigazione tra le sezioni della dashboard.
// Se e mobile chiude anche l'offcanvas dopo il click.
function DashboardNav({ activeTab, cambiaTab, userRole, mobile = false }) {
  const dismissProps = mobile ? { "data-bs-dismiss": "offcanvas" } : {};

  const getClassName = (tab) =>
    `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all border-0 w-100 text-start ${
      activeTab === tab
        ? "active shadow-sm"
        : "text-white-50 link-light bg-transparent"
    }`;

  return (
    <nav
      className={
        mobile ? "px-3 py-2" : "sidebar-nav flex-grow-1 flex-shrink-0 px-3 py-3"
      }
    >
      <ul className="nav nav-pills flex-column gap-1">
        <li className="nav-item">
          <button
            onClick={() => cambiaTab("profilo")}
            className={getClassName("profilo")}
            {...dismissProps}
          >
            <i className="bi bi-person-fill fs-5"></i>
            <span>Profilo</span>
          </button>
        </li>

        <li className="nav-item">
          <button
            onClick={() => cambiaTab("miei-eventi")}
            className={getClassName("miei-eventi")}
            {...dismissProps}
          >
            <i className="bi bi-calendar2-week-fill fs-5"></i>
            <span>I Miei Eventi</span>
          </button>
        </li>

        {(userRole === "admin" || userRole === "organizer") && (
          <li className="nav-item">
            <button
              onClick={() => cambiaTab("registrazioni")}
              className={getClassName("registrazioni")}
              {...dismissProps}
            >
              <i className="bi bi-people-fill fs-5"></i>
              <span>Registrazioni</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default DashboardNav;
