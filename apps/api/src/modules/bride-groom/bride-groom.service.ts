import { prisma } from '../../config/prisma';
import type { UpsertBrideGroomInput } from '@repo/types';

export async function getBrideGroom(tenantId: string) {
  return prisma.brideGroom.findUnique({ where: { tenantId } });
}

export async function upsertBrideGroom(tenantId: string, input: UpsertBrideGroomInput) {
  return prisma.brideGroom.upsert({
    where: { tenantId },
    create: { ...input, tenantId },
    update: input,
  });
}
