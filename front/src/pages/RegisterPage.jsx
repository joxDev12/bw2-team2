import { useState } from 'react';
// import { register } from '../api/auth';   // ← NON esiste ancora, quindi lo lasciamo commentato
import { useNavigate, Link } from 'react-router-dom';

import RegisterForm from '../components/RegisterForm';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrore('');

    try {
      // await register(email, password);   // togliere commento quando si implementa la funzione di registrazione

      // LOGICA TEMPORANEA per far funzionare la pagina
      if (!email || !password) {
        throw new Error("Inserisci email e password");
      }

      setSuccess(true);
   
      setTimeout(() => navigate('/login'), 1500);
      navigate('/') //mettiamo la pagina dove vogliamo portare l'utente dopo la registrazione

    } catch (err) {
      setErrore(err.message);
    }
  }

  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h1>Registrazione completata</h1>
          <p>Reindirizzamento al login...</p>
        </div>
      </div>
    );
  }

  return (
    
    <div className='auth-container'>
        <h1>REGISTRA</h1>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
