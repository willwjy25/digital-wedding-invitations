import { prisma } from '../../config/prisma';
import type { SubmitRsvpInput } from '@repo/types';

export async function submitRsvp(input: SubmitRsvpInput) {
  const tenant = await prisma.tenant.findUnique({ where: { slug: input.tenantSlug } });
  if (!tenant) throw new Error('Undangan tidak ditemukan');

  const guest = await prisma.guest.findUnique({
    where: { tenantId_slug: { tenantId: tenant.id, slug: input.guestSlug } },
  });
  if (!guest) throw new Error('Tamu tidak ditemukan');

  // Upsert: kalau tamu ini sudah pernah RSVP, update datanya. Kalau belum, buat baru.
  return prisma.rSVP.upsert({
    where: { guestId: guest.id },
    create: {
      attending: input.attending,
      guestCount: input.guestCount,
      message: input.message,
      guestId: guest.id,
      tenantId: tenant.id,
    },
    update: {
      attending: input.attending,
      guestCount: input.guestCount,
      message: input.message,
    },
  });
}
