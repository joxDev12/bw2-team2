
// ============================================================
// App.jsx — Componente principale dell'applicazione
// ============================================================
// Questo è il "cervello" dell'app: contiene lo stato globale
// (le task e il filtro attivo) e tutte le funzioni che lo
// modificano. Le passa poi ai componenti figli tramite le props.
//
// Rispetto alla lezione 1, qui le task NON sono più salvate
// solo in memoria: ogni azione (aggiungi, toggle, elimina)
// chiama il backend, che le persiste nel database PostgreSQL.
// ============================================================
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';

import NotFound from './pages/NotFound';
import StatsPage from './pages/StatsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';


// ── Componente App ───────────────────────────────────────────
function App() {

  return(
    <>
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="h1">Build Week 2 - Team 2</h1>
        <h1 className="h1 text-success">Questo div sta al centro della pagina?</h1>

        <button className="btn btn-custom_color">Un bottone Custom</button>
        <button className="btn btn-primary">Un bottone primary modificato</button>
      </div>
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>

      <Route path='/' element={<ProtectedRoute> <Layout/> </ProtectedRoute>}>
        <Route index element={<TodoPage/>}/>
        <Route path='task/:id' element={<DettaglioTask/>}/>
        <Route path='stats' element={<StatsPage/>}/>
      </Route>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    </>

  )
}

export default App;
