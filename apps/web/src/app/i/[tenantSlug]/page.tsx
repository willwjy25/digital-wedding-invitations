'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import type { PublicInvitation } from '@repo/types';
import { getPublicInvitation } from '@/features/public-invitation/public-invitation.api';
import { CoverSection } from '@/features/public-invitation/sections/CoverSection';

export default function InvitationPage() {
  const params = useParams<{ tenantSlug: string }>();
  const searchParams = useSearchParams();
  const guestSlug = searchParams.get('to') ?? undefined;

  const [data, setData] = useState<PublicInvitation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getPublicInvitation(params.tenantSlug, guestSlug);
        setData(result);
      } catch {
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    }
     
    loadData();
  }, [params.tenantSlug, guestSlug]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Memuat undangan...
      </div>
    );
  }

  if (notFound || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Undangan tidak ditemukan.
      </div>
    );
  }

  if (!isOpened) {
    return (
      <CoverSection
        brideName={data.brideGroom?.brideName}
        groomName={data.brideGroom?.groomName}
        guestName={data.guest?.name}
        onOpen={() => setIsOpened(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero, Bride & Groom, dan section lainnya akan ditambahkan bertahap */}
      <div className="p-8 text-center">
        <p>Undangan terbuka! Section berikutnya akan kita bangun bertahap.</p>
      </div>
    </div>
  );
}
