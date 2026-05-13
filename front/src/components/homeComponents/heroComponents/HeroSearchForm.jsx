// Form di ricerca della hero con eventi, location e date.
// Prepara suggerimenti e costruisce la URL filtrata per la pagina eventi.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../../../context/EventsContext";
import HeroEventSuggestion from "./HeroEventSuggestion";
import HeroOrganizerSuggestion from "./HeroOrganizerSuggestion";
import HeroSearchField from "./HeroSearchField";
import HeroSimpleSuggestion from "./HeroSimpleSuggestion";

function testoPulito(testo) {
    return testo.toLowerCase().trim();
}

function formattaDataIso(dataEvento) {
    return new Date(dataEvento).toISOString().split("T")[0];
}

function formattaDataLabel(dataEvento) {
    return new Date(dataEvento).toLocaleDateString("it-IT", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function eventoContieneTesto(evento, testo) {
    if (!testo) return true;

    return [
        evento.title,
        evento.organizer_fullname,
        evento.organizer_username,
        evento.location,
    ].some((campo) => campo?.toLowerCase().includes(testo));
}

function dataContieneTesto(dataEvento, testo) {
    const data = new Date(dataEvento);

    return [
        formattaDataLabel(dataEvento),
        formattaDataIso(dataEvento),
        data.toLocaleDateString("it-IT"),
        String(data.getDate()),
        data.toLocaleDateString("it-IT", { month: "long" }),
        String(data.getFullYear()),
    ].some((testoData) => testoData.toLowerCase().includes(testo));
}

function HeroSearchForm() {
    const { eventi } = useEvents();
    const navigate = useNavigate();

    const [ricerca, setRicerca] = useState("");
    const [ricercaLocation, setRicercaLocation] = useState("");
    const [ricercaData, setRicercaData] = useState("");
    const [dataSelezionata, setDataSelezionata] = useState("");
    const [inputAttivo, setInputAttivo] = useState(null);

    const [ricercaSelezionata, setRicercaSelezionata] = useState(false);
    const [locationSelezionata, setLocationSelezionata] = useState(false);
    const [dataInputSelezionata, setDataInputSelezionata] = useState(false);

    const testoRicerca = testoPulito(ricerca);
    const testoLocation = testoPulito(ricercaLocation);
    const testoData = testoPulito(ricercaData);

    // Base comune: gli eventi compatibili con i filtri gia selezionati.
    const eventiCompatibili = eventi.filter((evento) => {
        const matchRicerca = eventoContieneTesto(evento, testoRicerca);
        const matchLocation = !locationSelezionata || evento.location === ricercaLocation.trim();
        const matchData = !dataSelezionata || formattaDataIso(evento.date) === dataSelezionata;

        return matchRicerca && matchLocation && matchData;
    });

    // Nella prima barra gli eventi hanno precedenza sugli organizzatori.
    const eventiSuggeriti = ricerca.trim() && !ricercaSelezionata
        ? eventiCompatibili.slice(0, 5)
        : [];

    const organizzatoriSuggeriti = eventiCompatibili
        .filter((evento) => {
            const nome = testoPulito(evento.organizer_fullname || "");
            const username = testoPulito(evento.organizer_username || "");
            return testoRicerca && !ricercaSelezionata && (nome.includes(testoRicerca) || username.includes(testoRicerca));
        })
        .reduce((lista, evento) => {
            const giaPresente = lista.some((organizzatore) => organizzatore.id === evento.organizer_id);

            if (!giaPresente && evento.organizer_fullname) {
                lista.push({
                    id: evento.organizer_id,
                    nome: evento.organizer_fullname,
                    username: evento.organizer_username,
                    imgProfile: evento.organizer_img_profile,
                });
            }

            return lista;
        }, [])
        .slice(0, Math.max(0, 6 - eventiSuggeriti.length));

    const locationsSuggerite = !testoLocation || locationSelezionata
        ? []
        : eventi
            .filter((evento) => eventoContieneTesto(evento, testoRicerca))
            .filter((evento) => !dataSelezionata || formattaDataIso(evento.date) === dataSelezionata)
            .map((evento) => evento.location)
            .filter((location) => location?.toLowerCase().includes(testoLocation))
            .filter((location, index, lista) => lista.indexOf(location) === index)
            .sort((a, b) => a.localeCompare(b, "it"))
            .slice(0, 6);

    // La data si cerca anche scrivendo parole tipo "maggio", non solo numeri.
    const dateSuggerite = !testoData || dataInputSelezionata
        ? []
        : eventi
            .filter((evento) => eventoContieneTesto(evento, testoRicerca))
            .filter((evento) => !ricercaLocation.trim() || evento.location === ricercaLocation.trim())
            .filter((evento) => dataContieneTesto(evento.date, testoData))
            .map((evento) => ({
                valore: formattaDataIso(evento.date),
                label: formattaDataLabel(evento.date),
            }))
            .filter((data, index, lista) => lista.findIndex((item) => item.valore === data.valore) === index)
            .sort((a, b) => a.valore.localeCompare(b.valore))
            .slice(0, 6);

    const creaUrlEventi = (filtri = {}) => {
        const params = new URLSearchParams();
        const q = filtri.q ?? ricerca.trim();
        const location = filtri.location ?? ricercaLocation.trim();
        const date = filtri.date ?? dataSelezionata;

        if (q) params.set("q", q);
        if (location) params.set("location", location);
        if (date) params.set("date", date);

        const query = params.toString();
        return query ? `/eventi?${query}` : "/eventi";
    };

    const cercaEventi = (e) => {
        e.preventDefault();
        navigate(creaUrlEventi());
    };

    const selezionaRicerca = (valore) => {
        setRicerca(valore);
        setRicercaSelezionata(true);
        setInputAttivo(null);
    };

    const selezionaLocation = (location) => {
        setRicercaLocation(location);
        setLocationSelezionata(true);
        setInputAttivo(null);
    };

    const selezionaData = (valore, label) => {
        setRicercaData(label);
        setDataSelezionata(valore);
        setDataInputSelezionata(true);
        setInputAttivo(null);
    };

    return (
        <form className="d-flex flex-column gap-2 flex-sm-row gap-sm-0 custom-border" onSubmit={cercaEventi}>
            <HeroSearchField
                id="search"
                icon="bi-search"
                label="Cerca eventi, artisti, luoghi..."
                value={ricerca}
                inputClassName="form-control custom-rounded rounded-start-3"
                active={inputAttivo === "ricerca" && (eventiSuggeriti.length > 0 || organizzatoriSuggeriti.length > 0)}
                onFocus={() => setInputAttivo("ricerca")}
                onBlur={() => setInputAttivo(null)}
                onChange={(e) => {
                    setRicerca(e.target.value);
                    setRicercaSelezionata(false);
                }}
            >
                {eventiSuggeriti.map((evento) => (
                    <HeroEventSuggestion
                        key={evento.id}
                        evento={evento}
                        to={creaUrlEventi({ q: evento.title })}
                        onSelect={() => selezionaRicerca(evento.title)}
                    />
                ))}
                {organizzatoriSuggeriti.map((organizzatore) => (
                    <HeroOrganizerSuggestion
                        key={organizzatore.id}
                        organizzatore={organizzatore}
                        to={creaUrlEventi({ q: organizzatore.nome })}
                        onSelect={() => selezionaRicerca(organizzatore.nome)}
                    />
                ))}
            </HeroSearchField>

            <HeroSearchField
                id="geo"
                icon="bi-geo-alt"
                label="Dove?"
                value={ricercaLocation}
                active={inputAttivo === "location" && locationsSuggerite.length > 0}
                onFocus={() => setInputAttivo("location")}
                onBlur={() => setInputAttivo(null)}
                onChange={(e) => {
                    setRicercaLocation(e.target.value);
                    setLocationSelezionata(false);
                }}
            >
                {locationsSuggerite.map((location) => (
                    <HeroSimpleSuggestion
                        key={location}
                        icon="bi-geo-alt"
                        label={location}
                        to={creaUrlEventi({ location })}
                        ariaLabel={`Cerca eventi a ${location}`}
                        onSelect={() => selezionaLocation(location)}
                    />
                ))}
            </HeroSearchField>

            <HeroSearchField
                id="date"
                icon="bi-calendar-week"
                label="Quando?"
                value={ricercaData}
                active={inputAttivo === "data" && dateSuggerite.length > 0}
                onFocus={() => setInputAttivo("data")}
                onBlur={() => setInputAttivo(null)}
                onChange={(e) => {
                    setRicercaData(e.target.value);
                    setDataSelezionata("");
                    setDataInputSelezionata(false);
                }}
            >
                {dateSuggerite.map(({ valore, label }) => (
                    <HeroSimpleSuggestion
                        key={valore}
                        icon="bi-calendar-week"
                        label={label}
                        to={creaUrlEventi({ date: valore })}
                        ariaLabel={`Cerca eventi del ${label}`}
                        onSelect={() => selezionaData(valore, label)}
                    />
                ))}
            </HeroSearchField>

            <button className="btn btn-primary px-4 custom-rounded rounded-end-3" type="submit">
                Cerca
            </button>
        </form>
    );
}

export default HeroSearchForm;
