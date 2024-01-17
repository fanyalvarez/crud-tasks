import tasksSchema from "../models/taks.models.js";


export const getTasks = async (req, res) => {
    try {
        const tasks = await tasksSchema.find({
            user: req.user.id
        }).populate('user')
        res.json(tasks)
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}
export const createTask = async (req, res) => {
    try {
        const { title, description, date } = req.body

        // console.log(req.user, "createdtask")
        const newTaks = new tasksSchema({
            title,
            description,
            date,
            user: req.user.id
        });
        const savedTaks = await newTaks.save()
        res.json(savedTaks)
    } catch (error) {
        return res.status(500).json({ message: "Task not create" })
    }
}
export const getTask = async (req, res) => {
    try {
        const task = await tasksSchema.findById(req.params.id).populate('user')
        if (!task) return res.status(404).json({ message: "Task not found" })
        res.json(task)
    } catch (error) {
        return res.status(404).json({ message: "Task not found" })
    }
}
export const deleteTask = async (req, res) => {
    try {
        const task = await tasksSchema.findByIdAndDelete(req.params.id)
        // console.log(task)
        if (!task) return res.status(404).json({ message: "Task not found" })
        // res.json(task)
        return res.status(204).json({ message: "Task deleted" })
    } catch (error) {
        console.error(error)
    }
}
export const updateTask = async (req, res) => {
    try {
        const task = await tasksSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!task) return res.status(404).json({ message: "Task not found" })
        res.json(task)
    } catch (error) {
        return res.status(404).json({ message: "Task not found" })
    }
}
