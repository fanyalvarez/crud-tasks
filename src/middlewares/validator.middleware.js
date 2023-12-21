import { Schema } from "zod"

//
export const validateSchema = (schema) => (req, resp, next) => {
    //los schemas de zod tienne un metodo que hace la validacion
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        console.log(error.errors)
        return resp.status(400).json(error.errors.map((error) => error.message))
    }
}