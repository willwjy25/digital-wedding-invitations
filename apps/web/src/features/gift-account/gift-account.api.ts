import { apiClient } from '@/lib/api-client';
import type { GiftAccount, CreateGiftAccountInput, UpdateGiftAccountInput } from '@repo/types';

export async function getGiftAccounts(): Promise<GiftAccount[]> {
  const { data } = await apiClient.get<GiftAccount[]>('/api/gift-accounts');
  return data;
}

export async function createGiftAccount(input: CreateGiftAccountInput): Promise<GiftAccount> {
  const { data } = await apiClient.post<GiftAccount>('/api/gift-accounts', input);
  return data;
}

export async function updateGiftAccount(
  id: string,
  input: UpdateGiftAccountInput
): Promise<GiftAccount> {
  const { data } = await apiClient.put<GiftAccount>(`/api/gift-accounts/${id}`, input);
  return data;
}

export async function deleteGiftAccount(id: string): Promise<void> {
  await apiClient.delete(`/api/gift-accounts/${id}`);
}
