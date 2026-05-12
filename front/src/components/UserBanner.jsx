import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function UserBanner() {
    const { utente, logout } = useAuth();
    const navigate = useNavigate();
    const nomeCompleto = [utente?.name, utente?.surname].filter(Boolean).join(' ');
    const nomeVisualizzato = nomeCompleto;

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/', { replace: true });
    };

    if (!utente) {
        return null;
    }


    return (
        <div className="user-banner dropdown text-end">
            <a
                href="#"
                className="user-banner__toggle btn btn-primary d-flex gap-2 align-items-center link-body-emphasis text-decoration-none"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <h6 className="user-banner__name mb-0 text-white fw-bold">{nomeVisualizzato}</h6>
                <img
                    src="https://github.com/mdo.png"
                    alt="Immagine profilo utente"
                    className="user-banner__avatar rounded-circle"
                />
            </a>
            <ul className="dropdown-menu text-small">
                <li className="dropdown-item text-secondary">{utente.role}</li>
                <li><a className="dropdown-item" href="#">Dashboard</a></li>
                <li>
                    <hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
            </ul>
        </div>
    )

}

export default UserBanner;
