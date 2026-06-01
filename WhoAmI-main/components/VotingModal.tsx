'use client';

import { useState } from 'react';
import { GameRoom } from '@/lib/types';
import { useGameStore } from '@/lib/store';

interface VotingModalProps {
  room: GameRoom;
  onVotingComplete: (updatedRoom: GameRoom) => void;
}

export default function VotingModal({ room, onVotingComplete }: VotingModalProps) {
  const store = useGameStore();
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currentPlayer = room.players.find(p => p.id === store.playerId);
  const hasVoted = currentPlayer?.hasVoted || false;
  const otherPlayers = room.players.filter(p => p.id !== store.playerId);

  const submitVote = async () => {
    if (!selectedTarget) {
      setError('Wähle einen Spieler');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/game/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: room.id,
          playerId: store.playerId,
          targetPlayerId: selectedTarget,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onVotingComplete(data.room);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (hasVoted) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-white mb-4">✅ Du hast abgestimmt!</h2>
          <p className="text-purple-200">Warte, bis alle anderen auch abgestimmt haben...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">🗳️ Abstimmung!</h2>
        <p className="text-purple-200 text-center mb-6">Wer ist deiner Meinung nach der Imposter?</p>

        <div className="space-y-2 mb-6">
          {otherPlayers.map((player) => (
            <button
              key={player.id}
              onClick={() => setSelectedTarget(player.id)}
              className={`w-full p-3 rounded-lg font-semibold transition ${
                selectedTarget === player.id
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {player.name}
            </button>
          ))}
        </div>

        {error && <div className="text-red-300 text-sm mb-4 text-center">{error}</div>}

        <button
          onClick={submitVote}
          disabled={!selectedTarget || loading}
          className={`w-full font-bold py-3 px-4 rounded-lg text-white transition ${
            selectedTarget
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600'
              : 'bg-gray-500 cursor-not-allowed'
          } disabled:opacity-50`}
        >
          {loading ? '⏳ Wird abgestimmt...' : '✓ Abstimmen'}
        </button>
      </div>
    </div>
  );
}
