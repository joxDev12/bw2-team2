import { Link } from "react-router-dom"

function BannerOrganizzatore() {

    return (
        <>
           <section className="container py-5">
            <div className="organizer-banner bg-danger rounded-4 d-flex align-items-center justify-content-between p-4 text-light gap-3">


                <div className="banner-content">
                    <h2>Sei un organizzatore?</h2>

                    <p className="m-0 text-light">
                        Crea e gestisci i tuoi eventi.
                        Raggiungi il tuo pubblico e fai crescere la tua community.
                    </p>
                </div>

                <div className="banner-actions d-flex flex-column align-items-center gap-3">
                    <button className="btn btn bg-primary fw-bold py-2 px-3 text-light">
                        Crea il tuo evento
                    </button>
                    
                    <Link to="/about" className="banner-link text-decoration-none text-light">
                        Scopri di più →
                    </Link>
                </div>

            </div>
        </section>
        </>
    );
}

export default BannerOrganizzatore;