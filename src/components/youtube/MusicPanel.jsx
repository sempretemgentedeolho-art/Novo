import React from "react";
import { Music2, Search } from "lucide-react";
import ToolPanel from "@/components/youtube/ToolPanel";
import Pulse from "@/components/youtube/Pulse";

export const MUSICAS = [
  { id: "m1", nome: "Marchinha da alegria", artista: "Banda do Coração", tempo: "20s" },
  { id: "m2", nome: "Modão de viola", artista: "Dupla Sertaneja", tempo: "15s" },
  { id: "m3", nome: "Melodia calma de piano", artista: "Piano Suave", tempo: "15s" },
];

// Painel de música: escolher a música que toca junto com o vídeo
export default function MusicPanel({ target, musica, onEscolher, onConcluir }) {
  return (
    <ToolPanel
      titulo="Música"
      dica="Toque na música para ela tocar junto com o seu vídeo"
      onConcluir={onConcluir}
    >
      <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 mb-3">
        <Search className="w-4 h-4 text-white/70" />
        <span className="text-white/70 text-sm">Digite a música ou o cantor</span>
      </div>

      <div className="space-y-2">
        {MUSICAS.map((m, i) => (
          <Pulse
            key={m.id}
            active={target === "musica" && i === 0}
            className="w-full"
            ring="rounded-xl"
          >
            <button
              type="button"
              onClick={() => onEscolher(m)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-left ${
                musica?.id === m.id ? "bg-white/20 border border-white/40" : "bg-white/10"
              }`}
            >
              <Music2 className="w-5 h-5 text-white shrink-0" />
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{m.nome}</p>
                <p className="text-white/60 text-xs">
                  {m.artista} · {m.tempo}
                </p>
              </div>
            </button>
          </Pulse>
        ))}
      </div>
    </ToolPanel>
  );
}