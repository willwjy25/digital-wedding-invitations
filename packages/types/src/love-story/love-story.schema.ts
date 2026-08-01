import { z } from 'zod';

export const loveStoryItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(2, 'Judul wajib diisi'),
  description: z.string().min(2, 'Deskripsi wajib diisi'),
  date: z.coerce.date().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  order: z.number().int().default(0),
  tenantId: z.string().uuid(),
});

export const createLoveStoryItemSchema = loveStoryItemSchema.omit({
  id: true,
  tenantId: true,
});
export const updateLoveStoryItemSchema = createLoveStoryItemSchema.partial();

export type LoveStoryItem = z.infer<typeof loveStoryItemSchema>;
export type CreateLoveStoryItemInput = z.infer<typeof createLoveStoryItemSchema>;
export type UpdateLoveStoryItemInput = z.infer<typeof updateLoveStoryItemSchema>;