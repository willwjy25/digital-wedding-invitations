import { z } from 'zod';

export const giftAccountSchema = z.object({
  id: z.string().uuid(),
  bankName: z.string().min(2, 'Nama bank/e-wallet wajib diisi'),
  accountNumber: z.string().min(4, 'Nomor rekening wajib diisi'),
  accountName: z.string().min(2, 'Nama pemilik rekening wajib diisi'),
  tenantId: z.string().uuid(),
});

export const createGiftAccountSchema = giftAccountSchema.omit({
  id: true,
  tenantId: true,
});
export const updateGiftAccountSchema = createGiftAccountSchema.partial();

export type GiftAccount = z.infer<typeof giftAccountSchema>;
export type CreateGiftAccountInput = z.infer<typeof createGiftAccountSchema>;
export type UpdateGiftAccountInput = z.infer<typeof updateGiftAccountSchema>;