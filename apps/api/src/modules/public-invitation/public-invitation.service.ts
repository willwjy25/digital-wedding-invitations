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
      rsvps: {
        include: { guest: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!tenant) {
    throw new Error('Undangan tidak ditemukan');
  }

  let guest = null;
  let rsvp = null;

  if (guestSlug) {
    guest = await prisma.guest.findUnique({
      where: { tenantId_slug: { tenantId: tenant.id, slug: guestSlug } },
      select: { id: true, name: true, slug: true },
    });

    if (guest) {
      rsvp = await prisma.rSVP.findUnique({ where: { guestId: guest.id } });
    }
  }

  const rsvpList = tenant.rsvps.map((entry) => ({
    id: entry.id,
    guestName: entry.guest.name,
    attending: entry.attending,
    guestCount: entry.guestCount,
    message: entry.message,
  }));

  return {
    tenantSlug: tenant.slug,
    brideGroom: tenant.brideGroom,
    events: tenant.events,
    loveStory: tenant.loveStory,
    gallery: tenant.gallery,
    giftAccounts: tenant.giftAccounts,
    guest,
    rsvp,
    rsvpList,
  };
}
