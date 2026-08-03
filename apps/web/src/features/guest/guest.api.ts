import { apiClient } from '@/lib/api-client';
import type { Guest, CreateGuestInput, UpdateGuestInput } from '@repo/types';

export async function getGuests(): Promise<Guest[]> {
  const { data } = await apiClient.get<Guest[]>('/api/guests');
  return data;
}

export async function createGuest(input: CreateGuestInput): Promise<Guest> {
  const { data } = await apiClient.post<Guest>('/api/guests', input);
  return data;
}

export async function updateGuest(id: string, input: UpdateGuestInput): Promise<Guest> {
  const { data } = await apiClient.put<Guest>(`/api/guests/${id}`, input);
  return data;
}

export async function deleteGuest(id: string): Promise<void> {
  await apiClient.delete(`/api/guests/${id}`);
}
