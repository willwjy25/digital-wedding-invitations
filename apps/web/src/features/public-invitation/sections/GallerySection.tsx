'use client';

import type { GalleryItem } from '@repo/types';

interface GallerySectionProps {
  items: GalleryItem[];
}

export function GallerySection({ items }: GallerySectionProps) {
  if (items.length === 0) return null;

  return (
    <div className="bg-white p-8 py-16">
      <h2 className="mb-12 text-center font-serif text-2xl text-gray-800">Galeri</h2>

      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="overflow-hidden rounded">
            {/* eslint-disable-next-line @next/next/no-img-element -- URL foto eksternal dinamis */}
            <img
              src={item.imageUrl}
              alt={item.caption ?? 'Foto galeri'}
              className="h-40 w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
