import { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import ListaUsuarios from "../../components/ListaUsuarios/ListaUsuarios";
import ListaProductos from "../../components/ListaProductos/ListaProductos";
import ListaCategorias from "../../components/ListaCategorias/ListaCategorias";
import ListaCaracteristicas from "../../components/ListaCaracteristicas/ListaCaracteristicas";
import "./Admin.css";

const Admin = () => {
  const [tab, setTab] = useState("productos");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const handleTabChange = (tabName) => {
    setTab(tabName);
  };




  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Obtener el rol del usuario desde el almacenamiento local
    const userRole = sessionStorage.getItem("userRole");
  
    // Verificar si el usuario tiene el rol necesario para acceder a la sección de administración
    setIsAuthorized(userRole === "ROLE_ADMIN");
  }, []);


  if (windowWidth < 768) {
    return (
      <div className="mobile-message">
        Esta página solo está disponible en la versión web. Por favor, acceda
        desde un dispositivo de escritorio o amplíe la ventana de su navegador.
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div style={{height:"80vh", display:"flex", justifyContent:"center",alignItems:"center"}}>
        No tienes autorización para acceder a esta sección. Por favor, inicia
        sesión como administrador.
      </div>
    );
  }


  return (
    <div className="panel-administracion" style={{margin:"48px auto"}}>
      <h2 style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"25px"}}>Panel de Administración</h2>

      <Nav justify variant="tabs" defaultActiveKey="productos">
        <Nav.Item>
          <Nav.Link
            eventKey="productos"
            active={tab === "productos"}
            onClick={() => handleTabChange("productos")}
          >
            Productos
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            disabled
            eventKey="usuarios"
            active={tab === "usuarios"}
            onClick={() => handleTabChange("usuarios")}
          >
            Usuarios
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            disabled
            eventKey="categorias"
            active={tab === "categorias"}
            onClick={() => handleTabChange("categorias")}
          >
            Categorías
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            disabled
            eventKey="caracteristicas"
            active={tab === "caracteristicas"}
            onClick={() => handleTabChange("caracteristicas")}
          >
            Características
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {tab === "usuarios" && <ListaUsuarios />}
      {tab === "productos" && <ListaProductos />}
      {tab === "categorias" && <ListaCategorias />}
      {tab === "caracteristicas" && <ListaCaracteristicas />}
    </div>
  );
};

export default Admin;
