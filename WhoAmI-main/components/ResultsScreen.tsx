'use client';

import { useEffect, useState } from 'react';
import { GameRoom } from '@/lib/types';

interface ResultsScreenProps {
  room: GameRoom;
  onContinue: () => void;
}

export default function ResultsScreen({ room, onContinue }: ResultsScreenProps) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onContinue();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onContinue]);

  const results = room.results;
  if (!results) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-white mb-4">🎭 Ergebnisse</h2>

        <div className="space-y-4 mb-6">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-purple-200 text-sm mb-1">Das Wort war:</p>
            <p className="text-3xl font-bold text-pink-400">{results.word}</p>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-purple-200 text-sm mb-1">Der Imposter war:</p>
            <p className="text-2xl font-bold text-red-400">{results.imposterName}</p>
          </div>

          <div className={`rounded-lg p-4 ${results.correctGuess ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
            <p className={`text-lg font-bold ${results.correctGuess ? 'text-green-300' : 'text-red-300'}`}>
              {results.correctGuess ? '✅ Richtig erraten!' : '❌ Der Imposter entkam!'}
            </p>
          </div>
        </div>

        <p className="text-purple-200 text-sm">
          Nächste Runde in <span className="font-bold text-cyan-300">{countdown}s</span>
        </p>
      </div>
    </div>
  );
}
