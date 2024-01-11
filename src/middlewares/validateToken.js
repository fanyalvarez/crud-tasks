import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'



export const authRequired = (req, res, next) => {
    try {
        const { token } = req.cookies
        // console.log(token, "token")

        if (!token) return res.status(401).json({ messge: "No token--midauth" })

        jwt.verify(token, TOKEN_SECRET, (error, user) => {
            if (error) return res.status(401).json({ message: "Invalid token--middauth" })

            // console.log(user,"user valid")
            req.user = user.payload
            next()
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}