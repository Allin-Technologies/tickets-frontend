import { z } from "zod";
import { ticket } from "./ticket";

export const eventSchema = z.object({
  _id: z.string().length(24),
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  duration: z.number(), // Duration in minutes
  time: z.string(), // Assuming time is a string, you can validate time format further if needed
  location: z.string(),
  imgsrc: z.string().url(),
  event_type: z.enum(["Paid", "Free"]),
  description: z.string(),
  about: z.string(),
  category: z.string(),
  ticket_type: z.array(ticket),
  createdAt: z.string().datetime(), // ISO datetime format for createdAt
  updatedAt: z.string().datetime(), // ISO datetime format for updatedAt
  __v: z.number(), // Assuming __v is a version key and always a number
});
