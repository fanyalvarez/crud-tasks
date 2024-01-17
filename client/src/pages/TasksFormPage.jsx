import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function TasksFormPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const { createTasks, getTask, updateTask } = useTasks();
  const params = useParams();

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data);
    } else {
      createTasks(data);
    }
    navigate("/tasks");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const taskId = await getTask(params.id);
        setValue("title", taskId.title);
        setValue("description", taskId.description);
      }
    }
    loadTask();
  }, []);

  return (
    <div>
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
