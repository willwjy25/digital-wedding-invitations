'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { RSVP } from '@repo/types';
import { z } from 'zod';
import { submitRsvp } from '@/features/rsvp/rsvp.api';

// Schema khusus form, didefinisikan eksplisit (tanpa .default()) supaya tipe input/output konsisten
const rsvpFormSchema = z.object({
  attending: z.boolean(),
  guestCount: z.number().int().min(1),
  message: z.string().optional(),
});
type RsvpFormInput = z.infer<typeof rsvpFormSchema>;

interface RsvpSectionProps {
  tenantSlug: string;
  guestSlug?: string;
  guestName?: string;
  initialRsvp: RSVP | null;
}

export function RsvpSection({ tenantSlug, guestSlug, guestName, initialRsvp }: RsvpSectionProps) {
  const [rsvp, setRsvp] = useState<RSVP | null>(initialRsvp);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RsvpFormInput>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: { attending: true, guestCount: 1 },
  });

  // Kalau tidak ada guestSlug (link umum tanpa personalisasi), RSVP tidak bisa dipakai
  if (!guestSlug) return null;

  async function onSubmit(data: RsvpFormInput) {
    const result = await submitRsvp({ ...data, tenantSlug, guestSlug: guestSlug as string });
    setRsvp(result);
  }

  return (
    <div className="bg-white p-8 py-16">
      <h2 className="mb-4 text-center font-serif text-2xl text-gray-800">RSVP</h2>

      {rsvp ? (
        <div className="mx-auto max-w-sm rounded-lg border p-6 text-center">
          <p className="mb-2 text-gray-700">
            Terima kasih, <strong>{guestName}</strong>!
          </p>
          <p className="text-gray-600">
            Anda telah konfirmasi{' '}
            <strong>{rsvp.attending ? 'akan hadir' : 'tidak dapat hadir'}</strong>
            {rsvp.attending && ` (${rsvp.guestCount} orang)`}.
          </p>
          {rsvp.message && (
            <p className="mt-2 text-sm text-gray-500 italic">&ldquo;{rsvp.message}&rdquo;</p>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-sm space-y-4">
          <div>
            <label className="mb-2 block text-sm text-gray-600">Konfirmasi Kehadiran</label>
            <div className="flex gap-4 text-gray-800">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="true"
                  defaultChecked
                  {...register('attending', { setValueAs: (v) => v === 'true' || v === true })}
                />
                Hadir
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="false"
                  {...register('attending', { setValueAs: (v) => v === 'true' || v === true })}
                />
                Tidak Hadir
              </label>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-600">Jumlah Tamu</label>
            <input
              type="number"
              min={1}
              {...register('guestCount', { valueAsNumber: true })}
              className="w-full rounded border p-2 text-gray-800"
            />
            {errors.guestCount && (
              <p className="text-sm text-red-500">{errors.guestCount.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-600">Ucapan (opsional)</label>
            <textarea
              {...register('message')}
              rows={3}
              className="w-full rounded border p-2 text-gray-800"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-gray-800 px-6 py-3 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}
          </button>
        </form>
      )}
    </div>
  );
}
