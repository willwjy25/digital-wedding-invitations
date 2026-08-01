import { prisma } from '../../config/prisma';
import type { CreateLoveStoryItemInput, UpdateLoveStoryItemInput } from '@repo/types';

export async function getLoveStoryItems(tenantId: string) {
  return prisma.loveStoryItem.findMany({
    where: { tenantId },
    orderBy: { order: 'asc' },
  });
}

export async function createLoveStoryItem(tenantId: string, input: CreateLoveStoryItemInput) {
  return prisma.loveStoryItem.create({ data: { ...input, tenantId } });
}

export async function updateLoveStoryItem(
  tenantId: string,
  itemId: string,
  input: UpdateLoveStoryItemInput
) {
  const item = await prisma.loveStoryItem.findFirst({ where: { id: itemId, tenantId } });
  if (!item) throw new Error('Item love story tidak ditemukan');
  return prisma.loveStoryItem.update({ where: { id: itemId }, data: input });
}

export async function deleteLoveStoryItem(tenantId: string, itemId: string) {
  const item = await prisma.loveStoryItem.findFirst({ where: { id: itemId, tenantId } });
  if (!item) throw new Error('Item love story tidak ditemukan');
  return prisma.loveStoryItem.delete({ where: { id: itemId } });
}
