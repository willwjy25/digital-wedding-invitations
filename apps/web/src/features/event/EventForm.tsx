'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createEventSchema, type CreateEventInput, type Event } from '@repo/types';

interface EventFormProps {
  initialData?: Event;
  onSubmit: (data: CreateEventInput) => Promise<void>;
  onCancel: () => void;
}

export function EventForm({ initialData, onSubmit, onCancel }: EventFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateEventInput>({
    resolver: zodResolver(createEventSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          date: initialData.date,
          startTime: initialData.startTime,
          endTime: initialData.endTime ?? '',
          location: initialData.location,
          mapsUrl: initialData.mapsUrl ?? '',
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded border p-4">
      <div>
        <input
          {...register('title')}
          placeholder="Judul acara (contoh: Akad Nikah)"
          className="w-full rounded border p-2"
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <input type="date" {...register('date')} className="w-full rounded border p-2" />
        {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <input type="time" {...register('startTime')} className="w-full rounded border p-2" />
          {errors.startTime && <p className="text-sm text-red-500">{errors.startTime.message}</p>}
        </div>
        <div className="flex-1">
          <input type="time" {...register('endTime')} className="w-full rounded border p-2" />
        </div>
      </div>

      <div>
        <input
          {...register('location')}
          placeholder="Lokasi"
          className="w-full rounded border p-2"
        />
        {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
      </div>

      <input
        {...register('mapsUrl')}
        placeholder="Link Google Maps (opsional)"
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
