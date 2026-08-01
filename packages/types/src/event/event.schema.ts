import { z } from 'zod';

export const eventSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(2, 'Judul acara wajib diisi'),
  date: z.coerce.date(),
  startTime: z.string().min(1, 'Jam mulai wajib diisi'),
  endTime: z.string().optional(),
  location: z.string().min(2, 'Lokasi wajib diisi'),
  mapsUrl: z.string().url().optional().or(z.literal('')),
  tenantId: z.string().uuid(),
});

export const createEventSchema = eventSchema.omit({ id: true, tenantId: true });
export const updateEventSchema = createEventSchema.partial();

export type Event = z.infer<typeof eventSchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;