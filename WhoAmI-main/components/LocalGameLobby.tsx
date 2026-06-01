'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GameRoom } from '@/lib/types';
import { startGame } from '@/lib/gameLogic';
import { v4 as uuidv4 } from 'uuid';

interface LocalGameLobbyProps {
  onGameStart: (room: GameRoom) => void;
}

export default function LocalGameLobby({ onGameStart }: LocalGameLobbyProps) {
  const router = useRouter();
  const [names, setNames] = useState(['', '', '', '']);
  const [error, setError] = useState('');

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleStartGame = () => {
    if (names.some(n => !n.trim())) {
      setError('Alle 4 Namen erforderlich!');
      return;
    }

    // Create players
    const playerIds = names.map(() => uuidv4());
    const players = names.map((name, idx) => ({
      id: playerIds[idx],
      name: name.trim(),
      isImposter: false,
      hasVoted: false,
    }));

    // Assign random imposter
    const imposterIdx = Math.floor(Math.random() * 4);
    players[imposterIdx].isImposter = true;

    // Create room
    const roomId = `LOCAL-${Date.now()}`;
    const gameRoom: GameRoom = {
      id: roomId,
      host: playerIds[0],
      players,
      status: 'lobby',
      currentRound: 1,
      totalRounds: 3,
      createdAt: Date.now(),
    };

    // Start game
    const startedRoom = startGame(gameRoom);

    // Store in session
    sessionStorage.setItem(`room-${roomId}`, JSON.stringify(startedRoom));

    // Navigate
    router.push(`/game/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">🎭 Imposter</h1>
          <p className="text-purple-200">Lokales Spiel - 4 Spieler</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 space-y-4">
          <p className="text-purple-200 text-center text-sm">Gib die Namen aller 4 Spieler ein:</p>

          {names.map((name, idx) => (
            <div key={idx}>
              <label className="text-purple-200 text-sm mb-1 block">Spieler {idx + 1}</label>
              <input
                type="text"
                placeholder={`Name des Spielers ${idx + 1}`}
                value={name}
                onChange={(e) => handleNameChange(idx, e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleStartGame()}
                className="w-full px-4 py-3 bg-white/20 text-white placeholder-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          ))}

          {error && <div className="text-red-300 text-center text-sm">{error}</div>}

          <button
            onClick={handleStartGame}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 px-4 rounded-lg transition mt-6"
          >
            🎮 Spiel Starten
          </button>
        </div>

        <div className="bg-white/5 rounded-lg p-4 text-center">
          <p className="text-purple-300 text-xs">
            4 Minuten pro Runde • 3 Runden • 1 Imposter
          </p>
        </div>
      </div>
    </div>
  );
}
