import express from 'express';
import morgan from "morgan";
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import { PORT_FRONT } from './config.js';


const app = express();

app.use(cors({
    origin: `http://localhost:${PORT_FRONT}`,
    credentials:true
}));
app.use(morgan('dev'));
app.use(express.json());//se usa express no lee json
app.use(cookieParser())

app.use("/api", authRoutes);
app.use("/api", tasksRoutes);

export default app;