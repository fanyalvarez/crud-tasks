import { response } from "express";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from '../libs/jwt.js'
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from '../config.js'



//procesar peticiones
export const register = async (req, res) => {
    const { username, email, password } = (req.body)
    // console.log(username, email, password )
    try {

        //verificar si el user existe
        const userFound = await User.findOne({ email })
        if (userFound) {
            return res.status(400).json(["The email is already in use"])
        }
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })//solo esta en el backend 

        const userSaved = await newUser.save()
        const token = await createAccessToken({ id: userSaved._id });

        res.cookie("token", token, { sameSite: 'none' })
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })

    } catch (error) {
        console.error(error)
        res.status(500).json([error.message])
    }
};

export const login = async (req, res) => {
    const { email, password } = (req.body)

    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json(["user not found"]);

        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(400).json(["Incorrect password"]);

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
        console.error(error)
        res.status(500).json([error.message])
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("token", "", {
            expires: new Date(0)
        })
        return res.sendStatus(200)
    } catch (error) {
        console.error(error)
    }
}

export const profile = async (req, res) => {
    try {
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
    } catch (error) {
        console.error(error)
    }
}

export const verifyToken = async (req, res) => {
    try {
        const { token } = req.cookies

        if (!token) return res.status(401).json({ message: 'Unauthorized no token' })
        // console.log(token)

        jwt.verify(token, TOKEN_SECRET, async (err, user) => {
            if (err) return res.status(401).json({ message: 'Unauthorized err with token' })

            const userFound = await User.findById(user.payload.id)
            // console.log(userFound, 'userFound')

            if (!userFound) return res.status(401).json({ message: 'Unauthorized user not exist' })

            return res.json({
                id: userFound.id,
                username: userFound.username,
                email: userFound.email
            })
        })
    } catch (error) {
        console.error(error)
    }
}

