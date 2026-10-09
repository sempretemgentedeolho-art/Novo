import React from "react";
import { ArrowLeft, Search } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

// Barra de cima do TikTok: voltar, as duas listas de vídeos e a busca
export default function TikTokHeader({ target, onBack, onBuscar }) {
  return (
    <div className="shrink-0 relative z-30 flex items-center justify-between px-4 py-2 bg-black">
      <Pulse active={target === "terminar"} ring="rounded-full">
        <button
          onClick={onBack}
          aria-label="Voltar"
          className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      </Pulse>

      <div className="flex items-center gap-5 text-sm">
        <span className="text-white/60 font-medium">Seguindo</span>
        <span className="text-white font-bold border-b-2 border-white pb-0.5">Para você</span>
      </div>

      <button
        onClick={onBuscar}
        aria-label="Procurar no TikTok"
        className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
      >
        <Search className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}