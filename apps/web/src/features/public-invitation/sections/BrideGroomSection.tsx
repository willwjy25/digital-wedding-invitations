'use client';

import type { BrideGroom } from '@repo/types';

interface BrideGroomSectionProps {
  data: BrideGroom | null;
}

export function BrideGroomSection({ data }: BrideGroomSectionProps) {
  if (!data) return null;

  return (
    <div className="bg-white p-8 py-16">
      <h2 className="mb-12 text-center font-serif text-2xl text-gray-800">Mempelai</h2>

      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-12 sm:grid-cols-2">
        <div className="text-center">
          {data.groomPhotoUrl && (
            /* eslint-disable-next-line @next/next/no-img-element -- URL foto eksternal dinamis */
            <img
              src={data.groomPhotoUrl}
              alt={data.groomName}
              className="mx-auto mb-4 h-40 w-40 rounded-full object-cover"
            />
          )}
          <h3 className="font-serif text-xl text-gray-800">{data.groomName}</h3>
          {data.groomParents && <p className="mt-2 text-sm text-gray-500">{data.groomParents}</p>}
        </div>

        <div className="text-center">
          {data.bridePhotoUrl && (
            /* eslint-disable-next-line @next/next/no-img-element -- URL foto eksternal dinamis */
            <img
              src={data.bridePhotoUrl}
              alt={data.brideName}
              className="mx-auto mb-4 h-40 w-40 rounded-full object-cover"
            />
          )}
          <h3 className="font-serif text-xl text-gray-800">{data.brideName}</h3>
          {data.brideParents && <p className="mt-2 text-sm text-gray-500">{data.brideParents}</p>}
        </div>
      </div>
    </div>
  );
}
