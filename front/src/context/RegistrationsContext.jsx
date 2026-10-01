import { createContext, useContext, useState } from 'react'
import { registrationsAPI } from '../services/api'

const RegistrationsContext = createContext(null)

// Provider
export function RegistrationsProvider({ children }) {

  const [registrazioni, setRegistrazioni] = useState([])
  const [registrazioniEvento, setRegistrazioniEvento] = useState([])
  const [loading, setLoading] = useState(false)
  const [errore, setErrore] = useState(null)

  const caricaRegistrazioni = async () => {
    setLoading(true)
    setErrore(null)

    try {
      const datiRegistrazioni = await registrationsAPI.getAll()
      setRegistrazioni(datiRegistrazioni)
    } catch (err) {
      setErrore(err.message)
    } finally {
      setLoading(false)
    }
  }

  const caricaRegistrazioniEvento = async (id) => {
    setLoading(true)
    setErrore(null)

    try {
      const datiRegistrazioni = await registrationsAPI.getPublicByEventId(id)
      setRegistrazioniEvento(datiRegistrazioni)
    } catch (err) {
      setErrore(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <RegistrationsContext.Provider value={{ registrazioni, registrazioniEvento, loading, errore, caricaRegistrazioni, caricaRegistrazioniEvento }}>
      {children}
    </RegistrationsContext.Provider>
  )
}

export function useRegistrations() {
  return useContext(RegistrationsContext)
}
