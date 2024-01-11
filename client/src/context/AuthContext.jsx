//provider es un componente que guarda mas componentes y tien una propiedad value que recibe datos

import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
} from "../api/auth.js";
import Cookies from "js-cookie";
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
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const resp = await registerRequest(user);
      setUser(resp.data);
      setIsAuthenticated(false); // console.log(user);
    } catch (error) {
      setErrors(error.resp.data); // console.log(errors);
    }
  };

  const signin = async (user) => {
    try {
      const resp = await loginRequest(user);
      console.log(resp);
      setIsAuthenticated(true);
      setUser(resp.data);
    } catch (error) {
      setErrors(error.resp.data);
      console.log(error.resp.data);
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

  //cookies
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      // console.log(cookies.token);

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const respCookies = await verifyTokenRequest(cookies.token);
        // console.log(respCookies.data)
        if (!respCookies.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(respCookies.data);
        setLoading(false);

      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, user, isAuthenticated, errors, loading, signin }}>
      {children}
    </AuthContext.Provider>
  );
};
