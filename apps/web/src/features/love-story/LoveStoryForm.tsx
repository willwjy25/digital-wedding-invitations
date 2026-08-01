'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createLoveStoryItemSchema,
  type CreateLoveStoryItemInput,
  type LoveStoryItem,
} from '@repo/types';

interface LoveStoryFormProps {
  initialData?: LoveStoryItem;
  onSubmit: (data: CreateLoveStoryItemInput) => Promise<void>;
  onCancel: () => void;
}

export function LoveStoryForm({ initialData, onSubmit, onCancel }: LoveStoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateLoveStoryItemInput>({
    resolver: zodResolver(createLoveStoryItemSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          date: initialData.date,
          imageUrl: initialData.imageUrl ?? '',
          order: initialData.order,
        }
      : { order: 0 },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded border p-4">
      <div>
        <input
          {...register('title')}
          placeholder="Judul (contoh: Pertama Bertemu)"
          className="w-full rounded border p-2"
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <textarea
          {...register('description')}
          placeholder="Ceritakan momennya..."
          rows={3}
          className="w-full rounded border p-2"
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div>
        <input type="date" {...register('date')} className="w-full rounded border p-2" />
      </div>

      <input
        {...register('imageUrl')}
        placeholder="URL foto (opsional)"
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
