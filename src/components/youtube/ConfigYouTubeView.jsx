import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

const OPCOES = [
  {
    id: "legendas",
    label: "Legendas automáticas",
    sub: "Mostra a legenda em português nos vídeos",
    inicial: true,
  },
  {
    id: "restrito",
    label: "Modo restrito",
    sub: "Esconde vídeos que não são para a sua idade",
    inicial: false,
  },
  {
    id: "dados",
    label: "Economia de dados",
    sub: "Usa menos internet e gasta menos do seu plano",
    inicial: false,
  },
  {
    id: "auto",
    label: "Reprodução automática",
    sub: "O próximo vídeo começa sozinho",
    inicial: true,
  },
];

// Configurações do YouTube: chavinhas que funcionam de verdade
export default function ConfigYouTubeView({ target, onTap }) {
  const [ligado, setLigado] = useState(() =>
    Object.fromEntries(OPCOES.map((o) => [o.id, o.inicial]))
  );

  const alternar = (id) => setLigado((l) => ({ ...l, [id]: !l[id] }));

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <h2 className="text-lg font-bold text-gray-900 pt-3">Configurações do YouTube</h2>
      <p className="text-xs text-gray-600 mt-1 mb-4 leading-snug">
        Deixe o aplicativo do seu jeito. Toque na chavinha para ligar e desligar cada opção.
      </p>

      <div className="space-y-2">
        {OPCOES.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => alternar(o.id)}
            className="w-full flex items-center gap-3 rounded-2xl border border-gray-200 px-3 py-3 text-left"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{o.label}</p>
              <p className="text-xs text-gray-600 mt-0.5 leading-snug">{o.sub}</p>
            </div>
            <span
              className={`w-12 h-7 rounded-full p-0.5 shrink-0 ${
                ligado[o.id] ? "bg-red-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`block w-6 h-6 rounded-full bg-white ${
                  ligado[o.id] ? "translate-x-5" : ""
                }`}
              />
            </span>
          </button>
        ))}

        <Pulse active={target === "config_legendas"} className="w-full" ring="rounded-2xl">
          <button
            type="button"
            onClick={() => onTap("config_legendas")}
            className="w-full flex items-center gap-3 rounded-2xl border border-gray-200 px-3 py-3 text-left"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Aparência da legenda</p>
              <p className="text-xs text-gray-600 mt-0.5 leading-snug">
                Escolha o tamanho da letra da legenda
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
          </button>
        </Pulse>
      </div>
    </div>
  );
}