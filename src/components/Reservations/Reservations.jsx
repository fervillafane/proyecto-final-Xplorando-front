import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import botonera from "../funcionesJS/botonera";
import axios from "axios";
import { MdLocationOn } from "react-icons/md";

import swal from "sweetalert";
import "./Reservations.css";

function Reservations() {
{/* Contexto de autenticación 
  const {
    auth,
    setAuth,
    warning,
    setWarning,
    user,
    setUser,
    token,
    setToken,
    admin,
    setAdmin,
    decodedToken,
    isExpired,
  } = useContext(Context);

  const navegador = useNavigate();
  */}


  function manejadorBotones(evento) {
    navegador(botonera(evento));
  }

  const [hayReserva, setHayReserva] = useState(false);
  console.log("🚀 ~ file: Reservations.jsx ~ line 36 ~ Reservations ~ hayReserva", hayReserva)
  const [hayProductos, setHayProductos] = useState(false);
  const [productos, setProductos] = useState();
  const [reserva, setReserva] = useState();
  // const { decodedToken, isExpired } = useJwt(token);

  {/* getReserva 
  async function getReserva() {
    var config = {
      method: "GET",
      url: `${Api}reservas/usuario/${decodedToken?.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setReserva(response.data);
        

        const productosTemp = [];

        response.data.forEach((item) => {
          axios({
            url: `${Api}productos/${item.producto.id}`,
            method: "get",
          })
            .then(function (responsePro) {
              // console.log(responsePro.data);
              productosTemp.push(responsePro.data);

              if (response.data.length !== productosTemp.length) {
                setTimeout(1000);
                setHayProductos(false);
                setHayReserva(false);
              } else {
                setHayProductos(true);
                setHayReserva(true);
                setProductos(productosTemp);
              }
            })
            .catch(function (errorProd) {
              console.log(errorProd);
            });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getReserva();
  }, [decodedToken]);

  */}

  

  if (!hayReserva) {
    return (
      <>
        <div className="header-product">
          <div>
            <h1>Mis reservas</h1>
          </div>
          <Link to="/">
            <IoIosArrowBack />
          </Link>
        </div>
        <div className="reservation">
          <div className="reservation-container">
            <div className="reservation-image-container">
              <div className="reservation-image"></div>
            </div>
            <div className="reservation-text-container">
              <h1>En este espacio encontrarás tus reservas</h1>
              <div className="bottom-text-reservation">
                <h3>
                  Busca tu producto ideal.
                </h3>
                <button onClick={() => manejadorBotones()}>Home</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="header-product">
          <div>
            <h1>Mis reservas</h1>
          </div>
          <Link to="/">
            <IoIosArrowBack />
          </Link>
        </div>
        <div className="reservas">
          <div className="reservas-container">
            {hayReserva &&
              hayProductos &&
              productos &&
              reserva.length === productos.length &&
              productos.map((p) => {
                let idReserva = reserva.find((item) => item.producto.id === p.id);
                let imagenFrente = p.imagenes.find((item) => item.titulo === "frente1");
                return (
                  <div className="reservas-items-container">
                    <section className="reserva-item">
                      <div className="info-reserva">
                        <div className="text-container-reserva">
                          <h1>{p.nombre}</h1>
                          <div className="location-reserva">
                            <MdLocationOn />
                            <h4>{p.direccion}</h4>
                          </div>
                          {hayReserva &&
                            hayProductos &&
                            reserva &&
                            reserva
                              .filter((r) => r.producto.id === p.id)
                              .map((r) => {
                                return (
                                  <>
                                    <div className="check-reserva">
                                      <h4>Check-in:{r.fechaInicio} | {r.hora}</h4>
                                      <hr />
                                      <h4>Check-out: {r.fechaFinal}</h4>
                                    </div>
                                    <div className="datos-extra-reserva">
                                      <h4>Datos extras:</h4>
                                      <h4>"{r.datosExtra}"</h4>
                                    </div>
                                  </>
                                )
                              })
                          }
                          <div className="caracteristicas-reserva">
                            {p.caracteristicas &&
                              p.caracteristicas.map((c) => {
                                return (
                                  <>
                                    <img src={c.icono} alt={c.nombre} />
                                  </>
                                );
                              })}
                          </div>
                        </div>
                        <div className="imagen-container-reserva">
                          <div className="imagen-reserva" style={{ backgroundImage: `url('${imagenFrente.urlImg}')` }}>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}

export default Reservations;
