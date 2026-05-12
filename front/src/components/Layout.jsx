import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
// import { useAuth } from "../context/useAuth";   // servirà più avanti

function Layout() {
  // const { user, logout } = useAuth();
  //   togliere commento quando si implementa il contesto

  return (
    <div className="layout">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
