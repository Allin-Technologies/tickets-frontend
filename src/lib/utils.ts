import { couponSchema } from "@/lib/zod";
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

export function calculateFees(amount: number, discount?: number): number {
  const cost = calculateDiscountedPrice(amount, discount ?? 0);
  const extra = cost * 0.05;
  return Number((extra + 100).toFixed(2));
}

export function calculateSubtotal(
  tickets: calculateSubtotalTicket[],
  event_type: "Free" | "Paid"
) {
  const validTickets = tickets.filter((ticket) => ticket.quantity >= 1);

  const subtotal = validTickets.reduce((total, ticket) => {
    // If the ticket has a discount, apply it to the cost
    const ticketCost = ticket.discount
      ? ticket.cost - (ticket.cost * (ticket?.discount_percent ?? 0)) / 100
      : ticket.cost;

    // Multiply by the quantity of tickets and add to the running total
    return total + ticketCost * ticket.quantity;
  }, 0);

  const fees = event_type === "Paid" ? calculateFees(subtotal) : 0;

  return {
    subtotal: Number((subtotal + fees).toFixed(2)),
    fees: Number(fees.toFixed(2)),
  };
}

export function calculateTotal(
  tickets: calculateSubtotalTicket[],
  event_type: "Free" | "Paid",
  coupon?: z.infer<typeof couponSchema>
) {
  const validTickets = tickets.filter((ticket) => ticket.quantity >= 1);

  // Step 1: Calculate subtotal, applying ticket-level discounts as needed
  const subtotal = validTickets.reduce((total, ticket) => {
    const ticketCost = ticket.discount
      ? ticket.cost - (ticket.cost * (ticket?.discount_percent ?? 0)) / 100
      : ticket.cost;

    return total + ticketCost * ticket.quantity;
  }, 0);

  // Step 2: Calculate eligible subtotal if allowedTicketTypes is defined
  const eligibleSubtotal = validTickets.reduce((total, ticket) => {
    const ticketCost = ticket.discount
      ? ticket.cost - (ticket.cost * (ticket?.discount_percent ?? 0)) / 100
      : ticket.cost;

    // Include only tickets that are eligible based on allowedTicketTypes if it's defined
    return !coupon?.allowedTicketTypes ||
      coupon.allowedTicketTypes.includes(ticket.name)
      ? total + ticketCost * ticket.quantity
      : total;
  }, 0);

  // Step 3: Apply the coupon-level discount only to the eligible subtotal
  const discountedSubtotal =
    coupon && coupon.discountPercentage
      ? subtotal - (eligibleSubtotal * coupon.discountPercentage) / 100
      : subtotal;

  const fees = event_type === "Paid" ? calculateFees(discountedSubtotal) : 0;
  return Number((discountedSubtotal + fees).toFixed(2));
}
