import React, { useState } from "react";

const TAMANHOS = [
  { id: "pequena", label: "Pequena", exemplo: "text-xs" },
  { id: "media", label: "Média", exemplo: "text-sm" },
  { id: "grande", label: "Grande", exemplo: "text-lg" },
  { id: "enorme", label: "Enorme", exemplo: "text-2xl" },
];

// Aparência da legenda: escolher o tamanho da letra que aparece no vídeo
export default function LegendasConfigView() {
  const [tamanho, setTamanho] = useState("grande");
  const escolhido = TAMANHOS.find((t) => t.id === tamanho);

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <h2 className="text-lg font-bold text-gray-900 pt-3">Aparência da legenda</h2>
      <p className="text-xs text-gray-600 mt-1 leading-snug">
        A legenda é o texto que aparece embaixo do vídeo com o que as pessoas estão falando. Escolha
        a letra que você enxerga melhor.
      </p>

      <div className="space-y-2 mt-4">
        {TAMANHOS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTamanho(t.id)}
            className={`w-full flex items-center gap-3 rounded-2xl border px-3 py-3 text-left ${
              tamanho === t.id ? "border-gray-900 bg-gray-50" : "border-gray-200"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full border-2 shrink-0 ${
                tamanho === t.id ? "border-gray-900 bg-gray-900" : "border-gray-300"
              }`}
            />
            <span className={`${t.exemplo} text-gray-900`}>{t.label}</span>
          </button>
        ))}
      </div>

      <p className="text-xs font-bold text-gray-500 uppercase mt-6 mb-2">Como vai aparecer</p>
      <div className="rounded-2xl bg-gray-900 px-3 py-6 flex justify-center">
        <span className={`${escolhido.exemplo} text-white text-center leading-snug`}>
          Que receita fácil, gostei muito!
        </span>
      </div>

      <p className="text-xs text-gray-600 mt-3 leading-snug">
        Este tamanho vale para todos os vídeos do YouTube no seu celular.
      </p>
    </div>
  );
}