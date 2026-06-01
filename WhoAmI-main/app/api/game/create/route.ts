import { NextRequest, NextResponse } from 'next/server';
import { createGameRoom } from '@/lib/gameLogic';
import { gameStore } from '@/lib/gameStore';

export async function POST(request: NextRequest) {
  const { playerId, playerName } = await request.json();

  if (!playerId || !playerName) {
    return NextResponse.json({ error: 'Missing playerId or playerName' }, { status: 400 });
  }

  const room = createGameRoom(playerId, playerName);
  gameStore.createRoom(room);

  return NextResponse.json({ room });
}
