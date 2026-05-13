import { createContext, useContext, useState, useEffect } from 'react'
import { usersAPI } from '../services/api'

const AuthContext = createContext(null)

function decodeJWT(token) {
  try {
    // Sostituiamo i caratteri Base64Url → Base64 standard
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  } catch {
    return null
  }
}

// ── Provider ──────────────────────────────────────────────────
export function AuthProvider({ children }) {

  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [utente, setUtente] = useState(() => {
    const t = localStorage.getItem('token')
    return t ? decodeJWT(t) : null
  })

  useEffect(() => {
    if (!token) {
      setUtente(null)
      return
    }

    const payload = decodeJWT(token)

    if (!payload || payload.exp * 1000 < Date.now()) {
      logout()
      return
    }

    setUtente(payload)

    if (!payload.id) {
      return
    }

    let annullato = false

    const caricaUtente = async () => {
      try {
        const datiUtente = await usersAPI.getById(payload.id)

        if (!annullato) {
          setUtente((prev) => ({ ...prev, ...datiUtente }))
        }
      } catch {
        // Gli errori 401 vengono già gestiti globalmente da auth:unauthorized.
      }
    }

    caricaUtente()

    return () => {
      annullato = true
    }
  }, [token])

  useEffect(() => {
    const handleUnauthorized = () => logout()
    window.addEventListener('auth:unauthorized', handleUnauthorized)
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized)
  }, []) 

  const login = (nuovoToken) => {
    localStorage.setItem('token', nuovoToken)
    setToken(nuovoToken)
    setUtente(decodeJWT(nuovoToken))
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUtente(null)
  }

  // Aggiorna i dati utente nel contesto (dopo modifica profilo)
  const aggiornaUtente = (nuoviDati) => {
    if (nuoviDati?.token) {
      localStorage.setItem('token', nuoviDati.token)
      setToken(nuoviDati.token)
      setUtente(decodeJWT(nuoviDati.token))
      return
    }

    setUtente((prev) => ({ ...prev, ...nuoviDati }))
  }

  return (
    <AuthContext.Provider value={{ token, utente, login, logout, aggiornaUtente }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
