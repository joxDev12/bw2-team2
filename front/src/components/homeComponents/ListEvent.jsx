// Lista degli eventi in evidenza mostrata nella homepage.
// Renderizza piu CardListEvent in una griglia.
import CardListEvent from "./CardListEvent";

function ListEvent() {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="h4 text-light mb-4">Eventi in evidenza</h2>

        <div className="row g-4">
          <CardListEvent />
        </div>
      </div>
    </section>
  );
}

export default ListEvent;
