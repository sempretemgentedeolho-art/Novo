import React from "react";
import { ArrowLeft, Send } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import { MINHA_FOTO } from "@/components/facebook/facebookData";

// Conversas: a lista de recados e a conversa aberta
export default function MessagesView({
  target,
  conversas,
  aberta,
  onAbrir,
  onFechar,
  recado,
  onMudarRecado,
  onFocarRecado,
  onEnviar,
}) {
  const conversa = conversas.find((c) => c.id === aberta);

  if (conversa) {
    return (
      <div className="flex-1 flex flex-col bg-gray-100 min-h-0">
        <div className="flex items-center gap-2 px-3 py-2 bg-white border-b border-gray-200 shrink-0">
          <button onClick={onFechar} aria-label="Voltar" className="w-9 h-9 rounded-full flex items-center justify-center">
            <ArrowLeft className="w-6 h-6 text-gray-800" />
          </button>
          <img src={conversa.foto} alt={conversa.nome} className="w-9 h-9 rounded-full object-cover" />
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-900">{conversa.nome}</p>
            <p className="text-[11px] text-gray-500">Conversa no Facebook</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {conversa.recados.map((item, index) => (
            <div key={index} className={`flex ${item.de === "eu" ? "justify-end" : "justify-start"}`}>
              <p
                className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-snug ${
                  item.de === "eu"
                    ? "bg-[#1877F2] text-white rounded-br-sm"
                    : "bg-white text-gray-900 rounded-bl-sm"
                }`}
              >
                {item.texto}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 p-3 bg-white shrink-0">
          <img src={MINHA_FOTO} alt="Você" className="w-8 h-8 rounded-full object-cover" />
          <Pulse active={target === "campo_recado"} className="flex-1" ring="rounded-full">
            <input
              value={recado}
              onChange={(e) => onMudarRecado(e.target.value)}
              onFocus={onFocarRecado}
              placeholder="Escreva uma mensagem"
              aria-label="Escreva uma mensagem"
              className="w-full rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-900"
            />
          </Pulse>
          <Pulse active={target === "enviar_recado"} ring="rounded-full">
            <button
              onClick={onEnviar}
              aria-label="Enviar mensagem"
              className="w-11 h-11 rounded-full bg-[#1877F2] flex items-center justify-center"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </Pulse>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="p-3">
        <h2 className="text-lg font-bold text-gray-900">Conversas</h2>
        <p className="text-xs text-gray-600 mt-0.5">
          Estas são as suas conversas. Toque em uma para ler e responder.
        </p>
      </div>

      {conversas.map((item, index) => (
        <Pulse
          key={item.id}
          active={target === "conversa_maria" && index === 0}
          className="w-full"
          ring="rounded-2xl"
        >
          <button
            onClick={() => onAbrir(item.id)}
            className="w-full flex items-center gap-3 px-3 py-3 border-t border-gray-100 text-left"
          >
            <img src={item.foto} alt={item.nome} className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900">{item.nome}</p>
              <p className="text-xs text-gray-600 truncate">
                {item.recados[item.recados.length - 1].texto}
              </p>
            </div>
          </button>
        </Pulse>
      ))}
    </div>
  );
}