'use client';

import { useEffect, useState } from 'react';
import { GameRoom } from '@/lib/types';
import { useGameStore } from '@/lib/store';

interface GameRoomProps {
  room: GameRoom;
  onGameStart: (room: GameRoom) => void;
}

export default function GameRoomLobby({ room, onGameStart }: GameRoomProps) {
  const store = useGameStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isHost = room.host === store.playerId;
  const canStart = room.players.length >= 2;

  const startGame = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/game/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: room.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onGameStart(data.room);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">🎭 Imposter</h1>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 inline-block">
            <p className="text-purple-200 text-lg">Spielcode: <span className="font-bold text-cyan-300">{room.id}</span></p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">👥 Spieler ({room.players.length}/4)</h2>
            <div className="space-y-2">
              {room.players.map((player) => (
                <div key={player.id} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                  <span className="text-white">{player.name}</span>
                  {isHost && <span className="text-yellow-300 text-sm">Host</span>}
                  {player.id === store.playerId && <span className="text-cyan-300 text-sm">Du</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-900/30 border-l-4 border-yellow-500 p-4">
            <p className="text-yellow-200 text-sm">
              {room.players.length < 2
                ? '⏳ Warte auf mindestens 2 Spieler...'
                : room.players.length < 4
                ? '✓ Bereit zu starten! (Oder warte auf mehr Spieler)'
                : '✓ Alle 4 Spieler anwesend!'}
            </p>
          </div>

          {isHost && (
            <button
              onClick={startGame}
              disabled={!canStart || loading}
              className={`w-full font-bold py-3 px-4 rounded-lg text-white transition ${
                canStart
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600'
                  : 'bg-gray-500 cursor-not-allowed'
              } disabled:opacity-50`}
            >
              {loading ? '🎮 Spiel wird gestartet...' : '🎮 Spiel Starten'}
            </button>
          )}

          {!isHost && (
            <div className="text-center text-purple-200">
              ⏳ Warte, bis der Host das Spiel startet...
            </div>
          )}

          {error && <div className="text-red-300 text-center text-sm">{error}</div>}
        </div>
      </div>
    </div>
  );
}
