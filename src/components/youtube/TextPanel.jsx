import React from "react";
import { Pencil } from "lucide-react";
import ToolPanel from "@/components/youtube/ToolPanel";

export const ESTILOS = [
  { id: "classico", nome: "Clássico", classe: "font-bold", caixa: true },
  { id: "moderno", nome: "Moderno", classe: "font-semibold uppercase tracking-wider", caixa: false },
  { id: "destaque", nome: "Destaque", classe: "font-extrabold italic", caixa: true },
];

// Duas fileiras de cinco bolinhas de cor, como no YouTube
export const CORES = [
  { nome: "Branco", ponto: "bg-white", texto: "text-white" },
  { nome: "Rosa", ponto: "bg-pink-500", texto: "text-pink-500" },
  { nome: "Laranja", ponto: "bg-orange-500", texto: "text-orange-500" },
  { nome: "Amarelo", ponto: "bg-yellow-400", texto: "text-yellow-400" },
  { nome: "Verde", ponto: "bg-green-500", texto: "text-green-500" },
  { nome: "Roxo", ponto: "bg-purple-500", texto: "text-purple-500" },
  { nome: "Vermelho", ponto: "bg-red-500", texto: "text-red-500" },
  { nome: "Azul", ponto: "bg-blue-500", texto: "text-blue-500" },
  { nome: "Cinza", ponto: "bg-gray-400", texto: "text-gray-400" },
  { nome: "Preto", ponto: "bg-black", texto: "text-black" },
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
  const frase = texto || "Meu primeiro Short";

  return (
    <ToolPanel
      titulo="Aa Texto"
      rodape="Arraste o texto para posicionar na prévia."
      concluirAtivo={concluirAtivo}
      onConcluir={onConcluir}
    >
      <p className="text-white/50 text-[10px] font-semibold tracking-wider uppercase mb-2">
        Tipo do texto
      </p>
      <div className="flex gap-2">
        {ESTILOS.map((e, i) => (
          <button
            key={e.id}
            type="button"
            onClick={() => onEstiloIndex(i)}
            className={`flex-1 py-2 rounded-full text-sm ${
              i === estiloIndex
                ? "bg-white text-gray-900 font-semibold"
                : "border border-white/40 text-white"
            }`}
          >
            {e.nome}
          </button>
        ))}
      </div>

      <p className="text-white/50 text-[10px] font-semibold tracking-wider uppercase mt-4 mb-2">
        Cor da letra
      </p>
      <div className="grid grid-cols-5 gap-2 justify-items-center">
        {CORES.map((c, i) => (
          <button
            key={c.nome}
            type="button"
            onClick={() => onCorIndex(i)}
            className={`w-9 h-9 rounded-full border border-white/30 ${c.ponto} ${
              i === corIndex ? "ring-4 ring-white" : ""
            }`}
          />
        ))}
      </div>

      <p className="text-white/50 text-[10px] font-semibold tracking-wider uppercase mt-4 mb-2">
        O que vai escrito no vídeo
      </p>
      <div className="flex items-center gap-2 rounded-2xl bg-white/10 border border-white/20 px-3 py-2.5">
        <input
          value={texto}
          onChange={(e) => onTexto(e.target.value)}
          placeholder="Meu primeiro Short"
          className="flex-1 bg-transparent text-white text-base placeholder:text-white/40 outline-none"
        />
        <Pencil className="w-4 h-4 text-white/70 shrink-0" />
      </div>

      <div className="mt-4 w-full py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center px-4">
        <p className={`text-center text-base ${estilo.classe} ${cor.texto}`}>{frase}</p>
      </div>
    </ToolPanel>
  );
}