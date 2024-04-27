import React, { createContext, useState, useContext } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({
  user: null,
  handleLogin: (token) => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = (token) => {
    const decodedUser = jwt_decode(token);
    console.log(decodedUser);
    sessionStorage.setItem("userId", decodedUser.sub);
    sessionStorage.setItem("userRole", decodedUser.roles);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("firstName", decodedUser.firstName); // Añadir esta línea
    sessionStorage.setItem("lastName", decodedUser.lastName);
    setUser(decodedUser);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
