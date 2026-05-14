import { Link } from "react-router-dom";

const iconeCategorie = {
  Musica: "bi-music-note-beamed",
  Sport: "bi-trophy",
  Tecnologia: "bi-cpu",
  "Cultura e Spettacolo": "bi-bank",
  Enogastronomia: "bi-cup-hot",
};

function bottoneCategoriaColore(categoria) {
  switch (categoria) {
    case "Musica":
      return "btn-outline-primary";
    case "Cultura e Spettacolo":
      return "btn-outline-warning";
    case "Sport":
      return "btn-outline-success";
    case "Tecnologia":
      return "btn-outline-info";
    default:
      return "btn-outline-secondary";
  }
}

function ListCategories({ categorie }) {
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-around mt-4">
      {categorie.map((cat) => (
        <Link
          key={cat}
          to={`/eventi?category=${encodeURIComponent(cat)}`}
          className={`btn fw-semibold d-flex align-items-center justify-content-center ${bottoneCategoriaColore(cat)}`}
          title={cat}
        >
          <i className={`bi ${iconeCategorie[cat] || "bi-grid-fill"} fs-3`}></i>
        </Link>
      ))}
    </div>
  );
}

export default ListCategories;
