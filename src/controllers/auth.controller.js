import { response } from "express";
import User from "../models/user.models.js";

//procesar peticiones
export const register = async (req, res) => {
    const { username, email, password } = (req.body)
    // console.log(username, email, password )
    try {
        const newUser = new User({
            username,
            email,
            password
        })//solo esta en el backend 
        const userSaved = await newUser.save()
        res.json(userSaved)

    } catch (error) {
        console.log(error)
    }
};

export const login = (req, res) => {
    res.send('login')
};



