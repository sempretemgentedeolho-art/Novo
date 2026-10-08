import React from "react";
import { User, Users, MessageCircle, ChevronRight } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import { MINHA_FOTO } from "@/components/facebook/facebookData";

function Item({ Icone, rotulo, recado, ativo, onClick }) {
  return (
    <Pulse active={ativo} className="w-full" ring="rounded-2xl">
      <button
        onClick={onClick}
        className="w-full flex items-center gap-3 px-3 py-3 border-t border-gray-100 text-left"
      >
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <Icone className="w-5 h-5 text-[#1877F2]" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-900">{rotulo}</p>
          <p className="text-xs text-gray-600 leading-snug">{recado}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>
    </Pulse>
  );
}

// O menu das três risquinhas: é aqui que ficam o perfil, os amigos e as conversas
export default function MenuView({ target, onPerfil, onAmigos, onMensagens }) {
  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="flex items-center gap-3 p-3 border-b border-gray-200">
        <img src={MINHA_FOTO} alt="Sua foto" className="w-12 h-12 rounded-full object-cover" />
        <div>
          <p className="text-sm font-bold text-gray-900">Você</p>
          <p className="text-xs text-gray-600">A sua página no Facebook</p>
        </div>
      </div>

      <Item
        Icone={User}
        rotulo="Perfil"
        recado="A sua página, com a sua foto e o que você publicou"
        ativo={target === "menu_perfil"}
        onClick={onPerfil}
      />
      <Item
        Icone={Users}
        rotulo="Amigos"
        recado="A sua lista de amigos, e convidar quem falta"
        ativo={target === "menu_amigos"}
        onClick={onAmigos}
      />
      <Item
        Icone={MessageCircle}
        rotulo="Conversas"
        recado="As suas conversas no Facebook"
        ativo={target === "menu_mensagens"}
        onClick={onMensagens}
      />
    </div>
  );
}