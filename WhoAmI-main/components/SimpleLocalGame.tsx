'use client';

import { useEffect, useState } from 'react';
import { GameRoom } from '@/lib/types';
import { nextRound, getVotingResults, allPlayersVoted, castVote } from '@/lib/gameLogic';
import SimpleLocalGameSetup from './SimpleLocalGameSetup';

interface SimpleLocalGameProps {
  initialRoom: GameRoom;
}

export default function SimpleLocalGame({ initialRoom }: SimpleLocalGameProps) {
  const [room, setRoom] = useState(initialRoom);
  const [gamePhase, setGamePhase] = useState<'setup' | 'discussion' | 'voting' | 'results' | 'ended'>('setup');
  const [timeLeft, setTimeLeft] = useState(240);
  const [currentVoterIdx, setCurrentVoterIdx] = useState(0);
  const [suspectedPlayer, setSuspectedPlayer] = useState<string | null>(null);

  const currentVoter = room.players[currentVoterIdx];

  // Timer
  useEffect(() => {
    if (gamePhase !== 'discussion') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [gamePhase]);

  const handleSetupComplete = () => {
    setGamePhase('discussion');
    setTimeLeft(240);
  };

  const handleReportImposter = (playerId: string) => {
    setSuspectedPlayer(playerId);
    setGamePhase('voting');
  };

  const handleVote = (targetPlayerId: string) => {
    let updated = castVote(room, currentVoter.id, targetPlayerId);

    if (allPlayersVoted(updated)) {
      const results = getVotingResults(updated);
      updated = { ...updated, status: 'results', results };
      setRoom(updated);
      setGamePhase('results');

      setTimeout(() => {
        if (room.currentRound >= room.totalRounds) {
          setGamePhase('ended');
        } else {
          const nextRoomState = nextRound(updated);
          setRoom(nextRoomState);
          setGamePhase('setup');
          setTimeLeft(240);
          setCurrentVoterIdx(0);
          setSuspectedPlayer(null);
        }
      }, 3000);
    } else {
      setCurrentVoterIdx((prev) => (prev + 1) % room.players.length);
      setRoom(updated);
    }
  };

  const handleContinueRound = () => {
    if (room.currentRound >= room.totalRounds) {
      setGamePhase('ended');
    } else {
      const nextRoomState = nextRound(room);
      setRoom(nextRoomState);
      setGamePhase('setup');
      setTimeLeft(240);
      setCurrentVoterIdx(0);
      setSuspectedPlayer(null);
    }
  };

  const handleBackToSetup = () => {
    setGamePhase('setup');
    setSuspectedPlayer(null);
  };

  const handleBackToDiscussion = () => {
    setGamePhase('discussion');
    setCurrentVoterIdx(0);
  };

  const handleBackToNames = () => {
    window.location.reload();
  };

  if (gamePhase === 'setup') {
    return <SimpleLocalGameSetup room={room} onAllReady={handleSetupComplete} onBack={handleBackToNames} />;
  }

  if (gamePhase === 'ended') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">🎉 Fertig!</h1>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded"
          >
            Neues Spiel
          </button>
        </div>
      </div>
    );
  }

  // Discussion phase
  if (gamePhase === 'discussion') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-2xl font-bold text-white mb-2">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <div className="text-purple-200 text-sm">Runde {room.currentRound}/{room.totalRounds}</div>
          </div>

          {/* Players Grid */}
          <div className={`grid gap-2 mb-6`} style={{gridTemplateColumns: `repeat(${Math.min(4, room.players.length)}, 1fr)`}}>
            {room.players.map((player) => (
              <button
                key={player.id}
                onClick={() => handleReportImposter(player.id)}
                className="p-4 bg-white/10 hover:bg-red-500/30 text-white rounded font-semibold text-sm transition"
              >
                {player.name}
              </button>
            ))}
          </div>

          <div className="text-center text-purple-200 text-xs mb-4">
            Klick um zu melden!
          </div>

          <div className="text-center">
            <button
              onClick={handleBackToSetup}
              className="text-white/60 hover:text-white text-sm transition"
            >
              ← Rollen nochmal anschauen
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Voting phase
  if (gamePhase === 'voting') {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg p-6 w-full max-w-sm">
          <h2 className="text-xl font-bold text-white mb-4 text-center">
            {currentVoter.name} stimmt ab
          </h2>

          <div className="space-y-2 mb-4">
            {room.players
              .filter(p => p.id !== currentVoter.id)
              .map((player) => (
                <button
                  key={player.id}
                  onClick={() => handleVote(player.id)}
                  className="w-full p-3 bg-white/10 hover:bg-pink-500 text-white rounded font-semibold text-sm transition"
                >
                  {player.name}
                </button>
              ))}
          </div>

          <button
            onClick={handleBackToDiscussion}
            className="w-full text-white/60 hover:text-white text-sm transition py-2"
          >
            ← Zurück zur Diskussion
          </button>
        </div>
      </div>
    );
  }

  // Results phase
  if (gamePhase === 'results' && room.results) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg p-6 w-full max-w-sm text-center">
          <div className="mb-6">
            <div className="text-lg font-bold text-white mb-2">Wort: {room.results.word}</div>
            <div className="text-lg font-bold text-red-400 mb-4">Imposter: {room.results.imposterName}</div>
            <div className={`text-lg font-bold ${room.results.correctGuess ? 'text-green-400' : 'text-red-400'}`}>
              {room.results.correctGuess ? '✅ Gewonnen!' : '❌ Fehlgeschlagen!'}
            </div>
          </div>

          <button
            onClick={handleContinueRound}
            className={`w-full py-2 rounded font-bold text-white mb-2 ${
              room.currentRound < room.totalRounds
                ? 'bg-white/20 hover:bg-white/30'
                : 'bg-pink-500 hover:bg-pink-600'
            }`}
          >
            {room.currentRound < room.totalRounds ? 'Nächste Runde' : 'Fertig'}
          </button>

          <button
            onClick={handleBackToSetup}
            className="w-full text-white/60 hover:text-white text-sm transition py-2"
          >
            ← Rollen anschauen
          </button>
        </div>
      </div>
    );
  }

  return null;
}
