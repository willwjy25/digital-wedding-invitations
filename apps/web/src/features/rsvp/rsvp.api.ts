import { apiClient } from '@/lib/api-client';
import type { RSVP, SubmitRsvpInput, RsvpSummary } from '@repo/types';

export async function submitRsvp(input: SubmitRsvpInput): Promise<RSVP> {
  const { data } = await apiClient.post<RSVP>('/api/rsvp', input);
  return data;
}

export async function getRsvpSummary(): Promise<RsvpSummary> {
  const { data } = await apiClient.get<RsvpSummary>('/api/rsvp/summary');
  return data;
}
