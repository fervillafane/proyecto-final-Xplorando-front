import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Gallery from "../Gallery/Gallery";
import detailStyles from "./Detail.module.css";
import Picker from "./Picker";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/productos/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener el producto");
        }
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);
  console.log(product)

  useEffect(() => {
    // Verificar si hay un token de acceso almacenado en sessionStorage
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleReserveClick = () => {
    if (isLoggedIn) {
      // Si el usuario está logueado, redirigir a la página de reserva
      return `/booking/${id}`;
    } else {
      // Si el usuario no está logueado, almacenar la URL actual y redirigir a la página de login
      localStorage.setItem("redirectUrl", `/producto/${id}`);
      return "/login";
    }
  };

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={detailStyles.detail}>
      <main className={detailStyles.content}>
        <Gallery id={id} />
        <div className={detailStyles.detailInfoContainer}>
          <div className={detailStyles.detailInfo}>
            <h4>{product.categoria.nombreCategoria}</h4>
            <h2>{product.nombreProducto}</h2>
            <div className={detailStyles.stars}>
              <span className={detailStyles.star}>&#9733;</span>
              <span className={detailStyles.star}>&#9733;</span>
              <span className={detailStyles.star}>&#9733;</span>
              <span className={detailStyles.star}>&#9733;</span>
              <span className={detailStyles.star}>&#9733;</span>
            </div>
            <div>
              <h5>Descripción:</h5>
              <p>{product.descripcionProducto}</p>
            </div>
            <hr />
            <h5>Precio:</h5>
            <div className={detailStyles.detailPrice}>
              <h3 className={detailStyles.h5}>${product.precioProducto}</h3>
            </div>
            <h7>(hasta 6 cuotas sin interés con tarjeta de Santander)</h7>
            <div className={detailStyles.container}>
              <div className={detailStyles.complejo}>
                <h5>Características:</h5>
                <div className={detailStyles["caracteristicas-container"]}>
                  {product.caracteristicas.map((caracteristica) => {
                    return (
                      <div className={detailStyles["caracteristicas"]} key={caracteristica.id}>
                        <img src={caracteristica.icono} alt={caracteristica.nombreCaracteristica} />
                        <span>{caracteristica.nombreCaracteristica}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={detailStyles.init}>
              <div className={detailStyles.wrapperCalendar}>
                <div className={detailStyles.wrapperCalendarTitle}>
                  <h2>Fechas disponibles</h2>
                  <br />
                  <br />
                </div>
                <Picker />
              </div>
              <Link to={handleReserveClick()} className={detailStyles.btn}>
                {isLoggedIn ? "INICIAR RESERVA" : "INICIAR SESIÓN PARA RESERVAR"}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Detail;