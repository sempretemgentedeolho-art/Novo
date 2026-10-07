import React, { useState } from "react";
import ToolPanel from "@/components/youtube/ToolPanel";

const QUADROS = [
  "from-indigo-400 to-purple-500",
  "from-purple-400 to-rose-500",
  "from-rose-400 to-orange-400",
  "from-orange-400 to-amber-400",
  "from-amber-400 to-yellow-300",
  "from-yellow-300 to-lime-400",
];

// Painel de edição: cortar o começo e o fim do vídeo
export default function EditarPanel({ onConcluir }) {
  const [inicio, setInicio] = useState(0);
  const [fim, setFim] = useState(100);

  return (
    <ToolPanel
      titulo="Linha do tempo"
      dica="Arraste as barrinhas para cortar o começo e o fim"
      onConcluir={onConcluir}
    >
      <div className="flex gap-1.5 overflow-hidden rounded-xl">
        {QUADROS.map((q) => (
          <div key={q} className={`h-16 flex-1 bg-gradient-to-br ${q}`} />
        ))}
      </div>

      <label className="block text-white/70 text-xs uppercase mt-4 mb-1">Começo</label>
      <input
        type="range"
        min="0"
        max="80"
        value={inicio}
        onChange={(e) => setInicio(Number(e.target.value))}
        className="w-full accent-sky-500"
      />

      <label className="block text-white/70 text-xs uppercase mt-3 mb-1">Fim</label>
      <input
        type="range"
        min="20"
        max="100"
        value={fim}
        onChange={(e) => setFim(Number(e.target.value))}
        className="w-full accent-sky-500"
      />
    </ToolPanel>
  );
}