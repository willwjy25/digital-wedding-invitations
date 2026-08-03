import { apiClient } from '@/lib/api-client';
import type { GalleryItem, CreateGalleryItemInput, UpdateGalleryItemInput } from '@repo/types';

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const { data } = await apiClient.get<GalleryItem[]>('/api/gallery');
  return data;
}

export async function createGalleryItem(input: CreateGalleryItemInput): Promise<GalleryItem> {
  const { data } = await apiClient.post<GalleryItem>('/api/gallery', input);
  return data;
}

export async function updateGalleryItem(
  id: string,
  input: UpdateGalleryItemInput
): Promise<GalleryItem> {
  const { data } = await apiClient.put<GalleryItem>(`/api/gallery/${id}`, input);
  return data;
}

export async function deleteGalleryItem(id: string): Promise<void> {
  await apiClient.delete(`/api/gallery/${id}`);
}
