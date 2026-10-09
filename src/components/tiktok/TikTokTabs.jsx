import React from "react";
import { Home as HomeIcon, Search, Plus, MessageSquare, User } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

const ITENS = [
  { id: "feed", label: "Início", Icon: HomeIcon },
  { id: "descobrir", label: "Descobrir", Icon: Search },
  { id: "criar", label: "Criar", Icon: Plus },
  { id: "mensagens", label: "Caixa", Icon: MessageSquare },
  { id: "perfil", label: "Perfil", Icon: User },
];

// Barra de baixo do TikTok: as cinco partes do aplicativo
export default function TikTokTabs({ target, aba, onAbrir }) {
  return (
    <div className="shrink-0 bg-black border-t border-white/15 flex items-center justify-around py-2">
      {ITENS.map(({ id, label, Icon }) => {
        const ativo = aba === id;
        const piscando = target === `aba_${id}`;
        return (
          <Pulse key={id} active={piscando} ring="rounded-full">
            <button
              onClick={() => onAbrir(id)}
              className="flex flex-col items-center gap-0.5 px-2 py-1"
            >
              {id === "criar" ? (
                <div className="w-9 h-6 rounded-md bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-black" />
                </div>
              ) : (
                <Icon className={`w-5 h-5 ${ativo ? "text-white" : "text-white/55"}`} />
              )}
              <span className={`text-[10px] ${ativo ? "text-white font-bold" : "text-white/55"}`}>
                {label}
              </span>
            </button>
          </Pulse>
        );
      })}
    </div>
  );
}