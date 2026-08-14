import { randomUUID } from 'crypto';
import slugify from 'slugify';
import { prisma } from '../../config/prisma';
import type { CreateGuestInput, UpdateGuestInput } from '@repo/types';

export async function getGuests(tenantId: string) {
  return prisma.guest.findMany({
    where: { tenantId },
    include: { checkIn: true },
    orderBy: { createdAt: 'desc' },
  });
}

async function generateUniqueSlug(tenantId: string, name: string) {
  const baseSlug = slugify(name, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 2;

  while (await prisma.guest.findUnique({ where: { tenantId_slug: { tenantId, slug } } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

export async function createGuest(tenantId: string, input: CreateGuestInput) {
  const slug = await generateUniqueSlug(tenantId, input.name);
  return prisma.guest.create({
    data: {
      ...input,
      slug,
      tenantId,
      checkIn: {
        create: { qrCode: randomUUID() },
      },
    },
    include: { checkIn: true },
  });
}

export async function updateGuest(tenantId: string, guestId: string, input: UpdateGuestInput) {
  const guest = await prisma.guest.findFirst({ where: { id: guestId, tenantId } });
  if (!guest) throw new Error('Tamu tidak ditemukan');

  const data: UpdateGuestInput & { slug?: string } = { ...input };
  if (input.name && input.name !== guest.name) {
    data.slug = await generateUniqueSlug(tenantId, input.name);
  }

  return prisma.guest.update({ where: { id: guestId }, data, include: { checkIn: true } });
}

export async function deleteGuest(tenantId: string, guestId: string) {
  const guest = await prisma.guest.findFirst({ where: { id: guestId, tenantId } });
  if (!guest) throw new Error('Tamu tidak ditemukan');
  return prisma.guest.delete({ where: { id: guestId } });
}
