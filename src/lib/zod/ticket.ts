import { z } from "zod";

export const ticket = z.object({
  name: z.string(),
  cost: z.number(),
  available_tickets: z.number(),
  discount: z.boolean(),
  discount_name: z.string().optional(),
  discount_percent: z.number().optional(),
});

export const ticket_types_step = z.object({
  tickets: z
    .array(
      z.object({
        name: z.string(),
        cost: z.number(),
        available_tickets: z.number(),
        discount: z.boolean(),
        discount_name: z.string(),
        discount_percent: z.number(),
        quantity: z.number(),
      })
    )
    .refine(
      (props) => {
        console.log(props.some((ticket) => ticket.quantity >= 1));

        return props.some((ticket) => ticket.quantity >= 1);
      },
      {
        message: "At least one ticket must have a quantity of at least 1.",
        //   path: ["tickets"],
      }
    ),
});

export const contact_step = z.object({
  contact: z
    .object({
      firstname: z.string().min(2, { message: "Your first name is required" }),
      lastname: z.string().min(2, { message: "Your last name is required" }),
      gender: z.string().min(2, { message: "This field is required" }),
      email: z.string().email(),
      confirmemail: z.string().email(),
      phone_number: z
        .string()
        .min(2, { message: "Your phone number is required" }),
    })
    .refine((props) => props.email === props.confirmemail, {
      message: "Email must match",
      path: ["confirmemail"],
    }),
});

export const payment_method_step = z.object({
  payment_method: z.string().min(2, { message: "Payment method is required" }),
});

export const ticketFormSchema = z.object({
  tickets: ticket_types_step.shape.tickets,
  contact: contact_step.shape.contact,
  payment_method: payment_method_step.shape.payment_method,
});
