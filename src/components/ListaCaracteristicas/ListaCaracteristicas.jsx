import { Link } from 'react-router-dom';
import "./ListaCaracteristicas.css"; // Importar estilos CSS

const ListaCaracteristicas = () => {
  // Aquí podrías manejar el estado y la lógica para las características, si es necesario
  
  return (
    <div className='caracteristicas'>
      <h3>Lista de características</h3>

      {/* Lista de características */}
      {/* Aquí iría la lógica para mostrar las características */}

      {/* Botón para agregar nueva categoría */}
      <Link to="/admin/agregar-caracteristica">Agregar Característica</Link>
    </div>
  );
}

export default ListaCaracteristicas;