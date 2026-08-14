import { prisma } from '../../config/prisma';
import type { SubmitWishInput } from '@repo/types';

export async function getWishes(tenantId: string) {
  return prisma.wish.findMany({
    where: { tenantId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function submitWish(input: SubmitWishInput) {
  const tenant = await prisma.tenant.findUnique({ where: { slug: input.tenantSlug } });
  if (!tenant) throw new Error('Undangan tidak ditemukan');

  return prisma.wish.create({
    data: {
      name: input.name,
      message: input.message,
      tenantId: tenant.id,
    },
  });
}
