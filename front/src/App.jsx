import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={
          <div>
            <h1>Build Week 2 - Team 2</h1>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;