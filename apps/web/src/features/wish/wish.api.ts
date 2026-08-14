import { apiClient } from '@/lib/api-client';
import type { Wish, SubmitWishInput } from '@repo/types';

export async function submitWish(input: SubmitWishInput): Promise<Wish> {
  const { data } = await apiClient.post<Wish>('/api/wishes', input);
  return data;
}
