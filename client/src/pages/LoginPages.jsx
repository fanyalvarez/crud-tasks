import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPages() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, errors: signinErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    signin(data);
  });

  return (
    <div className="flex h-full items-center justify-center ">
      <div className="max-w-md p-10 rounded-md bg-zinc-800">
        <h1 className="text-2xl font-bold mb-2">Login </h1>

        {signinErrors.map((error, i) => (
          <span className="bg-red-800 text-white p-1 rounded text-xs" key={i}>
            {error}
          </span>
        ))}
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py4 rounded-md mt-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py4 rounded-md mt-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}

          <button
            type="submit"
            className="border-solid border-2 border-cyan-800 rounded px-2 mt-2">
            Send
          </button>
        </form>
        <p className="flex gap-x-2 justify-between my-2">
          Don't have an account?
          <Link to="/register" className="text-green-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPages;
