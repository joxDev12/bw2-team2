// Menu laterale mobile costruito come offcanvas Bootstrap.
// Riusa profilo, navigazione e footer della sidebar desktop.
import DashboardMenuFooter from "./DashboardMenuFooter";
import DashboardNav from "./DashboardNav";
import DashboardUserCard from "./DashboardUserCard";

function DashboardMobileMenu({
  logo,
  user,
  roleBadge,
  activeTab,
  cambiaTab,
  getInitials,
  handleTornaAlSito,
  handleLogout,
}) {
  return (
    <div className="offcanvas offcanvas-start dashboard-offcanvas" tabIndex="-1" id="mobileSidebar">
      <div className="offcanvas-header bg-dark justify-content-center position-relative px-3 py-4">
        <h5 className="offcanvas-title text-white mb-0">
          <img src={logo} alt="EventiHub Logo" className="dashboard-offcanvas-logo" />
        </h5>
        <button type="button" className="btn-close btn-close-white position-absolute top-0 end-0 m-3" data-bs-dismiss="offcanvas"></button>
      </div>

      <div className="offcanvas-body p-0 bg-dark text-white d-flex flex-column">
        <DashboardUserCard user={user} roleBadge={roleBadge} getInitials={getInitials} />
        <hr className="mx-3 opacity-25" />
        <DashboardNav activeTab={activeTab} cambiaTab={cambiaTab} userRole={user.role} mobile />
        <DashboardMenuFooter handleTornaAlSito={handleTornaAlSito} handleLogout={handleLogout} mobile />
      </div>
    </div>
  );
}

export default DashboardMobileMenu;
