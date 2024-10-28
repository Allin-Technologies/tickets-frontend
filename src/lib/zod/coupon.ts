import { z } from "zod";

export const couponSchema = z.object({
  couponId: z.string(),
  couponcode: z.string(),
  discountPercentage: z.number(),
  remainingUses: z.number(),
  allowedTicketTypes: z.array(z.string()).nullable(),
});

export const couponFormSchema = z.object({
  couponcode: z.string(),
  slug: z.string(),
});
