import React from "react";
import { Play, Radio } from "lucide-react";

const LIVES = [
  {
    id: 1,
    titulo: "Missa ao vivo da Paróquia Central",
    canal: "Paróquia Central",
    gente: "2,3 mil assistindo agora",
    thumb: "from-rose-500 to-red-700",
  },
  {
    id: 2,
    titulo: "Seresta ao vivo da comunidade",
    canal: "Saudade Musical",
    gente: "1,1 mil assistindo agora",
    thumb: "from-purple-500 to-pink-600",
  },
  {
    id: 3,
    titulo: "Notícias ao vivo, direto da redação",
    canal: "Jornal da Manhã",
    gente: "870 assistindo agora",
    thumb: "from-sky-400 to-blue-600",
  },
];

// Transmissões ao vivo: o que está passando naquele exato momento
export default function AoVivoView() {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <div className="flex items-center gap-2 pt-3">
        <Radio className="w-5 h-5 text-red-600" />
        <h2 className="text-lg font-bold text-gray-900">Ao vivo agora</h2>
      </div>
      <p className="text-xs text-gray-600 mt-1 mb-4 leading-snug">
        Ao vivo quer dizer que está acontecendo neste momento, como na televisão. O selo vermelho
        mostra que o vídeo está sendo transmitido na hora.
      </p>

      <div className="space-y-4">
        {LIVES.map((live) => (
          <div key={live.id} className="flex gap-3">
            <div
              className={`relative w-28 h-16 rounded-lg bg-gradient-to-br ${live.thumb} flex items-center justify-center shrink-0`}
            >
              <Play className="w-5 h-5 text-white" fill="currentColor" />
              <span className="absolute bottom-1 left-1 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                AO VIVO
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 leading-snug">{live.titulo}</p>
              <p className="text-xs text-gray-600 mt-0.5">{live.canal}</p>
              <p className="text-xs text-red-600 mt-0.5 font-medium">{live.gente}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}