'use client';

interface ClosingSectionProps {
  brideName?: string;
  groomName?: string;
}

export function ClosingSection({ brideName, groomName }: ClosingSectionProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-black p-8 text-center text-white">
      <p className="mb-4 text-sm tracking-widest text-gray-400 uppercase">Terima Kasih</p>
      <p className="mb-8 max-w-md text-sm leading-relaxed text-gray-300">
        Atas kehadiran, doa, dan restu yang diberikan, kami ucapkan terima kasih yang
        sebesar-besarnya.
      </p>
      <h2 className="font-serif text-3xl">
        {groomName ?? '...'} & {brideName ?? '...'}
      </h2>
    </div>
  );
}
