// Sezione assistenza della homepage con FAQ e contatti di aiuto.
// Combina i componenti Faq e Help in un unico blocco.
import Faq from "./Faq";
import Help from "./Help";


function Assistenza() {
    return (
        <div className="d-flex align-items-center justify-content-center py-5 px-5 flex-md-row flex-column bg-purple w-100">

            <div className="col-6 container d-flex justify-content-center align-items-center">
                <Faq />
            </div>

            <div className="col-6 container d-flex justify-content-center align-items-center">
                <Help />
            </div>
        </div>
    );

}

export default Assistenza
