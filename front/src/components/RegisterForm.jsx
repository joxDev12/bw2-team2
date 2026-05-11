import { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'partecipant'
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

    if (formData.password !== formData.confirmPassword) {
      setError('Le password non coincidono.');
      setLoading(false);
      return;
    }

    try {
      console.log('Registrazione in corso...', formData);
    } catch (err) {
      setError(err.message || 'Errore durante la registrazione');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <h2 className="auth-heading">Crea account</h2>
        <p className="auth-sub">Unisciti alla nostra community di eventi</p>
      </div>

      {error && (
        <div className="alert alert-danger">
          <span>⚠️</span> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Nome</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Mario"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname" className="form-label">Cognome</label>
            <input
              id="surname"
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              placeholder="Rossi"
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="mario88"
            className="form-input"
            required
          />
        </div>

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
          />
        </div>

        <div className="form-group">
          <label htmlFor="role" className="form-label">Vuoi organizzare o partecipare?</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-input"
          >
            <option value="participant">Voglio partecipare agli eventi</option>
            <option value="organizer">Voglio organizzare eventi</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Conferma</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              className="form-input"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary btn-full"
          disabled={loading}
        >
          {loading ? 'Registrazione in corso...' : 'Crea account'}
        </button>
      </form>

      <p className="auth-footer">
        Hai già un account?{' '}
        <Link to="/login" className="auth-link">Accedi</Link>
      </p>
    </div>
  );
}

export default RegisterForm;