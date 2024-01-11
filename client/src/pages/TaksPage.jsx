import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";

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

  console.log(user);
  return (
    <div>
      <h1>TaksPage</h1>
      <h2>Hi {user.username}</h2>

      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}

export default TaksPage;
