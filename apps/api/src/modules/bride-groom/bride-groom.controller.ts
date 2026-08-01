import { Response } from 'express';
import { upsertBrideGroomSchema } from '@repo/types';
import { getBrideGroom, upsertBrideGroom } from './bride-groom.service';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware';

export async function get(req: AuthenticatedRequest, res: Response) {
  const tenantId = req.tenantId as string;
  const data = await getBrideGroom(tenantId);
  res.json(data);
}

export async function upsert(req: AuthenticatedRequest, res: Response) {
  const parsed = upsertBrideGroomSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const tenantId = req.tenantId as string;
  const result = await upsertBrideGroom(tenantId, parsed.data);
  res.json(result);
}
