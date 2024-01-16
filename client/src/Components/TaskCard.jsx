import { useTasks } from "../context/TaskContext.jsx";
import { Link } from "react-router-dom";

function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <h3 className="text-2xl font-bold mb-2">{task.title}</h3>

      <p className="text-stale-300 text-xl">{task.description}</p>
      <p>{new Date(task.date).toLocaleDateString()}</p>
      <div className="my-4 flex gap-x-4 justify-end px-2">
        <button onClick={() => deleteTask(task._id)}>Delete</button>
        <Link to={`/tasks/${task._id}`}>Edit</Link>
      </div>
    </div>
  );
}

export default TaskCard;
