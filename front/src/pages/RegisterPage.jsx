import { useState } from 'react';
// import { register } from '../api/auth';   // ← NON esiste ancora, quindi lo lasciamo commentato
import { useNavigate, Link } from 'react-router-dom';

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
      {/* <div className='auth-card'>
        

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          {errore && <p className='errore'>{errore}</p>}

          <button type='submit'>Registrati</button>
        </form>

        <p className='auth-link'>
          Hai già un account? <Link to='/login'>Accedi</Link>
        </p>
      </div> */}
    </div>
  );
}

export default RegisterPage;
