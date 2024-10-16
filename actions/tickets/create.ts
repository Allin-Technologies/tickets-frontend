"use server";

import { api } from "@/lib/api";
import { eventSchema, ticketFormSchema } from "@/lib/zod";
import { z } from "zod";

const user_req_res = z.object({
  _id: z.string(),
});

const ticket_req_res = z.object({
  ticket: z.object({
    _id: z.string(),
  }),
});

export async function createTicket(
  props: z.infer<typeof ticketFormSchema>,
  event: z.infer<typeof eventSchema>
) {
  try {
    // create a user
    const request = await api(user_req_res, {
      method: "post",
      url: `/user/create`,
      data: props.contact,
    });

    if (!request.status || !request.data) {
      console.log("request failed:", request);
      return { status: false, message: "Error creating ticket", data: null };
    }

    // create a ticket
    const ticket_request = await api(ticket_req_res, {
      method: "post",
      url: `/ticket/create`,
      data: {
        userID: request.data?._id,
        event_info: props.tickets.map((ticket) => ({
          name: event.title,
          type: event.category,
          numberOfTickets: ticket.quantity,
          date: event.date,
          time: event.time,
          price: ticket.cost,
        })),
        payment_status: "Succesful",
        trxRef: "",
      },
    });

    return {
      status: ticket_request.response_code === 201,
      message: ticket_request.message ?? "Error creating ticket",
      data: ticket_request.data,
    };
  } catch (e) {
    console.error("error:", e);
    return { status: false, message: "Error creating ticket", data: null };
  }
}
