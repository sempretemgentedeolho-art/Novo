import React, { useState } from "react";
import { Mic, Search } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

const EXEMPLOS = ["Receita de bolo de cenoura", "Músicas antigas", "Notícias de hoje"];

// Busca por voz: a pessoa fala o que quer assistir, sem digitar
export default function VozBuscaView({ target, onFalar, onResultado }) {
  const [escutando, setEscutando] = useState(false);
  const [fala, setFala] = useState("");

  const falar = () => {
    if (escutando) return;
    setEscutando(true);
    setFala("");
    setTimeout(() => {
      setEscutando(false);
      setFala("receita de bolo de cenoura");
      onFalar();
    }, 1600);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="px-4 pt-4">
        <h2 className="text-xl font-bold text-gray-900">Falar para procurar</h2>
        <p className="text-base text-gray-700 mt-1 leading-snug">
          Se você não quer digitar no teclado, é só falar. Toque no microfone e diga o que procura.
        </p>
      </div>

      <div className="flex flex-col items-center px-6 mt-6">
        <Pulse active={target === "voz_falar"} ring="rounded-full">
          <button
            type="button"
            onClick={falar}
            className={`w-32 h-32 rounded-full flex items-center justify-center ${
              escutando ? "bg-red-600" : "bg-red-50 border-4 border-red-600"
            }`}
          >
            <Mic className={`w-14 h-14 ${escutando ? "text-white" : "text-red-600"}`} />
          </button>
        </Pulse>

        <p className="text-lg font-bold text-gray-900 mt-4">
          {escutando ? "Estou ouvindo..." : fala ? "Entendi o que você falou!" : "Toque e fale"}
        </p>
        <p className="text-base text-gray-600 text-center mt-1 leading-snug">
          Fale devagar, com o celular perto de você.
        </p>

        {fala && (
          <Pulse active={target === "voz_resultado"} className="w-full mt-6" ring="rounded-2xl">
            <button
              type="button"
              onClick={onResultado}
              className="w-full flex items-center gap-3 rounded-2xl border-2 border-gray-200 px-3 py-4 text-left"
            >
              <Search className="w-5 h-5 text-gray-500 shrink-0" />
              <span className="flex-1 text-lg font-semibold text-gray-900">{fala}</span>
            </button>
          </Pulse>
        )}
      </div>

      {!fala && (
        <div className="px-4 mt-8">
          <p className="text-sm font-bold text-gray-500 uppercase">Você pode falar, por exemplo</p>
          <div className="mt-2 space-y-2">
            {EXEMPLOS.map((exemplo) => (
              <p key={exemplo} className="text-base text-gray-700 rounded-xl bg-gray-50 px-3 py-2">
                {exemplo}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}