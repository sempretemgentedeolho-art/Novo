import React from "react";
import ToolPanel from "@/components/youtube/ToolPanel";

export const FILTROS = [
  { id: "original", nome: "Original", aplicar: () => "" },
  { id: "dourado", nome: "Dourado", aplicar: (i) => `sepia(${0.55 * i}) saturate(${1 + 0.35 * i})` },
  { id: "vivido", nome: "Vívido", aplicar: (i) => `saturate(${1 + 0.9 * i}) contrast(${1 + 0.15 * i})` },
  { id: "frio", nome: "Frio", aplicar: (i) => `hue-rotate(${-18 * i}deg) saturate(${1 + 0.2 * i})` },
  { id: "pb", nome: "P&B", aplicar: (i) => `grayscale(${i})` },
];

// Painel de filtros: dá um novo tom ao vídeo
export default function FiltersPanel({
  filtroIndex,
  intensidade,
  onFiltroIndex,
  onIntensidade,
  onConcluir,
}) {
  return (
    <ToolPanel titulo="Filtros" dica="Dê um novo tom ao seu Short." onConcluir={onConcluir}>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {FILTROS.map((f, i) => (
          <button
            key={f.id}
            type="button"
            onClick={() => onFiltroIndex(i)}
            className="flex flex-col items-center gap-1.5 shrink-0"
          >
            <div
              className={`w-16 h-24 rounded-xl bg-gradient-to-b from-indigo-500 via-purple-500 to-rose-500 ${
                i === filtroIndex ? "ring-4 ring-white" : ""
              }`}
              style={{ filter: f.aplicar(1) || undefined }}
            />
            <span className={`text-xs ${i === filtroIndex ? "text-white font-semibold" : "text-white/70"}`}>
              {f.nome}
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 mb-1">
        <span className="text-white/60 text-xs uppercase">Intensidade</span>
        <span className="text-white text-xs font-semibold">{intensidade}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={intensidade}
        onChange={(e) => onIntensidade(Number(e.target.value))}
        className="w-full accent-white"
      />
    </ToolPanel>
  );
}