'use client';

import { useState } from 'react';
import { useGameStore } from '@/lib/store';
import { GameRoom } from '@/lib/types';

interface GameLobbyProps {
  onRoomCreated: (room: GameRoom) => void;
  onRoomJoined: (room: GameRoom) => void;
}

export default function GameLobby({ onRoomCreated, onRoomJoined }: GameLobbyProps) {
  const store = useGameStore();
  const [playerName, setPlayerName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const createRoom = async () => {
    if (!playerName.trim()) {
      setError('Gib einen Namen ein');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/game/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId: store.playerId, playerName }),
      });
      const data = await res.json();
      store.setPlayerName(playerName);
      store.setRoomId(data.room.id);
      onRoomCreated(data.room);
    } catch (err) {
      setError('Fehler beim Erstellen des Spiels');
    } finally {
      setLoading(false);
    }
  };

  const joinRoom = async () => {
    if (!playerName.trim()) {
      setError('Gib einen Namen ein');
      return;
    }
    if (!joinCode.trim()) {
      setError('Gib einen Code ein');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/game/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: joinCode, playerId: store.playerId, playerName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      store.setPlayerName(playerName);
      store.setRoomId(joinCode);
      onRoomJoined(data.room);
    } catch (err) {
      setError((err as Error).message || 'Fehler beim Beitreten');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">🎭 Imposter</h1>
          <p className="text-purple-200">Finde den Imposter!</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 space-y-6">
          <div>
            <input
              type="text"
              placeholder="Dein Name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && createRoom()}
              className="w-full px-4 py-3 bg-white/20 text-white placeholder-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <button
            onClick={createRoom}
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 transition"
          >
            {loading ? 'Wird erstellt...' : '➕ Neues Spiel'}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-400"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-purple-900 text-purple-200">oder</span>
            </div>
          </div>

          <div>
            <input
              type="text"
              placeholder="Spielcode eingeben"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === 'Enter' && joinRoom()}
              className="w-full px-4 py-3 bg-white/20 text-white placeholder-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <button
            onClick={joinRoom}
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 transition"
          >
            {loading ? 'Wird beigetreten...' : '🚀 Beitreten'}
          </button>
        </div>

        {error && <div className="text-red-300 text-center text-sm">{error}</div>}
      </div>
    </div>
  );
}
