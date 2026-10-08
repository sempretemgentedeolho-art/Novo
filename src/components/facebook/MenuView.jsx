import React from "react";
import {
  User,
  Users,
  MessageCircle,
  ChevronRight,
  Store,
  Clapperboard,
  Bookmark,
  CalendarDays,
  History,
  Flag,
  Settings,
  HelpCircle,
} from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import { MINHA_FOTO } from "@/components/facebook/facebookData";

// Os itens do menu das três risquinhas, na ordem que o Facebook usa hoje
const ITENS = [
  { tela: "perfil", Icone: User, rotulo: "Perfil", recado: "A sua página, com a sua foto e o que você publicou" },
  { tela: "amigos", Icone: Users, rotulo: "Amigos", recado: "A sua lista de amigos, e convidar quem falta" },
  { tela: "mercado", Icone: Store, rotulo: "Mercado", recado: "A feirinha do Facebook: o que as pessoas vendem perto de você" },
  { tela: "reels", Icone: Clapperboard, rotulo: "Reels", recado: "Vídeos curtinhos, de menos de um minuto" },
  { tela: "salvos", Icone: Bookmark, rotulo: "Salvos", recado: "O que você guardou para ver depois com calma" },
  { tela: "eventos", Icone: CalendarDays, rotulo: "Eventos", recado: "Festas e encontros que vão acontecer" },
  { tela: "memorias", Icone: History, rotulo: "Memórias", recado: "O que você publicou em outros anos, para lembrar" },
  { tela: "paginas", Icone: Flag, rotulo: "Páginas", recado: "Lojas e páginas que você acompanha" },
  { tela: "mensagens", Icone: MessageCircle, rotulo: "Conversas", recado: "As suas conversas no Facebook" },
  { tela: "configfacebook", Icone: Settings, rotulo: "Configurações e privacidade", recado: "Trocar a senha e escolher quem vê o que você publica" },
  { tela: "ajudafacebook", Icone: HelpCircle, rotulo: "Ajuda e suporte", recado: "Tirar dúvidas com o próprio Facebook" },
];

function Item({ Icone, rotulo, recado, ativo, onClick }) {
  return (
    <Pulse active={ativo} className="w-full" ring="rounded-2xl">
      <button
        onClick={onClick}
        className="w-full flex items-center gap-3 px-3 py-3 border-t border-gray-100 text-left"
      >
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
          <Icone className="w-5 h-5 text-[#1877F2]" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-900">{rotulo}</p>
          <p className="text-xs text-gray-600 leading-snug">{recado}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
      </button>
    </Pulse>
  );
}

// O menu das três risquinhas: o perfil, os amigos e tudo mais que o Facebook tem
export default function MenuView({ target, onAbrir }) {
  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="flex items-center gap-3 p-3 border-b border-gray-200">
        <img src={MINHA_FOTO} alt="Sua foto" className="w-12 h-12 rounded-full object-cover" />
        <div>
          <p className="text-sm font-bold text-gray-900">Você</p>
          <p className="text-xs text-gray-600">A sua página no Facebook</p>
        </div>
      </div>

      {ITENS.map(({ tela, Icone, rotulo, recado }) => (
        <Item
          key={tela}
          Icone={Icone}
          rotulo={rotulo}
          recado={recado}
          ativo={target === `menu_${tela}`}
          onClick={() => onAbrir(tela)}
        />
      ))}
    </div>
  );
}