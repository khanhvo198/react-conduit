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

export const UpdateUserValidationSchema = z.object({
  image: z.string(),
  username: z.string(),
  bio: z.string(),
  email: z.string(),
  password: z.string().min(8),
}).partial()
  .refine((form) => Object.values(form).some(Boolean))
