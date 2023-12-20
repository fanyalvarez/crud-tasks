import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth.js";

function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const onsubmit = handleSubmit(async (data) => {
    const resp = await registerRequest(data);
    console.log(resp);
  });

  return (
    <div className="max-w-md p-10 rounded-md bg-zinc-800">
      <form onSubmit={onsubmit}>
        <input
          type="text"
          {...register("username", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py4 rounded-md mt-2"
          placeholder="User name"
        />

        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py4 rounded-md mt-2"
          placeholder="Email"
        />

        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py4 rounded-md mt-2"
          placeholder="Password"
        />
        <button
          type="submit"
          className="border-solid border-2 border-cyan-800 rounded p-0.5 mt-2">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
