'use client';

import { useEffect, useRef, useState } from 'react';

interface MusicPlayerProps {
  audioUrl?: string;
}

export function MusicPlayer({ audioUrl }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Browser modern memblokir autoplay dengan suara tanpa interaksi user,
    // jadi kita coba play saat komponen pertama muncul (biasanya dipasang setelah klik "Buka Undangan")
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }

  if (!audioUrl) return null;

  return (
    <>
      <audio ref={audioRef} src={audioUrl} loop />
      <button
        onClick={toggle}
        className="fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700"
        aria-label={isPlaying ? 'Jeda musik' : 'Putar musik'}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>
    </>
  );
}
