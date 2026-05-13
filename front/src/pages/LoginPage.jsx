import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

import LoginForm from '../components/LoginForm';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const destinazione = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [errore, setErrore] = useState(null);
  const [caricamento, setCaricamento] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrore(null);
    setCaricamento(true);

    try {
      const token = await authAPI.login(form.email, form.password);
      login(token);
      navigate(destinazione, { replace: true });
    } catch (err) {
      setErrore(err.message || 'Credenziali non valide');
    } finally {
      setCaricamento(false);
    }
  };

  return (
    <div className='auth-container'>
      <LoginForm
        form={form}
        errore={errore}
        caricamento={caricamento}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default LoginPage;
