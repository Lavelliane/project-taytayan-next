import { z } from "zod";

const SignUpSchema = z.object({
  email: z.string().min(1, '').email("Not a valid email address!"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Enter password again to confirm."),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Password confirmation does not match!",
  path: ["confirmPassword"],
})

export default SignUpSchema;