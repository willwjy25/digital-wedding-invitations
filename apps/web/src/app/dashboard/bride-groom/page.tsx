'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { upsertBrideGroomSchema, type UpsertBrideGroomInput } from '@repo/types';
import { getBrideGroom, upsertBrideGroom } from '@/features/bride-groom/bride-groom.api';

export default function BrideGroomPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpsertBrideGroomInput>({
    resolver: zodResolver(upsertBrideGroomSchema),
  });

  useEffect(() => {
    async function loadData() {
      const data = await getBrideGroom();
      if (data) {
        reset({
          brideName: data.brideName,
          brideParents: data.brideParents ?? '',
          bridePhotoUrl: data.bridePhotoUrl ?? '',
          groomName: data.groomName,
          groomParents: data.groomParents ?? '',
          groomPhotoUrl: data.groomPhotoUrl ?? '',
        });
      }
      setIsLoading(false);
    }
    loadData();
  }, [reset]);

  async function onSubmit(data: UpsertBrideGroomInput) {
    setSuccessMessage(null);
    await upsertBrideGroom(data);
    setSuccessMessage('Data berhasil disimpan');
  }

  if (isLoading) {
    return <div className="p-8">Memuat data...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Data Mempelai</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-6">
        <div className="space-y-3">
          <h2 className="font-semibold">Mempelai Wanita</h2>
          <div>
            <input
              {...register('brideName')}
              placeholder="Nama lengkap"
              className="w-full rounded border p-2"
            />
            {errors.brideName && <p className="text-sm text-red-500">{errors.brideName.message}</p>}
          </div>
          <input
            {...register('brideParents')}
            placeholder="Putri dari... (opsional)"
            className="w-full rounded border p-2"
          />
          <input
            {...register('bridePhotoUrl')}
            placeholder="URL foto (opsional)"
            className="w-full rounded border p-2"
          />
        </div>

        <div className="space-y-3">
          <h2 className="font-semibold">Mempelai Pria</h2>
          <div>
            <input
              {...register('groomName')}
              placeholder="Nama lengkap"
              className="w-full rounded border p-2"
            />
            {errors.groomName && <p className="text-sm text-red-500">{errors.groomName.message}</p>}
          </div>
          <input
            {...register('groomParents')}
            placeholder="Putra dari... (opsional)"
            className="w-full rounded border p-2"
          />
          <input
            {...register('groomPhotoUrl')}
            placeholder="URL foto (opsional)"
            className="w-full rounded border p-2"
          />
        </div>

        {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {isSubmitting ? 'Menyimpan...' : 'Simpan'}
        </button>
      </form>
    </div>
  );
}
