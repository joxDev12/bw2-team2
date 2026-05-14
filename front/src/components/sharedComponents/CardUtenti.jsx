// Card semplice usata nella pagina Chi siamo per mostrare una persona.
// Riceve nome, ruolo e icona da visualizzare nel riquadro.
const CardUtenti = ({ name, role, image }) => {
  return (
    <div className="animazione-card card bg-soft-dark border-0 shadow-sm text-center overflow-hidden h-100">
      <div className="bg-secondary bg-opacity-10">
        <img src={image} alt={name} className="img-fluid img-proportion" />
      </div>
      <div className="card-body text-white">
        <h5 className="card-title fw-bold mb-1">{name}</h5>
        <p className="text-secondary mb-0">
          <small>{role}</small>
        </p>
      </div>
    </div>
  );
};

export default CardUtenti;
