import { Link } from 'react-router-dom'

function NotFound(){
    return(
        <>
        <div style={{textAlign: 'center', paddingTop: 60, minHeight: '100vh'}}>
            <h1 style={{ fontSize: '5rem' , margin: 0, color: 'var(--bs-primary)'}}>404</h1>
            <p className="lead text-muted" style={{ marginTop: 24}}>Oops! Questa pagina non esiste.</p>
            <Link to='/' className="btn btn-primary mt-4">Torna alla Home</Link>
        </div>
        </>
    )

}

export default NotFound;