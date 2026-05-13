import img1 from "../assets/img/1.webp";

function CardFeedback() {
    return (
        <>
            <div className="col-12 col-md-6 col-lg-3">
                <div className="card border-0 shadow-sm text-center overflow-hidden h-100">
                    <div className="bg-secondary bg-opacity-10 py-5">
                        <div className="card-body">
                            <div>
                                <img src={img1} alt="" />
                            </div>
                            <h5 className="card-title fw-bold mb-1">Giorgio Rossi</h5>
                            <p className="mb-0">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam, provident.</p>
                        </div>
                    </div>
                </div>                
            </div>
        </>
    );

}

export default CardFeedback;