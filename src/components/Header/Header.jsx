import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { AuthContext } from "../Auth/AuthProvider"; // Importar el contexto de autenticación
import "./Header.css";


const Header = () => {
  const auth = useContext(AuthContext); // Obtener el contexto de autenticación
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");
  const [initialName, setInitialName] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (sessionStorage.getItem("token") !== null) setData();
    else handleLogout();
  }, [location.state]);

  const setData = () => {
    const token = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("userRole");
    const firstName = sessionStorage.getItem("firstName") || "";
    const lastName = sessionStorage.getItem("lastName") || "";
    setIsLoggedIn(token);
    setIsAdmin(userRole === "ROLE_ADMIN");
    setUserName(`${firstName} ${lastName}`);
    setInitialName(getInitials(firstName, lastName));
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserName("");
    setInitialName("");
    auth.handleLogout(); // Llamar a la función handleLogout del contexto de autenticación
  };

  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) {
      return "";
    }
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <header className="header">
      <Navbar
        style={{
          backgroundColor: "#8799d8",
          fontWeight: "700"
        }}
        expand="lg"
        fixed="top"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src="/src/assets/logofinalexplorando/logoxplorandohorizontal/logoexplorandohorizontal.png"
              width="auto"
              height="48px"
              className="d-inline-block align-top"
              alt="Logo Xplorando"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!isLoggedIn && (
                <>
                  <Nav.Link as={Link} to="/" style={{ color: "#FFFFFF" }}>
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login" style={{ color: "#FFFFFF" }}>
                    Iniciar sesión
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/registro"
                    style={{
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f38164",
                      color: "#ffffff",
                      borderRadius: "25px",
                      padding: ".5rem",
                      margin: "0.75rem",
                      textDecoration: "none",
                    }}
                  >
                    Registrarse
                  </Nav.Link>
                </>
              )}
              {isLoggedIn && (
                <>
                  <Nav.Link as={Link} to="/" style={{ color: "#FFFFFF" }}>
                    Home
                  </Nav.Link>
                  <Navbar.Text
                    style={{ alignContent: "center", justifyContent: "center",  color: "#FFFFFF" } }  
                  >
                    {userName}
                  </Navbar.Text>
                  <NavDropdown 
                    title={<span style={{ color: "#FFFFFF" }}>{initialName}</span>} 
                    style={{
                      color: "#FFFFFF",
                      height: "60px",
                      width: "60px",
                      boxSizing:"content-box",
                      borderRadius: "50%", 
                      backgroundColor: "#D9D9D9",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      left:"25px",
                      fontSize:"30px"       
                    }}
                  >
                    <NavDropdown.Item as={Link} to="/profile">
                      Mi Perfil
                    </NavDropdown.Item>
                    {isAdmin && (
                      <NavDropdown.Item as={Link} to="/admin">
                        Administración
                      </NavDropdown.Item>
                    )}
                    {!isAdmin && <Nav.Link as={Link} to="/reservations">Mis reservas </Nav.Link>}
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Cerrar Sesión
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
