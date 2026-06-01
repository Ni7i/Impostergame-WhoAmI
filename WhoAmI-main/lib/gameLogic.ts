import { GameRoom, Player, GameResults } from './types';
import { getRandomWord } from './words';
import { v4 as uuidv4 } from 'uuid';

export function createGameRoom(hostId: string, hostName: string): GameRoom {
  return {
    id: uuidv4().slice(0, 8).toUpperCase(),
    host: hostId,
    players: [{ id: hostId, name: hostName, isImposter: false, hasVoted: false }],
    status: 'lobby',
    currentRound: 1,
    totalRounds: 3,
    createdAt: Date.now(),
  };
}

export function addPlayerToRoom(room: GameRoom, playerId: string, playerName: string): GameRoom {
  if (room.players.length >= 4) {
    throw new Error('Room voll - max. 4 Spieler');
  }
  if (room.players.some(p => p.id === playerId)) {
    throw new Error('Spieler bereits im Zimmer');
  }

  return {
    ...room,
    players: [...room.players, { id: playerId, name: playerName, isImposter: false, hasVoted: false }],
  };
}

export function startGame(room: GameRoom): GameRoom {
  if (room.players.length < 2) {
    throw new Error('Mindestens 2 Spieler nötig');
  }

  const word = getRandomWord();
  const imposterIndex = Math.floor(Math.random() * room.players.length);

  const updatedPlayers = room.players.map((p, idx) => ({
    ...p,
    isImposter: idx === imposterIndex,
    hasVoted: false,
  }));

  return {
    ...room,
    word,
    status: 'playing',
    players: updatedPlayers,
    currentRound: 1,
  };
}

export function castVote(room: GameRoom, voterId: string, targetPlayerId: string): GameRoom {
  const voter = room.players.find(p => p.id === voterId);
  if (!voter) throw new Error('Spieler nicht gefunden');
  if (voter.hasVoted) throw new Error('Du hast bereits abgestimmt');

  return {
    ...room,
    players: room.players.map(p =>
      p.id === voterId ? { ...p, hasVoted: true, vote: targetPlayerId } : p
    ),
  };
}

export function allPlayersVoted(room: GameRoom): boolean {
  return room.players.every(p => p.hasVoted);
}

export function getVotingResults(room: GameRoom): GameResults {
  const voteCounts: { [playerId: string]: number } = {};
  const playerNames: { [playerId: string]: string } = {};

  room.players.forEach(p => {
    voteCounts[p.id] = 0;
    playerNames[p.id] = p.name;
  });

  room.players.forEach(p => {
    if (p.vote) {
      voteCounts[p.vote] = (voteCounts[p.vote] || 0) + 1;
    }
  });

  const mostVotes = Math.max(...Object.values(voteCounts));
  const eliminated = Object.entries(voteCounts).find(([_, count]) => count === mostVotes)?.[0];

  const imposter = room.players.find(p => p.isImposter);
  const correctGuess = eliminated === imposter?.id;

  return {
    word: room.word || 'Unbekannt',
    voteCounts,
    correctGuess,
    imposterName: imposter?.name || 'Unbekannt',
    eliminatedName: playerNames[eliminated || ''],
  };
}

export function nextRound(room: GameRoom): GameRoom {
  if (room.currentRound >= room.totalRounds) {
    return { ...room, status: 'ended' };
  }

  const word = getRandomWord();
  const imposterIndex = Math.floor(Math.random() * room.players.length);

  return {
    ...room,
    word,
    currentRound: room.currentRound + 1,
    players: room.players.map((p, idx) => ({
      ...p,
      isImposter: idx === imposterIndex,
      hasVoted: false,
      vote: undefined,
    })),
    status: 'playing',
  };
}
