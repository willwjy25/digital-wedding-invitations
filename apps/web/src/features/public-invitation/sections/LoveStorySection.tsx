'use client';

import type { LoveStoryItem } from '@repo/types';

interface LoveStorySectionProps {
  items: LoveStoryItem[];
}

export function LoveStorySection({ items }: LoveStorySectionProps) {
  if (items.length === 0) return null;

  return (
    <div className="bg-rose-50 p-8 py-16">
      <h2 className="mb-12 text-center font-serif text-2xl text-gray-800">Love Story</h2>

      <div className="mx-auto max-w-xl space-y-8">
        {items.map((item) => (
          <div key={item.id} className="rounded-lg bg-white p-6 shadow-sm">
            {item.imageUrl && (
              /* eslint-disable-next-line @next/next/no-img-element -- URL foto eksternal dinamis */
              <img
                src={item.imageUrl}
                alt={item.title}
                className="mb-4 h-48 w-full rounded object-cover"
              />
            )}
            <h3 className="font-serif text-lg text-gray-800">{item.title}</h3>
            {item.date && (
              <p className="mb-2 text-xs text-gray-400">
                {new Date(item.date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            )}
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
