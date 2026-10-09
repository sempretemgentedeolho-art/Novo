import React, { useState } from "react";
import { CheckCircle2, Video } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import { GALERIA } from "@/components/facebook/facebookData";

// Em que parte da publicação a pessoa está, de acordo com o passo falado
const ETAPAS = {
  gravar_video: "gravar",
  legenda: "legenda",
  postar: "legenda",
  ver_no_perfil: "pronto",
};

export default function PublicarTikTokView({ target, onAvancar, onVerPerfil }) {
  const etapa = ETAPAS[target] || "gravar";
  const [legenda, setLegenda] = useState("");

  return (
    <div className="flex-1 relative overflow-hidden bg-black">
      {etapa === "gravar" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6">
          <p className="text-white/85 text-sm text-center leading-snug">
            Segure a tela para gravar o seu vídeo. Pode falar devagar, olhando para a câmera.
          </p>
          <Pulse active={target === "gravar_video"} ring="rounded-full">
            <button
              onClick={() => onAvancar("gravar_video")}
              aria-label="Gravar vídeo"
              className="w-24 h-24 rounded-full bg-[#FE2C55] border-4 border-white flex items-center justify-center"
            >
              <Video className="w-10 h-10 text-white" />
            </button>
          </Pulse>
          <p className="text-white/70 text-xs text-center">Toque para gravar</p>
        </div>
      )}

      {etapa === "legenda" && (
        <div className="absolute inset-0">
          <img src={GALERIA[5].foto} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60" />

          <div className="absolute left-4 right-4 top-4">
            <Pulse active={target === "postar"} className="w-full" ring="rounded-full">
              <button
                onClick={() => onAvancar("postar")}
                className="ml-auto block rounded-full bg-[#FE2C55] px-5 py-2 text-sm font-bold text-white"
              >
                Publicar
              </button>
            </Pulse>
          </div>

          <div className="absolute left-4 right-4 bottom-6">
            <Pulse active={target === "legenda"} className="w-full" ring="rounded-2xl">
              <input
                value={legenda}
                onChange={(e) => {
                  setLegenda(e.target.value);
                  onAvancar("legenda");
                }}
                onFocus={() => onAvancar("legenda")}
                placeholder="Escreva uma legenda..."
                className="w-full rounded-2xl bg-white/95 px-4 py-4 text-sm text-gray-900 outline-none"
              />
            </Pulse>
            <p className="text-white/80 text-xs mt-2 leading-snug">
              Escreva uma frase simples, por exemplo: Bom dia, meus amigos!
            </p>
          </div>
        </div>
      )}

      {etapa === "pronto" && (
        <div className="absolute inset-0 bg-white flex flex-col items-center justify-center px-6 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
          <p className="text-lg font-bold text-gray-900 mt-3">Seu vídeo está no ar!</p>
          <p className="text-sm text-gray-700 mt-1 leading-snug">
            Todo mundo pode ver o seu vídeo no TikTok, e ele fica guardado no seu perfil junto com os
            seus outros vídeos.
          </p>
          <div className="w-full mt-6">
            <Pulse active={target === "ver_no_perfil"} className="w-full" ring="rounded-2xl">
              <button
                onClick={onVerPerfil}
                className="w-full rounded-2xl bg-black px-4 py-4 text-sm font-bold text-white"
              >
                Ver no perfil
              </button>
            </Pulse>
          </div>
        </div>
      )}
    </div>
  );
}