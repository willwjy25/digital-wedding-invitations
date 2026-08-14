import { z } from 'zod';

const checkInInfoSchema = z.object({
  qrCode: z.string(),
  checkedAt: z.date().nullable(),
});

export const guestSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, 'Nama tamu minimal 2 karakter'),
  slug: z.string(),
  phone: z.string().optional(),
  tenantId: z.string().uuid(),
  createdAt: z.date(),
  checkIn: checkInInfoSchema.nullable().optional(),
});

export const createGuestSchema = z.object({
  name: z.string().min(2, 'Nama tamu minimal 2 karakter'),
  phone: z.string().optional(),
});

export const updateGuestSchema = createGuestSchema.partial();

export type Guest = z.infer<typeof guestSchema>;
export type CreateGuestInput = z.infer<typeof createGuestSchema>;
export type UpdateGuestInput = z.infer<typeof updateGuestSchema>;