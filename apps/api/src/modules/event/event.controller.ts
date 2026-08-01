import { Response } from 'express';
import { createEventSchema, updateEventSchema } from '@repo/types';
import { getEvents, createEvent, updateEvent, deleteEvent } from './event.service';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware';

export async function list(req: AuthenticatedRequest, res: Response) {
  const tenantId = req.tenantId as string;
  const data = await getEvents(tenantId);
  res.json(data);
}

export async function create(req: AuthenticatedRequest, res: Response) {
  const parsed = createEventSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const tenantId = req.tenantId as string;
  const result = await createEvent(tenantId, parsed.data);
  res.status(201).json(result);
}

export async function update(req: AuthenticatedRequest, res: Response) {
  const parsed = updateEventSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const tenantId = req.tenantId as string;
  try {
    const result = await updateEvent(tenantId, req.params.id, parsed.data);
    res.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
    res.status(404).json({ error: message });
  }
}

export async function remove(req: AuthenticatedRequest, res: Response) {
  const tenantId = req.tenantId as string;
  try {
    await deleteEvent(tenantId, req.params.id);
    res.status(204).send();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
    res.status(404).json({ error: message });
  }
}
