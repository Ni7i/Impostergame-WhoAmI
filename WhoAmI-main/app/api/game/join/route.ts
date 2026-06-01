import { NextRequest, NextResponse } from 'next/server';
import { addPlayerToRoom } from '@/lib/gameLogic';
import { gameStore } from '@/lib/gameStore';

export async function POST(request: NextRequest) {
  const { roomId, playerId, playerName } = await request.json();

  if (!roomId || !playerId || !playerName) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const room = gameStore.getRoom(roomId);
  if (!room) {
    return NextResponse.json({ error: 'Room nicht gefunden' }, { status: 404 });
  }

  try {
    const updated = addPlayerToRoom(room, playerId, playerName);
    gameStore.updateRoom(roomId, updated);
    return NextResponse.json({ room: updated });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
