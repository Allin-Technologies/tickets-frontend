"use server";

import { api } from "@/lib/api";
import { ticketFormSchema } from "@/lib/zod";
import { z } from "zod";

const user_req_res = z.object({
  user: z.object({
    first_name: z.string(),
    last_name: z.string(),
    gender: z.string(),
    email: z.string(),
    phone_number: z.number(),
    _id: z.number(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    __v: z.number(),
  }),
});

export async function createTicket(props: z.infer<typeof ticketFormSchema>) {
  try {
    // create a user
    const request = await api(user_req_res, {
      method: "post",
      url: `/user/create`,
      data: props.contact,
    });

    if (request.response_code !== 201) {
      return { status: false, message: "Error creating ticket" };
    }

    // create a ticket
    const ticket_request = await api(user_req_res, {
      method: "post",
      url: `/ticket/create`,
      data: props.contact,
    });

    return {
      status: ticket_request.response_code === 201,
      message: ticket_request.message ?? "Error creating ticket",
    };
  } catch (e) {
    console.error(e);
    return { status: false, message: "Error creating ticket" };
  }
}
