// Sezione hero della homepage con titolo e barra di ricerca.
// Delega tutta la logica della ricerca al componente HeroSearchForm.
import HeroSearchForm from "./heroComponents/HeroSearchForm";
import { SearchProvider } from "../../context/SearchContext";
import bannerStats from "./BannerStats";

function Hero() {
  return (
    <section className="hero-section pt-5 text-center d-flex align-items-center justify-content-center flex-column gap-2">
      <h1 className="display-3 fw-bold text-light">
        Vivi momenti <br /> che restano.
      </h1>

      <div className="container pb-5">
        <p className="lead text-light fw-semibold mb-5">
          Eventi pubblici o privati per ogni interesse. <br /> Crea, organizza e
          partecipa.
        </p>

        <SearchProvider>
          <HeroSearchForm />
        </SearchProvider>        
      </div>
    </section>
  );
}

export default Hero;
