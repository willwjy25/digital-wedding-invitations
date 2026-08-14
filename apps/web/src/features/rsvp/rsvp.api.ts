import { apiClient } from '@/lib/api-client';
import type { RSVP, SubmitRsvpInput } from '@repo/types';

export async function submitRsvp(input: SubmitRsvpInput): Promise<RSVP> {
  const { data } = await apiClient.post<RSVP>('/api/rsvp', input);
  return data;
}
