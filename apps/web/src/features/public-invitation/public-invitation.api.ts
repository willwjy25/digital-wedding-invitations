import { apiClient } from '@/lib/api-client';
import type { PublicInvitation } from '@repo/types';

export async function getPublicInvitation(
  tenantSlug: string,
  guestSlug?: string
): Promise<PublicInvitation> {
  const { data } = await apiClient.get<PublicInvitation>(`/api/public/${tenantSlug}`, {
    params: guestSlug ? { to: guestSlug } : undefined,
  });
  return data;
}
