'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import type { PublicInvitation } from '@repo/types';
import { getPublicInvitation } from '@/features/public-invitation/public-invitation.api';
import { CoverSection } from '@/features/public-invitation/sections/CoverSection';
import { HeroSection } from '@/features/public-invitation/sections/HeroSection';
import { BrideGroomSection } from '@/features/public-invitation/sections/BrideGroomSection';
import { LoveStorySection } from '@/features/public-invitation/sections/LoveStorySection';
import { EventSection } from '@/features/public-invitation/sections/EventSection';
import { LocationSection } from '@/features/public-invitation/sections/LocationSection';
import { GallerySection } from '@/features/public-invitation/sections/GallerySection';
import { GiftSection } from '@/features/public-invitation/sections/GiftSection';
import { RsvpSection } from '@/features/public-invitation/sections/RsvpSection';
import { WishesSection } from '@/features/public-invitation/sections/WishesSection';

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
      <HeroSection
        brideName={data.brideGroom?.brideName}
        groomName={data.brideGroom?.groomName}
        weddingDate={data.events[0]?.date}
      />
      <BrideGroomSection data={data.brideGroom} />
      <LoveStorySection items={data.loveStory} />
      <EventSection events={data.events} />
      <LocationSection events={data.events} />
      <GallerySection items={data.gallery} />
      <GiftSection accounts={data.giftAccounts} />
      <RsvpSection
        tenantSlug={data.tenantSlug}
        guestSlug={data.guest?.slug}
        guestName={data.guest?.name}
        initialRsvp={data.rsvp}
      />
      <WishesSection
        tenantSlug={data.tenantSlug}
        defaultName={data.guest?.name}
        initialWishes={data.wishes}
      />
    </div>
  );
}
