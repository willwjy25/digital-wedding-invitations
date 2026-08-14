'use client';

import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QrScannerProps {
  onScan: (decodedText: string) => void;
  isPaused: boolean;
}

export function QrScanner({ onScan, isPaused }: QrScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isStartedRef = useRef(false);
  const containerId = 'qr-scanner-container';

  useEffect(() => {
    const scanner = new Html5Qrcode(containerId);
    scannerRef.current = scanner;
    let isCancelled = false;

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          onScan(decodedText);
        },
        () => {
          // Callback ini dipanggil terus-menerus saat tidak ada QR terdeteksi, sengaja dikosongkan
        }
      )
      .then(() => {
        if (isCancelled) {
          // Komponen sudah unmount duluan sebelum start() selesai (kasus Strict Mode) — langsung stop lagi
          scanner.stop().catch(() => {});
        } else {
          isStartedRef.current = true;
        }
      })
      .catch((err) => {
        console.error('Gagal memulai kamera:', err);
      });

    return () => {
      isCancelled = true;
      if (isStartedRef.current) {
        scanner
          .stop()
          .then(() => scanner.clear())
          .catch(() => {})
          .finally(() => {
            isStartedRef.current = false;
          });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- scanner hanya perlu diinisialisasi sekali saat mount
  }, []);

  useEffect(() => {
    const scanner = scannerRef.current;
    if (!scanner || !isStartedRef.current) return;

    if (isPaused && scanner.getState() === 2) {
      scanner.pause();
    } else if (!isPaused && scanner.getState() === 3) {
      scanner.resume();
    }
  }, [isPaused]);

  return <div id={containerId} className="mx-auto max-w-sm overflow-hidden rounded-lg" />;
}
