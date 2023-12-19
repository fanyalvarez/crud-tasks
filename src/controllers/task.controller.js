import tasksSchema from "../models/taks.models.js";


export const getTasks = async (req, res) => {
    const tasks = await tasksSchema.find({
        user:req.user.id
    }).populate('user')
    res.json(tasks)
}
export const createTask = async (req, res) => {
    const { title, description, date } = req.body

    console.log(req.user, "createdtask")
    const newTaks = new tasksSchema({
        title, 
        description, 
        date,
        user: req.user.id
    });
    const savedTaks = await newTaks.save()
    res.json(savedTaks)
}
export const getTask = async (req, res) => {
    const task = await tasksSchema.findById(req.params.id).populate('user')
    if (!task) return res.status(404).json({ message: "Task not found" })
    res.json(task)
}
export const deleteTask = async (req, res) => {
    const task = await tasksSchema.findById(req.params.id)
    if (!task) return res.status(404).json({ message: "Task not found" })
    // res.json(task)
    return res.status(204).json({ message: "Task deleted" })
}
export const updateTask = async (req, res) => {
    const task = await tasksSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!task) return res.status(404).json({ message: "Task not found" })
    res.json(task)
}
