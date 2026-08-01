import { apiClient } from '@/lib/api-client';
import type {
  LoveStoryItem,
  CreateLoveStoryItemInput,
  UpdateLoveStoryItemInput,
} from '@repo/types';

export async function getLoveStoryItems(): Promise<LoveStoryItem[]> {
  const { data } = await apiClient.get<LoveStoryItem[]>('/api/love-story');
  return data;
}

export async function createLoveStoryItem(input: CreateLoveStoryItemInput): Promise<LoveStoryItem> {
  const { data } = await apiClient.post<LoveStoryItem>('/api/love-story', input);
  return data;
}

export async function updateLoveStoryItem(
  id: string,
  input: UpdateLoveStoryItemInput
): Promise<LoveStoryItem> {
  const { data } = await apiClient.put<LoveStoryItem>(`/api/love-story/${id}`, input);
  return data;
}

export async function deleteLoveStoryItem(id: string): Promise<void> {
  await apiClient.delete(`/api/love-story/${id}`);
}
