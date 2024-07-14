import { z } from "zod"


export const LoginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})


export const RegisterValidationSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8)
})
