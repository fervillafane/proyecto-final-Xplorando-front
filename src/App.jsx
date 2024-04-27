import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./Routes/Home";
import Login from "./components/Auth/Login";
import Registro from "./components/Auth/Registro";
import RequireAuth from "./components/Auth/RequireAuth"
import { AuthProvider } from "./components/Auth/AuthProvider"
import Profile from "./components/Auth/Profile"
import Admin from "./Routes/Admin/Admin";
import AgregarProducto from "./Routes/Admin/AgregarProducto";
import Categoria from "./Routes/Categoria";
import ProductoDetalle from "./components/Home/ProductoDetalle";
import Booking from "./components/Booking/Booking";
import Reservations from "./components/Reservations/Reservations";
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-datepicker/dist/react-datepicker.css";
const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<RequireAuth />}/>

        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/profile" element={<Profile />} />
        
      
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/categorias/:categoria" element={<Categoria />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/booking/:id" element={<Booking />}/>
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/producto/undefined" element={<Categoria />} /> 
      </Routes>
    </Router>
    <Footer />
    </AuthProvider>
  );
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="agregar-producto" element={<AgregarProducto />} />
    </Routes>
  );
};

export default App;