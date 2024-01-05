import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
};

export function TaskProvider({ children }) {
  const [tareas, setTareas] = useState([])

  return <TaskContext.Provider value={{tareas,}}>{children}</TaskContext.Provider>;
}
