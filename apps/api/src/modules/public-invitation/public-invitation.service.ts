import { prisma } from '../../config/prisma';

export async function getPublicInvitation(tenantSlug: string, guestSlug?: string) {
  const tenant = await prisma.tenant.findUnique({
    where: { slug: tenantSlug },
    include: {
      brideGroom: true,
      events: { orderBy: { date: 'asc' } },
      loveStory: { orderBy: { order: 'asc' } },
      gallery: { orderBy: { order: 'asc' } },
      giftAccounts: true,
    },
  });

  if (!tenant) {
    throw new Error('Undangan tidak ditemukan');
  }

  let guest = null;
  if (guestSlug) {
    guest = await prisma.guest.findUnique({
      where: { tenantId_slug: { tenantId: tenant.id, slug: guestSlug } },
      select: { id: true, name: true, slug: true },
    });
  }

  return {
    tenantSlug: tenant.slug,
    brideGroom: tenant.brideGroom,
    events: tenant.events,
    loveStory: tenant.loveStory,
    gallery: tenant.gallery,
    giftAccounts: tenant.giftAccounts,
    guest,
  };
}
