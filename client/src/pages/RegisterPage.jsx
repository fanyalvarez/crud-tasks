import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  const onsubmit = handleSubmit(async (data) => {
    // const resp = await registerRequest(data);
    await signup(data);
  });

  return (
    <div className="flex h-full items-center justify-center ">
      <div className="max-w-md p-10 rounded-md bg-zinc-800">
        <h1 className="text-2xl font-bold mb-2">Register </h1>
        {registerErrors.map((error, i) => (
          <span className="bg-red-800 text-white p-1 rounded text-xs" key={i}>
            {error}
          </span>
        ))}
        <form onSubmit={onsubmit} className="grid grid-col-1 w-96">
          <input
            type="text"
            {...register("username", { required: true })}
            className=" bg-zinc-700 text-white text-lg px-4 py-2 rounded-md mt-2"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}

          <input
            type="email"
            {...register("email", { required: true })}
            className=" bg-zinc-700 text-white text-lg px-4 py-2 rounded-md mt-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className=" bg-zinc-700 text-white text-lg px-4 py-2 rounded-md mt-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}

          <button
            type="submit"
             className="bg-sky-700 px-4 py-2 rounded my-3 w-28">
            Send
          </button>
        </form>

        <p className="flex gap-x-2 justify-between my-2">
          Already have an account?
          <Link to="/login" className="text-green-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
