import React from "react";
import { X, MessageCircle, Send, Download } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

// Janelinha de compartilhar: escolher por onde mandar a publicação
export default function ShareSheetFacebook({ target, onEscolher, onFechar }) {
  return (
    <div className="absolute inset-0 z-[70] bg-black/50 flex items-end" onClick={onFechar}>
      <div className="w-full bg-white rounded-t-3xl p-4 pb-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">Compartilhar</h2>
          <button
            onClick={onFechar}
            aria-label="Fechar"
            className="w-9 h-9 rounded-full flex items-center justify-center"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="space-y-2">
          <Pulse active={target === "share_whats"} className="w-full" ring="rounded-2xl">
            <button
              onClick={() => onEscolher("whatsapp")}
              className="w-full flex items-center gap-3 rounded-2xl border-2 border-gray-200 px-4 py-3"
            >
              <MessageCircle className="w-7 h-7 text-green-600" />
              <span className="font-semibold text-gray-900">WhatsApp</span>
            </button>
          </Pulse>

          <button
            onClick={() => onEscolher("messenger")}
            className="w-full flex items-center gap-3 rounded-2xl border-2 border-gray-200 px-4 py-3"
          >
            <Send className="w-7 h-7 text-[#1877F2]" />
            <span className="font-semibold text-gray-900">Mensagem (Messenger)</span>
          </button>

          <button
            onClick={() => onEscolher("salvar")}
            className="w-full flex items-center gap-3 rounded-2xl border-2 border-gray-200 px-4 py-3"
          >
            <Download className="w-7 h-7 text-gray-700" />
            <span className="font-semibold text-gray-900">Salvar no celular</span>
          </button>
        </div>
      </div>
    </div>
  );
}