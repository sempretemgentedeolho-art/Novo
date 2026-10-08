import React from "react";
import { ArrowLeft, Bell, MessageCircle, Facebook } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

// Cabeçalho azul do Facebook: voltar, nome do app, campainha e conversas
export default function FacebookHeader({ target, onBack, onAvisos, onMensagens }) {
  return (
    <div className="flex items-center gap-1 px-2 py-2 bg-[#1877F2] shrink-0">
      <Pulse active={target === "back"} ring="rounded-full">
        <button
          onClick={onBack}
          aria-label="Voltar"
          className="w-9 h-9 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
      </Pulse>

      <Facebook className="w-7 h-7 text-white ml-1" />
      <span className="text-xl font-bold text-white">facebook</span>

      <div className="flex-1" />

      <Pulse active={target === "avisos"} ring="rounded-full">
        <button
          onClick={onAvisos}
          aria-label="Avisos"
          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative"
        >
          <Bell className="w-5 h-5 text-white" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500" />
        </button>
      </Pulse>

      <Pulse active={target === "mensagens_header"} ring="rounded-full">
        <button
          onClick={onMensagens}
          aria-label="Conversas"
          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </button>
      </Pulse>
    </div>
  );
}