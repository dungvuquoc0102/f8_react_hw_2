import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255)
});

export default loginSchema;
