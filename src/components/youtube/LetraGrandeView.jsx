import React, { useState } from "react";

// Ajuste do próprio celular: tamanho da letra em todos os aplicativos
export default function LetraGrandeView() {
  const [tamanho, setTamanho] = useState(50);
  const tamanhoFonte = 14 + Math.round(((tamanho - 50) / 50) * 16);

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <h2 className="text-xl font-bold text-gray-900 pt-3">Tamanho do texto do celular</h2>
      <p className="text-base text-gray-700 mt-1 leading-snug">
        Este é um ajuste do próprio celular. Ele aumenta a letra do YouTube e de todos os outros
        aplicativos de uma vez.
      </p>

      <div className="mt-4 rounded-2xl border border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-semibold">A</span>
          <span className="text-3xl text-gray-900 font-bold">A</span>
        </div>
        <input
          type="range"
          min="50"
          max="100"
          value={tamanho}
          onChange={(e) => setTamanho(Number(e.target.value))}
          className="w-full mt-3 accent-red-600"
        />
        <p className="text-sm text-gray-600 text-center">Arraste para a direita para aumentar</p>
      </div>

      <div className="mt-4 rounded-2xl bg-gray-50 px-4 py-4">
        <p className="text-sm font-bold text-gray-500 uppercase">Exemplo</p>
        <p style={{ fontSize: `${tamanhoFonte}px` }} className="text-gray-900 mt-2 leading-snug">
          As letras do YouTube vão ficar deste tamanho.
        </p>
      </div>

      <p className="text-base font-bold text-gray-900 mt-5">Como fazer no seu celular</p>
      <ol className="mt-2 space-y-2">
        {[
          "Abra as Configurações do celular, o desenho da engrenagem do aparelho.",
          "Toque em Visor, Tela ou Acessibilidade.",
          "Toque em Tamanho da fonte ou Tamanho do texto.",
          "Arraste a barrinha para a direita até a letra ficar do seu tamanho.",
        ].map((passo, index) => (
          <li key={passo} className="flex gap-3 rounded-2xl border border-gray-200 px-3 py-3">
            <span className="w-6 h-6 rounded-full bg-red-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
              {index + 1}
            </span>
            <span className="text-base text-gray-800 leading-snug">{passo}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}