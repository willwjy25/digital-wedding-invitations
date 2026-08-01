'use client';

import { useEffect, useState } from 'react';
import type { LoveStoryItem, CreateLoveStoryItemInput } from '@repo/types';
import {
  getLoveStoryItems,
  createLoveStoryItem,
  updateLoveStoryItem,
  deleteLoveStoryItem,
} from '@/features/love-story/love-story.api';
import { LoveStoryForm } from '@/features/love-story/LoveStoryForm';

export default function LoveStoryPage() {
  const [items, setItems] = useState<LoveStoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function loadItems() {
    setIsLoading(true);
    const data = await getLoveStoryItems();
    setItems(data);
    setIsLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data fetching saat mount, pola aman
    loadItems();
  }, []);

  async function handleCreate(data: CreateLoveStoryItemInput) {
    await createLoveStoryItem(data);
    setShowAddForm(false);
    await loadItems();
  }

  async function handleUpdate(id: string, data: CreateLoveStoryItemInput) {
    await updateLoveStoryItem(id, data);
    setEditingId(null);
    await loadItems();
  }

  async function handleDelete(id: string) {
    if (!confirm('Yakin ingin menghapus momen ini?')) return;
    await deleteLoveStoryItem(id);
    await loadItems();
  }

  if (isLoading) {
    return <div className="p-8">Memuat data...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kelola Love Story</h1>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="rounded bg-black px-4 py-2 text-white"
          >
            + Tambah Momen
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="mb-6">
          <LoveStoryForm onSubmit={handleCreate} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      <div className="space-y-4">
        {items.length === 0 && <p className="text-gray-500">Belum ada momen cerita ditambahkan.</p>}

        {items.map((item) =>
          editingId === item.id ? (
            <LoveStoryForm
              key={item.id}
              initialData={item}
              onSubmit={(data) => handleUpdate(item.id, data)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div key={item.id} className="flex items-start justify-between rounded border p-4">
              <div>
                <p className="font-semibold">
                  {item.order}. {item.title}
                </p>
                {item.date && (
                  <p className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString('id-ID')}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-700">{item.description}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => setEditingId(item.id)}
                  className="rounded border px-3 py-1 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
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
