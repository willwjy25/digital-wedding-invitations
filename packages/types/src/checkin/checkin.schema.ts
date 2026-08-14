import { z } from 'zod';

export const verifyCheckInSchema = z.object({
  qrCode: z.string().min(1, 'Kode QR wajib diisi'),
});

export type VerifyCheckInInput = z.infer<typeof verifyCheckInSchema>;