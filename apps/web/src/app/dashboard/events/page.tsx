'use client';

import { BackButton } from '@/components/BackButton';
import { useEffect, useState } from 'react';
import type { Event, CreateEventInput } from '@repo/types';
import { getEvents, createEvent, updateEvent, deleteEvent } from '@/features/event/event.api';
import { EventForm } from '@/features/event/EventForm';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function loadEvents() {
    setIsLoading(true);
    const data = await getEvents();
    setEvents(data);
    setIsLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data fetching saat mount, save pattern.
    loadEvents();
  }, []);

  async function handleCreate(data: CreateEventInput) {
    await createEvent(data);
    setShowAddForm(false);
    await loadEvents();
  }

  async function handleUpdate(id: string, data: CreateEventInput) {
    await updateEvent(id, data);
    setEditingId(null);
    await loadEvents();
  }

  async function handleDelete(id: string) {
    if (!confirm('Yakin ingin menghapus acara ini?')) return;
    await deleteEvent(id);
    await loadEvents();
  }

  if (isLoading) {
    return <div className="p-8">Memuat data...</div>;
  }

  return (
    <div className="p-8">
      <BackButton />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kelola Acara</h1>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="rounded bg-black px-4 py-2 text-white"
          >
            + Tambah Acara
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="mb-6">
          <EventForm onSubmit={handleCreate} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      <div className="space-y-4">
        {events.length === 0 && <p className="text-gray-500">Belum ada acara ditambahkan.</p>}

        {events.map((event) =>
          editingId === event.id ? (
            <EventForm
              key={event.id}
              initialData={event}
              onSubmit={(data) => handleUpdate(event.id, data)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div key={event.id} className="flex items-center justify-between rounded border p-4">
              <div>
                <p className="font-semibold">{event.title}</p>
                <p className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString('id-ID')} • {event.startTime}
                  {event.endTime ? ` - ${event.endTime}` : ''}
                </p>
                <p className="text-sm text-gray-500">{event.location}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingId(event.id)}
                  className="rounded border px-3 py-1 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="rounded border border-red-300 px-3 py-1 text-sm text-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
