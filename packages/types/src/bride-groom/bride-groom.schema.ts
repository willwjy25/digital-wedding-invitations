import { z } from 'zod';

export const brideGroomSchema = z.object({
  id: z.string().uuid(),
  brideName: z.string().min(2, 'Nama mempelai wanita wajib diisi'),
  brideParents: z.string().optional(),
  bridePhotoUrl: z.string().url().optional().or(z.literal('')),
  groomName: z.string().min(2, 'Nama mempelai pria wajib diisi'),
  groomParents: z.string().optional(),
  groomPhotoUrl: z.string().url().optional().or(z.literal('')),
  tenantId: z.string().uuid(),
});

export const upsertBrideGroomSchema = brideGroomSchema.omit({
  id: true,
  tenantId: true,
});

export type BrideGroom = z.infer<typeof brideGroomSchema>;
export type UpsertBrideGroomInput = z.infer<typeof upsertBrideGroomSchema>;