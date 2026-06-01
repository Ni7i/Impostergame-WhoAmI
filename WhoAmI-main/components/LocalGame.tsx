'use client';

import { useEffect, useState } from 'react';
import { GameRoom } from '@/lib/types';
import { nextRound, getVotingResults, allPlayersVoted, castVote } from '@/lib/gameLogic';
import LocalGameSetup from './LocalGameSetup';

interface LocalGameProps {
  initialRoom: GameRoom;
}

export default function LocalGame({ initialRoom }: LocalGameProps) {
  const [room, setRoom] = useState(initialRoom);
  const [gamePhase, setGamePhase] = useState<'setup' | 'discussion' | 'voting' | 'results' | 'ended'>('setup');
  const [timeLeft, setTimeLeft] = useState(240);
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);

  const currentPlayer = room.players[currentPlayerIdx];

  // Timer for discussion phase
  useEffect(() => {
    if (gamePhase !== 'discussion') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGamePhase('voting');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gamePhase]);

  const handleSetupComplete = () => {
    setGamePhase('discussion');
    setTimeLeft(240);
  };

  const handleVote = (targetPlayerId: string) => {
    let updated = castVote(room, currentPlayer.id, targetPlayerId);

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
          setCurrentPlayerIdx(0);
        }
      }, 4000);
    } else {
      // Next player's turn to vote
      setCurrentPlayerIdx((prev) => (prev + 1) % room.players.length);
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
      setCurrentPlayerIdx(0);
    }
  };

  // Setup phase
  if (gamePhase === 'setup') {
    return <LocalGameSetup room={room} onAllReady={handleSetupComplete} />;
  }

  // Ended
  if (gamePhase === 'ended') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">🎉 Spiel Beendet!</h1>
          <p className="text-purple-200 text-lg mb-8">Danke fürs Spielen!</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 px-6 rounded-lg"
          >
            🔄 Neues Spiel
          </button>
        </div>
      </div>
    );
  }

  const otherPlayers = room.players.filter(p => p.id !== currentPlayer.id);

  // Discussion phase
  if (gamePhase === 'discussion') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Timer */}
          <div className="text-center mb-8">
            <div className="bg-white/10 rounded-lg p-4 inline-block">
              <p className="text-purple-200 text-sm">Diskussionszeit</p>
              <p className={`text-4xl font-bold ${timeLeft <= 30 ? 'text-red-400' : 'text-white'}`}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </p>
            </div>
          </div>

          {/* Game info */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 mb-8 text-center">
            <p className="text-purple-200 mb-2">Runde {room.currentRound}/{room.totalRounds}</p>
            <p className="text-white text-2xl font-bold mb-4">Diskutiert über das Wort!</p>
            <p className="text-purple-300 text-sm">
              Ein Spieler kennt das Wort nicht - findet heraus, wer!
            </p>
          </div>

          {/* Players list */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8">
            <h3 className="text-xl font-bold text-white mb-4">👥 Alle Spieler</h3>
            <div className="grid grid-cols-2 gap-4">
              {room.players.map((player) => (
                <div key={player.id} className="bg-white/5 p-4 rounded-lg">
                  <p className="text-white font-semibold">{player.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Voting phase
  if (gamePhase === 'voting') {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">🗳️ {currentPlayer.name} wählt:</h2>
          <p className="text-purple-200 text-center mb-6">Wer ist der Imposter?</p>

          <div className="space-y-2">
            {otherPlayers.map((player) => (
              <button
                key={player.id}
                onClick={() => handleVote(player.id)}
                className="w-full p-3 rounded-lg font-semibold transition bg-white/10 text-white hover:bg-pink-500"
              >
                {player.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Results phase
  if (gamePhase === 'results' && room.results) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold text-white mb-4">🎭 Ergebnisse</h2>

          <div className="space-y-4 mb-6">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-purple-200 text-sm mb-1">Das Wort war:</p>
              <p className="text-3xl font-bold text-pink-400">{room.results.word}</p>
            </div>

            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-purple-200 text-sm mb-1">Der Imposter war:</p>
              <p className="text-2xl font-bold text-red-400">{room.results.imposterName}</p>
            </div>

            <div className={`rounded-lg p-4 ${room.results.correctGuess ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
              <p className={`text-lg font-bold ${room.results.correctGuess ? 'text-green-300' : 'text-red-300'}`}>
                {room.results.correctGuess ? '✅ Richtig erraten!' : '❌ Der Imposter entkam!'}
              </p>
            </div>
          </div>

          {room.currentRound < room.totalRounds ? (
            <button
              onClick={handleContinueRound}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              👉 Nächste Runde
            </button>
          ) : (
            <button
              onClick={handleContinueRound}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              🎉 Spiel Beendet
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}
