import React, { useState } from "react";
import { Send } from "lucide-react";

const OUTROS = [
  {
    id: 1,
    autor: "Maria",
    quando: "há 2 dias",
    texto: "Fiz ontem e ficou uma delícia! Muito fácil de entender.",
  },
  {
    id: 2,
    autor: "João",
    quando: "há 5 dias",
    texto: "Obrigado por explicar devagar, deu certo aqui em casa.",
  },
];

// Comentários do vídeo: o que as pessoas escreveram e onde você escreve o seu
export default function ComentariosView({ meuComentario }) {
  const [novo, setNovo] = useState("");
  const [comentarios, setComentarios] = useState(OUTROS);

  const enviar = () => {
    if (!novo.trim()) return;
    setComentarios([{ id: Date.now(), autor: "Você", quando: "agora", texto: novo }, ...comentarios]);
    setNovo("");
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <h2 className="text-lg font-bold text-gray-900 pt-3">Comentários · 128</h2>
      <p className="text-xs text-gray-600 mt-1 leading-snug">
        Tudo que as pessoas escreveram sobre este vídeo. Escreva sempre com educação, porque todo
        mundo pode ler.
      </p>

      <div className="mt-4 rounded-2xl bg-blue-50 px-3 py-3">
        <p className="text-xs font-semibold text-blue-900">Você · agora</p>
        <p className="text-sm text-gray-800 mt-1 leading-snug">{meuComentario}</p>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-2xl border border-gray-200 px-3 py-2">
        <input
          value={novo}
          onChange={(e) => setNovo(e.target.value)}
          placeholder="Escreva um comentário..."
          className="flex-1 text-sm text-gray-900 outline-none py-1"
        />
        <button
          type="button"
          onClick={enviar}
          className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shrink-0"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {comentarios.map((c) => (
          <div key={c.id} className="rounded-2xl border border-gray-200 px-3 py-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gray-300 text-gray-800 text-[10px] font-bold flex items-center justify-center">
                {c.autor.slice(0, 2).toUpperCase()}
              </div>
              <p className="text-xs font-semibold text-gray-900">{c.autor}</p>
              <p className="text-[11px] text-gray-500">{c.quando}</p>
            </div>
            <p className="text-sm text-gray-800 mt-1.5 leading-snug">{c.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}