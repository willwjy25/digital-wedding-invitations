import { z } from 'zod';

export const rsvpSchema = z.object({
  id: z.string().uuid(),
  attending: z.boolean(),
  guestCount: z.number().int().min(1).default(1),
  message: z.string().optional(),
  guestId: z.string().uuid(),
  tenantId: z.string().uuid(),
  createdAt: z.date(),
});

export const submitRsvpSchema = z.object({
  tenantSlug: z.string(),
  guestSlug: z.string(),
  attending: z.boolean(),
  guestCount: z.number().int().min(1).default(1),
  message: z.string().optional(),
});

export type RSVP = z.infer<typeof rsvpSchema>;
export type SubmitRsvpInput = z.infer<typeof submitRsvpSchema>;