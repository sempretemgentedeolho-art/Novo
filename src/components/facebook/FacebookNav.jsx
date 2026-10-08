import React from "react";
import { Home, Users, Plus, MessageCircle, User } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

function Botao({ ativo, Icone, rotulo, onClick }) {
  return (
    <button onClick={onClick} aria-label={rotulo} className="flex flex-col items-center px-2 py-1">
      <Icone className={`w-6 h-6 ${ativo ? "text-[#1877F2]" : "text-gray-500"}`} />
      <span className={`text-[11px] ${ativo ? "text-[#1877F2] font-semibold" : "text-gray-500"}`}>
        {rotulo}
      </span>
    </button>
  );
}

// Barra de baixo do Facebook
export default function FacebookNav({ target, view, onFeed, onPublicar, onAmigos, onMensagens, onPerfil }) {
  return (
    <div className="flex items-center justify-around bg-white border-t border-gray-200 py-1 shrink-0">
      <Pulse ring="rounded-2xl">
        <Botao ativo={view === "feed"} Icone={Home} rotulo="Início" onClick={onFeed} />
      </Pulse>

      <Pulse active={target === "amigos_nav"} ring="rounded-2xl">
        <Botao ativo={view === "amigos"} Icone={Users} rotulo="Amigos" onClick={onAmigos} />
      </Pulse>

      <Pulse active={target === "publicar_nav"} ring="rounded-full">
        <button
          onClick={onPublicar}
          aria-label="Publicar"
          className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center -mt-2"
        >
          <Plus className="w-7 h-7 text-white" />
        </button>
      </Pulse>

      <Pulse active={target === "mensagens_nav"} ring="rounded-2xl">
        <Botao ativo={view === "mensagens"} Icone={MessageCircle} rotulo="Conversas" onClick={onMensagens} />
      </Pulse>

      <Pulse active={target === "perfil_nav"} ring="rounded-2xl">
        <Botao ativo={view === "perfil"} Icone={User} rotulo="Perfil" onClick={onPerfil} />
      </Pulse>
    </div>
  );
}