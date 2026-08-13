'use client';

import type { Event } from '@repo/types';

interface LocationSectionProps {
  events: Event[];
}

export function LocationSection({ events }: LocationSectionProps) {
  const eventsWithMaps = events.filter((event) => event.mapsUrl);

  if (eventsWithMaps.length === 0) {
    return null;
  }

  return (
    <div className="bg-rose-50 p-8 py-16">
      <h2 className="mb-12 text-center font-serif text-2xl text-gray-800">Lokasi</h2>
      <div className="mx-auto max-w-md space-y-8">
        {eventsWithMaps.map((event) => (
          <div key={event.id} className="rounded-lg bg-white p-6 text-center shadow-sm">
            <h3 className="mb-1 font-serif text-lg text-gray-800">{event.title}</h3>
            <p className="mb-4 text-sm text-gray-500">{event.location}</p>
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-gray-800 px-6 py-2 text-sm hover:bg-gray-800 hover:text-white"
            >
              Buka di Google Maps
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
