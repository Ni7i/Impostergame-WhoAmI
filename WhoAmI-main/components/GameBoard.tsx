'use client';

import { useEffect, useState } from 'react';
import { GameRoom } from '@/lib/types';
import { useGameStore } from '@/lib/store';
import VotingModal from './VotingModal';
import ResultsScreen from './ResultsScreen';

interface GameBoardProps {
  room: GameRoom;
  word: string | null;
}

export default function GameBoard({ room: initialRoom, word }: GameBoardProps) {
  const store = useGameStore();
  const [room, setRoom] = useState(initialRoom);
  const [timeLeft, setTimeLeft] = useState(240);
  const [showVoting, setShowVoting] = useState(false);

  const currentPlayer = room.players.find(p => p.id === store.playerId);
  const isImposter = currentPlayer?.isImposter || false;

  useEffect(() => {
    if (room.status !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowVoting(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [room.status]);

  const handleVotingComplete = (updatedRoom: GameRoom) => {
    setRoom(updatedRoom);
    setShowVoting(false);
  };

  const handleRoundContinue = () => {
    setTimeLeft(120);
    setShowVoting(false);
  };

  if (room.status === 'ended') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">🎉 Spiel Beendet!</h1>
          <p className="text-purple-200 text-lg">Danke fürs Spielen!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-purple-200 text-sm">Runde</p>
              <p className="text-2xl font-bold text-white">{room.currentRound}/{room.totalRounds}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-purple-200 text-sm">Zeit</p>
              <p className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-purple-200 text-sm">Deine Rolle</p>
              <p className={`text-xl font-bold ${isImposter ? 'text-red-400' : 'text-green-400'}`}>
                {isImposter ? '🕵️ Imposter' : '🧑 Normal'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 mb-8">
          <div className="text-center">
            {isImposter ? (
              <div>
                <h2 className="text-2xl font-bold text-red-400 mb-4">🕵️ Du bist der Imposter!</h2>
                <p className="text-purple-200 text-lg">
                  Versuche herauszufinden, welches Wort die anderen haben!
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">Das Wort ist:</h2>
                <p className="text-5xl font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                  {word}
                </p>
                <p className="text-purple-200 text-sm mt-4">
                  Gib Hinweise, damit andere das Wort erraten, ohne dem Imposter zu verraten, was es ist!
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8">
          <h3 className="text-xl font-bold text-white mb-4">👥 Spieler</h3>
          <div className="space-y-2">
            {room.players.map((player) => (
              <div key={player.id} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
                <span className={`font-semibold ${player.id === store.playerId ? 'text-cyan-300' : 'text-white'}`}>
                  {player.name}
                  {player.id === store.playerId && ' (Du)'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {showVoting && <VotingModal room={room} onVotingComplete={handleVotingComplete} />}

        {room.status === 'results' && (
          <ResultsScreen room={room} onContinue={handleRoundContinue} />
        )}
      </div>
    </div>
  );
}
