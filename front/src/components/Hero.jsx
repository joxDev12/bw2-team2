

function Hero() {

    return (
        <>
            <div className="px-5 py-5 text-center hero-section w-100">
                <h1 className="display-5 fw-bold"> Vivi momenti <br /> che restano.
                </h1>

                <div className="col-lg-10 mx-auto">
                    <p className="lead mb-4"> Eventi pubblici o privati per ogni interesse. <br /> Crea, organizza e partecipa.
                    </p>

                    <form className="d-flex flex-column gap-2 flex-sm-row gap-sm-0 custom-border">
                        <div className="form-floating flex-fill">
                            <input className="form-control custom-rounded rounded-start-3"
                                type="search" id="search" placeholder=" "/>

                            <label htmlFor="search"> <i className="bi bi-search"></i> {" "}Cerca eventi, artisti, luoghi...</label>
                        </div>

                        <div className="form-floating flex-fill">
                            <input className="form-control custom-rounded" type="text" id="geo" placeholder=" "/>

                            <label htmlFor="geo"> <i className="bi bi-geo-alt"></i> {" "}Dove? </label>
                        </div>

                        <div className="form-floating flex-fill">
                            <input className="form-control custom-rounded"
                                type="text" id="date" placeholder=" "/>

                            <label htmlFor="date"> <i className="bi bi-calendar-week"></i>
                                {" "}Quando? </label>
                        </div>

                        <button className="btn btn-primary px-4 custom-rounded rounded-end-3"
                            type="submit">Cerca</button>

                    </form>
                </div>
            </div>
        </>
    );
}

export default Hero;