import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Category(props) {
  const [categoria, setCategoria] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/categorias/listar"
        );
       // console.log("Categorias obtenidas:", response.data);
        setCategoria(response.data);
      } catch (error) {
        console.error("Error al obtener categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <div className="carousel-card">
      <img className="product--image" src={props.url} alt="product image" />
      <div className="text-container">
        <span>{props.name}</span>
      </div>
    </div>
  );
}