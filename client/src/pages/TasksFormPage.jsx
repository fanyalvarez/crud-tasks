import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";

function TasksFormPage() {
  const { register, handleSubmit } = useForm();
  const {tareas} = useTasks();
  const { user } = useAuth();
  console.log(tareas);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div>
      <h1>Hola {user.username}</h1>
      <div className="w-full max-w-md bg-green-950 rounded-md p-10">
        <form onSubmit={onSubmit}>
          <input
            className="w-full bg-zinc-700 rounded-md text-white px-4 py-2 my-3"
            type="text"
            placeholder="title"
            {...register("title")}
            autoFocus
          />
          <textarea
            className="w-full bg-zinc-700 rounded-md text-white px-4 py-2 my-3"
            rows="3"
            placeholder="description"
            {...register("description")}></textarea>
          <button>save</button>
        </form>
      </div>
    </div>
  );
}

export default TasksFormPage;
