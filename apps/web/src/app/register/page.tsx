'use client';

import { setAuthToken } from '@/features/auth/auth.storage';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerAdminSchema, type RegisterAdminInput } from '@repo/types';
import { registerAdmin } from '@/features/auth/auth.api';
import axios from 'axios';

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterAdminInput>({
    resolver: zodResolver(registerAdminSchema),
  });

  async function onSubmit(data: RegisterAdminInput) {
    setServerError(null);
    try {
      const result = await registerAdmin(data);
      setAuthToken(result.token);
      router.push('/dashboard');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setServerError(err.response?.data?.error ?? 'Terjadi kesalahan');
      } else {
        setServerError('Terjadi kesalahan');
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">Daftar Akun Admin</h1>

        <div>
          <input
            {...register('name')}
            placeholder="Nama lengkap"
            className="w-full rounded border p-2"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <input {...register('email')} placeholder="Email" className="w-full rounded border p-2" />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="w-full rounded border p-2"
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div>
          <input
            {...register('tenantSlug')}
            placeholder="Slug undangan (contoh: will-jane-wedding)"
            className="w-full rounded border p-2"
          />
          {errors.tenantSlug && <p className="text-sm text-red-500">{errors.tenantSlug.message}</p>}
        </div>

        {serverError && <p className="text-sm text-red-500">{serverError}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-black p-2 text-white disabled:opacity-50"
        >
          {isSubmitting ? 'Memproses...' : 'Daftar'}
        </button>
      </form>
    </div>
  );
}
