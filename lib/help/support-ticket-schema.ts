import { z } from "zod";

import { SUPPORT_CATEGORIES } from "@/lib/help/constants";

export const createSupportTicketSchema = z.object({
  category: z.enum(SUPPORT_CATEGORIES),
  subject: z.string().trim().min(3).max(200),
  body: z.string().trim().min(10).max(8000),
  email: z.string().trim().email().max(320),
});

export type CreateSupportTicketInput = z.infer<
  typeof createSupportTicketSchema
>;
