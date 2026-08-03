import { prisma } from '../../config/prisma';
import type { CreateGalleryItemInput, UpdateGalleryItemInput } from '@repo/types';

export async function getGalleryItems(tenantId: string) {
  return prisma.galleryItem.findMany({
    where: { tenantId },
    orderBy: { order: 'asc' },
  });
}

export async function createGalleryItem(tenantId: string, input: CreateGalleryItemInput) {
  return prisma.galleryItem.create({ data: { ...input, tenantId } });
}

export async function updateGalleryItem(
  tenantId: string,
  itemId: string,
  input: UpdateGalleryItemInput
) {
  const item = await prisma.galleryItem.findFirst({ where: { id: itemId, tenantId } });
  if (!item) throw new Error('Foto tidak ditemukan');
  return prisma.galleryItem.update({ where: { id: itemId }, data: input });
}

export async function deleteGalleryItem(tenantId: string, itemId: string) {
  const item = await prisma.galleryItem.findFirst({ where: { id: itemId, tenantId } });
  if (!item) throw new Error('Foto tidak ditemukan');
  return prisma.galleryItem.delete({ where: { id: itemId } });
}
