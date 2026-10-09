import React from "react";
import { Home, Clapperboard, Newspaper, Users, Bell, Menu } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

// A fileira de desenhos que fica no alto da tela, como no Facebook de hoje
const ABAS = [
  { id: "feed", rotulo: "Início", Icone: Home, alvo: null },
  { id: "video", rotulo: "Vídeo", Icone: Clapperboard, alvo: "aba_video" },
  { id: "feeds", rotulo: "Feeds", Icone: Newspaper, alvo: "aba_feeds" },
  { id: "grupos", rotulo: "Grupos", Icone: Users, alvo: "aba_grupos" },
  { id: "avisos", rotulo: "Avisos", Icone: Bell, alvo: "aba_avisos" },
  { id: "menu", rotulo: "Menu", Icone: Menu, alvo: "aba_menu" },
];

export default function FacebookTabs({ target, view, onAbrir }) {
  return (
    <div className="flex items-stretch bg-white border-b border-gray-200 shrink-0">
      {ABAS.map(({ id, rotulo, Icone, alvo }) => {
        const ativo = view === id;
        return (
          <Pulse key={id} active={!!alvo && target === alvo} className="flex-1" ring="rounded-xl">
            <button
              onClick={() => onAbrir(id)}
              aria-label={rotulo}
              className={`w-full flex flex-col items-center pt-2 ${
                ativo ? "border-b-[3px] border-[#1877F2]" : "border-b-[3px] border-transparent"
              }`}
            >
              <Icone className={`w-7 h-7 ${ativo ? "text-[#1877F2]" : "text-gray-600"}`} />
              <span className={`text-[10px] mb-1 ${ativo ? "text-[#1877F2] font-bold" : "text-gray-600"}`}>
                {rotulo}
              </span>
            </button>
          </Pulse>
        );
      })}
    </div>
  );
}