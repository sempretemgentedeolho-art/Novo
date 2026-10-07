import React from "react";
import ToolPanel from "@/components/youtube/ToolPanel";

export const EFEITOS = [
  { id: "nenhum", nome: "Nenhum" },
  { id: "destaque", nome: "Destaque", overlay: "bg-gradient-to-tr from-white/40 via-transparent to-sky-300/40" },
  { id: "quente", nome: "Tom quente", overlay: "bg-gradient-to-t from-orange-500/50 to-transparent" },
  { id: "cinema", nome: "Cinema", overlay: "bg-gradient-to-t from-black/70 to-transparent" },
  { id: "brilho", nome: "Brilho", overlay: "bg-gradient-to-b from-yellow-300/40 to-transparent" },
];

// Painel de efeitos: escolher o efeito e a intensidade
export default function EffectsPanel({
  efeitoIndex,
  intensidade,
  onEfeitoIndex,
  onIntensidade,
  onConcluir,
}) {
  return (
    <ToolPanel
      titulo="Efeitos"
      dica="Escolha um efeito e ajuste a intensidade"
      onConcluir={onConcluir}
    >
      <div className="space-y-2">
        {EFEITOS.map((e, i) => (
          <button
            key={e.id}
            type="button"
            onClick={() => onEfeitoIndex(i)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left ${
              i === efeitoIndex ? "bg-white text-gray-900 font-semibold" : "bg-white/10 text-white"
            }`}
          >
            <div className={`w-10 h-10 rounded-lg shrink-0 bg-gradient-to-br from-indigo-400 to-rose-400 ${e.overlay || ""}`} />
            <span className="text-sm">{e.nome}</span>
          </button>
        ))}
      </div>

      <p className="text-white/60 text-xs uppercase mt-4 mb-2">Intensidade</p>
      <input
        type="range"
        min="0"
        max="100"
        value={intensidade}
        onChange={(e) => onIntensidade(Number(e.target.value))}
        className="w-full accent-sky-500"
      />
    </ToolPanel>
  );
}