import React from "react";
import { ArrowLeft, Search, Facebook, MessageCircle } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

// Cabeçalho branco, como no Facebook de hoje: voltar, o nome do app,
// a lupa de busca e o balãozinho das conversas (Messenger)
export default function FacebookHeader({ target, onBack, onMensagens }) {
  return (
    <div className="flex items-center gap-2 px-2 py-2 bg-white border-b border-gray-200 shrink-0">
      <Pulse active={target === "back"} ring="rounded-full">
        <button
          onClick={onBack}
          aria-label="Voltar"
          className="w-9 h-9 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
      </Pulse>

      <Facebook className="w-7 h-7 text-[#1877F2]" />
      <span className="text-xl font-bold text-[#1877F2]">facebook</span>

      <div className="flex-1" />

      {/* A lupa é só enfeite: aqui a gente aprende o resto do Facebook */}
      <div
        aria-hidden="true"
        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
      >
        <Search className="w-5 h-5 text-gray-800" />
      </div>

      <Pulse active={target === "mensagens_icone"} ring="rounded-full">
        <button
          onClick={onMensagens}
          aria-label="Conversas"
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <MessageCircle className="w-5 h-5 text-gray-800" />
        </button>
      </Pulse>
    </div>
  );
}