import { GameRoom } from './types';

// In-memory store (für Vercel würde KV/Redis benötigt)
const rooms = new Map<string, GameRoom>();

export const gameStore = {
  createRoom: (room: GameRoom) => {
    rooms.set(room.id, room);
    return room;
  },

  getRoom: (id: string) => {
    return rooms.get(id);
  },

  updateRoom: (id: string, room: GameRoom) => {
    rooms.set(id, room);
    return room;
  },

  removeRoom: (id: string) => {
    rooms.delete(id);
  },

  getAllRooms: () => {
    return Array.from(rooms.values());
  },

  roomExists: (id: string) => {
    return rooms.has(id);
  },
};
