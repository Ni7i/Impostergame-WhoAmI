export interface Player {
  id: string;
  name: string;
  isImposter: boolean;
  hasVoted: boolean;
  vote?: string;
}

export interface GameRoom {
  id: string;
  host: string;
  players: Player[];
  status: 'lobby' | 'playing' | 'voting' | 'results' | 'ended';
  word?: string;
  currentRound: number;
  totalRounds: number;
  results?: GameResults;
  createdAt: number;
}

export interface GameResults {
  word: string;
  voteCounts: { [playerId: string]: number };
  correctGuess: boolean;
  imposterName: string;
  eliminatedName: string;
}
