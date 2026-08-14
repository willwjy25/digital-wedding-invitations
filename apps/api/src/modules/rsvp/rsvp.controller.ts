import { Request, Response } from 'express';
import { submitRsvpSchema } from '@repo/types';
import { submitRsvp, getRsvpSummary } from './rsvp.service';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware';

export async function create(req: Request, res: Response) {
  const parsed = submitRsvpSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  try {
    const result = await submitRsvp(parsed.data);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
    res.status(400).json({ error: message });
  }
}

export async function summary(req: AuthenticatedRequest, res: Response) {
  const tenantId = req.tenantId as string;
  const result = await getRsvpSummary(tenantId);
  res.json(result);
}
