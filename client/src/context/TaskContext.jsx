import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
} from "../api/tasks.js";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const resp = await getTasksRequest();
    console.log(resp);
    try {
      setTasks(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTasks = async (tasks) => {
    const resp = await createTaskRequest(tasks);
    console.log(resp);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, createTasks, getTasks, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}
