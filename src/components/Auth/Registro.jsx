import React, { useState } from "react";
import { registerUser } from "../Utils/ApiFunctions";
import { Link } from "react-router-dom";
import styles from "./Registro.module.css";
console.log(styles);

const Registro = () => {
  const [registro, setRegistro] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setRegistro({ ...registro, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate first name
    if (!registro.firstName.trim()) {
      newErrors.firstName = "El nombre es requerido";
      valid = false;
    }

    // Validate last name
    if (!registro.lastName.trim()) {
      newErrors.lastName = "El apellido es requerido";
      valid = false;
    }

    // Validate email
    if (!registro.email.trim()) {
      newErrors.email = "El email es requerido";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(registro.email.trim())) {
      newErrors.email = "Formato de email inválido";
      valid = false;
    }

    // Validate password
    if (!registro.password.trim()) {
      newErrors.password = "La contraseña es requerida";
      valid = false;
    } else if (registro.password.trim().length < 4) {
      newErrors.password = "La contraseña debe tener más de 4 caracteres";
      valid = false;
    } else if (registro.password.trim().length > 10) {
      newErrors.password = "La contraseña debe tener más de 10 caracteres";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegistro = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const result = await registerUser(registro);
        setSuccessMessage(result);
        setErrorMessage("");
        setRegistro({ firstName: "", lastName: "", email: "", password: "" });
      } catch (error) {
        setSuccessMessage("");
        setErrorMessage(`Error de registro : ${error.message}`);
      }
      setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 5000);
    }
  };
  return (
    <section className={styles.registerContainer}>
      <div className={styles.imageContainerRegister}>
        <h1 className={styles.imageTextRegister}>
          Te ayudamos a buscar tu próximo destino.
        </h1>
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}

      <div className={styles.formContainerRegister}>
        <form onSubmit={handleRegistro}>
          <h2 className={styles.formTitleRegister}>Registro</h2>
          <div className={styles.inputWrapperRegister}>
            <label htmlFor="firstName" className={styles.formLabel}>
              Nombre
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Ingresa tu nombre"
              className={styles.input}
              value={registro.firstName}
              onChange={handleInputChange}
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName}</span>
            )}
          </div>

          <div className={styles.inputWrapperRegister}>
            <label htmlFor="lastName" className={styles.formLabel}>
              Apellido
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Ingresa tu apellido"
              className={styles.input}
              value={registro.lastName}
              onChange={handleInputChange}
            />
            {errors.lastName && (
              <span className={styles.error}>{errors.lastName}</span>
            )}
          </div>

          <div className={styles.inputWrapperRegister}>
            <label htmlFor="email" className={styles.formLabel}>
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Ingresa tu correo"
              className={styles.input}
              value={registro.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          <div className={styles.inputWrapperRegister}>
            <label htmlFor="password" className={styles.formLabel}>
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              className={styles.input}
              value={registro.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>

          <div className={styles.buttonWrapper}>
            <button type="submit" className={styles.primaryButtonRegistro}>
              Registrarse
            </button>
            <span className={styles.spanRegistro}>
              ¿Ya estás registrado?{" "}
              <Link to={"/login"} className={styles.loginLink}>
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
