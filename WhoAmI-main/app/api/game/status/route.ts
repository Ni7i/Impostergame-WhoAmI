import { NextRequest, NextResponse } from 'next/server';
import { gameStore } from '@/lib/gameStore';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get('roomId');

  if (!roomId) {
    return NextResponse.json({ error: 'Missing roomId' }, { status: 400 });
  }

  const room = gameStore.getRoom(roomId);
  if (!room) {
    return NextResponse.json({ error: 'Room nicht gefunden' }, { status: 404 });
  }

  return NextResponse.json({ room });
}
