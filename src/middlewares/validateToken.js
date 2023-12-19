import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'



export const authRequired = (req, res, next) => {
    const { token } = req.cookies
    // console.log(token)

    if (!token) return res.this.status(401).json({ messge: "No token--midauth" })

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
        if (error) return res.status(403).json({ message: "Invalid token--middauth" })
        
        console.log(user,"user valid")
        req.user = user
        next()
    })
}