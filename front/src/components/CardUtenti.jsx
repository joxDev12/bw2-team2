const CardUtenti = ({ name, role, icon = "bi-person-circle" }) => {
  return (
    <div className="card border-0 shadow-sm text-center overflow-hidden h-100">
      <div className="bg-secondary bg-opacity-10 py-5">
        <i className={`bi ${icon} display-1 text-secondary`}></i>
      </div>
      <div className="card-body">
        <h5 className="card-title fw-bold mb-1">{name}</h5>
        <p className="text-primary mb-0"><small>{role}</small></p>
      </div>
    </div>
  );
};

export default CardUtenti;