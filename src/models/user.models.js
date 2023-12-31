import mongoose from "mongoose";

//usurios que se van creando y guardando
const userSchema = new mongoose.Schema({ //new lo vuelve metodo y se puede usar para mas cosas
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

export default mongoose.model('user', userSchema)
