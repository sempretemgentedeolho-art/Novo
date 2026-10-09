import React from "react";
import { Heart, MessageCircle, Share2, Music, ChevronDown, Plus, Check } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import ComentariosTikTokSheet from "@/components/tiktok/ComentariosTikTokSheet";
import ShareTikTokSheet from "@/components/tiktok/ShareTikTokSheet";

// A tela "Para você": o vídeo que está passando e os botões do lado
export default function FeedTikTokView({
  target,
  video,
  curtido,
  seguindo,
  compartilhado,
  comentarios,
  comentarioAberto,
  meuComentario,
  shareOpen,
  onProximo,
  onSeguir,
  onCurtir,
  onComentar,
  onFecharComentarios,
  onMudarComentario,
  onFocarComentario,
  onEnviarComentario,
  onCompartilhar,
  onEscolherCompartilhar,
  onFecharCompartilhar,
}) {
  return (
    <div className="flex-1 relative overflow-hidden bg-black">
      <img src={video.imagem} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60" />

      {/* Setinha do próximo vídeo */}
      <div className="absolute right-3 bottom-52 z-20">
        <Pulse active={target === "proximo_video"} ring="rounded-full">
          <button
            onClick={onProximo}
            aria-label="Próximo vídeo"
            className="w-11 h-11 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"
          >
            <ChevronDown className="w-6 h-6 text-white" />
          </button>
        </Pulse>
      </div>

      {/* Botões do lado direito */}
      <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-5">
        <Pulse active={target === "seguir"} ring="rounded-full">
          <button onClick={onSeguir} aria-label="Seguir esta pessoa" className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-2 border-white bg-pink-500 flex items-center justify-center">
              {seguindo ? <Check className="w-6 h-6 text-white" /> : <Plus className="w-6 h-6 text-white" />}
            </div>
          </button>
        </Pulse>

        <Pulse active={target === "curtir"} ring="rounded-full">
          <button onClick={onCurtir} aria-label="Curtir o vídeo" className="flex flex-col items-center">
            <Heart
              className={`w-9 h-9 ${curtido ? "text-red-500" : "text-white"}`}
              fill={curtido ? "currentColor" : "none"}
            />
            <span className="text-[11px] text-white font-medium">{video.curtidas}</span>
          </button>
        </Pulse>

        <Pulse active={target === "comentar"} ring="rounded-full">
          <button onClick={onComentar} aria-label="Comentar" className="flex flex-col items-center">
            <MessageCircle className="w-9 h-9 text-white" />
            <span className="text-[11px] text-white font-medium">{comentarios.length}</span>
          </button>
        </Pulse>

        <Pulse active={target === "compartilhar"} ring="rounded-full">
          <button onClick={onCompartilhar} aria-label="Compartilhar o vídeo" className="flex flex-col items-center">
            <Share2 className="w-9 h-9 text-white" />
            <span className="text-[11px] text-white font-medium">{video.compartilhamentos}</span>
          </button>
        </Pulse>
      </div>

      {/* Nome, legenda e som */}
      <div className="absolute left-4 right-20 bottom-24 z-20">
        <p className="text-white font-bold text-base">{video.usuario}</p>
        <p className="text-white/95 text-sm mt-1 leading-snug">{video.legenda}</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <Music className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-white text-xs leading-tight">{video.som}</span>
        </div>
      </div>

      {compartilhado && (
        <div className="absolute left-4 right-4 bottom-4 z-30 bg-white rounded-2xl px-4 py-3 shadow-xl">
          <p className="text-sm text-gray-800 leading-snug">
            Vídeo enviado para o seu amigo no WhatsApp!
          </p>
        </div>
      )}

      {comentarioAberto && (
        <ComentariosTikTokSheet
          target={target}
          comentarios={comentarios}
          meuComentario={meuComentario}
          onMudarComentario={onMudarComentario}
          onFocar={onFocarComentario}
          onEnviar={onEnviarComentario}
          onFechar={onFecharComentarios}
        />
      )}

      {shareOpen && (
        <ShareTikTokSheet
          target={target}
          onEscolher={onEscolherCompartilhar}
          onFechar={onFecharCompartilhar}
        />
      )}
    </div>
  );
}