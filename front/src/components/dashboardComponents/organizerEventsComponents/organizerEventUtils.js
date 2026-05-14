// Contiene costanti e funzioni pure usate nella gestione eventi organizzatore.
// Qui non c'e stato React: solo dati di supporto e calcoli riutilizzabili.
import eventsPlaceholder from "../../../assets/img/events_placeholder.webp";

export const datiEventoVuoti = {
  title: "",
  description: "",
  date: "",
  location: "",
  indirizzo: "",
  price: "",
  max_seats: "",
  category: "",
};

export const categorieEvento = [
  "Musica",
  "Sport",
  "Tecnologia",
  "Cultura e Spettacolo",
  "Enogastronomia",
];

export const cittaEvento = ["Roma", "Napoli", "Firenze", "Ancona", "Milano"];

export const getPostiPrenotati = (evento) =>
  Number(evento.seats_prenotati ?? 0);
export const getPostiDisponibili = (evento) => Number(evento.max_seats ?? 0);
export const getPostiTotali = (evento) =>
  getPostiPrenotati(evento) + getPostiDisponibili(evento);
export const getPrezzoEvento = (evento) =>
  Number(evento.price ?? 0) === 0
    ? "Gratis"
    : `${Number(evento.price).toFixed(2)} euro`;
export const getImmagineEvento = (evento) => evento.image || eventsPlaceholder;

export const preparaDatiEvento = (form) => ({
  title: form.title,
  description: form.description,
  date: form.date,
  location: form.location,
  indirizzo: form.indirizzo,
  ...(form.price !== "" && { price: form.price }),
  max_seats: form.max_seats,
  category: form.category,
});

export const creaFormDaEvento = (evento) => ({
  title: evento.title || "",
  description: evento.description || "",
  date: evento.date ? new Date(evento.date).toISOString().split("T")[0] : "",
  location: evento.location || "",
  indirizzo: evento.indirizzo || "",
  price: evento.price ?? "",
  max_seats: evento.max_seats ?? "",
  category: evento.category || "",
});

export const ordinaEFiltraEventi = (eventi, filtroEventi) => {
  const oggi = new Date();
  oggi.setHours(0, 0, 0, 0);

  let eventiFiltrati = [...eventi];

  if (filtroEventi === "in_corso") {
    eventiFiltrati = eventiFiltrati.filter(
      (evento) => new Date(evento.date) >= oggi,
    );
  }

  if (filtroEventi === "passati") {
    eventiFiltrati = eventiFiltrati.filter(
      (evento) => new Date(evento.date) < oggi,
    );
  }

  eventiFiltrati.sort((a, b) => {
    if (filtroEventi === "data_creazione")
      return new Date(b.created_at) - new Date(a.created_at);
    if (filtroEventi === "prenotazioni_piu")
      return getPostiPrenotati(b) - getPostiPrenotati(a);
    if (filtroEventi === "prenotazioni_meno")
      return getPostiPrenotati(a) - getPostiPrenotati(b);
    return new Date(a.date) - new Date(b.date);
  });

  return eventiFiltrati;
};
