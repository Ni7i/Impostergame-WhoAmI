'use client';

import { useState } from 'react';
import { GameRoom } from '@/lib/types';

interface WhoAmIGameLocalProps {
  initialRoom: GameRoom;
}

export default function WhoAmIGameLocal({ initialRoom }: WhoAmIGameLocalProps) {
  const [room] = useState(initialRoom);
  const [gamePhase, setGamePhase] = useState<'reveal' | 'hints' | 'guessing' | 'ended'>('reveal');
  const [currentHinterIdx, setCurrentHinterIdx] = useState(0);
  const [hints, setHints] = useState<string[]>([]);
  const [hint, setHint] = useState('');
  const [guess, setGuess] = useState('');

  const imposter = room.players.find(p => p.isImposter);
  const word = room.word;
  const currentHinter = room.players[currentHinterIdx];
  const isImposterHinter = currentHinter?.isImposter;

  const handleShowReveal = () => {
    setGamePhase('hints');
    // Skip imposter in hinting rotation
    const firstHinterIdx = room.players.findIndex((_, idx) => idx !== room.players.findIndex(p => p.isImposter));
    setCurrentHinterIdx(firstHinterIdx >= 0 ? firstHinterIdx : 0);
  };

  const handleGiveHint = () => {
    if (!hint.trim()) return;

    const newHints = [...hints, hint];
    setHints(newHints);
    setHint('');

    // Move to next hinter (skip imposter)
    let nextIdx = (currentHinterIdx + 1) % room.players.length;
    while (room.players[nextIdx].isImposter) {
      nextIdx = (nextIdx + 1) % room.players.length;
    }

    // Check if we've cycled through all non-imposters
    if (nextIdx === (room.players.findIndex(p => p.isImposter) === 0 ? 1 : 0)) {
      setGamePhase('guessing');
    } else {
      setCurrentHinterIdx(nextIdx);
    }
  };

  const handleGuess = () => {
    if (!guess.trim()) return;

    const correct = guess.toLowerCase() === word?.toLowerCase();
    if (correct) {
      setGamePhase('ended');
    } else {
      setGuess('');
    }
  };

  // Reveal phase - show word to everyone except imposter
  if (gamePhase === 'reveal') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-900 to-blue-900 p-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">🎭</h1>
            <h2 className="text-2xl font-bold text-white">Wer bin ich?</h2>
          </div>

          <div className="space-y-4">
            {room.players.map((player) => {
              const isImp = player.isImposter;
              return (
                <div
                  key={player.id}
                  className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-center"
                >
                  {isImp ? (
                    <div>
                      <h3 className="text-white text-xl font-bold mb-2">{player.name}</h3>
                      <p className="text-red-300 text-sm">🚫 Du kennst die Person nicht!</p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-white text-xl font-bold mb-2">{player.name}</h3>
                      <p className="text-cyan-300 text-2xl font-bold">{word}</p>
                      <p className="text-blue-200 text-xs mt-2">Gib Hinweise, aber sag nicht direkt!</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={handleShowReveal}
            className="w-full mt-8 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition"
          >
            Spiel Starten →
          </button>
        </div>
      </div>
    );
  }

  // Guessing phase
  if (gamePhase === 'guessing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-900 to-blue-900 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">{imposter?.name}</h2>
            <p className="text-blue-200 text-sm">Ratephase! 💭</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-6 space-y-4">
            <p className="text-white text-center font-semibold">
              Wer bin ich?
            </p>
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Deine Antwort..."
              onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
              className="w-full px-4 py-3 bg-white/20 text-white placeholder-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              onClick={handleGuess}
              disabled={!guess.trim()}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-500 text-white font-bold py-2 rounded transition"
            >
              Raten
            </button>
          </div>

          {hints.length > 0 && (
            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-white font-bold mb-4">💡 Hinweise ({hints.length})</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto text-sm">
                {hints.map((h, idx) => (
                  <div key={idx} className="text-blue-200">
                    <span className="text-white font-semibold">Hinweis {idx + 1}:</span> {h}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Hints phase
  if (gamePhase === 'hints') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-900 to-blue-900 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">{currentHinter?.name}</h2>
            <p className="text-blue-200 text-sm">Hinweis geben! 💡</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-6 space-y-4">
            <textarea
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              placeholder="Gib einen Hinweis..."
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleGiveHint()}
              className="w-full px-4 py-3 bg-white/20 text-white placeholder-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              rows={3}
            />
            <button
              onClick={handleGiveHint}
              disabled={!hint.trim()}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-500 text-white font-bold py-2 rounded transition"
            >
              Nächster Spieler →
            </button>
          </div>

          {hints.length > 0 && (
            <div className="bg-white/5 rounded-lg p-6">
              <h3 className="text-white font-bold mb-4">💡 Bisherige Hinweise ({hints.length})</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto text-sm">
                {hints.map((h, idx) => (
                  <div key={idx} className="text-blue-200 border-l-2 border-cyan-500 pl-3">
                    {h}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Ended phase
  if (gamePhase === 'ended') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-900 to-blue-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">🎉 Richtig!</h1>
          <p className="text-white text-2xl mb-4">
            {imposter?.name} war: <span className="font-bold text-cyan-300">{word}</span>
          </p>
          <p className="text-blue-300 text-sm mb-8">
            Es gab {hints.length} Hinweis{hints.length !== 1 ? 'e' : ''}!
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded"
          >
            Neues Spiel
          </button>
        </div>
      </div>
    );
  }
}
