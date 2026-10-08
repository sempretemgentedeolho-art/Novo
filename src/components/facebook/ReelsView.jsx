import React, { useState } from "react";
import { ThumbsUp, ChevronRight } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import { REELS } from "@/components/facebook/facebookData";

// A tela Reels: vídeos curtinhos, de menos de um minuto, um atrás do outro
export default function ReelsView({ target, onAvancar }) {
  const [indice, setIndice] = useState(0);
  const [curtidos, setCurtidos] = useState([]);
  const reel = REELS[indice];
  const curtido = curtidos.includes(reel.id);

  const proximo = () => {
    setIndice((i) => (i + 1) % REELS.length);
    onAvancar("reels_proximo");
  };

  const curtir = () => {
    setCurtidos((anteriores) =>
      anteriores.includes(reel.id)
        ? anteriores.filter((id) => id !== reel.id)
        : [...anteriores, reel.id]
    );
    onAvancar("reels_curtir");
  };

  return (
    <div className="flex-1 flex flex-col bg-black min-h-0">
      <div className="relative flex-1 min-h-0">
        <img src={reel.imagem} alt="" className="w-full h-full object-cover" />

        <div className="absolute right-3 bottom-20">
          <Pulse active={target === "reels_curtir"} ring="rounded-full" className="flex flex-col items-center">
            <button onClick={curtir} className="flex flex-col items-center">
              <span
                className={`w-11 h-11 rounded-full flex items-center justify-center ${
                  curtido ? "bg-[#1877F2]" : "bg-black/60"
                }`}
              >
                <ThumbsUp className="w-5 h-5 text-white" />
              </span>
              <span className="text-[11px] font-semibold text-white mt-1">
                {reel.curtidas + (curtido ? 1 : 0)}
              </span>
            </button>
          </Pulse>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 to-transparent">
          <p className="text-sm font-bold text-white">{reel.autor}</p>
          <p className="text-xs text-white leading-snug mt-1">{reel.legenda}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 shrink-0">
        <p className="flex-1 text-[11px] text-white leading-snug">
          Reels são vídeos bem curtos, de menos de um minuto. Toque no joinha se você gostar e em
          PRÓXIMO para ver outro.
        </p>
        <Pulse active={target === "reels_proximo"} ring="rounded-full">
          <button
            onClick={proximo}
            className="px-3 py-2 rounded-full bg-white text-black text-sm font-bold flex items-center gap-1"
          >
            Próximo <ChevronRight className="w-4 h-4" />
          </button>
        </Pulse>
      </div>
    </div>
  );
}