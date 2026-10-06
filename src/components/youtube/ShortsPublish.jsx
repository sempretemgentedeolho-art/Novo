import React, { useState } from "react";
import { X, Check, Upload } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

export default function ShortsPublish({ target, duracao, onTap, onFinish, onClose }) {
  const [titulo, setTitulo] = useState("");
  const [publicado, setPublicado] = useState(false);

  const focarTitulo = () => {
    if (!titulo) setTitulo("Minha primeira receita");
    onTap("titulo");
  };

  const enviar = () => {
    setPublicado(true);
    onTap("enviar");
  };

  if (publicado) {
    return (
      <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mb-5">
          <Check className="w-10 h-10 text-white" />
        </div>
        <p className="text-white text-xl font-bold mb-2">Seu Short foi publicado!</p>
        <p className="text-white/80 text-sm mb-8">
          Agora ele está na internet, no seu canal do YouTube, para quem você quiser ver.
        </p>
        <Pulse active={target === "concluir"} ring="rounded-full" onClick={onFinish}>
          <button
            type="button"
            className="px-8 py-3 rounded-full bg-white text-gray-900 font-semibold"
          >
            Concluir
          </button>
        </Pulse>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-gray-900 flex flex-col">
      <div className="relative z-10 flex items-center justify-between px-4 pt-7 pb-3">
        <Pulse ring="rounded-full" onClick={onClose}>
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-black/45 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </Pulse>
        <span className="text-white text-sm font-semibold">Publicar</span>
        <div className="w-10" />
      </div>

      <div className="relative z-10 flex-1 px-5">
        <div className="flex gap-3 mb-6">
          <div className="w-20 h-28 rounded-xl bg-gradient-to-b from-indigo-500 to-rose-500 shrink-0" />
          <div className="flex-1">
            <p className="text-white font-semibold text-sm mb-1">Seu Short de {duracao}s</p>
            <p className="text-white/70 text-xs leading-relaxed">
              Vídeo curto · Visível para todas as pessoas
            </p>
          </div>
        </div>

        <Pulse active={target === "titulo"} className="w-full" ring="rounded-2xl">
          <button
            type="button"
            onClick={focarTitulo}
            className="w-full text-left rounded-2xl bg-white/10 border-2 border-white/30 px-4 py-4"
          >
            <p className="text-white/60 text-xs mb-1">Título do vídeo</p>
            <p className={`text-sm ${titulo ? "text-white font-medium" : "text-white/70"}`}>
              {titulo || "Legende seu Short"}
            </p>
          </button>
        </Pulse>
      </div>

      <div className="relative z-10 p-5">
        <Pulse active={target === "enviar"} className="w-full" ring="rounded-2xl">
          <button
            type="button"
            onClick={enviar}
            className="w-full py-4 rounded-full bg-blue-600 flex items-center justify-center gap-2"
          >
            <Upload className="w-5 h-5 text-white" />
            <span className="text-white font-bold text-base">Enviar Short</span>
          </button>
        </Pulse>
      </div>
    </div>
  );
}