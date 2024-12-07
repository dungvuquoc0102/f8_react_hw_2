import * as z from "zod";

const registerSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(1, "Username must be at least 1 characters"),
    password: z.string().min(1).max(255),
    confirmPassword: z.string().min(1).max(255)
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });

export default registerSchema;
