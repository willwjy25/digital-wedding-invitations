'use client';

import type { Event } from '@repo/types';

interface EventSectionProps {
  events: Event[];
}

export function EventSection({ events }: EventSectionProps) {
  if (events.length === 0) return null;

  return (
    <div className="bg-white p-8 py-16">
      <h2 className="mb-12 text-center font-serif text-2xl text-gray-800">Acara</h2>

      <div className="mx-auto max-w-md space-y-6">
        {events.map((event) => (
          <div key={event.id} className="rounded-lg border p-6 text-center">
            <h3 className="mb-2 font-serif text-xl text-gray-800">{event.title}</h3>
            <p className="text-gray-600">
              {new Date(event.date).toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <p className="mt-1 text-gray-600">
              {event.startTime}
              {event.endTime ? ` - ${event.endTime}` : ''} WIB
            </p>
            <p className="mt-2 text-sm text-gray-500">{event.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
