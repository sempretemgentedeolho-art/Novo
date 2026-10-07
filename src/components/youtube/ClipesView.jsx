import React, { useState } from "react";
import { Play, Scissors, Eye } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

const CLIPES = [
  {
    id: 1,
    titulo: "O segredo do bolo bem fofinho",
    autor: "Clipe feito pela comunidade",
    tempo: "0:28",
    views: "12 mil",
    thumb: "from-orange-400 to-orange-600",
  },
  {
    id: 2,
    titulo: "Como descascar a cenoura com segurança",
    autor: "Dona Marlene",
    tempo: "0:45",
    views: "8,4 mil",
    thumb: "from-emerald-500 to-green-700",
  },
  {
    id: 3,
    titulo: "A hora certa de colocar o chocolate",
    autor: "Clipe feito pela comunidade",
    tempo: "0:19",
    views: "5,1 mil",
    thumb: "from-rose-500 to-red-700",
  },
];

// Clipes: pedacinhos curtos que as pessoas cortam dos vídeos
export default function ClipesView({ target, onTap }) {
  const [tocando, setTocando] = useState(null);

  const assistir = (id) => {
    setTocando(id);
    onTap(id === 1 ? "clipe_assistir" : "outro_clipe");
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <div className="flex items-center gap-2 pt-3">
        <Scissors className="w-5 h-5 text-red-600" />
        <h2 className="text-xl font-bold text-gray-900">Clipes</h2>
      </div>
      <p className="text-base text-gray-700 mt-1 mb-4 leading-snug">
        Clipe é um pedacinho curto do vídeo, de menos de um minuto, que alguém cortou. Serve para ver
        o melhor pedaço bem rápido, sem assistir ao vídeo inteiro.
      </p>

      <div className="space-y-3">
        {CLIPES.map((clipe) => (
          <Pulse
            key={clipe.id}
            active={target === "clipe_assistir" && clipe.id === 1}
            className="w-full"
            ring="rounded-2xl"
          >
            <button
              type="button"
              onClick={() => assistir(clipe.id)}
              className={`w-full flex gap-3 rounded-2xl border-2 px-3 py-3 text-left ${
                tocando === clipe.id ? "border-red-600 bg-red-50" : "border-gray-200"
              }`}
            >
              <div
                className={`relative w-20 h-14 rounded-xl bg-gradient-to-br ${clipe.thumb} flex items-center justify-center shrink-0`}
              >
                <Play className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 leading-snug">{clipe.titulo}</p>
                <p className="text-sm text-gray-600 mt-0.5 leading-snug">{clipe.autor}</p>
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <Eye className="w-3.5 h-3.5" /> {clipe.views} · {clipe.tempo}
                </p>
              </div>
            </button>
          </Pulse>
        ))}
      </div>

      <p className="mt-4 text-sm text-gray-700 leading-snug rounded-2xl bg-gray-50 px-3 py-3">
        {tocando
          ? "O clipe está passando agora. Ele dura menos de um minuto e depois volta sozinho para esta lista."
          : "Toque em um clipe para assistir. Qualquer pessoa pode cortar um clipe de um vídeo que está assistindo."}
      </p>
    </div>
  );
}