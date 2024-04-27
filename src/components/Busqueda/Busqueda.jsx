import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import CarruselBuscador from "./Components/CarruselBuscador";
import axios from "axios";
import "react-multi-carousel/lib/styles.css";
import { addDays, format } from "date-fns"; // Importar la función format de date-fns
import "react-datepicker/dist/react-datepicker.css"; // Importar el archivo CSS de react-datepicker
import "./Busqueda.css";

export default function Search() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 3)); // Inicializar endDate con la fecha actual más 3 días
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [elUsuarioAFiltrado, setElUsuarioAFiltrado] = useState(false);
  const [ubicacionP, setUbicacionP] = useState(""); // Estado para almacenar la ubicación seleccionada
  const [ubicaciones, setUbicaciones] = useState([]);


  const ubicacionesFiltradas = ubicaciones.filter(
    (ubicacionP) =>
      ubicacionP.toLowerCase().includes(textoBusqueda.toLowerCase()) &&
      textoBusqueda.length >= 3
  );

  const handleChange = (e) => {
    setTextoBusqueda(e.target.value);
  };

  const onFilterSubmit = async () => {
    try {
      setUbicacionP(textoBusqueda);
      console.log("la ubicacion del prod es : " + ubicacionP);
      const response = await axios.post(
        "http://localhost:8080/productos/buscarProductoDisponible",
        {
          ubicacionP: ubicacionP, // Pasar la ubicación seleccionada al endpoint
          fechaInicio: format(startDate, "yyyy-MM-dd"), // Formatear la fecha de inicio
          fechaFinal: format(endDate, "yyyy-MM-dd"), // Formatear la fecha final
        }
      );
      console.log("Productos filtrados:", response.data);
      setProductosFiltrados(response.data);
    } catch (error) {
      console.error("Error al filtrar productos:", error);
    }
    setElUsuarioAFiltrado(true);
  };

  return (
    <div>
      <div className="search">
        <input
          className="search-bar"
          type="text"
          placeholder="¿Que provincia quieres visitar?"
          value={textoBusqueda}
          onChange={handleChange}
         // Utilizar lista de sugerencias
        />
        <datalist>
          {/* Mapear las ubicaciones para generar opciones de sugerencia */}
          {ubicacionesFiltradas.map((ubicacion, index) => (
            <option key={index} value={ubicacionP} />
          ))}
        </datalist>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          minDate={new Date()}
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={addDays(startDate, 3)}
          dateFormat="dd/MM/yyyy"
        />
        <button className="btn-search" onClick={onFilterSubmit}>
          REALIZAR BUSQUEDA
        </button>
      </div>
      <div className="resultados-obtenidos">
        <h2>Resultados de la búsqueda</h2>
      </div>
      {elUsuarioAFiltrado ? (
        productosFiltrados.length ? (
          <CarruselBuscador arrayBusqueda={productosFiltrados} />
        ) : (
          <div>
            <img src="public/Images/imgError.png" alt="Error" />
          </div>
        )
      ) : null}
    </div>
  );
}