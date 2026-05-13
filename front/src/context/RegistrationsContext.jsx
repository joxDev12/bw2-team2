import { createContext, useContext, useState, useEffect } from 'react'
import { registrationsAPI } from '../services/api'

const RegistrationsContext = createContext(null)

// Provider
export function RegistrationsProvider({ children }) {

  const [registrazioni, setRegistrazioni] = useState([])
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    let annullato = false

    const recuperaRegistrazioni = async () => {
      try {
        const datiRegistrazioni = await registrationsAPI.getAll()

        if (!annullato) {
          setRegistrazioni(datiRegistrazioni)
        }
      } catch (err) {
        if (!annullato) {
          setErrore(err.message)
        }
      } finally {
        if (!annullato) {
          setLoading(false)
        }
      }
    }

    recuperaRegistrazioni()

    return () => {
      annullato = true
    }
  }, [])

  return (
    <RegistrationsContext.Provider value={{ registrazioni, loading, errore, caricaRegistrazioni }}>
      {children}
    </RegistrationsContext.Provider>
  )
}

export function useRegistrations() {
  return useContext(RegistrationsContext)
}
