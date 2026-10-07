import React, { useState } from "react";
import { Languages, Check, Volume2 } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

const FAIXAS = [
  {
    id: "dublagem_pt",
    label: "Português (dublado automaticamente)",
    sub: "Uma voz do YouTube fala o vídeo em português para você",
  },
  {
    id: "dublagem_original",
    label: "Áudio original do vídeo",
    sub: "A voz de quem gravou, no idioma em que o vídeo foi feito",
  },
];

// Dublagem automática: ouvir em português um vídeo gravado em outro idioma
export default function DublagemView({ target, onTap }) {
  const [faixa, setFaixa] = useState("dublagem_pt");

  const escolher = (id) => {
    setFaixa(id);
    onTap(id);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <div className="flex items-center gap-2 pt-3">
        <Languages className="w-5 h-5 text-red-600" />
        <h2 className="text-xl font-bold text-gray-900">Áudio dublado</h2>
      </div>
      <p className="text-base text-gray-700 mt-1 mb-4 leading-snug">
        Alguns vídeos são gravados em outro idioma. Com a dublagem automática, o próprio YouTube troca
        a voz do vídeo para português, sozinho e sem precisar de legenda. Assim você ouve e entende.
      </p>

      <div className="space-y-2">
        {FAIXAS.map((f) => (
          <Pulse key={f.id} active={target === f.id} className="w-full" ring="rounded-2xl">
            <button
              type="button"
              onClick={() => escolher(f.id)}
              className={`w-full flex items-center gap-3 rounded-2xl border-2 px-3 py-3 text-left ${
                faixa === f.id ? "border-red-600 bg-red-50" : "border-gray-200"
              }`}
            >
              <Volume2 className="w-5 h-5 text-gray-700 shrink-0" />
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900 leading-snug">{f.label}</p>
                <p className="text-sm text-gray-600 mt-0.5 leading-snug">{f.sub}</p>
              </div>
              {faixa === f.id && <Check className="w-5 h-5 text-red-600 shrink-0" />}
            </button>
          </Pulse>
        ))}
      </div>

      <p
        className={`mt-4 text-sm leading-snug rounded-2xl px-3 py-3 ${
          faixa === "dublagem_pt" ? "bg-emerald-50 text-emerald-800" : "bg-gray-50 text-gray-700"
        }`}
      >
        {faixa === "dublagem_pt"
          ? "Pronto: o áudio em português está escolhido. O YouTube dubla sozinho, e o vídeo passa com a voz em português sempre que existir essa opção."
          : "Nesta opção você ouve a voz de quem gravou, no idioma original do vídeo. Se ficar difícil entender, ligue a legenda ou volte aqui e escolha o português."}
      </p>

      <p className="mt-3 text-sm text-gray-700 leading-snug rounded-2xl bg-gray-50 px-3 py-3">
        Você pode mudar esta escolha quando quiser. Toque na seta de voltar, lá em cima, para
        terminar.
      </p>
    </div>
  );
}