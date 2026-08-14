'use client';

import { useState } from 'react';
import { QrScanner } from '@/features/checkin/QrScanner';
import { verifyCheckIn } from '@/features/checkin/checkin.api';
import { BackButton } from '@/components/BackButton';

interface ScanResult {
  success: boolean;
  message: string;
}

export default function CheckInPage() {
  const [result, setResult] = useState<ScanResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleScan(decodedText: string) {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const data = await verifyCheckIn(decodedText);
      if (data.alreadyCheckedIn) {
        setResult({
          success: false,
          message: `${data.guestName} sudah check-in sebelumnya (${new Date(data.checkedAt).toLocaleTimeString('id-ID')})`,
        });
      } else {
        setResult({
          success: true,
          message: `${data.guestName} berhasil check-in!`,
        });
      }
    } catch {
      setResult({ success: false, message: 'Kode QR tidak valid' });
    } finally {
      setIsProcessing(false);
    }
  }

  function handleScanNext() {
    setResult(null);
  }
  return (
    <div className="p-8">
      <BackButton />
      <h1 className="mb-2 text-2xl font-bold">Scan Check-in Tamu</h1>
      <p className="mb-6 text-sm text-gray-500">
        Arahkan kamera ke QR code undangan tamu untuk proses check-in.
      </p>

      <div className={result ? 'hidden' : ''}>
        <QrScanner onScan={handleScan} isPaused={isProcessing || !!result} />
      </div>

      {result && (
        <div
          className={`mx-auto max-w-sm rounded-lg border p-6 text-center ${
            result.success ? 'border-green-300 bg-green-50' : 'border-yellow-300 bg-yellow-50'
          }`}
        >
          <p className="mb-4 font-medium text-gray-800">{result.message}</p>
          <button
            onClick={handleScanNext}
            className="rounded bg-gray-800 px-4 py-2 text-sm text-white"
          >
            Scan Tamu Berikutnya
          </button>
        </div>
      )}
    </div>
  );
}
