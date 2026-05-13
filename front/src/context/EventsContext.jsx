import { createContext, useContext, useState, useEffect } from 'react'
import { eventsAPI } from '../services/api'

const EventsContext = createContext(null)

// Provider
export function EventsProvider({ children }) {

  const [eventi, setEventi] = useState([])
  const [loading, setLoading] = useState(true)
  const [errore, setErrore] = useState(null)

  const caricaEventi = async () => {
    setLoading(true)
    setErrore(null)

    try {
      const datiEventi = await eventsAPI.getAll()
      setEventi(datiEventi)
    } catch (err) {
      setErrore(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let annullato = false

    const recuperaEventi = async () => {
      try {
        const datiEventi = await eventsAPI.getAll()

        if (!annullato) {
          setEventi(datiEventi)
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

    recuperaEventi()

    return () => {
      annullato = true
    }
  }, [])

  return (
    <EventsContext.Provider value={{ eventi, loading, errore, caricaEventi }}>
      {children}
    </EventsContext.Provider>
  )
}

export function useEvents() {
  return useContext(EventsContext)
}
