'use client';

import { useRouter } from 'next/navigation';

export default function GameModeSelector() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">🎮 Spiele</h1>
          <p className="text-purple-200">Wähle ein Spiel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Imposter Game */}
          <button
            onClick={() => router.push('/imposter')}
            className="group relative overflow-hidden rounded-lg p-8 transition"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-500 group-hover:from-pink-600 group-hover:to-rose-600 transition"></div>
            <div className="relative z-10 text-center space-y-4">
              <div className="text-5xl mb-4">🕵️</div>
              <h2 className="text-2xl font-bold text-white">Imposter</h2>
              <p className="text-white/80 text-sm">
                Einer ist der Imposter! Findet heraus wer das Wort nicht kennt.
              </p>
              <div className="text-white/70 text-xs mt-4 pt-4 border-t border-white/30">
                1-16 Spieler • 4 Min pro Runde
              </div>
            </div>
          </button>

          {/* Who Am I Game */}
          <button
            onClick={() => router.push('/whoami')}
            className="group relative overflow-hidden rounded-lg p-8 transition"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-600 group-hover:to-blue-600 transition"></div>
            <div className="relative z-10 text-center space-y-4">
              <div className="text-5xl mb-4">🎭</div>
              <h2 className="text-2xl font-bold text-white">Wer bin ich?</h2>
              <p className="text-white/80 text-sm">
                Gebt Hinweise, damit die Person errät wer sie ist!
              </p>
              <div className="text-white/70 text-xs mt-4 pt-4 border-t border-white/30">
                2-4 Spieler • Bekannte Personen
              </div>
            </div>
          </button>
        </div>

        <div className="mt-12 text-center text-purple-300 text-sm">
          <p>Mehr Spiele folgen bald...</p>
        </div>
      </div>
    </div>
  );
}
