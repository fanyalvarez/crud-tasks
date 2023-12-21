//provider es un componente que guarda mas componentes y tien una propiedad value que recibe datos

import { createContext, useState } from "react";
import { registerRequest } from "../api/auth.js";
import { useContext } from "react";

export const AuthContext = createContext();

//useauth nos tre todos los datos de authcontextprovider
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Useauth must be used whithin an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const signup = async (user) => {
    try {
      const resp = await registerRequest(user);
      setUser(resp.data);
      setIsAuthenticated(true);
      // console.log(user);
    } catch (error) {
      setErrors(error.response.data);
      // console.log(errors);
    }
  };

  return (
    <AuthContext.Provider value={{ signup, user, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
};
