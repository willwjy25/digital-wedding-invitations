import { Request, Response } from 'express';
import { registerAdminSchema, loginSchema } from '@repo/types';
import { registerAdmin, loginAdmin } from './auth.service';

export async function register(req: Request, res: Response) {
  const parsed = registerAdminSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  try {
    const result = await registerAdmin(parsed.data);
    res.status(201).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
    res.status(400).json({ error: message });
  }
}

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  try {
    const result = await loginAdmin(parsed.data);
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
    res.status(401).json({ error: message });
  }
}
