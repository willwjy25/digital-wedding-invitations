import { prisma } from '../../config/prisma';

export async function verifyCheckIn(tenantId: string, qrCode: string) {
  const checkIn = await prisma.checkIn.findUnique({
    where: { qrCode },
    include: { guest: true },
  });

  if (!checkIn) {
    throw new Error('Kode QR tidak valid');
  }

  // Pastikan tamu ini benar milik tenant yang sedang login (isolasi multi-tenant)
  if (checkIn.guest.tenantId !== tenantId) {
    throw new Error('Kode QR tidak valid untuk acara ini');
  }

  if (checkIn.checkedAt) {
    return {
      alreadyCheckedIn: true,
      guestName: checkIn.guest.name,
      checkedAt: checkIn.checkedAt,
    };
  }

  const updated = await prisma.checkIn.update({
    where: { id: checkIn.id },
    data: { checkedAt: new Date() },
  });

  return {
    alreadyCheckedIn: false,
    guestName: checkIn.guest.name,
    checkedAt: updated.checkedAt,
  };
}
