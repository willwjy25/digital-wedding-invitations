import { apiClient } from '@/lib/api-client';

interface VerifyCheckInResult {
  alreadyCheckedIn: boolean;
  guestName: string;
  checkedAt: string;
}

export async function verifyCheckIn(qrCode: string): Promise<VerifyCheckInResult> {
  const { data } = await apiClient.post<VerifyCheckInResult>('/api/checkin/verify', { qrCode });
  return data;
}
