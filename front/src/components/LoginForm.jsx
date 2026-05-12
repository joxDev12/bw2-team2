import { Link } from 'react-router-dom';

function LoginForm({ form, errore, caricamento, handleChange, handleSubmit }) {
  return (
    <div
      className="card shadow-sm p-4 mx-auto border-0"
      style={{ maxWidth: "400px", width: "100%" }}
    >
      <div className="text-center mb-4">
        <h2 className="h4 mb-2 fw-bold">Accedi</h2>
        <p className="text-muted">
          Inserisci le tue credenziali per continuare
        </p>
      </div>

      {errore && (
        <div className="alert alert-danger" role="alert">
          <span>⚠️</span> {errore}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="mario.rossi@esempio.it"
            className="form-control"
            required
            autoFocus
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="form-control"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 py-2 mt-2 fw-bold"
          disabled={caricamento}
        >
          {caricamento ? "Accesso in corso..." : "Accedi"}
        </button>
      </form>

      <p className="text-center mt-4 mb-0 text-muted">
        Non hai un account?{" "}
        <Link to="/register" className="text-decoration-none fw-bold">
          Registrati
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
