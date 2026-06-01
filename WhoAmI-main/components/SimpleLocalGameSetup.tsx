'use client';

import { useState } from 'react';
import { GameRoom } from '@/lib/types';

interface SimpleLocalGameSetupProps {
  room: GameRoom;
  onAllReady: () => void;
  onBack?: () => void;
}

export default function SimpleLocalGameSetup({ room, onAllReady, onBack }: SimpleLocalGameSetupProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [readyPlayers, setReadyPlayers] = useState<Set<string>>(new Set());

  const currentSelectedPlayer = room.players.find(p => p.id === selectedPlayer);
  const allReady = readyPlayers.size === room.players.length;

  const handleGotIt = () => {
    if (selectedPlayer) {
      setReadyPlayers(new Set([...readyPlayers, selectedPlayer]));
      setSelectedPlayer(null);
    }
  };

  // Show role card
  if (currentSelectedPlayer && !readyPlayers.has(selectedPlayer!)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 text-center space-y-8">
            <h2 className="text-3xl font-bold text-white">{currentSelectedPlayer.name}</h2>

            <div className="py-8">
              {currentSelectedPlayer.isImposter ? (
                <div className="space-y-4">
                  <div className="text-7xl">🕵️</div>
                  <div className="text-2xl font-bold text-red-400">IMPOSTER!</div>
                  <p className="text-red-200 text-sm">
                    Das Wort nicht preisgeben!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-5xl font-bold text-pink-400 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                    {room.word}
                  </div>
                  <p className="text-green-200 text-sm">
                    Gib Hinweise!
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleGotIt}
              className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-2 rounded transition"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Setup screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🎭 Setup</h1>
          <p className="text-purple-200 text-sm">Klick auf deinen Namen</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
          {/* Dynamic grid based on player count */}
          <div className={`grid gap-2 mb-6`} style={{gridTemplateColumns: `repeat(${Math.min(4, room.players.length)}, 1fr)`}}>
            {room.players.map((player) => {
              const isReady = readyPlayers.has(player.id);
              return (
                <button
                  key={player.id}
                  onClick={() => !isReady && setSelectedPlayer(player.id)}
                  disabled={isReady}
                  className={`p-3 rounded font-semibold text-sm transition ${
                    isReady
                      ? 'bg-green-900/50 text-green-300 cursor-not-allowed'
                      : 'bg-white/10 text-white hover:bg-white/20 cursor-pointer'
                  }`}
                >
                  {isReady ? `✓ ${player.name}` : player.name}
                </button>
              );
            })}
          </div>

          {allReady && (
            <button
              onClick={onAllReady}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded transition"
            >
              Starten
            </button>
          )}

          {!allReady && (
            <p className="text-purple-200 text-center text-sm">
              {room.players.length - readyPlayers.size} noch...
            </p>
          )}

          {onBack && (
            <button
              onClick={onBack}
              className="mt-4 w-full text-white/60 hover:text-white text-sm transition"
            >
              ← Zurück zu Namen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
