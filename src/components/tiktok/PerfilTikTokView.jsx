import React from "react";
import { UserPlus, CircleDollarSign, CheckCircle2 } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import { MINHA_FOTO, MEUS_VIDEOS } from "@/components/tiktok/tiktokData";

// A parte da pessoa no TikTok: quem ela é, o que já publicou e os botões grandes
export default function PerfilTikTokView({
  target,
  contaCriada,
  monetizado,
  onCriarConta,
  onAbrirMonetizar,
}) {
  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="px-4 pt-4 pb-6 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
          <img src={MINHA_FOTO} alt="Sua foto" className="w-full h-full object-cover" />
        </div>
        <p className="text-base font-bold text-gray-900 mt-2">@maria1947</p>

        <div className="flex items-center gap-6 mt-3 text-center">
          <div>
            <p className="text-base font-bold text-gray-900">18</p>
            <p className="text-xs text-gray-600">seguindo</p>
          </div>
          <div>
            <p className="text-base font-bold text-gray-900">2,4 mil</p>
            <p className="text-xs text-gray-600">seguidores</p>
          </div>
          <div>
            <p className="text-base font-bold text-gray-900">19 mil</p>
            <p className="text-xs text-gray-600">curtidas</p>
          </div>
        </div>

        {contaCriada && (
          <div className="mt-4 flex items-center gap-2 rounded-full bg-green-50 border border-green-300 px-4 py-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-green-800">Conta criada com sucesso</span>
          </div>
        )}
      </div>

      {!contaCriada && (
        <div className="px-4 pb-4">
          <Pulse active={target === "criar_conta"} className="w-full" ring="rounded-2xl">
            <button
              onClick={onCriarConta}
              className="w-full flex items-center justify-center gap-3 rounded-2xl bg-[#FE2C55] px-4 py-4"
            >
              <UserPlus className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white">Criar conta</span>
            </button>
          </Pulse>
          <p className="text-xs text-gray-600 text-center mt-2 leading-snug">
            A conta é de graça e é o primeiro passo para publicar vídeos e receber dinheiro.
          </p>
        </div>
      )}

      <div className="px-4 pb-4">
        <Pulse active={target === "monetizar_abrir"} className="w-full" ring="rounded-2xl">
          <button
            onClick={onAbrirMonetizar}
            className="w-full flex items-center justify-center gap-3 rounded-2xl bg-black px-4 py-4 border-2 border-cyan-400"
          >
            <CircleDollarSign className="w-5 h-5 text-cyan-300" />
            <span className="text-sm font-bold text-white">Configuração de Monetizar</span>
          </button>
        </Pulse>
        <p className="text-xs text-gray-600 text-center mt-2 leading-snug">
          {monetizado
            ? "Sua monetização foi enviada ao TikTok e está em análise."
            : "Toque aqui para ver o que o TikTok pede para pagar pelos seus vídeos."}
        </p>
      </div>

      <div className="px-4 pb-6">
        <p className="text-sm font-bold text-gray-900 mb-2">Seus vídeos</p>
        <div className="grid grid-cols-2 gap-2">
          {MEUS_VIDEOS.map((foto, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-gray-100 aspect-[9/14]">
              <img src={foto} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}