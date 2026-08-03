'use client';

import { BackButton } from '@/components/BackButton';
import { useEffect, useState } from 'react';
import type { GiftAccount, CreateGiftAccountInput } from '@repo/types';
import {
  getGiftAccounts,
  createGiftAccount,
  updateGiftAccount,
  deleteGiftAccount,
} from '@/features/gift-account/gift-account.api';
import { GiftAccountForm } from '@/features/gift-account/GiftAccountForm';

export default function GiftAccountPage() {
  const [accounts, setAccounts] = useState<GiftAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function loadAccounts() {
    setIsLoading(true);
    const data = await getGiftAccounts();
    setAccounts(data);
    setIsLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data fetching saat mount, pola aman
    loadAccounts();
  }, []);

  async function handleCreate(data: CreateGiftAccountInput) {
    await createGiftAccount(data);
    setShowAddForm(false);
    await loadAccounts();
  }

  async function handleUpdate(id: string, data: CreateGiftAccountInput) {
    await updateGiftAccount(id, data);
    setEditingId(null);
    await loadAccounts();
  }

  async function handleDelete(id: string) {
    if (!confirm('Yakin ingin menghapus rekening ini?')) return;
    await deleteGiftAccount(id);
    await loadAccounts();
  }

  if (isLoading) {
    return <div className="p-8">Memuat data...</div>;
  }

  return (
    <div className="p-8">
      <BackButton />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kelola Wedding Gift</h1>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="rounded bg-black px-4 py-2 text-white"
          >
            + Tambah Rekening
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="mb-6 max-w-md">
          <GiftAccountForm onSubmit={handleCreate} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      <div className="space-y-4">
        {accounts.length === 0 && <p className="text-gray-500">Belum ada rekening ditambahkan.</p>}

        {accounts.map((account) =>
          editingId === account.id ? (
            <div key={account.id} className="max-w-md">
              <GiftAccountForm
                initialData={account}
                onSubmit={(data) => handleUpdate(account.id, data)}
                onCancel={() => setEditingId(null)}
              />
            </div>
          ) : (
            <div key={account.id} className="flex items-center justify-between rounded border p-4">
              <div>
                <p className="font-semibold">{account.bankName}</p>
                <p className="text-sm text-gray-700">{account.accountNumber}</p>
                <p className="text-sm text-gray-500">a.n. {account.accountName}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingId(account.id)}
                  className="rounded border px-3 py-1 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(account.id)}
                  className="rounded border border-red-300 px-3 py-1 text-sm text-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
