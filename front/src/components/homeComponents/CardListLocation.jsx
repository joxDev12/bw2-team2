import { Link } from "react-router-dom";

function CardListLocation({ location }) {
    if (!location) return null;

    const {
        nome,
        img
    } = location;

    return (
        <div className="h-100 px-2">
            <Link to={`/eventi?location=${encodeURIComponent(nome)}`} className="text-decoration-none h-100 d-block">
                <article className="card bg-soft-dark border-0 shadow-sm h-100 animazione-card">
                    <div className="card-body text-white p-3">
                        <div className="position-relative">
                            {img ? (
                                <div
                                    className="bg-secondary rounded d-flex align-items-center justify-content-center"
                                    style={{ width: '100%', height: '160px' }}
                                >
                                    <img
                                        src={img}
                                        alt={nome}
                                        className="img-fluid rounded"
                                        style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                                    />
                                </div>
                            ) : (
                                <div
                                    className="bg-secondary rounded d-flex align-items-center justify-content-center"
                                    style={{ width: '100%', height: '160px' }}
                                >
                                    <i className="bi bi-image text-white fs-1"></i>
                                </div>
                            )}
                            <span className="badge bg-primary position-absolute top-0 start-0 m-2">{nome}</span>
                        </div>
                    </div>
                </article>
            </Link>
        </div>
    );
}

export default CardListLocation;


