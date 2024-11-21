"use server";

import { z } from "zod";
import { api } from "@/lib/api";

const validator = z.array(z.any());

export async function getAllEvents(
  category: string = "all",
  price: string = "all",
  date?: Date | null,
  state?: string
) {
  const request = await api(validator, {
    method: "post",
    url: `/event/filter`,
    headers: {
      cache: "no-store",
    },
    data: {
      category: category !== "all" ? category : "",
      price: price !== "all" ? price : "",
      date,
      state: state !== "all" ? state : undefined,
    },
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of today

  const filteredData = (request?.data ?? [])?.filter((event) => {
    const eventDate = new Date(event.date.replace(/(\d+)(th|st|nd|rd)/, "$1"));
    eventDate.setHours(23, 59, 59, 999); // Set to end of event day
    return eventDate >= today;
  });

  return filteredData;
}
