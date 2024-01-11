import axios from "./axios";


export const getTasksRequest = () => axios.get('/tasks')
export const getTaskRequest = (id) => axios.delete(`/tasks/${id}`)
export const createTaskRequest = (task) => axios.post('/tasks',task)
export const updateTaskRequest = (task) => axios.put(`/tasks/${task._id}`,task)
export const delateTaskRequest = (id) => axios.delete(`/tasks/${id}`)