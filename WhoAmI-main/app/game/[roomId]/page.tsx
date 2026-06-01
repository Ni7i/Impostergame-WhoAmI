'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SimpleLocalGame from '@/components/SimpleLocalGame';
import { GameRoom } from '@/lib/types';

export default function GamePage() {
  const params = useParams();
  const roomId = params.roomId as string;
  const [room, setRoom] = useState<GameRoom | null>(null);

  useEffect(() => {
    const storedRoom = sessionStorage.getItem(`room-${roomId}`);
    if (storedRoom) {
      setRoom(JSON.parse(storedRoom));
    }
  }, [roomId]);

  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Wird geladen...</h1>
        </div>
      </div>
    );
  }

  return <SimpleLocalGame initialRoom={room} />;
}
