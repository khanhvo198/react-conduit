import { z } from "zod";
import { LoginValidationSchema, RegisterValidationSchema } from "../../zod-schema";

export interface User {
  bio: string;
  image: string;
  username: string;
  token: string;
  email: string;
}


export type UserLoginDTO = z.infer<typeof LoginValidationSchema>
export type UserRegisterDTO = z.infer<typeof RegisterValidationSchema>
