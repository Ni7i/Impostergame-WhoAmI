'use client';

import { useState } from 'react';
import { GameRoom } from '@/lib/types';
import { getRandomCharacter } from '@/lib/characters';

interface WhoAmISetupProps {
  room: GameRoom;
  onAllReady: (updatedRoom: GameRoom) => void;
  onBack?: () => void;
}

export default function WhoAmISetup({ room, onAllReady, onBack }: WhoAmISetupProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [readyPlayers, setReadyPlayers] = useState<Set<string>>(new Set());
  const [characters, setCharacters] = useState<{ [playerId: string]: string }>({});

  const currentSelectedPlayer = room.players.find(p => p.id === selectedPlayer);
  const allReady = readyPlayers.size === room.players.length;

  const handlePlayerClick = (playerId: string) => {
    if (!readyPlayers.has(playerId)) {
      // Assign random character
      const character = getRandomCharacter();
      setCharacters(prev => ({ ...prev, [playerId]: character }));
      setSelectedPlayer(playerId);
    }
  };

  const handleGotIt = () => {
    if (selectedPlayer) {
      setReadyPlayers(new Set([...readyPlayers, selectedPlayer]));
      setSelectedPlayer(null);
    }
  };

  const handleStart = () => {
    if (allReady) {
      const updatedPlayers = room.players.map(p => ({
        ...p,
        isImposter: false,
        hasVoted: false,
      }));
      const updatedRoom: GameRoom = {
        ...room,
        players: updatedPlayers,
        status: 'playing',
        word: undefined,
      };
      // Store characters in sessionStorage
      sessionStorage.setItem(`whoami-characters-${room.id}`, JSON.stringify(characters));
      onAllReady(updatedRoom);
    }
  };

  // Show secret card for selected player
  if (currentSelectedPlayer && !readyPlayers.has(selectedPlayer!)) {
    const character = characters[selectedPlayer!];
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-900 to-blue-900 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-12 text-center space-y-8">
            <h2 className="text-2xl font-bold text-white">{currentSelectedPlayer.name}</h2>

            <div className="py-8 border-t border-white/20">
              <div className="text-5xl font-bold text-cyan-300 mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {character}
              </div>
              <p className="text-white/70 text-sm">
                Merke dir! Die anderen geben dir Hinweise!
              </p>
            </div>

            <button
              onClick={handleGotIt}
              className="w-full bg-white/20 hover:bg-white/30 text-white font-bold py-2 rounded transition"
            >
              OK - Merkt
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Setup screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 to-blue-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🎭 Wer bin ich?</h1>
          <p className="text-blue-200 text-sm">Klick auf deinen Namen - merke dir deine Person!</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
          <div className={`grid gap-2 mb-6`} style={{gridTemplateColumns: `repeat(${Math.min(2, room.players.length)}, 1fr)`}}>
            {room.players.map((player) => {
              const isReady = readyPlayers.has(player.id);
              return (
                <button
                  key={player.id}
                  onClick={() => !isReady && handlePlayerClick(player.id)}
                  disabled={isReady}
                  className={`p-4 rounded font-semibold text-sm transition ${
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
              onClick={handleStart}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 rounded transition"
            >
              Los geht's!
            </button>
          )}

          {!allReady && (
            <p className="text-blue-200 text-center text-sm">
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
