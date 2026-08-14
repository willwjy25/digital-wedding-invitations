import { Response } from 'express';
import { verifyCheckInSchema } from '@repo/types';
import { verifyCheckIn } from './checkin.service';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware';

export async function verify(req: AuthenticatedRequest, res: Response) {
  const parsed = verifyCheckInSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const tenantId = req.tenantId as string;

  try {
    const result = await verifyCheckIn(tenantId, parsed.data.qrCode);
    res.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
    res.status(404).json({ error: message });
  }
}
