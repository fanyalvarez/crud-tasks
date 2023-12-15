import express from 'express';
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(morgan('dev'));
app.use(express.json());//se usa porq express no lee los json con esto si

app.use("/api", authRoutes);

export default app;