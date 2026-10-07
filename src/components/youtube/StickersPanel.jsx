import React from "react";
import ToolPanel from "@/components/youtube/ToolPanel";

export const ADESIVOS = ["❤️", "🔥", "⭐", "😀", "👍", "🎉", "🥰", "😂", "🌻", "☕", "🎵", "📷"];

// Painel de adesivos: figurinhas para colocar em cima do vídeo
export default function StickersPanel({ adesivo, onAdesivo, onConcluir }) {
  return (
    <ToolPanel
      titulo="Adesivos"
      dica="Toque na figurinha para ela aparecer no seu vídeo"
      onConcluir={onConcluir}
    >
      <div className="grid grid-cols-4 gap-3">
        {ADESIVOS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => onAdesivo(a)}
            className={`py-3 rounded-xl text-3xl ${
              adesivo === a ? "bg-white/25 ring-2 ring-white" : "bg-white/10"
            }`}
          >
            {a}
          </button>
        ))}
      </div>
    </ToolPanel>
  );
}