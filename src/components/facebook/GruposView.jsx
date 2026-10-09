import React from "react";
import { Users } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import { GRUPOS } from "@/components/facebook/facebookData";

// A aba Grupos: as rodinhas de amigos e da família
export default function GruposView({ target, onAvancar, onAbrirPublicacoes }) {
  // Abre as publicações do grupo já no filtro Grupos, e avisa o tutorial
  const verPublicacoes = () => {
    onAbrirPublicacoes();
    onAvancar("grupo_publicacoes");
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="p-3">
        <h2 className="text-lg font-bold text-gray-900">Grupos</h2>
        <p className="text-xs text-gray-600 mt-0.5 leading-snug">
          Grupo é uma roda de gente que fala do mesmo assunto: a família, a igreja, o clube. Só
          quem está no grupo vê o que é publicado ali.
        </p>
      </div>

      {GRUPOS.map((grupo, index) => (
        <div key={grupo.id} className="flex items-center gap-3 px-3 py-3 border-t border-gray-100">
          <img src={grupo.imagem} alt="" className="w-14 h-14 rounded-2xl object-cover" />
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-900">{grupo.nome}</p>
            <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5">
              <Users className="w-3.5 h-3.5" /> {grupo.membros}
            </p>
            <Pulse
              active={target === "grupo_publicacoes" && index === 0}
              className="inline-flex mt-1.5"
              ring="rounded-full"
            >
              <button
                onClick={verPublicacoes}
                className="px-3 py-1.5 rounded-full bg-gray-100 text-sm font-semibold text-[#1877F2]"
              >
                Ver as publicações
              </button>
            </Pulse>
          </div>
        </div>
      ))}
    </div>
  );
}