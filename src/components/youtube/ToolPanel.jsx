import React from "react";
import Pulse from "@/components/youtube/Pulse";

// Painel que sobe por baixo no editor do Short, com o botão Concluir
export default function ToolPanel({ titulo, dica, concluirAtivo, onConcluir, children }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-30 max-h-[68%] rounded-t-3xl bg-gray-950/95 backdrop-blur-sm flex flex-col">
      <div className="flex items-start justify-between gap-3 px-4 pt-4 pb-3">
        <div className="flex-1">
          <p className="text-white text-base font-semibold">{titulo}</p>
          {dica && <p className="text-white/60 text-xs mt-0.5 leading-snug">{dica}</p>}
        </div>
        <Pulse active={concluirAtivo} ring="rounded-full">
          <button
            type="button"
            onClick={onConcluir}
            className="px-5 py-2 rounded-full bg-white text-gray-900 text-sm font-semibold"
          >
            Concluir
          </button>
        </Pulse>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6">{children}</div>
    </div>
  );
}