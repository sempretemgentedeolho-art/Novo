import React, { useState } from "react";
import { Play, Pause } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import { VIDEOS } from "@/components/facebook/facebookData";

// A aba Vídeo: o que o Facebook separa para você assistir
export default function VideoView({ target, onAvancar }) {
  const [assistindo, setAssistindo] = useState(null);

  const abrir = (video) => {
    setAssistindo(video);
    onAvancar("video_abrir");
  };

  const fechar = () => {
    setAssistindo(null);
    onAvancar("video_fechar");
  };

  if (assistindo) {
    return (
      <div className="flex-1 flex flex-col bg-black min-h-0">
        <div className="relative flex-1 min-h-0">
          <img src={assistindo.imagem} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-black/60 flex items-center justify-center">
              <Pause className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 to-transparent">
            <p className="text-sm font-bold text-white">{assistindo.titulo}</p>
            <p className="text-xs text-white leading-snug mt-1">
              Você está assistindo. O vídeo toca sozinho, sem precisar fazer nada.
            </p>
          </div>
        </div>

        <div className="p-3 shrink-0">
          <Pulse active={target === "video_fechar"} ring="rounded-full" className="inline-flex">
            <button
              onClick={fechar}
              className="px-4 py-2 rounded-full bg-white text-black text-sm font-bold"
            >
              Fechar o vídeo
            </button>
          </Pulse>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100">
      <div className="bg-white p-3">
        <h2 className="text-lg font-bold text-gray-900">Vídeo</h2>
        <p className="text-xs text-gray-600 mt-0.5 leading-snug">
          Nesta aba o Facebook junta os vídeos para você assistir. Aqui é só para você conhecer a
          aba, sem aperto nenhum.
        </p>
      </div>

      {VIDEOS.map((video, index) => (
        <Pulse
          key={video.id}
          active={target === "video_abrir" && index === 0}
          className="block"
          ring="rounded-xl"
        >
          <button onClick={() => abrir(video)} className="w-full text-left bg-white mt-2">
            <div className="relative">
              <img src={video.imagem} alt="" className="w-full h-44 object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <p className="p-3 text-sm font-semibold text-gray-900">{video.titulo}</p>
          </button>
        </Pulse>
      ))}
    </div>
  );
}