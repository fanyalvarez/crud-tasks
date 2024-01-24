import axios from "axios";
import { PORT } from '../config.js';

const instancia = axios.create({
    baseURL: `http://localhost:${PORT}/api`,
    withCredentials: true
})

export default instancia