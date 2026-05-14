// Sidebar desktop della dashboard con logo, profilo, navigazione e footer.
// Non appare su mobile: li viene usato DashboardMobileMenu.
import { NavLink } from "react-router-dom";
import DashboardMenuFooter from "./DashboardMenuFooter";
import DashboardNav from "./DashboardNav";
import DashboardUserCard from "./DashboardUserCard";

function DashboardSidebar({
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
    <aside className="dashboard-sidebar d-none d-lg-flex flex-column bg-dark text-white border-end shadow-sm overflow-y-auto custom-scrollbar">
      <div className="sidebar-brand px-3 py-4 text-center">
        <NavLink to="/" className="text-white text-decoration-none d-block">
          <img src={logo} alt="EventiHub Logo" className="dashboard-logo" />
        </NavLink>
      </div>

      <hr className="mx-3 my-0 opacity-25" />

      <DashboardUserCard
        user={user}
        roleBadge={roleBadge}
        getInitials={getInitials}
      />

      <hr className="mx-3 my-0 opacity-25" />

      <DashboardNav
        activeTab={activeTab}
        cambiaTab={cambiaTab}
        userRole={user.role}
      />

      <DashboardMenuFooter
        handleTornaAlSito={handleTornaAlSito}
        handleLogout={handleLogout}
      />
    </aside>
  );
}

export default DashboardSidebar;
