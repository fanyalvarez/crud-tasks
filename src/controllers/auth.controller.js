import { response } from "express";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from '../libs/jwt.js'


//procesar peticiones
export const register = async (req, res) => {
    const { username, email, password } = (req.body)
    // console.log(username, email, password )
    try {

        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })//solo esta en el backend 

        const userSaved = await newUser.save()
        const token = await createAccesToken({ id: userSaved._id });

        res.cookie('token cookie', token)
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createAt: userSaved.createdAt,
            upddateAt: userSaved.updatedAt
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
};

export const login = (req, res) => {
    res.send('login')
};



