import { apiClient } from '@/lib/api-client';
import type { Event, CreateEventInput, UpdateEventInput } from '@repo/types';

export async function getEvents(): Promise<Event[]> {
  const { data } = await apiClient.get<Event[]>('/api/events');
  return data;
}

export async function createEvent(input: CreateEventInput): Promise<Event> {
  const { data } = await apiClient.post<Event>('/api/events', input);
  return data;
}

export async function updateEvent(id: string, input: UpdateEventInput): Promise<Event> {
  const { data } = await apiClient.put<Event>(`/api/events/${id}`, input);
  return data;
}

export async function deleteEvent(id: string): Promise<void> {
  await apiClient.delete(`/api/events/${id}`);
}
