import { Link } from 'react-router-dom';
import "./ListaCategorias.css"; // Importar estilos CSS

const ListaCategorias = () => {
  // Aquí podrías manejar el estado y la lógica para las categorías, si es necesario
  
  return (
    <div className="categorias">
      <h3>Lista de Categorías</h3>

      {/* Lista de categorías */}
      {/* Aquí iría la lógica para mostrar las categorías */}

      {/* Botón para agregar nueva categoría */}
      <Link to="/admin/agregar-categoria">Agregar Categoría</Link>
    </div>
  );
}

export default ListaCategorias;