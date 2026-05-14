import DashboardContent from "../../components/dashboardComponents/dashboardLayoutComponents/DashboardContent";
import DashboardNav from "../../components/dashboardComponents/dashboardLayoutComponents/DashboardNav";
import DashboardSidebar from "../../components/dashboardComponents/dashboardLayoutComponents/DashboardSidebar";
import { DashboardProvider } from "../../context/DashboardContext";

function Dashboard() {
  return (
    <DashboardProvider>
      <div className="d-flex vh-100">
        <DashboardSidebar />

        <main className="bg-soft-dark min-vh-100 flex-grow-1 overflow-auto">
          <DashboardNav />
          <DashboardContent />
        </main>
      </div>
    </DashboardProvider>
  );
}

export default Dashboard;
