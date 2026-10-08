import React from "react";
import { Play } from "lucide-react";
import { VIDEOS } from "@/components/facebook/facebookData";

// A aba Vídeo: o que o Facebook separa para você assistir
export default function VideoView() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-100">
      <div className="bg-white p-3">
        <h2 className="text-lg font-bold text-gray-900">Vídeo</h2>
        <p className="text-xs text-gray-600 mt-0.5 leading-snug">
          Nesta aba o Facebook junta os vídeos para você assistir. Aqui é só para você conhecer a
          aba, sem aperto nenhum.
        </p>
      </div>

      {VIDEOS.map((video) => (
        <div key={video.id} className="bg-white mt-2">
          <div className="relative">
            <img src={video.imagem} alt="" className="w-full h-44 object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <p className="p-3 text-sm font-semibold text-gray-900">{video.titulo}</p>
        </div>
      ))}
    </div>
  );
}