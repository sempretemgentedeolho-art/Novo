import React from "react";
import ToolPanel from "@/components/youtube/ToolPanel";

export const FILTROS = [
  { id: "original", nome: "Original", classe: "" },
  { id: "vivido", nome: "Vívido", classe: "saturate-150" },
  { id: "quente", nome: "Quente", classe: "sepia-[.4]" },
  { id: "frio", nome: "Frio", classe: "hue-rotate-15" },
  { id: "suave", nome: "Suave", classe: "brightness-110" },
  { id: "preto", nome: "Preto e branco", classe: "grayscale" },
];

// Painel de filtros: muda as cores do vídeo
export default function FiltersPanel({ filtroIndex, onFiltroIndex, onConcluir }) {
  return (
    <ToolPanel
      titulo="Filtros"
      dica="Toque no filtro para mudar as cores do seu vídeo"
      onConcluir={onConcluir}
    >
      <div className="grid grid-cols-3 gap-3">
        {FILTROS.map((f, i) => (
          <button key={f.id} type="button" onClick={() => onFiltroIndex(i)} className="flex flex-col items-center gap-1.5">
            <div
              className={`w-full h-20 rounded-xl bg-gradient-to-b from-indigo-500 via-purple-500 to-rose-500 ${
                f.classe
              } ${i === filtroIndex ? "ring-4 ring-white" : ""}`}
            />
            <span className={`text-xs ${i === filtroIndex ? "text-white font-semibold" : "text-white/70"}`}>
              {f.nome}
            </span>
          </button>
        ))}
      </div>
    </ToolPanel>
  );
}