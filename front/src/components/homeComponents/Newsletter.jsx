// Sezione newsletter della homepage con campo email e call to action.
// Serve come invito statico all'iscrizione agli aggiornamenti.
function Newsletter() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-lg-7 d-flex align-items-center gap-3">
            <i className="bi bi-envelope fs-1 text-primary"></i>

            <div>
              <h2 className="h4 text-light">Non perderti nulla!</h2>
              <p className="mb-0">
                Iscriviti alla newsletter e ricevi i migliori eventi selezionati
                direttamente nella tua inbox.
              </p>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <form className="d-flex">
              <div className="form-floating flex-fill">
                <input
                  className="form-control rounded-end-0"
                  type="email"
                  id="newsletter"
                  placeholder=" "
                />
                <label htmlFor="newsletter">La tua email</label>
              </div>

              <button className="btn btn-primary rounded-start-0">
                Iscriviti
              </button>
            </form>

            <p className="small text-light opacity-75 mt-2 mb-0">
              Nessuno spam, promesso. Puoi annullare l'iscrizione in qualsiasi
              momento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
