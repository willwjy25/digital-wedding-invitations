'use client';

interface CoverSectionProps {
  brideName?: string;
  groomName?: string;
  guestName?: string;
  onOpen: () => void;
}

export function CoverSection({ brideName, groomName, guestName, onOpen }: CoverSectionProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-8 text-center text-white">
      <p className="mb-4 text-sm tracking-widest uppercase text-gray-400">The Wedding Of</p>
      <h1 className="mb-8 text-4xl font-serif">
        {groomName ?? '...'} & {brideName ?? '...'}
      </h1>

      {guestName && (
        <div className="mb-8">
          <p className="text-sm text-gray-400">Kepada Yth,</p>
          <p className="text-lg font-medium">{guestName}</p>
        </div>
      )}

      <button
        onClick={onOpen}
        className="rounded-full border border-white px-8 py-3 text-sm tracking-wide hover:bg-white hover:text-black"
      >
        Buka Undangan
      </button>
    </div>
  );
}
