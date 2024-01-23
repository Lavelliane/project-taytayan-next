import { z } from "zod";

const SignInSchema = z.object({
  email: z.string().min(1, '').email("Not a valid email address!"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
})

export default SignInSchema;