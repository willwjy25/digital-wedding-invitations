import { Response } from 'express';
import { createLoveStoryItemSchema, updateLoveStoryItemSchema } from '@repo/types';
import {
  getLoveStoryItems,
  createLoveStoryItem,
  updateLoveStoryItem,
  deleteLoveStoryItem,
} from './love-story.service';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware';

export async function list(req: AuthenticatedRequest, res: Response) {
  const tenantId = req.tenantId as string;
  res.json(await getLoveStoryItems(tenantId));
}

export async function create(req: AuthenticatedRequest, res: Response) {
  const parsed = createLoveStoryItemSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const tenantId = req.tenantId as string;
  res.status(201).json(await createLoveStoryItem(tenantId, parsed.data));
}

export async function update(req: AuthenticatedRequest, res: Response) {
  const parsed = updateLoveStoryItemSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const tenantId = req.tenantId as string;
  try {
    res.json(await updateLoveStoryItem(tenantId, req.params.id, parsed.data));
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
    res.status(404).json({ error: message });
  }
}

export async function remove(req: AuthenticatedRequest, res: Response) {
  const tenantId = req.tenantId as string;
  try {
    await deleteLoveStoryItem(tenantId, req.params.id);
    res.status(204).send();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
    res.status(404).json({ error: message });
  }
}
