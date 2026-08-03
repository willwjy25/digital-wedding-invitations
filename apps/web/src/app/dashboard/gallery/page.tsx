'use client';

import { BackButton } from '@/components/BackButton';
import { useEffect, useState } from 'react';
import type { GalleryItem, CreateGalleryItemInput } from '@repo/types';
import {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '@/features/gallery/gallery.api';
import { GalleryForm } from '@/features/gallery/GalleryForm';

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function loadItems() {
    setIsLoading(true);
    const data = await getGalleryItems();
    setItems(data);
    setIsLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data fetching saat mount, pola aman
    loadItems();
  }, []);

  async function handleCreate(data: CreateGalleryItemInput) {
    await createGalleryItem(data);
    setShowAddForm(false);
    await loadItems();
  }

  async function handleUpdate(id: string, data: CreateGalleryItemInput) {
    await updateGalleryItem(id, data);
    setEditingId(null);
    await loadItems();
  }

  async function handleDelete(id: string) {
    if (!confirm('Yakin ingin menghapus foto ini?')) return;
    await deleteGalleryItem(id);
    await loadItems();
  }

  if (isLoading) {
    return <div className="p-8">Memuat data...</div>;
  }

  return (
    <div className="p-8">
      <BackButton />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kelola Galeri</h1>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="rounded bg-black px-4 py-2 text-white"
          >
            + Tambah Foto
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="mb-6 max-w-md">
          <GalleryForm onSubmit={handleCreate} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      {items.length === 0 && <p className="text-gray-500">Belum ada foto ditambahkan.</p>}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {items.map((item) =>
          editingId === item.id ? (
            <div key={item.id} className="col-span-2">
              <GalleryForm
                initialData={item}
                onSubmit={(data) => handleUpdate(item.id, data)}
                onCancel={() => setEditingId(null)}
              />
            </div>
          ) : (
            <div key={item.id} className="overflow-hidden rounded border">
              {/* eslint-disable-next-line @next/next/no-img-element -- URL foto eksternal dinamis */}
              <img
                src={item.imageUrl}
                alt={item.caption ?? 'Foto galeri'}
                className="h-32 w-full object-cover"
              />
              <div className="p-2">
                {item.caption && <p className="truncate text-sm">{item.caption}</p>}
                <p className="text-xs text-gray-400">Urutan: {item.order}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => setEditingId(item.id)}
                    className="flex-1 rounded border px-2 py-1 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 rounded border border-red-300 px-2 py-1 text-xs text-red-600"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
