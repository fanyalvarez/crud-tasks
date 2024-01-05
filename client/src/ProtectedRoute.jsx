import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute() {
  const { loading, user, isAuthenticated } = useAuth();
  console.log(loading, user, isAuthenticated, "from proctrou");

  //saber si el usuaro esta autenticado
  if (loading) return <h1>Loading...</h1>;
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />; //solo es para que vaya al componente que esta adentro
}

export default ProtectedRoute;
