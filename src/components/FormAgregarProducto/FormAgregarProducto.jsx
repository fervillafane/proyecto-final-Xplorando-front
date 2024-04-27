import { useState, useEffect } from "react";
import axios from "axios";
import "./FormAgregarProducto.css";

const AgregarProducto = () => {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [caracteristicaSeleccionada, setCaracteriticaSeleccionada] = useState(
    []
  );
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenGuardado = sessionStorage.getItem("token");
    if (tokenGuardado) {
      setToken(tokenGuardado);
    }
  }, []);


  const handleCodigoChange = (event) => {
    setCodigo(event.target.value);
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleUbicacionChange = (event) => {
    setUbicacion(event.target.value);
  };

  const handlePrecioChange = (event) => {
    setPrecio(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleImagenesChange = (e) => {
    const value = e.target.value;
    const imagenesArray = value
      .split("\n")
      .map((url) => ({ urlImagen: url.trim() }));
    setImagenes(imagenesArray);
  };

  function handleCaracteristicaChange(event) {
    const { value, checked } = event.target;
    if (checked) {
      setCaracteriticaSeleccionada([...caracteristicaSeleccionada, value]);
    } else {
      setCaracteriticaSeleccionada(
        caracteristicaSeleccionada.filter(
          (caracteristicaId) => caracteristicaId !== value
        )
      );
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    crearProducto();
    console.log(crearProducto)
  };

  const crearProducto = async () => {
    const nuevoProducto = {
      codigoProducto: codigo,
      nombreProducto: nombre,
      descripcionProducto: descripcion,
      precioProducto: precio,
      ubicacion: ubicacion,
      imagenes: imagenes,
      categoria: categoria,
      caracteristicas: caracteristicaSeleccionada,
    };

    //CADA VEZ QUE INICIE SESION CON ADMIN PASAR TOKEN

    try {
      const response = await axios.post(
        "http://localhost:8080/productos/registrar",
        nuevoProducto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Producto guardado:", response.data);
      alert("Paquete registrado");
      setCodigo("");
      setNombre("");
      setUbicacion("");
      setPrecio("");
      setCategoria("");
      setDescripcion("");
      setImagenes([]);
      setCaracteriticaSeleccionada([]);
    } catch (error) {
      console.error("Error al guardar el paquete:", error);
      alert("No se ha podido registrar el paquete");
    }
  };

  //CARECTERISTICAS!!
  useEffect(() => {
    async function fetchCaracteristicas() {
      try {
        const response = await fetch(
          "http://localhost:8080/caracteristicas/listar"
        );
        if (!response.ok) {
          throw new Error("Error al cargar las categorías");
        }
        const data = await response.json();
        setCaracteristicas(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchCaracteristicas();
  }, []);

  //para traer lista de categorias
  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await fetch("http://localhost:8080/categorias/listar");
        if (!response.ok) {
          throw new Error("Error al cargar las categorías");
        }
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchCategorias();
  }, []);

  useEffect(() => {
    // Obtener el rol del usuario desde el almacenamiento local
    const userRole = sessionStorage.getItem("userRole");

    // Verificar si el usuario tiene el rol necesario para acceder a la sección de administración
    setIsAuthorized(userRole === "ROLE_ADMIN");
  }, []);

  if (!isAuthorized) {
    return (
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No tienes autorización para acceder a esta sección. Por favor, inicia
        sesión como administrador.
      </div>
    );
  }

  return (
    <div className="contenedor-formulario">
      <div className="mobile-message">
        Esta página solo está disponible en la versión web. Por favor, acceda
        desde un dispositivo de escritorio o amplíe la ventana de su navegador.
      </div>
      <form onSubmit={handleSubmit}>
        <div className="fila-formulario">
          <div className="input-container">
            <label htmlFor="codigo">Código del Paquete:</label>
            <input
              type="text"
              id="codigo"
              value={codigo}
              onChange={handleCodigoChange}
              required
            />
            <p className="supporting-text">
              Ingrese el código único asignado al paquete.
            </p>
          </div>
          <div className="input-container">
            <label htmlFor="nombre">Nombre del Paquete:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={handleNombreChange}
              required
            />
            <p className="supporting-text">
              Escriba el nombre descriptivo del paquete.
            </p>
          </div>
        </div>
        <div className="fila-formulario">
          <div className="input-container">
            <label htmlFor="ubicacion">Ubicación:</label>
            <input
              type="text"
              id="ubicacion"
              value={ubicacion}
              onChange={handleUbicacionChange}
              required
            />
            <p className="supporting-text">
              Ingrese la dirección de la estadía del paquete.
            </p>
          </div>
          <div className="input-container">
            <label htmlFor="precio">Precio del Paquete:</label>
            <input
              type="text"
              id="precio"
              value={precio}
              onChange={handlePrecioChange}
              required
            />
            <p className="supporting-text">
              Ingrese el precio total del paquete.
            </p>
          </div>
        </div>

        <div className="fila-formulario">
          <div className="input-container">
            <label>Categoria:</label>
            <select
              id="categoria"
              name="categoria"
              value={categoria}
              onChange={handleCategoriaChange}
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.nombreCategoria}>
                  {categoria.nombreCategoria}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="fila-formulario">
          <div className="input-container">
            <label htmlFor="descripcion">Descripción del Paquete:</label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={handleDescripcionChange}
              required
            ></textarea>
            <p className="supporting-text">
              Ingrese una descripción detallada del paquete con las
              características correspondientes de lo que ofrece el paquete.
            </p>
          </div>
        </div>
        {/*  <div className="fila-formulario-imagenes">
          <div className="imagen-entrada">
            <input
              type="file"
              id="imagenes"
              accept="image/*"
              multiple
              onChange={handleImagenesChange}
              max="5"
              style={{ display: "none" }}
            />
            <label htmlFor="imagenes" className="boton-imagenes">
              Cargar Imágenes
            </label>
          </div>
  </div> */}
        <div className="fila-formulario">
          <div className="input-container">
            <label htmlFor="imagenes">URLs de Imágenes:</label>
            <textarea
              id="imagenes"
              value={imagenes.map((img) => img.urlImagen).join("\n")}
              onChange={handleImagenesChange}
              required
            ></textarea>
            <p className="supporting-text">
              Ingrese las URLs de las imágenes separadas por un salto de línea
            </p>
          </div>
        </div>

        <div className="caracteristica">
  <label>Características:</label>
  <div className="checkbox-container">
    {Array.isArray(caracteristicas) && caracteristicas.map((caracteristica, index) => (
      <div className="checkbox-group" key={index}>
        <input
          type="checkbox"
          id={`caracteristica-${caracteristica.id}`}
          name={`caracteristica-${caracteristica.nombreCaracteristica}`}
          value={caracteristica.nombreCaracteristica}
          checked={caracteristicaSeleccionada.includes(caracteristica.nombreCaracteristica)}
          onChange={handleCaracteristicaChange}
        />
        <label htmlFor={`caracteristica-${caracteristica.id}`}>{caracteristica.nombreCaracteristica}</label>
      </div>
    ))}
  </div>
</div>
        <div className="fila-formulario boton-enviar">
          <div className="datos-entrada" style={{ marginLeft: "auto" }}>
            <input type="submit" value="Registrar Paquete" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AgregarProducto;
