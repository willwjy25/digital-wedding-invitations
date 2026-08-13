'use client';

import { useState } from 'react';
import type { GiftAccount } from '@repo/types';

interface GiftSectionProps {
  accounts: GiftAccount[];
}

export function GiftSection({ accounts }: GiftSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (accounts.length === 0) return null;

  async function handleCopy(id: string, accountNumber: string) {
    await navigator.clipboard.writeText(accountNumber);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="bg-rose-50 p-8 py-16">
      <h2 className="mb-4 text-center font-serif text-2xl text-gray-800">Wedding Gift</h2>
      <p className="mx-auto mb-12 max-w-md text-center text-sm text-gray-500">
        Doa restu Anda adalah hadiah yang paling berharga bagi kami. Namun jika ingin memberi tanda
        kasih, kami sediakan informasi berikut.
      </p>

      <div className="mx-auto max-w-md space-y-4">
        {accounts.map((account) => (
          <div key={account.id} className="rounded-lg bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-gray-500">{account.bankName}</p>
            <p className="my-2 text-lg font-semibold text-gray-800">{account.accountNumber}</p>
            <p className="mb-4 text-sm text-gray-500">a.n. {account.accountName}</p>
            <button
              onClick={() => handleCopy(account.id, account.accountNumber)}
              className="rounded-full border border-gray-800 px-6 py-2 text-sm hover:bg-gray-800 hover:text-white"
            >
              {copiedId === account.id ? 'Tersalin!' : 'Salin Nomor Rekening'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
