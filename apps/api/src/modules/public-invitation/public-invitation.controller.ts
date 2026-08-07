import { Request, Response } from 'express';
import { getPublicInvitation } from './public-invitation.service';

export async function get(req: Request, res: Response) {
  const tenantSlug = req.params.tenantSlug as string;
  const guestSlug = req.query.to as string | undefined;

  try {
    const data = await getPublicInvitation(tenantSlug, guestSlug);
    res.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Terjadi kesalahan';
    res.status(404).json({ error: message });
  }
}
