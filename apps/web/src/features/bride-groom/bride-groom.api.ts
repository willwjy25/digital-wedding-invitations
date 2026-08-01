import { apiClient } from '@/lib/api-client';
import type { BrideGroom, UpsertBrideGroomInput } from '@repo/types';

export async function getBrideGroom(): Promise<BrideGroom | null> {
  const { data } = await apiClient.get<BrideGroom | null>('/api/bride-groom');
  return data;
}

export async function upsertBrideGroom(input: UpsertBrideGroomInput): Promise<BrideGroom> {
  const { data } = await apiClient.put<BrideGroom>('/api/bride-groom', input);
  return data;
}
