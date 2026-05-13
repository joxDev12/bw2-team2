// Sezione hero della homepage con titolo e barra di ricerca.
// Delega tutta la logica della ricerca al componente HeroSearchForm.
import HeroSearchForm from "./heroComponents/HeroSearchForm";

function Hero() {
    return (
        <div className="px-5 py-5 text-center hero-section w-100 d-flex align-items-center justify-content-center flex-column gap-2">
            <h1 className="display-5 fw-bold text-light">
                Vivi momenti <br /> che restano.
            </h1>

            <div className="col-lg-10 mx-auto pb-5">
                <p className="lead mb-4 text-light fw-semibold mb-5">
                    Eventi pubblici o privati per ogni interesse. <br /> Crea, organizza e partecipa.
                </p>

                <HeroSearchForm />
            </div>
        </div>
    );
}

export default Hero;
