import React from "react";
import { Pencil } from "lucide-react";
import ToolPanel from "@/components/youtube/ToolPanel";

export const ESTILOS = [
  { id: "classico", nome: "Clássico", classe: "font-bold", caixa: true },
  { id: "moderno", nome: "Moderno", classe: "font-semibold uppercase tracking-wider", caixa: false },
  { id: "destaque", nome: "Destaque", classe: "font-extrabold italic", caixa: true },
];

export const CORES = [
  { nome: "Branco", ponto: "bg-white", texto: "text-white" },
  { nome: "Preto", ponto: "bg-black", texto: "text-black" },
  { nome: "Vermelho", ponto: "bg-red-500", texto: "text-red-500" },
  { nome: "Amarelo", ponto: "bg-yellow-400", texto: "text-yellow-400" },
  { nome: "Verde", ponto: "bg-green-500", texto: "text-green-500" },
  { nome: "Azul", ponto: "bg-blue-500", texto: "text-blue-500" },
  { nome: "Roxo", ponto: "bg-purple-500", texto: "text-purple-500" },
  { nome: "Rosa", ponto: "bg-pink-500", texto: "text-pink-500" },
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
      titulo="Aa Texto"
      rodape="Arraste o texto para posicionar na prévia."
      concluirAtivo={concluirAtivo}
      onConcluir={onConcluir}
    >
      <p className="text-white/60 text-xs uppercase mb-2">Tipo do texto</p>
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
      <div className="flex flex-wrap items-center gap-2.5">
        {CORES.map((c, i) => (
          <button
            key={c.nome}
            type="button"
            onClick={() => onCorIndex(i)}
            className={`w-8 h-8 rounded-full border border-white/30 ${c.ponto} ${
              i === corIndex ? "ring-4 ring-white" : ""
            }`}
          />
        ))}
      </div>

      <p className="text-white/60 text-xs uppercase mt-4 mb-2">O que vai escrito no vídeo</p>
      <div className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-3 py-2">
        <input
          value={texto}
          onChange={(e) => onTexto(e.target.value)}
          placeholder="Meu primeiro Short ✨"
          className="flex-1 bg-transparent text-white text-base placeholder:text-white/40 outline-none"
        />
        <Pencil className="w-4 h-4 text-white/70 shrink-0" />
      </div>

      <div className="mt-4 h-24 rounded-2xl bg-gradient-to-b from-indigo-500 via-purple-500 to-rose-500 flex items-center justify-center px-4">
        <p
          className={`text-center text-lg drop-shadow-lg ${estilo.classe} ${cor.texto} ${
            estilo.caixa ? "bg-black/60 rounded-lg px-2 py-1" : ""
          }`}
        >
          {texto || "Meu primeiro Short ✨"}
        </p>
      </div>
    </ToolPanel>
  );
}