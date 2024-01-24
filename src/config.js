import dotenv from "dotenv";

dotenv.config()


export const TOKEN_SECRET = "SOEM TOKEN"
export const MONGODB_URL = process.env.MONGODB_URL
export const PORT = process.env.PORT || 3000
export const PORT_FRONT = process.env.PORT_FRONT || 5174