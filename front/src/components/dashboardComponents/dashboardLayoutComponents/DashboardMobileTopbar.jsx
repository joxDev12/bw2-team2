// Barra superiore visibile solo su mobile.
// Apre l'offcanvas laterale e mostra il logo al centro.
function DashboardMobileTopbar({ logo }) {
  return (
    <header className="dashboard-topbar d-lg-none d-flex align-items-center justify-content-between px-3 py-2">
      <button className="btn btn-outline-light btn-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileSidebar">
        <i className="bi bi-list fs-5"></i>
      </button>
      <img src={logo} alt="EventiHub Logo" className="dashboard-topbar-logo" />
      <div style={{ width: "32px" }}></div>
    </header>
  );
}

export default DashboardMobileTopbar;
