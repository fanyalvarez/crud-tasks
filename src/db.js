import mongoose from 'mongoose';


//conexion de mongo
export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://alvarezpestefania:ZvECDSHSCNw98Rt9@cluster0.yry6cqu.mongodb.net/?retryWrites=true&w=majority')
        console.log('>>>DB CONNECT')

    } catch (error) {
        console.log('>>> DB NO CONECT')
        console.log(error)
    }
}