//provider es un componente que guarda mas componentes y tien una propiedad value que recibe datos

import { createContext, useState , useContext , useEffect} from "react";
import { registerRequest, loginRequest } from "../api/auth.js";


export const AuthContext = createContext();

//useauth tre todos los datos de authcontextprovider
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

  const signin = async (user) => {
    try {
      const resp = await loginRequest(user);
      console.log(resp);
    } catch (error) {
      setErrors(error.response.data);
      console.log(error.response.data);
    }
  };

  // is the timer of alerts errors
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{ signup, user, isAuthenticated, errors, signin }}>
      {children}
    </AuthContext.Provider>
  );
};
