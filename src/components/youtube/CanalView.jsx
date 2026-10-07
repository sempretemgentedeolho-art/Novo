import React, { useState } from "react";
import { Bell } from "lucide-react";
import VideoRow from "@/components/youtube/VideoRow";
import ComunidadeView from "@/components/youtube/ComunidadeView";
import Pulse from "@/components/youtube/Pulse";

const ABAS = [
  { id: "canal_tab_videos", label: "Vídeos" },
  { id: "canal_tab_comunidade", label: "Comunidade" },
];

// Página de um canal: quem faz os vídeos, quantos inscritos e o que ele publicou
export default function CanalView({ videos, target, onTap }) {
  const [inscrito, setInscrito] = useState(true);
  const [aba, setAba] = useState("canal_tab_videos");

  const abrir = (id) => {
    setAba(id);
    onTap(id);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="h-24 bg-gradient-to-r from-orange-400 to-orange-600" />

      <div className="px-4 pb-4">
        <div className="-mt-8 flex items-end gap-3">
          <div className="w-16 h-16 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center border-4 border-white shrink-0">
            CV
          </div>
          <div className="flex-1 pb-1">
            <p className="font-bold text-gray-900 leading-snug">Cozinha da Vovó</p>
            <p className="text-xs text-gray-600">1,2 mi de inscritos · 84 vídeos</p>
          </div>
        </div>

        <p className="text-xs text-gray-700 mt-3 leading-snug">
          Receitas simples, explicadas devagar, para fazer em casa sem complicação. Vídeo novo toda
          quarta-feira.
        </p>

        <button
          type="button"
          onClick={() => setInscrito((i) => !i)}
          className={`mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold ${
            inscrito ? "bg-gray-200 text-gray-800" : "bg-red-600 text-white"
          }`}
        >
          <Bell className="w-4 h-4" />
          {inscrito ? "Inscrito" : "Inscrever-se"}
        </button>

        <div className="flex gap-2 mt-5">
          {ABAS.map((a) => (
            <Pulse key={a.id} active={target === a.id} ring="rounded-full">
              <button
                type="button"
                onClick={() => abrir(a.id)}
                className={`px-4 py-2 rounded-full border-2 text-sm font-semibold whitespace-nowrap ${
                  aba === a.id
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-200 text-gray-800"
                }`}
              >
                {a.label}
              </button>
            </Pulse>
          ))}
        </div>

        {aba === "canal_tab_comunidade" ? (
          <ComunidadeView target={target} onTap={onTap} />
        ) : (
          <>
            <p className="text-xs font-bold text-gray-500 uppercase mt-4 mb-3">
              Vídeos deste canal
            </p>
            <div className="space-y-4">
              {videos.map((video) => (
                <VideoRow key={video.id} video={video} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}