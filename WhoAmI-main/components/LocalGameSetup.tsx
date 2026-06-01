'use client';

import { useState } from 'react';
import { GameRoom, Player } from '@/lib/types';

interface LocalGameSetupProps {
  room: GameRoom;
  onAllReady: () => void;
}

export default function LocalGameSetup({ room, onAllReady }: LocalGameSetupProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [readyPlayers, setReadyPlayers] = useState<Set<string>>(new Set());

  const currentSelectedPlayer = room.players.find(p => p.id === selectedPlayer);
  const allReady = readyPlayers.size === room.players.length;

  const handlePlayerClick = (playerId: string) => {
    setSelectedPlayer(playerId);
  };

  const handleGotIt = () => {
    if (selectedPlayer) {
      setReadyPlayers(new Set([...readyPlayers, selectedPlayer]));
      setSelectedPlayer(null);
    }
  };

  const handleStartGame = () => {
    if (allReady) {
      onAllReady();
    }
  };

  // Show role card for selected player
  if (currentSelectedPlayer && !readyPlayers.has(selectedPlayer!)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-12 text-center space-y-8">
            <h2 className="text-2xl font-bold text-white">👤 {currentSelectedPlayer.name}</h2>

            <div className="pt-8 pb-8">
              {currentSelectedPlayer.isImposter ? (
                <div className="space-y-4">
                  <div className="text-6xl mb-4">🕵️</div>
                  <h3 className="text-3xl font-bold text-red-400">DU BIST DER</h3>
                  <h3 className="text-3xl font-bold text-red-400">IMPOSTER!</h3>
                  <p className="text-red-200 text-sm mt-4">
                    Du kennst das Wort nicht. Versuche herauszufinden, welches Wort die anderen haben!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-green-400 mb-6">Das Wort ist:</h3>
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg p-6">
                    <p className="text-5xl font-bold text-white">{room.word}</p>
                  </div>
                  <p className="text-green-200 text-sm mt-4">
                    Gib Hinweise, ohne dem Imposter zu verraten!
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleGotIt}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              ✓ Verstanden
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Setup screen - choose your player
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🎭 Imposter Setup</h1>
          <p className="text-purple-200">Klick auf deinen Namen und schau deine Rolle!</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 space-y-4 mb-8">
          <div className="grid grid-cols-2 gap-4">
            {room.players.map((player) => {
              const isReady = readyPlayers.has(player.id);
              return (
                <button
                  key={player.id}
                  onClick={() => !isReady && handlePlayerClick(player.id)}
                  disabled={isReady}
                  className={`p-6 rounded-lg font-bold text-lg transition ${
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
        </div>

        {allReady && (
          <div className="text-center space-y-4">
            <div className="bg-green-900/30 border-l-4 border-green-500 p-4 rounded">
              <p className="text-green-300">✓ Alle bereit!</p>
            </div>
            <button
              onClick={handleStartGame}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              🎮 Diskussionsrunde starten (4 Min)
            </button>
          </div>
        )}

        {!allReady && (
          <div className="text-center">
            <p className="text-purple-200">
              {room.players.length - readyPlayers.size} Spieler noch nicht ready...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
