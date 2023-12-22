import { z } from "zod";

export const registerSchema = z.object({
    username: z
        .string({
            required_error: "User name is required"
        }),

    email: z
        .string({
            required_error: "Email is required"
        }).email({
            message: "Invalid email"
        }),

    password: z
        .string({
            required_error: "Password is required"
        }).min(6, { message: "Password must be at least 6 characters" })
})

export const loginSchema = z.object({
    email: z
        .string({
            required_error: "Email is not valid"
        }).email({
            message: "Invalid email"
        }),

    password: z
        .string({
            required_error: "Password is  not valid"
        })
        .min(6, { message: "Password must be at least 6 characters" })
})