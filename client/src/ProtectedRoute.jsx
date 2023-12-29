import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute() {
  const { user, isAuthenticated } = useAuth();
  // console.log(user)
  //saber si el usuaro esta autenticado
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />; //solo es para que vaya al componente que esta adentro
}

export default ProtectedRoute;
