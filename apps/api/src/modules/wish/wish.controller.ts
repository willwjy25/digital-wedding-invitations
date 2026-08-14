import { Request, Response } from 'express';
import { submitWishSchema } from '@repo/types';
import { submitWish } from './wish.service';

export async function create(req: Request, res: Response) {
  const parsed = submitWishSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  try {
    const result = await submitWish(parsed.data);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
    res.status(400).json({ error: message });
  }
}
