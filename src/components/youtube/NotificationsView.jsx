import React from "react";

const NOTIFICACOES = [
  {
    id: 1,
    canal: "Cozinha da Vovó",
    iniciais: "CV",
    cor: "bg-orange-500",
    texto: "Novo vídeo: Bolo de cenoura fácil e fofinho",
    tempo: "há 2 horas",
    novo: true,
  },
  {
    id: 2,
    canal: "Saudade Musical",
    iniciais: "SM",
    cor: "bg-purple-500",
    texto: "Novo vídeo: Músicas antigas para relaxar e lembrar",
    tempo: "há 5 horas",
    novo: true,
  },
  {
    id: 3,
    canal: "Maria respondeu seu comentário",
    iniciais: "M",
    cor: "bg-blue-500",
    texto: "Também amei essa receita! Fiz para os meus netos.",
    tempo: "ontem",
    novo: false,
  },
  {
    id: 4,
    canal: "Jornal da Manhã",
    iniciais: "JM",
    cor: "bg-sky-500",
    texto: "Novo vídeo: Notícias de hoje explicadas com calma",
    tempo: "ontem",
    novo: false,
  },
];

// Avisos dos canais que a pessoa acompanha
export default function NotificationsView() {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <h2 className="text-lg font-bold text-gray-900 pt-3">Notificações</h2>
      <p className="text-xs text-gray-600 mt-1 mb-2">
        Os avisos dos canais que você acompanha. O pontinho vermelho mostra o que você ainda não viu.
      </p>

      <div className="space-y-1">
        {NOTIFICACOES.map((aviso) => (
          <div key={aviso.id} className="flex gap-3 py-3 border-b border-gray-100">
            <div className="relative shrink-0">
              <div
                className={`w-11 h-11 rounded-full ${aviso.cor} text-white text-sm font-bold flex items-center justify-center`}
              >
                {aviso.iniciais}
              </div>
              {aviso.novo && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-600 border-2 border-white" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 leading-snug">{aviso.canal}</p>
              <p className="text-xs text-gray-600 mt-0.5 leading-snug">{aviso.texto}</p>
              <p className="text-[11px] text-gray-500 mt-1">{aviso.tempo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}