import img1 from "../assets/img/1.webp";

function CardFeedback() {
    return (
        <>
            <div className="col-12 col-md-6 col-lg-4">
                <div className="feedback-card bg-danger h-100">

                    <p className="feedback-text">
                        "EventHub mi ha permesso di scoprire concerti incredibili e vivere
                        esperienze uniche nella mia città!"
                    </p>

                    <div className="feedback-user">
                        <img src={img1} alt="Laura B." className="feedback-avatar" />

                        <div>
                            <h6 className="mb-0 fw-bold">Laura B.</h6>
                            <small>Milano</small>
                        </div>
                    </div>

                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
                <div className="feedback-card bg-danger h-100">

                    <p className="feedback-text">
                        "EventHub mi ha permesso di scoprire concerti incredibili e vivere
                        esperienze uniche nella mia città!"
                    </p>

                    <div className="feedback-user">
                        <img src={img1} alt="Laura B." className="feedback-avatar" />

                        <div>
                            <h6 className="mb-0 fw-bold">Laura B.</h6>
                            <small>Milano</small>
                        </div>
                    </div>

                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
                <div className="feedback-card bg-danger h-100">

                    <p className="feedback-text">
                        "EventHub mi ha permesso di scoprire concerti incredibili e vivere
                        esperienze uniche nella mia città!"
                    </p>

                    <div className="feedback-user">
                        <img src={img1} alt="Laura B." className="feedback-avatar" />

                        <div>
                            <h6 className="mb-0 fw-bold">Laura B.</h6>
                            <small>Milano</small>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );

}

export default CardFeedback;