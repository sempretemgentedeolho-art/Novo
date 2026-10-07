import React, { useState } from "react";
import Pulse from "@/components/youtube/Pulse";
import ToolPanel from "@/components/youtube/ToolPanel";

export const CATEGORIAS = ["Para você", "Rosto", "Cenário"];

export const EFEITOS = [
  { id: "nenhum", nome: "Nenhum", emoji: "", categoria: "Para você" },
  {
    id: "estrela",
    nome: "Estrela",
    emoji: "✨",
    categoria: "Para você",
    overlay: "bg-gradient-to-tr from-white/40 via-transparent to-sky-300/40",
  },
  {
    id: "coracoes",
    nome: "Corações",
    emoji: "❤️",
    categoria: "Para você",
    overlay: "bg-gradient-to-t from-rose-500/50 to-transparent",
  },
  {
    id: "brilho",
    nome: "Brilho",
    emoji: "🌟",
    categoria: "Para você",
    overlay: "bg-gradient-to-b from-yellow-300/40 to-transparent",
  },
  {
    id: "distorcao",
    nome: "Distorção",
    emoji: "🌀",
    categoria: "Para você",
    overlay: "bg-gradient-to-r from-purple-500/40 via-transparent to-cyan-400/40",
  },
  {
    id: "suavizar",
    nome: "Suavizar",
    emoji: "🙂",
    categoria: "Rosto",
    overlay: "bg-gradient-to-b from-white/25 to-transparent",
  },
  {
    id: "contorno",
    nome: "Contorno",
    emoji: "😎",
    categoria: "Rosto",
    overlay: "bg-gradient-to-t from-black/50 to-transparent",
  },
  {
    id: "retoque",
    nome: "Retoque",
    emoji: "💫",
    categoria: "Rosto",
    overlay: "bg-gradient-to-tr from-pink-300/35 to-transparent",
  },
  {
    id: "cinema",
    nome: "Cinema",
    emoji: "🎬",
    categoria: "Cenário",
    overlay: "bg-gradient-to-t from-black/70 to-transparent",
  },
  {
    id: "nevoa",
    nome: "Névoa",
    emoji: "🌫️",
    categoria: "Cenário",
    overlay: "bg-gradient-to-b from-slate-200/40 to-transparent",
  },
  {
    id: "faisca",
    nome: "Faísca",
    emoji: "🔥",
    categoria: "Cenário",
    overlay: "bg-gradient-to-b from-orange-500/45 to-transparent",
  },
];

// Painel de efeitos: escolher o efeito e a intensidade
export default function EffectsPanel({
  target,
  efeitoIndex,
  intensidade,
  onEfeitoIndex,
  onIntensidade,
  onTap,
  concluirAtivo,
  onConcluir,
}) {
  const [categoria, setCategoria] = useState(CATEGORIAS[0]);
  const lista = EFEITOS.map((e, i) => ({ ...e, index: i })).filter((e) => e.categoria === categoria);

  return (
    <ToolPanel
      titulo="Efeitos"
      rodape="Arraste a barrinha para deixar o efeito mais forte ou mais fraco."
      concluirAtivo={concluirAtivo}
      onConcluir={onConcluir}
    >
      <div className="flex gap-2 mb-3">
        {CATEGORIAS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategoria(c)}
            className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${
              c === categoria
                ? "bg-white text-gray-900 font-semibold"
                : "border border-white/40 text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {lista.map((e) => (
          <Pulse key={e.id} className="w-full" ring="rounded-xl" active={target === `efeito_${e.id}`}>
            <button
              type="button"
              onClick={() => {
                onEfeitoIndex(e.index);
                onTap(`efeito_${e.id}`);
              }}
              className="w-full flex flex-col items-center gap-1"
            >
              <div
                className={`w-full h-16 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-b from-indigo-500 via-purple-500 to-rose-500 ${
                  e.overlay || ""
                } ${e.index === efeitoIndex ? "ring-2 ring-orange-500" : ""}`}
              >
                {e.emoji}
              </div>
              <span className={`text-xs ${e.index === efeitoIndex ? "text-white font-semibold" : "text-white/70"}`}>
                {e.nome}
              </span>
            </button>
          </Pulse>
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