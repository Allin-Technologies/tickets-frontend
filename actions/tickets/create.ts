"use server";

import { api } from "@/lib/api";
import { eventSchema, ticketFormSchema } from "@/lib/zod";
import { z } from "zod";

const userReqRes = z.object({
  _id: z.string(),
});

const ticketReqRes = z.object({
  ticket: z.object({
    _id: z.string(),
  }),
});

export async function createTicket(
  props: z.infer<typeof ticketFormSchema>,
  event: z.infer<typeof eventSchema>
) {
  try {
    const url =
      event.event_type === "Free" ? "/ticket/create-free" : "/ticket/create";

    if (event.event_type !== "Free") {
      return {
        status: false,
        message: "Paid ticket purchase coming soon.",
        data: null,
      };
    }

    const userCred = props.attendees[0];

    // Create a user
    const userResponse = await api(userReqRes, {
      method: "post",
      url: `/user/create`,
      data: userCred,
    });

    if (!userResponse.status || !userResponse.data) {
      return { status: false, message: "Error creating user", data: null };
    }

    const userID = userResponse.data?._id;

    // Prepare ticket data
    const data = {
      userID,
      event_info: props.tickets
        .filter((t) => t.quantity >= 1)
        .map((ticket) => ({
          id: event._id,
          ticket_type: ticket.name,
        })),
      payment_status: event.event_type === "Free" ? "Free" : "Pending",
      total_cost: props.tickets.reduce(
        (acc, ticket) => acc + ticket.cost * ticket.quantity,
        0
      ),
      trxRef: null,
      questions: userCred.questions.map((question) => ({
        title: question.title,
        answer: question.answer,
      })),
    };

    // Create a ticket
    const ticketResponse = await api(ticketReqRes, {
      method: "post",
      url: url,
      data: data,
    });

    if (ticketResponse.response_code !== 201) {
      return {
        status: false,
        message: ticketResponse.message ?? "Error creating ticket",
        data: null,
      };
    }

    return {
      status: true,
      message: "Ticket created successfully",
      data: ticketResponse.data,
    };
  } catch (error) {
    console.error("Error creating ticket:", error);
    return { status: false, message: "Error creating ticket", data: null };
  }
}
