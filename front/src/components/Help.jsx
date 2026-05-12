function Help() {

    return (
        <>
            <div className="d-flex py-5 px-5 bg-danger w-100 justify-content-around align-items-center gap-5">
                <div className="bg-light d-flex justify-content-center align-items-center gap-4 p-4 rounded">
                    <div>
                        <h4>Hai bisogno di aiuto?</h4>
                        <p>Il nostro team è disponibile 24/7 per supportarti.</p>
                        <button className="btn btn-primary">Contattaci</button>
                    </div>
                    <i className="bi bi-telephone custom-icon-help"></i>
                </div>
            </div>
        </>
    );
}

export default Help