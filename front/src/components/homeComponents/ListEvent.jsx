// Lista degli eventi in evidenza mostrata nella homepage.
// Renderizza piu CardListEvent in una griglia.
import CardListEvent from './CardListEvent';

function ListEvent() {
  return (
    <>
        <div className="py-5 px-5 bg-purple">
                <div className="container">
                    <div className="row g-4">
                        <CardListEvent />
                    </div>
                </div>
            </div>
    </>
  );
}

export default ListEvent
