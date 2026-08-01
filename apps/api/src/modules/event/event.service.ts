import { prisma } from '../../config/prisma';
import type { CreateEventInput, UpdateEventInput } from '@repo/types';

export async function getEvents(tenantId: string) {
  return prisma.event.findMany({
    where: { tenantId },
    orderBy: { date: 'asc' },
  });
}

export async function createEvent(tenantId: string, input: CreateEventInput) {
  return prisma.event.create({ data: { ...input, tenantId } });
}

export async function updateEvent(tenantId: string, eventId: string, input: UpdateEventInput) {
  // Pastikan event ini benar milik tenant yang sedang login
  const event = await prisma.event.findFirst({ where: { id: eventId, tenantId } });
  if (!event) {
    throw new Error('Acara tidak ditemukan');
  }
  return prisma.event.update({ where: { id: eventId }, data: input });
}

export async function deleteEvent(tenantId: string, eventId: string) {
  const event = await prisma.event.findFirst({ where: { id: eventId, tenantId } });
  if (!event) {
    throw new Error('Acara tidak ditemukan');
  }
  return prisma.event.delete({ where: { id: eventId } });
}
