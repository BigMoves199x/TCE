import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  service: z.string(),
  budget: z.string(),
  timeline: z.string(),
  message: z.string().min(20),
});