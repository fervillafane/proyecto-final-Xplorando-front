import { DateContext } from "../../components/Context/DateContext";
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Stack } from "react-bootstrap";
import { MdLocationOn } from "react-icons/md";
import Calendar from "../Booking/Calendar";
import success from "./success-icon.png";
import dateFormat from "dateformat";
import "./Booking.scss";

function Booking() {
  const { id } = useParams();
  /* LÓGICA CALENDARIO */
  const startDate = useContext(DateContext);
  const endDate = useContext(DateContext);
  const [product, setProduct] = useState(null); // State para almacenar los datos del producto
  const [bookingOk, setBookingOk] = useState(false);
  const [user, setUser] = useState(null); // State para almacenar los datos del usuario
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener el email del usuario del sessionStorage
    const userEmail = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");
    if (!userEmail) {
      console.error("No se encontró el email del usuario en el sessionStorage");
      return;
    }

    // Llamar al endpoint para obtener los datos del usuario utilizando el email
    fetch(`http://localhost:8080/users/profile/${userEmail}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }
        return response.json();
      })
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) =>
        console.error("Error fetching user data:", error)
      );

    // Fetch del producto
    fetch(`http://localhost:8080/productos/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener el producto");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false); // Indicar que la carga ha finalizado
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  const confirmarReserva = async () => {
    try {
      // Formatear las fechas a strings en formato ISO
      const fechaInicioFormatted = startDate.startDate.toISOString().split('T')[0];
      const fechaFinalFormatted = endDate.endDate.toISOString().split('T')[0];
  
      const reservaData = {
        productoId: id,
        userId: user.id,
        fechaInicio: fechaInicioFormatted,
        fechaFinal: fechaFinalFormatted,
      };
      console.log(reservaData)
      const response = await fetch("http://localhost:8080/reservas/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservaData),
      });
  
      if (!response.ok) {
        throw new Error("Error al confirmar la reserva");
      }
  
      setBookingOk(true); // Marcar la reserva como confirmada
  
      // Mostrar alerta de reserva exitosa
      alert("¡Reserva realizada con éxito!");
  
      // Mostrar los datos de la reserva en la consola
      console.log("Datos de la reserva:", reservaData);
    } catch (error) {
      console.error("Error al confirmar la reserva:", error);
      // Mostrar el error en la consola
      console.error("Código de error:", error.message);
      // Manejar el error, por ejemplo, mostrando un mensaje al usuario
      window.alert("No se pudo confirmar la reserva. Por favor, elija otra fecha.")
    }
  };

  if (loading) {
    // Mostrar un indicador de carga mientras se obtienen los datos
    return <p>Cargando...</p>;
  }
  if (!user) { // Verificar si el usuario aún no se ha cargado
    return <p>Obteniendo datos del usuario...</p>;
  }
  if (!bookingOk) {
    return (
      <>
        <Stack direction="horizontal" gap={1}>
          <div className="booking">
            <div className="booking-information">
              <div className="form">
                <h1 className="title-form">Datos del usuario</h1>
                <section className="form-inputs">
                  <div className="card-booking">
                    <div className="inputs-div">
                      <div className="user-details">
                      <p>Nombre: {user.firstName}</p>
                        <p>Apellido: {user.lastName}</p>
                        <p>Email: {user.email}</p>
                      </div>
                    </div>
                    <div className="inputs-div"></div>
                  </div>
                </section>

                <section className="check-in">
                  <section className="booking-date">
                    <h1>Selecciona tu fecha de reserva</h1>
                    <div className="card-booking">
                      <Calendar />
                    </div>
                  </section>
                </section>
              </div>

              <section className="booking-details">
                <h1 className="title-booking-details">Resumen</h1>
                <div className="card-booking">
                  <div className="content-booking-details">
                    <div className="image-container">
                      <div
                        className="image"
                        style={{
                          backgroundImage: `url(${product.imagenSalidaDtoList[0].urlImagen})`,
                          backgroundSize: "cover",
                          height: "300px",
                          borderTopLeftRadius: "8px",
                          borderTopRightRadius: "8px",
                        }}
                      ></div>
                    </div>

                    <div className="bottom-booking-details">
                      <h4 className="category-title">
                        {product.categoria.nombreCategoria}
                      </h4>
                      <h1>{product.nombreProducto}</h1>

                      <div className="location-booking-details">
                        <div className="direccion">
                          <h4 style={{ marginTop: "-4px", marginLeft: "4px" }}>
                            <MdLocationOn /> {product.ubicacion}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="check-in-booking-details">
                    <hr className="hr-booking" />
                    <div className="check-in-check-out">
                      <h4>Fecha de Inicio </h4>
                      <h4 className="datesBooking">
                        {dateFormat(startDate.startDate, "yyyy/mm/dd")}
                      </h4>
                    </div>
                    <hr className="hr-booking" />
                    <div className="check-in-check-out">
                      <h4>Fecha de Término </h4>
                      <h4 className="datesBooking">
                        {dateFormat(endDate.endDate, "yyyy/mm/dd")}
                      </h4>
                    </div>
                    <hr className="hr-booking" />
                    <div className="textarea-booking">
                      <textarea
                        name="datosExtra"
                        placeholder="Comentarios adicionales"
                      />
                    </div>
                    <button
                      type="submit"
                      className="boton-enviar"
                      onClick={confirmarReserva}
                    >
                      Confirmar reserva
                    </button>
                  </div>
                </div>
              </section>
            </div>
            <p className="success-submit"></p>
          </div>
        </Stack>
      </>
    );
  } else {
    return (
      <>
        <div className="booking-alternative">
          <div className="booking-success-container">
            <div className="booking-success-card card-booking">
              <img src={success} className="success-icon" alt="Success" />
              <h1>¡Muchas gracias!</h1>
              <h3>Su reserva se ha realizado con éxito</h3>

              <Link to="/" className="booking-button">
                ok
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Booking;