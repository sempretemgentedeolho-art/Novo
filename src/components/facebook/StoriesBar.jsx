import React from "react";
import { Plus } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import { STORIES } from "@/components/facebook/facebookData";

// Fileira de histórias: a primeira bolinha cria a sua história
export default function StoriesBar({ target, onAbrir, onCriar }) {
  return (
    <div className="bg-white border-b border-gray-200 py-3">
      <p className="px-3 text-sm font-bold text-gray-900 mb-2">Stories (histórias de 24 horas)</p>
      <div className="flex gap-3 overflow-x-auto px-3">
        <Pulse active={target === "story_criar"} className="shrink-0" ring="rounded-2xl">
          <button onClick={onCriar} className="w-[74px] flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center">
              <Plus className="w-7 h-7 text-gray-600" />
            </div>
            <span className="text-[11px] text-gray-700 mt-1">Criar story</span>
          </button>
        </Pulse>

        {STORIES.map((story, index) => (
          <Pulse
            key={story.id}
            active={target === "story_abrir" && index === 0}
            className="shrink-0"
            ring="rounded-2xl"
          >
            <button onClick={() => onAbrir(story)} className="w-[74px] flex flex-col items-center">
              <div className="w-16 h-16 rounded-full p-[3px] bg-gradient-to-br from-[#1877F2] to-sky-400">
                <img
                  src={story.foto}
                  alt={story.nome}
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
              </div>
              <span className="text-[11px] text-gray-800 mt-1 truncate w-full text-center">
                {story.nome.split(" ")[0]}
              </span>
            </button>
          </Pulse>
        ))}
      </div>
    </div>
  );
}