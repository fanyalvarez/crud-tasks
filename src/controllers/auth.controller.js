import { response } from "express";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from '../libs/jwt.js'



//procesar peticiones
export const register = async (req, res) => {
    const { username, email, password } = (req.body)
    // console.log(username, email, password )
    try {

        //verificar si el user existe
        const userFound = await User.findOne({ email })
        if (userFound) {
            return res.status(400).json(["The emal is already exists"])
        }
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })//solo esta en el backend 

        const userSaved = await newUser.save()
        const token = await createAccessToken({ id: userSaved._id });

        res.cookie("token", token)
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
};

export const login = async (req, res) => {
    const { email, password } = (req.body)

    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "user not found" });

        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

        const token = await createAccessToken({ id: userFound._id });
        res.cookie("token", token)
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
};

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    // console.log(req.user.payload.id,"userid")
    const userFound = await User.findById(req.user.payload.id)

    if (!userFound) return res.status(400).json({ message: "User not found" })

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
}
