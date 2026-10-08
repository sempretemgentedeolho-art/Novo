import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import { SALVOS } from "@/components/facebook/facebookData";

const FILTROS = [
  { id: "todos", rotulo: "Tudo" },
  { id: "Vídeo", rotulo: "Vídeos" },
  { id: "Publicação", rotulo: "Publicações" },
  { id: "Link", rotulo: "Links" },
];

// A tela Salvos: o que a pessoa guardou para ver depois, sem perder
export default function SalvosView() {
  const [filtro, setFiltro] = useState("todos");
  const itens = filtro === "todos" ? SALVOS : SALVOS.filter((item) => item.tipo === filtro);

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="p-3">
        <h2 className="text-lg font-bold text-gray-900">Salvos</h2>
        <p className="text-xs text-gray-600 mt-0.5 leading-snug">
          Quando você vê uma publicação interessante e não tem tempo agora, toque em Salvar. Ela
          fica guardada aqui, e você vê depois com calma.
        </p>
      </div>

      <div className="flex gap-2 px-3 pb-2">
        {FILTROS.map((opcao) => (
          <button
            key={opcao.id}
            onClick={() => setFiltro(opcao.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
              filtro === opcao.id
                ? "bg-[#1877F2] text-white"
                : "bg-gray-100 text-gray-700 border border-gray-200"
            }`}
          >
            {opcao.rotulo}
          </button>
        ))}
      </div>

      {itens.length === 0 ? (
        <p className="px-3 py-4 text-xs text-gray-600">Nada guardado nesta lista.</p>
      ) : (
        itens.map((item) => (
          <div key={item.id} className="flex items-center gap-3 px-3 py-3 border-t border-gray-100">
            <img src={item.imagem} alt="" className="w-14 h-14 rounded-xl object-cover" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-[#1877F2] flex items-center gap-1">
                <Bookmark className="w-3.5 h-3.5" /> {item.tipo}
              </p>
              <p className="text-sm font-bold text-gray-900 leading-snug mt-0.5">{item.titulo}</p>
              <p className="text-xs text-gray-600 mt-0.5">Salvo de {item.quem}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}