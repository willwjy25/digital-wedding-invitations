import { z } from 'zod';

export const wishSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, 'Nama wajib diisi'),
  message: z.string().min(2, 'Ucapan wajib diisi'),
  tenantId: z.string().uuid(),
  createdAt: z.date(),
});

export const submitWishSchema = z.object({
  tenantSlug: z.string(),
  name: z.string().min(2, 'Nama wajib diisi'),
  message: z.string().min(2, 'Ucapan wajib diisi').max(500, 'Ucapan maksimal 500 karakter'),
});

export type Wish = z.infer<typeof wishSchema>;
export type SubmitWishInput = z.infer<typeof submitWishSchema>;