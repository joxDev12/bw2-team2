import { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log('Accesso in corso...', formData);
    } catch (err) {
      setError(err.message || 'Credenziali non valide');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <h2 className="auth-heading">Accedi</h2>
        <p className="auth-sub">Inserisci le tue credenziali per continuare</p>
      </div>

      {error && (
        <div className="alert alert-danger">
          <span>⚠️</span> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="mario.rossi@esempio.it"
            className="form-input"
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="form-input"
            required
          />
        </div>

        <button
          type="submit"
          className="btn-primary btn-full"
          disabled={loading}
        >
          {loading ? 'Accesso in corso...' : 'Accedi'}
        </button>
      </form>

      <p className="auth-footer">
        Non hai un account?{' '}
        <Link to="/register" className="auth-link">Registrati</Link>
      </p>
    </div>
  );
}

export default LoginForm;