'use client';

import Link from 'next/link';

interface BackButtonProps {
  href?: string;
  label?: string;
}

export function BackButton({
  href = '/dashboard',
  label = 'Kembali ke Dashboard',
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className="mb-4 inline-flex items-center gap-1 text-sm text-gray-600 hover:text-black"
    >
      ← {label}
    </Link>
  );
}
