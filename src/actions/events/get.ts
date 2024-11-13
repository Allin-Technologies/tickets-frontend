"use server";

import { z } from "zod";
import { api } from "@/lib/api";

const validator = z.array(z.any());

export async function getAllEvents(
  category: string = "all",
  price: string = "all",
  date?: Date | null
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
      excludePastEvents: true,
    },
  });

  const currentDate = new Date();
  const filteredData = (request?.data ?? []).filter((event) => {
    const eventDate = new Date(event.date.replace(/(\d+)(th|st|nd|rd)/, "$1"));
    return eventDate >= currentDate;
  });

  return filteredData;
}
