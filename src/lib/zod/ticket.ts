import { z } from "zod";

export const ticket = z.object({
  name: z.string(),
  cost: z.number(),
  available_tickets: z.number(),
  discount: z.boolean(),
  discount_name: z.string().optional(),
  discount_percent: z.number().optional(),
  info: z.string().optional(),
  benefits: z.string().optional(),
});

export const ticket_types_step = z.object({
  tickets: z
    .array(
      ticket.extend({
        quantity: z.number(),
      })
    )
    .refine(
      (props) => {
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
      first_name: z.string().min(2, { message: "Your first name is required" }),
      last_name: z.string().min(2, { message: "Your last name is required" }),
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
  attendees: z
    .array(
      z.object({
        ticket_type: z.string(),
        first_name: z
          .string()
          .min(2, { message: "Your first name is required" }),
        last_name: z.string().min(2, { message: "Your last name is required" }),
        gender: z.string().min(2, { message: "This field is required" }),
        email: z.string().email(),
        confirmemail: z.string().email(),
        phone_number: z
          .string()
          .min(2, { message: "Your phone number is required" }),
        questions: z.array(
          z.object({
            title: z.string(),
            answer: z.string(), //.or(z.array(z.string())),
          })
        ),
      })
    )
    .min(1, { message: "Requires at least one attendee" }),
});

export const payment_method_step = z.object({
  payment_method: z.string().min(2, { message: "Payment method is required" }),
});

export const ticketFormSchema = z.object({
  tickets: ticket_types_step.shape.tickets,
  contact: contact_step.shape.contact,
  attendees: contact_step.shape.attendees,
  payment_method: payment_method_step.shape.payment_method,
});
