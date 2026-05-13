function ComeFunziona() {

    return (
        <div className="py-5 px-5 bg-purple">

            <h2 className="text-center text-white fw-bold mb-5">
                Come funziona
            </h2>

            <div className="row g-4 justify-content-center">

                <div className="col-6 col-md-3">
                    <div className="step-card">
                        <div className="step-icon">
                            <i className="bi bi-heart"></i>
                        </div>

                        <h5>1. Scopri</h5>

                        <p>
                            Trova eventi che ti interessano vicino a te.
                        </p>
                    </div>
                </div>

                <div className="col-6 col-md-3">
                    <div className="step-card">
                        <div className="step-icon">
                            <i className="bi bi-ticket"></i>
                        </div>

                        <div className="step-line"></div>

                        <h5>2. Partecipa</h5>

                        <p>
                            Acquista biglietti in modo semplice e sicuro.
                        </p>
                    </div>
                </div>

                <div className="col-6 col-md-3">
                    <div className="step-card">
                        <div className="step-icon">
                            <i className="bi bi-heart-fill"></i>
                        </div>

                        <div className="step-line"></div>

                        <h5>3. Vivi l’esperienza</h5>

                        <p>
                            Goditi l’evento e crea ricordi indimenticabili.
                        </p>
                    </div>
                </div>

                <div className="col-6 col-md-3">
                    <div className="step-card">
                        <div className="step-icon">
                            <i className="bi bi-share"></i>
                        </div>

                        <h5>4. Condividi</h5>

                        <p>
                            Condividi le tue esperienze e ispira gli altri.
                        </p>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default ComeFunziona;