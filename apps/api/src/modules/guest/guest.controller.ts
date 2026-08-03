import { Response } from 'express';
import { createGuestSchema, updateGuestSchema } from '@repo/types';
import { getGuests, createGuest, updateGuest, deleteGuest } from './guest.service';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware';

export async function list(req: AuthenticatedRequest, res: Response) {
  const tenantId = req.tenantId as string;
  res.json(await getGuests(tenantId));
}

export async function create(req: AuthenticatedRequest, res: Response) {
  const parsed = createGuestSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const tenantId = req.tenantId as string;
  res.status(201).json(await createGuest(tenantId, parsed.data));
}

export async function update(req: AuthenticatedRequest, res: Response) {
  const parsed = updateGuestSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const tenantId = req.tenantId as string;
  const guestId = req.params.id as string;
  try {
    res.json(await updateGuest(tenantId, guestId, parsed.data));
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
    res.status(404).json({ error: message });
  }
}

export async function remove(req: AuthenticatedRequest, res: Response) {
  const tenantId = req.tenantId as string;
  const guestId = req.params.id as string;
  try {
    await deleteGuest(tenantId, guestId);
    res.status(204).send();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
    res.status(404).json({ error: message });
  }
}
