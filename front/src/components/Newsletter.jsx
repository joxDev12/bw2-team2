function Newsletter() {

    return (
        <>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center px-4 py-5 w-100 gap-3 m-0 custom-newsletter text-center text-md-start bg-purple text-light">
                <i className="bi bi-envelope custom-icon-newsletter"></i>
                <div>
                    <h4>Non perderti nulla!</h4>
                    <p className="px-5 w-75 px-md-0">Iscriviti alla Newsletter e ricevi i migliori eventi selezionati direttamente nella tua inbox.</p>
                </div>
                <div className="d-flex flex-column justify-content-center gap-2">
                    <form className="d-flex">
                        <div className="form-floating flex-fill">
                            <input className="form-control rounded-start-3 rounded-end-0" type="text" id="newsletter" placeholder=" " />

                            <label htmlFor="nesletter">La tua email</label>
                        </div>
                        <button className="btn btn-primary px-4 rounded-start-0 rounded-end-3">Iscriviti</button>
                    </form>
                    <h6>Nessuno spam, promesso. Puoi annullare l'iscrizione in qualsiasi momento</h6>
                </div>
            </div>
        </>
    );
}

export default Newsletter;