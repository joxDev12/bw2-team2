import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

import RegisterForm from '../components/RegisterForm';

function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    role: 'participant',
    password: '',
    confirmPassword: '',
  });
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

    if (form.password !== form.confirmPassword) {
      setErrore('Le password non coincidono.');
      setCaricamento(false);
      return;
    }

    const datiRegistrazione = {
      name: form.name,
      surname: form.surname,
      username: form.username,
      email: form.email,
      role: form.role,
      password_hash: form.password,
    };

    try {
      await authAPI.registra(datiRegistrazione);

      const token = await authAPI.login(form.email, form.password);
      login(token);
      navigate('/', { replace: true });
    } catch (err) {
      setErrore(err.message || 'Errore durante la registrazione');
    } finally {
      setCaricamento(false);
    }
  };

  return (
    <div className='auth-container'>
      <RegisterForm
        form={form}
        errore={errore}
        caricamento={caricamento}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default RegisterPage;
