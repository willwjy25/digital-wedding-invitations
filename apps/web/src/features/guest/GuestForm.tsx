'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createGuestSchema, type CreateGuestInput, type Guest } from '@repo/types';

interface GuestFormProps {
  initialData?: Guest;
  onSubmit: (data: CreateGuestInput) => Promise<void>;
  onCancel: () => void;
}

export function GuestForm({ initialData, onSubmit, onCancel }: GuestFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateGuestInput>({
    resolver: zodResolver(createGuestSchema),
    defaultValues: initialData
      ? { name: initialData.name, phone: initialData.phone ?? '' }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded border p-4">
      <div>
        <input
          {...register('name')}
          placeholder="Nama tamu"
          className="w-full rounded border p-2"
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <input
        {...register('phone')}
        placeholder="Nomor HP (opsional)"
        className="w-full rounded border p-2"
      />

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
