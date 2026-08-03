'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createGiftAccountSchema,
  type CreateGiftAccountInput,
  type GiftAccount,
} from '@repo/types';

interface GiftAccountFormProps {
  initialData?: GiftAccount;
  onSubmit: (data: CreateGiftAccountInput) => Promise<void>;
  onCancel: () => void;
}

export function GiftAccountForm({ initialData, onSubmit, onCancel }: GiftAccountFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateGiftAccountInput>({
    resolver: zodResolver(createGiftAccountSchema),
    defaultValues: initialData
      ? {
          bankName: initialData.bankName,
          accountNumber: initialData.accountNumber,
          accountName: initialData.accountName,
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded border p-4">
      <div>
        <input
          {...register('bankName')}
          placeholder="Nama bank/e-wallet (contoh: BCA, GoPay)"
          className="w-full rounded border p-2"
        />
        {errors.bankName && <p className="text-sm text-red-500">{errors.bankName.message}</p>}
      </div>

      <div>
        <input
          {...register('accountNumber')}
          placeholder="Nomor rekening/HP"
          className="w-full rounded border p-2"
        />
        {errors.accountNumber && (
          <p className="text-sm text-red-500">{errors.accountNumber.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('accountName')}
          placeholder="Nama pemilik rekening"
          className="w-full rounded border p-2"
        />
        {errors.accountName && <p className="text-sm text-red-500">{errors.accountName.message}</p>}
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
