import React from "react";
import ToolPanel from "@/components/youtube/ToolPanel";

export const ESTILOS = [
  { id: "classico", nome: "Clássico", classe: "font-bold" },
  { id: "moderno", nome: "Moderno", classe: "font-semibold uppercase tracking-wider" },
  { id: "destaque", nome: "Destaque", classe: "font-extrabold italic" },
];

export const CORES = [
  { nome: "Branco", ponto: "bg-white", texto: "text-white" },
  { nome: "Amarelo", ponto: "bg-yellow-400", texto: "text-yellow-400" },
  { nome: "Rosa", ponto: "bg-pink-500", texto: "text-pink-500" },
  { nome: "Azul", ponto: "bg-sky-400", texto: "text-sky-400" },
  { nome: "Verde", ponto: "bg-emerald-400", texto: "text-emerald-400" },
];

// Painel do Aa: escrever a frase, escolher o tipo da letra e a cor
export default function TextPanel({
  texto,
  corIndex,
  estiloIndex,
  onTexto,
  onCorIndex,
  onEstiloIndex,
  concluirAtivo,
  onConcluir,
}) {
  const cor = CORES[corIndex];
  const estilo = ESTILOS[estiloIndex];

  return (
    <ToolPanel
      titulo="Texto"
      dica="Escreva a frase, escolha o tipo da letra e a cor"
      concluirAtivo={concluirAtivo}
      onConcluir={onConcluir}
    >
      <input
        value={texto}
        onChange={(e) => onTexto(e.target.value)}
        placeholder="Meu primeiro Short"
        className="w-full rounded-xl px-3 py-3 bg-white/10 border border-white/20 text-white text-base placeholder:text-white/40"
      />

      <p className="text-white/60 text-xs uppercase mt-4 mb-2">Tipo do texto</p>
      <div className="flex gap-2">
        {ESTILOS.map((e, i) => (
          <button
            key={e.id}
            type="button"
            onClick={() => onEstiloIndex(i)}
            className={`flex-1 px-2 py-2 rounded-xl text-sm ${
              i === estiloIndex ? "bg-white text-gray-900 font-semibold" : "bg-white/10 text-white"
            }`}
          >
            {e.nome}
          </button>
        ))}
      </div>

      <p className="text-white/60 text-xs uppercase mt-4 mb-2">Cor da letra</p>
      <div className="flex items-center gap-3">
        {CORES.map((c, i) => (
          <button
            key={c.nome}
            type="button"
            onClick={() => onCorIndex(i)}
            className={`w-9 h-9 rounded-full ${c.ponto} ${i === corIndex ? "ring-4 ring-white" : ""}`}
          />
        ))}
      </div>

      <div className="mt-5 h-24 rounded-2xl bg-gradient-to-b from-indigo-500 via-purple-500 to-rose-500 flex items-center justify-center px-4">
        <p className={`text-center text-lg drop-shadow-lg ${estilo.classe} ${cor.texto}`}>
          {texto || "Meu primeiro Short"}
        </p>
      </div>
    </ToolPanel>
  );
}