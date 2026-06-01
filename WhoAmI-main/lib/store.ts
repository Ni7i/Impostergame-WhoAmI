import { create } from 'zustand';
import { GameRoom } from './types';

interface GameStore {
  playerId: string;
  playerName: string;
  roomId: string | null;
  room: GameRoom | null;
  word: string | null;
  isImposter: boolean;
  setPlayerId: (id: string) => void;
  setPlayerName: (name: string) => void;
  setRoomId: (id: string) => void;
  setRoom: (room: GameRoom) => void;
  setWord: (word: string | null) => void;
  setIsImposter: (isImposter: boolean) => void;
  reset: () => void;
}

const generatePlayerId = () => `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useGameStore = create<GameStore>((set) => ({
  playerId: generatePlayerId(),
  playerName: '',
  roomId: null,
  room: null,
  word: null,
  isImposter: false,

  setPlayerId: (id) => set({ playerId: id }),
  setPlayerName: (name) => set({ playerName: name }),
  setRoomId: (id) => set({ roomId: id }),
  setRoom: (room) => set({ room }),
  setWord: (word) => set({ word }),
  setIsImposter: (isImposter) => set({ isImposter }),
  reset: () =>
    set({
      roomId: null,
      room: null,
      word: null,
      isImposter: false,
    }),
}));
