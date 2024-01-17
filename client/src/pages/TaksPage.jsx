import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../Components/TaskCard";

function TaksPage() {
  const { user } = useAuth();
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) {
    return (
      <div>
        <h1>TaksPage</h1>
        <h2>Hi {user.username}</h2>
        <h1>No tasks</h1>
      </div>
    );
  }

  // console.log(tasks);
  return (
    <div>
      <div className="grid grid-cols-3 gap-5 w-11/12 m-auto">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </div>
  );
}

export default TaksPage;
