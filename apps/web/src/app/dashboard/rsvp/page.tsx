'use client';

import { useEffect, useState } from 'react';
import type { RsvpSummary } from '@repo/types';
import { getRsvpSummary } from '@/features/rsvp/rsvp.api';
import { BackButton } from '@/components/BackButton';

export default function RsvpOverviewPage() {
  const [summary, setSummary] = useState<RsvpSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loadSummary() {
    setIsLoading(true);
    const data = await getRsvpSummary();
    setSummary(data);
    setIsLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data fetching saat mount, pola aman
    loadSummary();
  }, []);

  if (isLoading || !summary) {
    return <div className="p-8">Memuat data...</div>;
  }

  return (
    <div className="p-8">
      <BackButton />
      <h1 className="mb-6 text-2xl font-bold">RSVP Tamu</h1>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded border p-4 text-center">
          <p className="text-2xl font-bold text-gray-800">{summary.totalConfirmed}</p>
          <p className="text-xs text-gray-500">Total Konfirmasi</p>
        </div>
        <div className="rounded border p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{summary.totalAttending}</p>
          <p className="text-xs text-gray-500">Akan Hadir</p>
        </div>
        <div className="rounded border p-4 text-center">
          <p className="text-2xl font-bold text-gray-400">{summary.totalNotAttending}</p>
          <p className="text-xs text-gray-500">Tidak Hadir</p>
        </div>
        <div className="rounded border p-4 text-center">
          <p className="text-2xl font-bold text-gray-800">{summary.totalGuestCount}</p>
          <p className="text-xs text-gray-500">Total Orang Hadir</p>
        </div>
      </div>

      {summary.entries.length === 0 ? (
        <p className="text-gray-500">Belum ada tamu yang konfirmasi RSVP.</p>
      ) : (
        <div className="max-h-[32rem] overflow-y-auto rounded border">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-gray-50">
              <tr>
                <th className="p-3">Nama</th>
                <th className="p-3">No. HP</th>
                <th className="p-3">Status</th>
                <th className="p-3">Jumlah</th>
                <th className="p-3">Ucapan</th>
              </tr>
            </thead>
            <tbody>
              {summary.entries.map((entry) => (
                <tr key={entry.id} className="border-t">
                  <td className="p-3">{entry.guest.name}</td>
                  <td className="p-3">{entry.guest.phone || '-'}</td>
                  <td className="p-3">
                    <span className={entry.attending ? 'text-green-600' : 'text-gray-400'}>
                      {entry.attending ? 'Hadir' : 'Tidak Hadir'}
                    </span>
                  </td>
                  <td className="p-3">{entry.attending ? entry.guestCount : '-'}</td>
                  <td className="p-3 text-gray-500 italic">
                    {entry.message ? `"${entry.message}"` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
