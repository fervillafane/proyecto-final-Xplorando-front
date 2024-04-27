import { Link } from "react-router-dom";


export default function Product(props) {
  return (
    <div className="card">
      <img className="product--image" src={props.url} alt="product image" />
      <div className="text-container">
      <h2>{props.name}</h2>
      <p className="price">${props.price}</p>
      <p>{props.description}</p>
      </div>
      <Link to={`/producto/${props.id}`}>
        <button>Ver más información</button>
      </Link>
    </div>
  );
}
