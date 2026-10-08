import React from "react";
import { ThumbsUp, MessageCircle, Share2, Globe, Send, Trash2 } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import { MINHA_FOTO } from "@/components/facebook/facebookData";

// Uma publicação com curtir, comentar e compartilhar
export default function PostCard({
  post,
  primeiro,
  target,
  comentarioAberto,
  meuComentario,
  onMudarComentario,
  onFocarComentario,
  onCurtir,
  onComentar,
  onCompartilhar,
  onEnviarComentario,
  onApagarComentario,
}) {
  // Só a primeira publicação é a que pisca durante o tutorial
  const pisca = (nome) => primeiro && target === nome;

  return (
    <div className="bg-white mb-2 pb-2">
      <div className="flex items-center gap-3 px-3 pt-3">
        {post.foto ? (
          <img src={post.foto} alt={post.autor} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center font-bold">
            {post.autor[0]}
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-900">{post.autor}</p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            {post.quando} · <Globe className="w-3 h-3" />
          </p>
        </div>
      </div>

      <p className="px-3 py-2 text-sm text-gray-900 leading-snug">{post.texto}</p>
      {post.imagem && (
        <img src={post.imagem} alt="" className="w-full max-h-60 object-cover" />
      )}

      <div className="px-3 py-2 flex items-center gap-1 text-xs text-gray-500">
        <span className="w-5 h-5 rounded-full bg-[#1877F2] flex items-center justify-center">
          <ThumbsUp className="w-3 h-3 text-white" />
        </span>
        <span className="ml-1">
          {post.curtidas} curtidas · {post.comentarios.length} comentários
        </span>
      </div>

      <div className="flex items-center border-t border-gray-200 mx-3 pt-1">
        <Pulse active={pisca("curtir")} className="flex-1" ring="rounded-xl">
          <button
            onClick={onCurtir}
            className={`w-full py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold ${
              post.curtido ? "text-[#1877F2]" : "text-gray-600"
            }`}
          >
            <ThumbsUp className={`w-5 h-5 ${post.curtido ? "fill-current" : ""}`} />
            Curtir
          </button>
        </Pulse>

        <Pulse active={pisca("comentar_btn")} className="flex-1" ring="rounded-xl">
          <button
            onClick={onComentar}
            className="w-full py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-gray-600"
          >
            <MessageCircle className="w-5 h-5" />
            Comentar
          </button>
        </Pulse>

        <Pulse active={pisca("compartilhar_btn")} className="flex-1" ring="rounded-xl">
          <button
            onClick={onCompartilhar}
            className="w-full py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-gray-600"
          >
            <Share2 className="w-5 h-5" />
            Compartilhar
          </button>
        </Pulse>
      </div>

      {post.comentarios.length > 0 && (
        <div className="px-3 pt-2 space-y-1.5">
          {post.comentarios.map((comentario, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-2xl px-3 py-1.5 flex items-start gap-2"
            >
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-900">{comentario.autor}</p>
                <p className="text-sm text-gray-800 leading-snug">{comentario.texto}</p>
              </div>
              {comentario.meu && (
                <button
                  onClick={() => onApagarComentario(index)}
                  aria-label="Apagar comentário"
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {comentarioAberto && (
        <div className="flex items-center gap-2 px-3 pt-2">
          <img src={MINHA_FOTO} alt="Você" className="w-8 h-8 rounded-full object-cover" />
          <Pulse active={pisca("campo_comentario")} className="flex-1" ring="rounded-full">
            <input
              value={meuComentario}
              onChange={(e) => onMudarComentario(e.target.value)}
              onFocus={onFocarComentario}
              placeholder="Escreva um comentário"
              aria-label="Escreva um comentário"
              className="w-full rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-900"
            />
          </Pulse>
          <Pulse active={pisca("enviar_comentario")} ring="rounded-full">
            <button
              onClick={onEnviarComentario}
              className="px-3 py-2 rounded-full bg-[#1877F2] text-white text-sm font-bold flex items-center gap-1"
            >
              <Send className="w-4 h-4" />
              Publicar
            </button>
          </Pulse>
        </div>
      )}
    </div>
  );
}