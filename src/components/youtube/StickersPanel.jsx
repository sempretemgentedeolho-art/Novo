import React from "react";
import { Search } from "lucide-react";
import ToolPanel from "@/components/youtube/ToolPanel";

export const ADESIVOS = [
  { id: "coracao", nome: "Coração", emoji: "❤️" },
  { id: "brilho", nome: "Brilho", emoji: "✨" },
  { id: "fogo", nome: "Fogo", emoji: "🔥" },
  { id: "amei", nome: "Amei", emoji: "😍" },
  { id: "festa", nome: "Festa", emoji: "🎉" },
];

// Painel de adesivos: figurinhas para colocar em cima do vídeo
export default function StickersPanel({ adesivo, onAdesivo, onConcluir }) {
  return (
    <ToolPanel
      titulo="Adesivos"
      rodape="Arraste para mover. Use o canto para redimensionar."
      onConcluir={onConcluir}
    >
      <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 mb-3">
        <Search className="w-4 h-4 text-white/70" />
        <span className="text-white/70 text-sm">Buscar adesivos e GIFs</span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {ADESIVOS.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => onAdesivo(a.emoji)}
            className="flex flex-col items-center gap-1"
          >
            <div
              className={`w-full h-16 rounded-xl flex items-center justify-center text-3xl bg-white/10 ${
                adesivo === a.emoji ? "ring-2 ring-red-500" : ""
              }`}
            >
              {a.emoji}
            </div>
            <span className={`text-xs ${adesivo === a.emoji ? "text-white font-semibold" : "text-white/70"}`}>
              {a.nome}
            </span>
          </button>
        ))}
      </div>
    </ToolPanel>
  );
}