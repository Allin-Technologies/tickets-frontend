import { clsx, type ClassValue } from "clsx";
import { addMinutes, format, parse } from "date-fns";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { ticket } from "./zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

// Function to format the date to "Wednesday, September 18th, 2024"
export const formatEventDate = (dateString: string) => {
  const cleanedDateString = dateString.replace(/(\d+)(th|st|nd|rd)/, "$1");

  const parsedDate = parse(cleanedDateString, "d MMMM, yyyy", new Date());

  const day_string = format(parsedDate, "EEEE");
  const day_int = format(parsedDate, "d");
  const month = format(parsedDate, "MMMM");
  const year = format(parsedDate, "yyyy");

  return `${day_string}, ${month} ${getOrdinalSuffix(+day_int)}, ${year}`;
};

export const getEventTimeRange = (startTime: string, duration: number) => {
  const parsedStartTime = parse(startTime, "h:mm a", new Date());
  const endTime = addMinutes(parsedStartTime, duration);

  const formattedStartTime = format(parsedStartTime, "h:mm a");
  const formattedEndTime = format(endTime, "h:mm a");

  return `${formattedStartTime} - ${formattedEndTime} WAT`;
};

export function calculateDiscountedPrice(
  originalPrice: number,
  discountPercent: number
) {
  if (originalPrice < 0 || discountPercent < 0) {
    throw new Error(
      "Original price and discount percentage must be non-negative."
    );
  }

  const discountAmount = (originalPrice * discountPercent) / 100;
  const discountedPrice = originalPrice - discountAmount;

  return discountedPrice;
}

interface calculateSubtotalTicket extends z.infer<typeof ticket> {
  quantity: number;
}

export function calculateSubtotal(
  tickets: calculateSubtotalTicket[],
  fees: number = 0
) {
  const validTickets = tickets.filter((ticket) => ticket.quantity >= 1);

  // Calculate the subtotal based on ticket quantity and discount
  const subtotal = validTickets.reduce((total, ticket) => {
    // If the ticket has a discount, apply it to the cost
    const ticketCost = ticket.discount
      ? ticket.cost - (ticket.cost * (ticket?.discount_percent ?? 0)) / 100
      : ticket.cost;

    // Multiply by the quantity of tickets and add to the running total
    return total + ticketCost * ticket.quantity;
  }, 0);

  return subtotal + fees;
}

export function calculateTotal(
  tickets: calculateSubtotalTicket[],
  fees: number = 0,
  coupon?: { discount_percentage: number }
) {
  const validTickets = tickets.filter((ticket) => ticket.quantity >= 1);

  // Calculate the subtotal based on ticket quantity and discount
  const subtotal = validTickets.reduce((total, ticket) => {
    // If the ticket has a discount, apply it to the cost
    const ticketCost = ticket.discount
      ? ticket.cost - (ticket.cost * (ticket?.discount_percent ?? 0)) / 100
      : ticket.cost;

    // Multiply by the quantity of tickets and add to the running total
    return total + ticketCost * ticket.quantity;
  }, 0);

  // If there's a coupon, apply its discount to the subtotal
  const finalSubtotal =
    coupon && coupon.discount_percentage
      ? subtotal - (subtotal * coupon.discount_percentage) / 100
      : subtotal;

  return finalSubtotal;
}
