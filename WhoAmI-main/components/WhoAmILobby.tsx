'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GameRoom } from '@/lib/types';
import { getRandomWord } from '@/lib/words';
import { v4 as uuidv4 } from 'uuid';

export default function WhoAmILobby() {
  const router = useRouter();
  const [playerCount, setPlayerCount] = useState(2);
  const [names, setNames] = useState<string[]>(Array(2).fill(''));
  const [error, setError] = useState('');

  const handleCountChange = (count: number) => {
    setPlayerCount(count);
    setNames(Array(count).fill(''));
  };

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleStartGame = () => {
    if (names.some(n => !n.trim())) {
      setError('Alle Namen erforderlich!');
      return;
    }

    const randomWord = getRandomWord();
    const impostorIdx = Math.floor(Math.random() * playerCount);

    const playerIds = names.map(() => uuidv4());
    const players = names.map((name, idx) => ({
      id: playerIds[idx],
      name: name.trim(),
      isImposter: idx === impostorIdx,
      hasVoted: false,
    }));

    const roomId = `WHOAMI-${Date.now()}`;
    const gameRoom: GameRoom = {
      id: roomId,
      host: playerIds[0],
      players,
      status: 'lobby',
      currentRound: 1,
      totalRounds: 1,
      word: randomWord,
      createdAt: Date.now(),
    };

    sessionStorage.setItem(`room-${roomId}`, JSON.stringify(gameRoom));
    router.push(`/whoami/game/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 to-blue-900 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">🎭</h1>
          <h2 className="text-3xl font-bold text-white">Wer bin ich?</h2>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 space-y-6">
          {/* Player Count */}
          <div>
            <label className="text-white text-sm font-semibold mb-3 block">
              Anzahl Spieler: {playerCount}
            </label>
            <input
              type="range"
              min="2"
              max="4"
              value={playerCount}
              onChange={(e) => handleCountChange(parseInt(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-blue-200 text-xs mt-2">
              <span>2</span>
              <span>4</span>
            </div>
          </div>

          {/* Player Names */}
          <div className="space-y-2">
            {names.map((name, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={`Spieler ${idx + 1}`}
                value={name}
                onChange={(e) => handleNameChange(idx, e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleStartGame()}
                className="w-full px-3 py-2 bg-white/20 text-white placeholder-blue-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            ))}
          </div>

          {error && <div className="text-red-300 text-sm text-center">{error}</div>}

          <button
            onClick={handleStartGame}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 rounded-lg transition"
          >
            Spiel Starten
          </button>
        </div>
      </div>
    </div>
  );
}
