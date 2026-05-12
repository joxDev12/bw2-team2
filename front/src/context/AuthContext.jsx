import { createContext, useContext, useState, useEffect } from 'react'

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
    if (token) {
      const payload = decodeJWT(token)
      if (!payload || payload.exp * 1000 < Date.now()) {
        logout()
      }
    }
  }, [])

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

  return (
    <AuthContext.Provider value={{ token, utente, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}