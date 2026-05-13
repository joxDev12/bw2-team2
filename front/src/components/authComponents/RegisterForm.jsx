// Form di registrazione con dati utente e scelta ruolo.
// Riceve valori, errori e handler dalla pagina RegisterPage.
import { Link } from "react-router-dom";

function RegisterForm({ form, errore, caricamento, handleChange, handleSubmit }) {
  return (
    <div
      className="card shadow-sm p-4 mx-auto border-0"
      style={{ maxWidth: "500px", width: "100%" }}
    >
      <div className="text-center mb-4">
        <h2 className="h4 mb-2 fw-bold">Crea account</h2>
        <p className="text-muted">Unisciti alla nostra community di eventi</p>
      </div>

      {errore && (
        <div className="alert alert-danger" role="alert">
          <span>⚠️</span> {errore}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="name" className="form-label fw-medium">
              Nome
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Mario"
              className="form-control"
              maxLength={255}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="surname" className="form-label fw-medium">
              Cognome
            </label>
            <input
              id="surname"
              type="text"
              name="surname"
              value={form.surname}
              onChange={handleChange}
              placeholder="Rossi"
              className="form-control"
              maxLength={255}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label fw-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="mario88"
            className="form-control"
            minLength={3}
            maxLength={255}
            required
          />
        </div>

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
            maxLength={255}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label fw-medium">
            Vuoi organizzare o partecipare?
          </label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="form-select"
          >
            <option value="partecipant">Voglio partecipare agli eventi</option>
            <option value="organizer">Voglio organizzare eventi</option>
          </select>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="password" className="form-label fw-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              className="form-control"
              minLength={8}
              maxLength={100}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=\[\]{};':&quot;\\|,.<>\/?`~]).+$"
              title="La password deve contenere almeno una maiuscola, una minuscola, un numero e un carattere speciale"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="confirmPassword" className="form-label fw-medium">
              Conferma
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              className="form-control"
              minLength={8}
              maxLength={100}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 py-2 mt-2 fw-bold"
          disabled={caricamento}
        >
          {caricamento ? "Registrazione in corso..." : "Crea account"}
        </button>
      </form>

      <p className="text-center mt-4 mb-0 text-muted">
        Hai già un account?{" "}
        <Link to="/login" className="text-decoration-none fw-bold">
          Accedi
        </Link>
      </p>
    </div>
  );
}

export default RegisterForm;
