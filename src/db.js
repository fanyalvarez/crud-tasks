import mongoose from 'mongoose';
import { MONGODB_URL } from './config.js';


//conexion de mongo
export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL)
        console.log('>>>DB CONNECT')

    } catch (error) {
        console.log('>>> DB NO CONECT')
        console.error(error)
    }
}