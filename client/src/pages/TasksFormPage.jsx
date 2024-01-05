import { useAuth } from "../context/AuthContext";

function TasksFormPage() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      TasksFormPage
      <h1>Hola {user.username}</h1>
    </div>
  );
}

export default TasksFormPage;
