import React from "react";
import ToolPanel from "@/components/youtube/ToolPanel";

// Painel de legendas: escrever o que se fala no vídeo
export default function CaptionsPanel({ legenda, onLegenda, onConcluir }) {
  return (
    <ToolPanel
      titulo="Legendas"
      dica="Escreva o que você fala no vídeo. A legenda aparece embaixo da tela."
      onConcluir={onConcluir}
    >
      <textarea
        value={legenda}
        onChange={(e) => onLegenda(e.target.value)}
        rows={3}
        placeholder="Hoje eu vou ensinar uma receita bem fácil"
        className="w-full rounded-xl px-3 py-3 bg-white/10 border border-white/20 text-white text-base placeholder:text-white/40 resize-none"
      />
    </ToolPanel>
  );
}