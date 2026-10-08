import React from "react";
import { Image, Smile, MapPin } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import { MINHA_FOTO } from "@/components/facebook/facebookData";

// A caixinha branca no alto da aba Início: é por aqui que se cria uma publicação
export default function ComposerBox({ target, onAbrir }) {
  return (
    <div className="bg-white pb-2 border-b border-gray-200">
      <div className="flex items-center gap-2 px-3 pt-3">
        <img src={MINHA_FOTO} alt="Sua foto" className="w-9 h-9 rounded-full object-cover" />
        <Pulse active={target === "publicar_caixa"} className="flex-1" ring="rounded-full">
          <button
            onClick={onAbrir}
            className="w-full text-left rounded-full bg-gray-100 px-4 py-2.5 text-sm text-gray-700"
          >
            No que você está pensando?
          </button>
        </Pulse>
      </div>

      <div className="flex items-center justify-around px-2 pt-2" aria-hidden="true">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
          <Image className="w-4 h-4 text-green-600" /> Foto
        </span>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
          <Smile className="w-4 h-4 text-yellow-500" /> Sentimento
        </span>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
          <MapPin className="w-4 h-4 text-red-500" /> Local
        </span>
      </div>
    </div>
  );
}