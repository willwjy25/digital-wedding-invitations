import { z } from 'zod';

export const tenantSchema = z.object({
  id: z.string().uuid(),
  slug: z
    .string()
    .min(3, 'Slug minimal 3 karakter')
    .regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan tanda hubung'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createTenantSchema = tenantSchema.pick({ slug: true });

export type Tenant = z.infer<typeof tenantSchema>;
export type CreateTenantInput = z.infer<typeof createTenantSchema>;