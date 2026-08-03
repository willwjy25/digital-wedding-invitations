import { prisma } from '../../config/prisma';
import type { CreateGiftAccountInput, UpdateGiftAccountInput } from '@repo/types';

export async function getGiftAccounts(tenantId: string) {
  return prisma.giftAccount.findMany({ where: { tenantId } });
}

export async function createGiftAccount(tenantId: string, input: CreateGiftAccountInput) {
  return prisma.giftAccount.create({ data: { ...input, tenantId } });
}

export async function updateGiftAccount(
  tenantId: string,
  accountId: string,
  input: UpdateGiftAccountInput
) {
  const account = await prisma.giftAccount.findFirst({ where: { id: accountId, tenantId } });
  if (!account) throw new Error('Rekening tidak ditemukan');
  return prisma.giftAccount.update({ where: { id: accountId }, data: input });
}

export async function deleteGiftAccount(tenantId: string, accountId: string) {
  const account = await prisma.giftAccount.findFirst({ where: { id: accountId, tenantId } });
  if (!account) throw new Error('Rekening tidak ditemukan');
  return prisma.giftAccount.delete({ where: { id: accountId } });
}
