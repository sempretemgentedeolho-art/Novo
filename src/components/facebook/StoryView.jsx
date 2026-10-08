import React from "react";
import { X } from "lucide-react";
import { StatusBar } from "@/components/StatusBar";
import Pulse from "@/components/youtube/Pulse";

// História em tela cheia: dura 24 horas e depois some sozinha
export default function StoryView({ story, target, onFechar }) {
  return (
    <div className="absolute inset-0 z-[70] bg-black flex flex-col">
      <img src={story.imagem} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 flex flex-col h-full">
        <StatusBar variant="dark" />

        <div className="flex gap-1 px-3 pt-1">
          {[0, 1, 2, 3].map((barra) => (
            <div key={barra} className="h-1 flex-1 rounded-full bg-white/40">
              <div className={`h-full rounded-full bg-white ${barra === 0 ? "w-full" : "w-0"}`} />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 px-4 py-3">
          <img
            src={story.foto}
            alt={story.nome}
            className="w-11 h-11 rounded-full object-cover border-2 border-white"
          />
          <div className="flex-1">
            <p className="text-white font-bold text-sm">{story.nome}</p>
            <p className="text-white/80 text-xs">
              {story.proprio ? "Sua história · fica 24 horas no ar" : "agora mesmo"}
            </p>
          </div>
          <Pulse active={target === "story_fechar"} ring="rounded-full">
            <button
              onClick={onFechar}
              aria-label="Fechar história"
              className="w-11 h-11 rounded-full bg-black/40 flex items-center justify-center"
            >
              <X className="w-7 h-7 text-white" />
            </button>
          </Pulse>
        </div>

        <div className="flex-1" />

        <p className="px-5 pb-4 text-white text-xl font-semibold text-center drop-shadow">
          {story.legenda}
        </p>
        <p className="px-5 pb-6 text-white/80 text-xs text-center">
          Toque no X para fechar · a história desaparece depois de 24 horas
        </p>
      </div>
    </div>
  );
}