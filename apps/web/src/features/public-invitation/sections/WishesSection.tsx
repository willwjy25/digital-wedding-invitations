'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Wish } from '@repo/types';
import { submitWish } from '@/features/wish/wish.api';

const wishFormSchema = z.object({
  name: z.string().min(2, 'Nama wajib diisi'),
  message: z.string().min(2, 'Ucapan wajib diisi').max(500, 'Ucapan maksimal 500 karakter'),
});
type WishFormInput = z.infer<typeof wishFormSchema>;

interface WishesSectionProps {
  tenantSlug: string;
  defaultName?: string;
  initialWishes: Wish[];
}

export function WishesSection({ tenantSlug, defaultName, initialWishes }: WishesSectionProps) {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WishFormInput>({
    resolver: zodResolver(wishFormSchema),
    defaultValues: { name: defaultName ?? '' },
  });

  async function onSubmit(data: WishFormInput) {
    const result = await submitWish({ ...data, tenantSlug });
    setWishes((prev) => [result, ...prev]);
    reset({ name: data.name, message: '' });
  }

  return (
    <div className="bg-rose-50 p-8 py-16">
      <h2 className="mb-4 text-center font-serif text-2xl text-gray-800">Ucapan & Doa</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-10 max-w-sm space-y-3">
        <div>
          <input
            {...register('name')}
            placeholder="Nama Anda"
            className="w-full rounded border bg-white p-2 text-gray-800"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <textarea
            {...register('message')}
            placeholder="Tulis ucapan dan doa Anda..."
            rows={3}
            className="w-full rounded border bg-white p-2 text-gray-800"
          />
          {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-gray-800 px-6 py-3 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
        </button>
      </form>

      {wishes.length > 0 && (
        <div className="mx-auto max-w-sm">
          <div className="max-h-72 space-y-3 overflow-y-auto rounded-lg bg-white p-4">
            {wishes.map((wish) => (
              <div key={wish.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                <p className="text-sm font-medium text-gray-800">{wish.name}</p>
                <p className="mt-1 text-sm text-gray-600">{wish.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
