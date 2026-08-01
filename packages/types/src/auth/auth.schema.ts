import { z } from 'zod';

export const registerAdminSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  tenantSlug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan tanda hubung'),
});

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
});

export type RegisterAdminInput = z.infer<typeof registerAdminSchema>;
export type LoginInput = z.infer<typeof loginSchema>;