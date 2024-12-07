import * as z from "zod";

const todoSchema = z.object({
  title: z.string().trim().min(1).max(255),
  description: z.string().min(1),
  status: z.string(),
  priority: z.string(),
  userId: z.number()
});

export default todoSchema;
