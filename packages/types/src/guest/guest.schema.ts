import { z } from 'zod';

export const createGuestSchema = z.object({
  name: z.string().min(2, 'Nama tamu minimal 2 karakter'),
  phone: z.string().optional(),
});

export const guestSchema = createGuestSchema.extend({
  id: z.string().uuid(),
  slug: z.string(),
  tenantId: z.string().uuid(),
  createdAt: z.date(),
});

export type Guest = z.infer<typeof guestSchema>;
export type CreateGuestInput = z.infer<typeof createGuestSchema>;