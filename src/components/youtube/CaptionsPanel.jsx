import React from "react";
import { Pencil } from "lucide-react";
import ToolPanel from "@/components/youtube/ToolPanel";

export const ESTILOS_LEGENDA = [
  { id: "padrao", nome: "Padrão", classe: "text-xs" },
  { id: "destaque", nome: "Destaque", classe: "text-sm font-bold" },
  { id: "simples", nome: "Simples", classe: "text-xs font-normal" },
];

// Painel de legendas: escrever o que se fala no vídeo
export default function CaptionsPanel({
  legenda,
  onLegenda,
  ativas,
  onAtivas,
  estiloIndex,
  onEstiloIndex,
  onConcluir,
}) {
  return (
    <ToolPanel
      titulo="Legendas"
      rodape="Toque em Editar legenda para corrigir o que foi escrito."
      onConcluir={onConcluir}
    >
      <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 p-3">
        <div className="flex-1">
          <p className="text-white text-sm font-medium">Legendas automáticas</p>
          <p className="text-white/60 text-xs">Português (Brasil) · Geradas</p>
        </div>
        <button
          type="button"
          onClick={() => onAtivas(!ativas)}
          className={`w-12 h-7 rounded-full p-0.5 shrink-0 ${ativas ? "bg-white" : "bg-white/25"}`}
        >
          <span
            className={`block w-6 h-6 rounded-full transition-transform ${
              ativas ? "translate-x-5 bg-gray-900" : "bg-white"
            }`}
          />
        </button>
      </div>

      <p className="text-white/60 text-xs uppercase mt-4 mb-2">Estilo da legenda</p>
      <div className="flex gap-2">
        {ESTILOS_LEGENDA.map((e, i) => (
          <button
            key={e.id}
            type="button"
            onClick={() => onEstiloIndex(i)}
            className={`flex-1 px-2 py-2 rounded-full text-sm ${
              i === estiloIndex
                ? "border-2 border-white text-white font-semibold"
                : "border border-white/40 text-white/70"
            }`}
          >
            {e.nome}
          </button>
        ))}
      </div>

      <p className="text-white/60 text-xs uppercase mt-4 mb-2">O que você falou</p>
      <div className="rounded-2xl bg-white/10 p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/70 text-xs">00:03 - 00:06</span>
          <span className="flex items-center gap-1 text-white text-xs font-medium">
            <Pencil className="w-3.5 h-3.5" />
            Editar legenda
          </span>
        </div>
        <textarea
          value={legenda}
          onChange={(e) => onLegenda(e.target.value)}
          rows={2}
          placeholder="Hoje eu vou criar meu primeiro Short!"
          className="w-full rounded-xl px-3 py-2 bg-black/30 text-white text-sm placeholder:text-white/40 resize-none outline-none"
        />
      </div>
    </ToolPanel>
  );
}