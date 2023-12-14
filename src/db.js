import mongoose from 'mongoose';


//conexion de mongo
export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://alvarezpestefania:project-tasks@cluster0.dulk6if.mongodb.net/?retryWrites=true&w=majority')
        console.log('>>>DB CONNECT')

    } catch (error) {
        console.log('>>> DB NO CONECT')
        console.log(error)
    }
}