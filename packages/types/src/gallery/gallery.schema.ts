import { z } from 'zod';

export const galleryItemSchema = z.object({
  id: z.string().uuid(),
  imageUrl: z.string().url('URL foto tidak valid'),
  caption: z.string().optional(),
  order: z.number().int().default(0),
  tenantId: z.string().uuid(),
});

export const createGalleryItemSchema = galleryItemSchema.omit({
  id: true,
  tenantId: true,
});
export const updateGalleryItemSchema = createGalleryItemSchema.partial();

export type GalleryItem = z.infer<typeof galleryItemSchema>;
export type CreateGalleryItemInput = z.infer<typeof createGalleryItemSchema>;
export type UpdateGalleryItemInput = z.infer<typeof updateGalleryItemSchema>;