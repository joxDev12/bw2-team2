import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import ContattiPage from "./pages/ContattiPage";
import ChiSiamoPage from "./pages/ChiSiamoPage";
import EventiPage from "./pages/EventiPage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EventiDettaglioPage from "./pages/EventiDettaglioPage";
import NotFound from "./pages/NotFound";

// ── Componente App ───────────────────────────────────────────
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="chi-siamo" element={<ChiSiamoPage />} />
          <Route path="eventi" element={<EventiPage />} />
          <Route path="contatti" element={<ContattiPage />} />
        </Route>

        <Route path="/eventi/:id" element={<EventiDettaglioPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
