"use server";

import { api } from "@/lib/api";
import { ticketFormSchema } from "@/lib/zod";
import { z } from "zod";

const user_req_res = z.object({
  _id: z.string(),
});

const ticket_req_res = z.object({
  ticket: z.object({
    _id: z.string(),
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
        event_info: [
          {
            name: "Tech Conference 2024",
            type: "Conference",
            numberOfTickets: props.tickets.length,
            date: "2024-11-05",
            time: "10:00 AM",
            price: 150.0,
          },
        ],
        payment_status: "Succesful",
        trxRef: "56565546",
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
