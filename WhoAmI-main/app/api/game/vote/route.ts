import { NextRequest, NextResponse } from 'next/server';
import { castVote, getVotingResults, nextRound, allPlayersVoted } from '@/lib/gameLogic';
import { gameStore } from '@/lib/gameStore';

export async function POST(request: NextRequest) {
  const { roomId, playerId, targetPlayerId } = await request.json();

  if (!roomId || !playerId || !targetPlayerId) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const room = gameStore.getRoom(roomId);
  if (!room) {
    return NextResponse.json({ error: 'Room nicht gefunden' }, { status: 404 });
  }

  try {
    let updated = castVote(room, playerId, targetPlayerId);

    if (allPlayersVoted(updated)) {
      const results = getVotingResults(updated);
      updated = { ...updated, status: 'results', results };

      setTimeout(() => {
        const currentRoom = gameStore.getRoom(roomId);
        if (currentRoom) {
          const nextRoomState = nextRound(currentRoom);
          gameStore.updateRoom(roomId, nextRoomState);
        }
      }, 5000);
    }

    gameStore.updateRoom(roomId, updated);
    return NextResponse.json({ room: updated });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
