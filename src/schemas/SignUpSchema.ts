import { z } from "zod";

const SignUpSchema = z.object({
  email: z.string().email("Invalid email format").min(1),
  password: z.string().min(6, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(6),
  firstName: z.string(),
  lastName: z.string(),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match"
      });
    }
  });

export default SignUpSchema;
