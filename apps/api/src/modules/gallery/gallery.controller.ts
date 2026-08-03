import { Response } from 'express';
import { createGalleryItemSchema, updateGalleryItemSchema } from '@repo/types';
import {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from './gallery.service';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware';

export async function list(req: AuthenticatedRequest, res: Response) {
  const tenantId = req.tenantId as string;
  res.json(await getGalleryItems(tenantId));
}

export async function create(req: AuthenticatedRequest, res: Response) {
  const parsed = createGalleryItemSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const tenantId = req.tenantId as string;
  res.status(201).json(await createGalleryItem(tenantId, parsed.data));
}

export async function update(req: AuthenticatedRequest, res: Response) {
  const parsed = updateGalleryItemSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const tenantId = req.tenantId as string;
  try {
    res.json(await updateGalleryItem(tenantId, req.params.id, parsed.data));
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
    res.status(404).json({ error: message });
  }
}

export async function remove(req: AuthenticatedRequest, res: Response) {
  const tenantId = req.tenantId as string;
  try {
    await deleteGalleryItem(tenantId, req.params.id);
    res.status(204).send();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
    res.status(404).json({ error: message });
  }
}
