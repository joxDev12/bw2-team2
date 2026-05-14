import { useState, useEffect } from "react";
import CardListEvent from "./CardListEvent";
import { eventsAPI } from "../../services/api";

function ListEvent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calcoliamo quanti item mostrare in base alla larghezza (approssimativo, gestito meglio via CSS)
  // Ma ci serve per la logica dei bottoni
  const [itemsToShow, setItemsToShow] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) setItemsToShow(5);
      else if (window.innerWidth >= 992) setItemsToShow(4);
      else if (window.innerWidth >= 768) setItemsToShow(3);
      else if (window.innerWidth >= 576) setItemsToShow(2);
      else setItemsToShow(1);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await eventsAPI.getAll();
        // Prendiamo fino a 8 eventi come richiesto
        setEvents(data.slice(0, 8));
        setError(null);
      } catch (err) {
        console.error("Errore nel caricamento degli eventi:", err);
        setError("Impossibile caricare gli eventi. Riprova più tardi.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const nextSlide = () => {
    if (currentIndex < events.length - itemsToShow) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="py-5 overflow-hidden">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 text-light mb-0">Eventi in evidenza</h2>
          
          {!loading && events.length > itemsToShow && (
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-primary btn-sm rounded-circle"
                onClick={prevSlide}
                disabled={currentIndex === 0}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button 
                className="btn btn-outline-primary btn-sm rounded-circle"
                onClick={nextSlide}
                disabled={currentIndex >= events.length - itemsToShow}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Caricamento...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">Nessun evento disponibile al momento.</p>
          </div>
        ) : (
          <div className="slider-container">
            <div 
              className="slider-track"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {events.map((event) => (
                <div key={event.id} className="slider-item">
                  <CardListEvent event={event} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ListEvent;


