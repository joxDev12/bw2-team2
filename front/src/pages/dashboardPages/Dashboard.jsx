import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/img/logo.png";
import DashboardContent from "../../components/dashboardComponents/dashboardLayoutComponents/DashboardContent";
import DashboardMobileMenu from "../../components/dashboardComponents/dashboardLayoutComponents/DashboardMobileMenu";
import DashboardMobileTopbar from "../../components/dashboardComponents/dashboardLayoutComponents/DashboardMobileTopbar";
import DashboardSidebar from "../../components/dashboardComponents/dashboardLayoutComponents/DashboardSidebar";

function Dashboard() {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem("dashboardTab") || "profilo");
  const navigate = useNavigate();
  const { utente, logout } = useAuth();

  const user = {
    name: utente?.name ? `${utente.name} ${utente.surname || ""}`.trim() : "Utente",
    email: utente?.email || "",
    role: utente?.role || "partecipant",
    avatar: utente?.img_profile || null,
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

  const handleLogout = () => {
    localStorage.removeItem("dashboardTab");
    logout();
    navigate("/login");
  };

  const handleTornaAlSito = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-wrapper d-flex vh-100">
      <DashboardSidebar
        logo={logo}
        user={user}
        roleBadge={roleBadge}
        activeTab={activeTab}
        cambiaTab={cambiaTab}
        getInitials={getInitials}
        handleTornaAlSito={handleTornaAlSito}
        handleLogout={handleLogout}
      />

      <main className="dashboard-main flex-grow-1 overflow-auto">
        <DashboardMobileTopbar logo={logo} />
        <DashboardContent activeTab={activeTab} userRole={user.role} />
      </main>

      <DashboardMobileMenu
        logo={logo}
        user={user}
        roleBadge={roleBadge}
        activeTab={activeTab}
        cambiaTab={cambiaTab}
        getInitials={getInitials}
        handleTornaAlSito={handleTornaAlSito}
        handleLogout={handleLogout}
      />
    </div>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getRoleBadge(role) {
  const roles = {
    partecipant: { label: "Utente", cls: "bg-primary" },
    organizer: { label: "Organizzatore", cls: "bg-success" },
    admin: { label: "Admin", cls: "bg-danger" },
  };

  return roles[role] || roles.partecipant;
}

export default Dashboard;
