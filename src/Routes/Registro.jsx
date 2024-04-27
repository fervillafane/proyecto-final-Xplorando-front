import React, { useState } from "react";
import { registerUser } from "../components/Utils/ApiFunctions";
import { Link } from "react-router-dom";
import "./Registro.css";

const Registro = () => {
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate first name
    if (!registration.firstName.trim()) {
      newErrors.firstName = "El nombre es requerido";
      valid = false;
    }

    // Validate last name
    if (!registration.lastName.trim()) {
      newErrors.lastName = "El apellido es requerido";
      valid = false;
    }

    // Validate email
    if (!registration.email.trim()) {
      newErrors.email = "El email es requerido";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(registration.email.trim())) {
      newErrors.email = "Formato de email inválido";
      valid = false;
    }

    // Validate password
    if (!registration.password.trim()) {
      newErrors.password = "La contraseña es requerida";
      valid = false;
    } else if (registration.password.trim().length < 4) {
      newErrors.password = "La contraseña debe tener más de 4 caracteres";
      valid = false;
    } else if (registration.password.trim().length > 10) {
      newErrors.password = "La contraseña debe tener más de 10 caracteres";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const result = await registerUser(registration);
        setSuccessMessage(result);
        setErrorMessage("");
        setRegistration({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
      } catch (error) {
        setSuccessMessage("");
        setErrorMessage(`Registration error : ${error.message}`);
      }
      setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 5000);
    }
  };
  return (
    <section className="registerContainer">
      <div className="imageContainerRegister">
        <h1 className="imageTextRegister">
          Te ayudamos a buscar tu próximo destino.
        </h1>
      </div>
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      {successMessage && (
        <p className="alert alert-success">{successMessage}</p>
      )}

      <div className="formContainerRegister">
        <form onSubmit={handleRegistration}>
          <h2 className="text-center">Registro</h2>
          <div className="mb-2">
            <label htmlFor="firstName" className="col-sm-2 col-form-label">
              Nombre
            </label>
            <div className="col-sm-12">
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Ingresa tu nombre"
                className="form-control"
                value={registration.firstName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="lastName" className="col-sm-2 col-form-label">
              Apellido
            </label>
            <div className="col-sm-12">
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Ingresa tu apellido"
                className="form-control"
                value={registration.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Correo
            </label>
            <div className="col-sm-12">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Ingresa tu correo"
                className="form-control"
                value={registration.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              Contraseña
            </label>
            <div className="col-sm-12">
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                className="form-control"
                id="password"
                name="password"
                value={registration.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="grid">
            <button type="submit" className="primaryButtonRegistro">
              Registrarse
            </button>
            <span className="spanRegistro">
              ¿Ya estás registrado?{" "}
              <Link to={"/login"} className="ms-2">
                Inicia sesión
              </Link>
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Registro;

