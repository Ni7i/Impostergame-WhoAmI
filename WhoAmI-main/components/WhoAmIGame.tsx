'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface GameState {
  id: string;
  character: string;
  players: Array<{ id: string; name: string }>;
  currentQuestionIdx: number;
  questions: Array<{ player: string; question: string; answer: boolean }>;
  guesses: Array<{ player: string; guess: string }>;
  createdAt: number;
}

interface WhoAmIGameProps {
  gameId: string;
}

export default function WhoAmIGame({ gameId }: WhoAmIGameProps) {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(true);
  const [gameEnded, setGameEnded] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(`whoami-${gameId}`);
    if (stored) {
      setGameState(JSON.parse(stored));
    } else {
      router.push('/whoami');
    }
    setLoading(false);
  }, [gameId, router]);

  const currentPlayer = gameState?.players[gameState.currentQuestionIdx];
  const answeredQuestions = gameState?.questions ?? [];

  const handleYes = () => {
    if (!gameState || !currentPlayer) return;

    const updated = {
      ...gameState,
      questions: [
        ...answeredQuestions,
        { player: currentPlayer.id, question, answer: true },
      ],
      currentQuestionIdx: (gameState.currentQuestionIdx + 1) % gameState.players.length,
    };
    setGameState(updated);
    sessionStorage.setItem(`whoami-${gameId}`, JSON.stringify(updated));
    setQuestion('');
  };

  const handleNo = () => {
    if (!gameState || !currentPlayer) return;

    const updated = {
      ...gameState,
      questions: [
        ...answeredQuestions,
        { player: currentPlayer.id, question, answer: false },
      ],
      currentQuestionIdx: (gameState.currentQuestionIdx + 1) % gameState.players.length,
    };
    setGameState(updated);
    sessionStorage.setItem(`whoami-${gameId}`, JSON.stringify(updated));
    setQuestion('');
  };

  const handleGuess = (playerGuess: string) => {
    if (!gameState || !currentPlayer) return;

    if (playerGuess.toLowerCase() === gameState.character.toLowerCase()) {
      setWinner(currentPlayer.name);
      setGameEnded(true);
      return;
    }

    const updated = {
      ...gameState,
      guesses: [...gameState.guesses, { player: currentPlayer.id, guess: playerGuess }],
      currentQuestionIdx: (gameState.currentQuestionIdx + 1) % gameState.players.length,
    };
    setGameState(updated);
    sessionStorage.setItem(`whoami-${gameId}`, JSON.stringify(updated));
    setQuestion('');
  };

  if (loading || !gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-900 to-blue-900 flex items-center justify-center">
        <p className="text-white">Wird geladen...</p>
      </div>
    );
  }

  if (gameEnded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-900 to-blue-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">🎉 {winner} hat es erraten!</h1>
          <p className="text-white text-2xl mb-8">Die Person war: <span className="font-bold text-cyan-300">{gameState.character}</span></p>
          <button
            onClick={() => router.push('/whoami')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded"
          >
            Neues Spiel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 to-blue-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">{currentPlayer?.name}</h2>
          <p className="text-blue-200 text-sm">Fragen gestellt: {answeredQuestions.length}</p>
        </div>

        {/* Question Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-6">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Stelle eine Ja/Nein Frage..."
            className="w-full px-4 py-3 bg-white/20 text-white placeholder-blue-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            rows={3}
          />

          <div className="flex gap-2">
            <button
              onClick={handleYes}
              disabled={!question.trim()}
              className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white font-bold py-2 rounded transition"
            >
              ✓ Ja
            </button>
            <button
              onClick={handleNo}
              disabled={!question.trim()}
              className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-500 text-white font-bold py-2 rounded transition"
            >
              ✗ Nein
            </button>
          </div>
        </div>

        {/* Guess Button */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
          <p className="text-white text-sm mb-3">Denk deine Person ist erraten?</p>
          <button
            onClick={() => {
              const guess = prompt('Wer bin ich?');
              if (guess) handleGuess(guess);
            }}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 rounded transition"
          >
            💭 Raten
          </button>
        </div>

        {/* Question History */}
        {answeredQuestions.length > 0 && (
          <div className="mt-8 bg-white/5 rounded-lg p-6">
            <h3 className="text-white font-bold mb-4">Fragen ({answeredQuestions.length})</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto text-sm">
              {answeredQuestions.map((q, idx) => {
                const player = gameState.players.find(p => p.id === q.player);
                return (
                  <div key={idx} className="text-blue-200">
                    <span className="text-white font-semibold">{player?.name}:</span> {q.question}
                    <span className={q.answer ? 'text-green-400' : 'text-red-400'}>
                      {' '}
                      {q.answer ? '✓ Ja' : '✗ Nein'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
