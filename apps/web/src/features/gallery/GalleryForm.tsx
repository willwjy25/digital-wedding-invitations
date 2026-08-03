'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createGalleryItemSchema,
  type CreateGalleryItemInput,
  type GalleryItem,
} from '@repo/types';

interface GalleryFormProps {
  initialData?: GalleryItem;
  onSubmit: (data: CreateGalleryItemInput) => Promise<void>;
  onCancel: () => void;
}

export function GalleryForm({ initialData, onSubmit, onCancel }: GalleryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateGalleryItemInput>({
    resolver: zodResolver(createGalleryItemSchema),
    defaultValues: initialData
      ? {
          imageUrl: initialData.imageUrl,
          caption: initialData.caption ?? '',
          order: initialData.order,
        }
      : { order: 0 },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded border p-4">
      <div>
        <input
          {...register('imageUrl')}
          placeholder="URL foto (contoh: https://...)"
          className="w-full rounded border p-2"
        />
        {errors.imageUrl && <p className="text-sm text-red-500">{errors.imageUrl.message}</p>}
      </div>

      <input
        {...register('caption')}
        placeholder="Keterangan foto (opsional)"
        className="w-full rounded border p-2"
      />

      <div>
        <label className="mb-1 block text-sm text-gray-600">Urutan tampil</label>
        <input
          type="number"
          {...register('order', { valueAsNumber: true })}
          className="w-full rounded border p-2"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {isSubmitting ? 'Menyimpan...' : 'Simpan'}
        </button>
        <button type="button" onClick={onCancel} className="rounded border px-4 py-2">
          Batal
        </button>
      </div>
    </form>
  );
}
