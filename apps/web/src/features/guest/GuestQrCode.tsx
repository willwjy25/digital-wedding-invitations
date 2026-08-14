'use client';

import { QRCodeSVG } from 'qrcode.react';

interface GuestQrCodeProps {
  guestName: string;
  qrCode: string;
  onClose: () => void;
}

export function GuestQrCode({ guestName, qrCode, onClose }: GuestQrCodeProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="rounded-lg bg-white p-6 text-center shadow-lg">
        <h3 className="mb-1 font-semibold text-gray-800">{guestName}</h3>
        <p className="mb-4 text-xs text-gray-400">QR Check-in</p>

        <div className="mx-auto flex w-fit items-center justify-center rounded border p-4">
          <QRCodeSVG value={qrCode} size={200} />
        </div>

        <button
          onClick={onClose}
          className="mt-4 rounded border px-4 py-2 text-sm hover:bg-gray-50"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
