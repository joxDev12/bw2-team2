const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

// Avviso in console se la variabile manca (solo in sviluppo)
if (!import.meta.env.VITE_API_URL) {
  console.warn(
    '[api.js] VITE_API_URL non definita nel file .env.\n' +
    'Usando il fallback: http://localhost:3000/api\n' +
    'Copia .env.example in .env per risolvere.'
  )
}

function getToken() {
  return localStorage.getItem('token')
}

async function request(method, path, body = null) {
  const token = getToken()

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  }

  if (body) options.body = JSON.stringify(body)

  let res
  try {
    res = await fetch(`${BASE_URL}${path}`, options)
  } catch {
    throw new Error('Impossibile contattare il server. Controlla che il backend sia in esecuzione.')
  }

  const data = await res.json()

  if (res.status === 401) {
    window.dispatchEvent(new Event('auth:unauthorized'))
  }

  if (!data.successo) {
    const err = new Error(data.errore || 'Errore sconosciuto')
    err.status = res.status
    throw err
  }

  return data.dati
}

// ── Autenticazione ────────────────────────────────────────────
export const authAPI = {
  login: (email, password) =>
    request('POST', '/users/login', { email, password }),

  registra: (name, surname, email, password) =>
    request('POST', '/users/registra', { name, surname, email, password }),
}

// ── Events ─────────────────────────────────────────────────────
export const eventsAPI = {
  getAll:   ()         => request('GET',    '/events'),
  getById:  (id)       => request('GET',    `/events/${id}`),
  crea:     (dati)     => request('POST',   '/events', dati),
  aggiorna: (id, dati) => request('PATCH',  `/events/${id}`, dati),
  elimina:  (id)       => request('DELETE', `/events/${id}`),
}

// ── Registrations  ──────────────────────────────────────────────────
export const registrationsAPI = {
  getAll: () => request('GET', '/registrations'),

  crea: (user_id, data_restituzione_prevista) =>
    request('POST', '/registrations', {  }),

  
  elimina:     (id) => request('DELETE', `/registrations/${id}`),
}
