import React from "react";
import { motion } from "framer-motion";
import { X, Send } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

// Conversa dos comentários: fica em cima do vídeo, sem tirar o vídeo do lugar
export default function ComentariosTikTokSheet({
  target,
  comentarios,
  meuComentario,
  onMudarComentario,
  onFocar,
  onEnviar,
  onFechar,
}) {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="absolute left-0 right-0 bottom-0 z-40 bg-white rounded-t-3xl shadow-2xl max-h-[70%] flex flex-col"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <p className="text-base font-bold text-gray-900">Comentários</p>
        <button
          onClick={onFechar}
          aria-label="Fechar os comentários"
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <X className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {comentarios.map((c, i) => (
          <div key={i} className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
            <div>
              <p className="text-xs font-bold text-gray-800">{c.autor}</p>
              <p className="text-sm text-gray-700 leading-snug">{c.texto}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-gray-200 flex items-center gap-2">
        <Pulse active={target === "campo_comentario"} className="flex-1" ring="rounded-full">
          <input
            value={meuComentario}
            onChange={(e) => onMudarComentario(e.target.value)}
            onFocus={onFocar}
            placeholder="Adicione um comentário..."
            className="w-full rounded-full bg-gray-100 px-4 py-3 text-sm text-gray-900 outline-none"
          />
        </Pulse>
        <Pulse active={target === "enviar_comentario"} ring="rounded-full">
          <button
            onClick={onEnviar}
            aria-label="Publicar comentário"
            className="w-11 h-11 rounded-full bg-[#FE2C55] flex items-center justify-center"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </Pulse>
      </div>
    </motion.div>
  );
}