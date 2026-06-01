'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import WhoAmIGameLocal from '@/components/WhoAmIGameLocal';
import { GameRoom } from '@/lib/types';

export default function WhoAmIGamePage() {
  const params = useParams();
  const roomId = params.gameId as string;
  const [room, setRoom] = useState<GameRoom | null>(null);

  useEffect(() => {
    const storedRoom = sessionStorage.getItem(`room-${roomId}`);
    if (storedRoom) {
      setRoom(JSON.parse(storedRoom));
    }
  }, [roomId]);

  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Wird geladen...</h1>
        </div>
      </div>
    );
  }

  return <WhoAmIGameLocal initialRoom={room} />;
}
