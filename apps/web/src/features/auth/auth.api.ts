import { apiClient } from '@/lib/api-client';
import type { RegisterAdminInput, LoginInput } from '@repo/types';

interface AuthResponse {
  token: string;
  admin: { id: string; name: string; email: string };
  tenant: { id: string; slug: string };
}

export async function registerAdmin(input: RegisterAdminInput): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/api/auth/register', input);
  return data;
}

export async function loginAdmin(input: LoginInput): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/api/auth/login', input);
  return data;
}
