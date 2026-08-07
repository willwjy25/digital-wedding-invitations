'use client';

interface HeroSectionProps {
  brideName?: string;
  groomName?: string;
  weddingDate?: Date;
}

export function HeroSection({ brideName, groomName, weddingDate }: HeroSectionProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-white p-8 text-center">
      <p className="mb-2 text-sm tracking-widest text-rose-400 uppercase">We Are Getting Married</p>
      <h1 className="mb-4 font-serif text-5xl text-gray-800">
        {groomName ?? '...'}
        <span className="mx-3 text-rose-300">&</span>
        {brideName ?? '...'}
      </h1>
      {weddingDate && (
        <p className="text-lg text-gray-500">
          {new Date(weddingDate).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      )}
    </div>
  );
}
