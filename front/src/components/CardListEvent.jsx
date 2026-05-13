import { Link } from 'react-router-dom';

function CardListEvent(card) {
  return (
    <>
      <div>
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{card.title}</h5>
            <p class="card-text">{card.text}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardListEvent 