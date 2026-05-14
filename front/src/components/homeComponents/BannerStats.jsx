function BannerStats() {
    return (
        <>
            <div className="d-flex flex-column flex-sm-row justify-content-around align-items-center bg-danger gap-4 py-4 px-4">

                <div className="d-flex align-items-center justify-content-center gap-4">
                    <i class="bi bi-calendar2-event"></i>

                    <div className="d-flex flex-column">
                        <span className="m-0">100K+</span>
                        <p className="m-0">Eventi ogni mese</p>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <i class="bi bi-people-fill"></i>

                    <div className="d-flex flex-column">
                        <span className="m-0">1B</span>
                        <p className="m-0">Utenti attivi</p>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <i class="bi bi-heart"></i>

                    <div>
                        <span className="m-0">98%</span>
                        <p className="m-0">Soddisfazione</p>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <i class="bi bi-chat-left-dots"></i>
                    
                    <div>
                        <span className="m-0">24/7</span>
                        <p className="m-0">Assistenza</p>
                    </div>

                </div>
            </div>
        </>

    );

}

export default BannerStats