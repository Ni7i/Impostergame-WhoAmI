# 🎭 Imposter Game

Multiplayer Imposter-Spiel im Browser. Einer ist der Imposter, die anderen müssen ihn/sie herausfinden!

## Features

✅ **4-Player Game** - Neues Spiel erstellen oder per Code beitreten  
✅ **Imposter Mechanic** - Ein zufälliger Spieler kennt das Wort nicht  
✅ **Round-Based** - 3 Runden mit Diskussionen und Abstimmung  
✅ **150+ Wörter** - Random word selection pro Runde  
✅ **Real-Time Updates** - Spielstatus synchronisiert sich automatisch  

## Spielablauf

1. **Lobby**: Host erstellt Spiel, andere Spieler treten per Code bei
2. **Game Start**: Host startet → Wort wird verteilt
3. **Discussion** (120s): Normale Spieler geben Hinweise, Imposter rät
4. **Voting**: Wer ist der Imposter?
5. **Results**: Wer war richtig? Nächste Runde oder Game Over

## Tech Stack

- **Frontend**: Next.js 14 + React + TailwindCSS
- **Backend**: Next.js API Routes
- **State**: Zustand (Client) + In-Memory (Server)
- **Deployment**: Vercel

## Getting Started

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Testing mit CLI

```bash
# Spiel erstellen
curl -X POST http://localhost:3000/api/game/create \
  -H "Content-Type: application/json" \
  -d '{"playerId":"p1","playerName":"Alice"}'

# Spieler joinen
curl -X POST http://localhost:3000/api/game/join \
  -H "Content-Type: application/json" \
  -d '{"roomId":"XXXXX","playerId":"p2","playerName":"Bob"}'

# Spiel starten
curl -X POST http://localhost:3000/api/game/start \
  -H "Content-Type: application/json" \
  -d '{"roomId":"XXXXX"}'
```

## Deploy auf Vercel

### Option 1: Schnell (Git Push)
```bash
cd imposter-game
git push
# Oder mit Vercel CLI: vercel
```

### Option 2: Mit Vercel KV (Production-Ready)
```bash
vercel env add KV_REST_API_URL
vercel env add KV_REST_API_TOKEN
# Dann update gameStore.ts mit KV
```

## Regeln

- **Das Wort** wird nur den normalen Spielern angezeigt
- **Imposter** sieht nur "Du bist der Imposter!"
- **Abstimmung**: Alle stimmen gleichzeitig ab
- **Gewinn**: Wenn die Imposter identifiziert wird, gewinnen normale Spieler

## File Structure

```
├── app/api/game/     # API endpoints (create, join, start, vote, status)
├── app/game/[roomId] # Game room page
├── components/       # React components
├── lib/              # Game logic, store, types, words
└── README.md
```
