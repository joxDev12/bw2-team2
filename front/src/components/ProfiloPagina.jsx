import { useAuth } from '../context/AuthContext'
import profilePlaceholder from '../assets/img/profile_placeholder.webp'

function ProfiloPagina() {
  const { utente } = useAuth()

  if (!utente) return null

  const getRoleBadge = (role) => {
    const roles = {
      user:      { label: 'Utente',        cls: 'bg-primary',  icon: 'bi-person-fill' },
      organizer: { label: 'Organizzatore', cls: 'bg-success',  icon: 'bi-calendar-star' },
      admin:     { label: 'Admin',         cls: 'bg-danger',   icon: 'bi-shield-lock-fill' },
    }
    return roles[role] || roles.user
  }

  const roleBadge = getRoleBadge(utente.role)
  const nomeCompleto = [utente.name, utente.surname].filter(Boolean).join(' ')
  const immagineProfilo = utente.img_profile || profilePlaceholder

  const campi = [
    { label: 'Nome',     valore: utente.name     || '—', icona: 'bi-person' },
    { label: 'Cognome',  valore: utente.surname  || '—', icona: 'bi-person' },
    { label: 'Username', valore: utente.username || '—', icona: 'bi-at' },
    { label: 'Email',    valore: utente.email    || '—', icona: 'bi-envelope' },
  ]

  return (
    <>
      <h2 className="fw-bold mb-1">
        Il mio <span className="text-primary">Profilo</span>
      </h2>
      <p className="text-muted mb-4">Visualizza i tuoi dati personali</p>

      {/* ── Card Profilo ── */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">

        {/* Header Bootstrap */}
        <div className="bg-primary bg-gradient text-white text-center py-5 px-3">
          <img
            src={immagineProfilo}
            alt={nomeCompleto || 'Profilo'}
            className="profilo-avatar rounded-circle border border-4 border-white shadow mb-3"
            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
          />
          <h4 className="mb-2 fw-bold">{nomeCompleto || 'Utente'}</h4>
          <span className={`badge ${roleBadge.cls} rounded-pill px-3 py-2 shadow-sm fs-6`}>
            <i className={`bi ${roleBadge.icon} me-2`}></i>
            {roleBadge.label}
          </span>
        </div>

        {/* Body con i campi Bootstrap */}
        <div className="card-body bg-light p-4 p-md-5">
          <div className="row g-4">
            {campi.map((campo) => (
              <div key={campo.label} className="col-12 col-md-6">
                <div className="card border-0 shadow-sm h-100 profilo-campo">
                  <div className="card-body d-flex align-items-center gap-4 p-3 p-xl-4">
                    <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '56px', height: '56px' }}>
                      <i className={`bi ${campo.icona} fs-3`}></i>
                    </div>
                    <div className="min-width-0">
                      <small className="text-muted text-uppercase fw-bold d-block mb-1">
                        {campo.label}
                      </small>
                      <span className="fw-semibold text-dark fs-5 text-break">
                        {campo.valore}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfiloPagina
