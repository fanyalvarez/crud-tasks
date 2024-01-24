import dotenv from "dotenv";

dotenv.config()


export const TOKEN_SECRET = "SOEM TOKEN"
export const MONGODB_URL = process.env.MONGODB_URL
export const PORT = process.env.PORT || 3000