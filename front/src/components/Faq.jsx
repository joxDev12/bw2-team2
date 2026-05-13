function Faq() {
    return (
        <>

            <div className="accordion py-5 px-5 bg-success w-100" id="accordionPanelsStayOpenExample">
                <h4 className="mb-3">Domande Frequenti</h4>
                <div className="d-flex flex-column gap-1">
                    <div className="accordion-item ">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                Come posso acquistare i biglietti?
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                <strong>Per acquistare i biglietti, basta cliccare sul pulsante "Acquista" accanto all'evento desiderato e seguire le istruzioni per completare l'acquisto.</strong> Se hai bisogno di assistenza durante il processo di acquisto, non esitare a contattare il nostro servizio clienti.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                Posso ottenere un rimborso?
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                Le politiche di rimborso variano a seconda dell'evento e del motivo della richiesta di rimborso. Ti consigliamo di consultare la sezione "Politiche di Rimborso" sul nostro sito web per ulteriori dettagli o contattare il nostro servizio clienti per assistenza specifica.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                Come posso pubblicare il mio evento?
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                Per pubblicare il tuo evento, devi creare un account e accedere alla sezione "Pubblica Evento". Da lì, potrai inserire tutte le informazioni necessarie sul tuo evento, come titolo, descrizione, data, ora e luogo. Una volta completato il processo di pubblicazione, il tuo evento sarà visibile agli utenti sulla nostra piattaforma.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                                L'evento è gratuito o a pagamento?
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse">
                            <div className="accordion-body">
                                La nostra piattaforma ospita sia eventi gratuiti che a pagamento. Puoi filtrare gli eventi in base alle tue preferenze per trovare quelli che meglio si adattano alle tue esigenze. Se hai domande specifiche su un evento, ti consigliamo di contattare l'organizzatore dell'evento per ulteriori informazioni.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Faq 