'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { clearAuthToken } from '@/features/auth/auth.storage';

export default function DashboardPage() {
  const router = useRouter();

  function handleLogout() {
    clearAuthToken();
    router.push('/login');
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <button onClick={handleLogout} className="rounded border px-4 py-2">
          Logout
        </button>
      </div>
      <p className="text-gray-500">Selamat datang! Halaman ini akan dikembangkan lebih lanjut.</p>

      <div className="mt-6">
        <Link href="/dashboard/bride-groom" className="text-blue-600 underline">
          Kelola Data Mempelai
        </Link>
      </div>
      <div>
        <Link href="/dashboard/events" className="text-blue-600 underline">
          Kelola Acara
        </Link>
      </div>
      <div>
        <Link href="/dashboard/love-story" className="text-blue-600 underline">
          Kelola Love Story
        </Link>
      </div>
      <div>
        <Link href="/dashboard/gallery" className="text-blue-600 underline">
          Kelola Galeri
        </Link>
      </div>
      <div>
        <Link href="/dashboard/gift-account" className="text-blue-600 underline">
          Kelola Wedding Gift
        </Link>
      </div>
      <div>
        <Link href="/dashboard/guests" className="text-blue-600 underline">
          Kelola Tamu
        </Link>
      </div>
    </div>
  );
}
