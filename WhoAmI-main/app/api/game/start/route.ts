import { NextRequest, NextResponse } from 'next/server';
import { startGame } from '@/lib/gameLogic';
import { gameStore } from '@/lib/gameStore';

export async function POST(request: NextRequest) {
  const { roomId } = await request.json();

  if (!roomId) {
    return NextResponse.json({ error: 'Missing roomId' }, { status: 400 });
  }

  const room = gameStore.getRoom(roomId);
  if (!room) {
    return NextResponse.json({ error: 'Room nicht gefunden' }, { status: 404 });
  }

  try {
    const updated = startGame(room);
    gameStore.updateRoom(roomId, updated);
    return NextResponse.json({ room: updated });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
