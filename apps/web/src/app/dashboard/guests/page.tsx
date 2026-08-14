'use client';

import { useEffect, useState } from 'react';
import type { Guest, CreateGuestInput } from '@repo/types';
import { getGuests, createGuest, updateGuest, deleteGuest } from '@/features/guest/guest.api';
import { GuestForm } from '@/features/guest/GuestForm';
import { CopyLinkButton } from '@/features/guest/CopyLinkButton';
import { GuestQrCode } from '@/features/guest/GuestQrCode';
import { BackButton } from '@/components/BackButton';

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [qrGuestId, setQrGuestId] = useState<string | null>(null);

  async function loadGuests() {
    setIsLoading(true);
    const data = await getGuests();
    setGuests(data);
    setIsLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data fetching saat mount, pola aman
    loadGuests();
  }, []);

  async function handleCreate(data: CreateGuestInput) {
    await createGuest(data);
    setShowAddForm(false);
    await loadGuests();
  }

  async function handleUpdate(id: string, data: CreateGuestInput) {
    await updateGuest(id, data);
    setEditingId(null);
    await loadGuests();
  }

  async function handleDelete(id: string) {
    if (!confirm('Yakin ingin menghapus tamu ini?')) return;
    await deleteGuest(id);
    await loadGuests();
  }

  if (isLoading) {
    return <div className="p-8">Memuat data...</div>;
  }

  return (
    <div className="p-8">
      <BackButton />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kelola Tamu</h1>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="rounded bg-black px-4 py-2 text-white"
          >
            + Tambah Tamu
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="mb-6 max-w-md">
          <GuestForm onSubmit={handleCreate} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      {guests.length === 0 ? (
        <p className="text-gray-500">Belum ada tamu ditambahkan.</p>
      ) : (
        <div className="overflow-x-auto rounded border">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3">Nama</th>
                <th className="p-3">No. HP</th>
                <th className="p-3">Link Undangan</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest) => (
                <tr key={guest.id} className="border-t">
                  {editingId === guest.id ? (
                    <td colSpan={4} className="p-3">
                      <GuestForm
                        initialData={guest}
                        onSubmit={(data) => handleUpdate(guest.id, data)}
                        onCancel={() => setEditingId(null)}
                      />
                    </td>
                  ) : (
                    <>
                      <td className="p-3">{guest.name}</td>
                      <td className="p-3">{guest.phone || '-'}</td>
                      <td className="p-3">
                        <CopyLinkButton slug={guest.slug} />
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          {guest.checkIn && (
                            <button
                              onClick={() => setQrGuestId(guest.id)}
                              className="rounded border px-3 py-1 text-xs"
                            >
                              {guest.checkIn.checkedAt ? '✓ Hadir' : 'Lihat QR'}
                            </button>
                          )}
                          <button
                            onClick={() => setEditingId(guest.id)}
                            className="rounded border px-3 py-1 text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(guest.id)}
                            className="rounded border border-red-300 px-3 py-1 text-xs text-red-600"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {qrGuestId &&
        (() => {
          const guest = guests.find((g) => g.id === qrGuestId);
          if (!guest?.checkIn) return null;
          return (
            <GuestQrCode
              guestName={guest.name}
              qrCode={guest.checkIn.qrCode}
              onClose={() => setQrGuestId(null)}
            />
          );
        })()}
    </div>
  );
}
