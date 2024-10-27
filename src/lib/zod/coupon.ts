import { z } from "zod";

export const couponSchema = z.object({
  couponId: z.string(),
  couponcode: z.string(),
  discountPercentage: z.number(),
  remainingUses: z.number(),
});

export const couponFormSchema = z.object({
  couponcode: z.string(),
  slug: z.string(),
});
