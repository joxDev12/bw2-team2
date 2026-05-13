import {useParams} from "react-router-dom";

function EventiDettaglioPage() {
    const { id } = useParams();
    return (
        <div className="container py-5">
            <h1>Dettaglio Evento</h1>
            <p>Visualizza i dettagli dell'evento con ID: {id}</p>
        </div>
    );
}

export default EventiDettaglioPage;