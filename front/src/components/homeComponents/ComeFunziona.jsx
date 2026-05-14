// Sezione homepage che spiega i passaggi base di EventHub.
// Presenta il funzionamento del sito con blocchi informativi.
function ComeFunziona() {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center text-light mb-5">Come funziona</h2>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          <div className="col">
            <article className="card bg-soft-dark border-0 h-100 text-center animazione-card">
              <div className="step-icon">
                <i className="bi bi-heart-fill"></i>
              </div>
              <div className="card-body text-white">
                <h3 className="h5 card-title">1. Scopri</h3>
                <p className="card-text">
                  Trova eventi che ti interessano vicino a te.
                </p>
              </div>
            </article>
          </div>

          <div className="col">
            <article className="card bg-soft-dark border-0 h-100 text-center animazione-card">
              <div className="step-icon">
                <i className="bi bi-ticket-fill"></i>
              </div>
              <div className="card-body text-white">
                <h3 className="h5 card-title">2. Partecipa</h3>
                <p className="card-text">
                  Acquista biglietti in modo semplice e sicuro.
                </p>
              </div>
            </article>
          </div>

          <div className="col">
            <article className="card bg-soft-dark border-0 h-100 text-center animazione-card">
              <div className="step-icon">
                <i className="bi bi-stars"></i>
              </div>
              <div className="card-body text-white">
                <h3 className="h5 card-title">3. Vivi l'esperienza</h3>
                <p className="card-text">
                  Goditi l'evento e crea ricordi indimenticabili.
                </p>
              </div>
            </article>
          </div>

          <div className="col">
            <article className="card bg-soft-dark border-0 h-100 text-center  animazione-card">
              <div className="step-icon">
                <i className="bi bi-share-fill"></i>
              </div>
              <div className="card-body text-white">
                <h3 className="h5 card-title">4. Condividi</h3>
                <p className="card-text">
                  Condividi le tue esperienze e ispira gli altri.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComeFunziona;
