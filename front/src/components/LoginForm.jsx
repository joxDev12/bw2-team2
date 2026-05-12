import { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log("Accesso in corso...", formData);
    } catch (err) {
      setError(err.message || "Credenziali non valide");
    } finally {
      setLoading(false);
    }
  };

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

      {error && (
        <div className="alert alert-danger" role="alert">
          <span>⚠️</span> {error}
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
            value={formData.email}
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
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="form-control"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 py-2 mt-2 fw-bold"
          disabled={loading}
        >
          {loading ? "Accesso in corso..." : "Accedi"}
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