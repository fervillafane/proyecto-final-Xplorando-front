import React from "react";
import "../../Busqueda/Components/CarruselBuscador.css";
import { Link } from "react-router-dom";


import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export default function Search({ arrayBusqueda }) {
  
  return (
    <Carousel
      responsive={{
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 3,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      }}
    >
      {arrayBusqueda.map((resultadoBusqueda, index) => {
        return (
          <div className="carrousel-card" key={index}>
            <div className="rBusqueda">
              <div className="div-img">
                <img
                  src={resultadoBusqueda.imagenSalidaDtoList[0].urlImagen}
                  className="imgRBusqueda"
                />
                <div className="resultadoBusqueda-div">
                  <div>
                    <div className="resultadoBusqueda-nombre">
                      {resultadoBusqueda.nombreProducto}
                    </div>
                    <div className="h7Busqueda">
                      <span>{resultadoBusqueda.descripcionProducto}</span>
                    </div>
                  </div>

                  <div className="divbutBusqueda">
                    <Link to={`/producto/${resultadoBusqueda.id}`}>
                      <button className="butBusqueda" onClick={() => {}}>
                        Reservar estadía
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}