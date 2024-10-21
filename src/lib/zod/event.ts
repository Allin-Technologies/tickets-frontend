import { z } from "zod";
import { ticket } from "./ticket";

const question = z.object({
  title: z.string(),
  field: z.enum(["textField", "selectField", "multiSelectField"]),
  options: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  required: z.boolean(),
});

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
  // benefits: z.string().optional(),
  about: z.string(),
  location_url: z.string().optional(),
  category: z.string(),
  ticket_type: z.array(ticket),
  questions: z.array(question),
  createdAt: z.string().datetime(), // ISO datetime format for createdAt
  updatedAt: z.string().datetime(), // ISO datetime format for updatedAt
  __v: z.number(), // Assuming __v is a version key and always a number
});
