import React from "react";
import { X, Play } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

// Vídeo em tela cheia: só o vídeo aparece, sem os outros botões
export default function TelaCheiaView({ target, onTap }) {
  return (
    <div className="absolute inset-0 z-[60] bg-black flex flex-col">
      <Pulse active={target === "sair_tela_cheia"} ring="rounded-full">
        <button
          type="button"
          onClick={() => onTap("sair_tela_cheia")}
          className="absolute top-3 left-3 z-10 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </Pulse>

      <div className="flex-1 flex items-center justify-center px-2">
        <div className="relative w-full aspect-video rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
          </div>
          <span className="absolute bottom-2 right-3 text-white/90 text-xs">12:40 / 12:40</span>
        </div>
      </div>

      <div className="px-4 pb-5">
        <p className="text-white text-sm font-semibold leading-snug">
          Receita de bolo de cenoura fácil e fofinho
        </p>
        <p className="text-white/70 text-xs mt-1">Cozinha da Vovó · 1,2 mi de visualizações</p>
        <p className="text-white/50 text-[11px] mt-3 leading-snug">
          Para ver bem maior, vire o celular de lado. Toque no X para voltar ao normal.
        </p>
      </div>
    </div>
  );
}