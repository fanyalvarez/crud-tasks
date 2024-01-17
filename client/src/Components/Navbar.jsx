import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  // console.log(isAuthenticated, user);
  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/tasks" : "/"}>Task Manager</Link>
      </h1>
      <ul className="flex gap-x-5">
        {isAuthenticated ? (
          <>
            <li>Welcome {user.username}</li>
            <li><Link to="/add-tasks">Add Task</Link></li>
            <li><Link to="/" onClick={() => logout()} className="bg-rose-900 px-4 py-2 rounded">Logout</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="bg-rose-900 px-4 py-2 rounded">Login</Link></li>
            <li><Link to="/register" className="bg-rose-900 px-4 py-2 rounded">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
