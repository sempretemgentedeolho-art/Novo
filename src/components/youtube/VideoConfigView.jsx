import React, { useState } from "react";
import { Gauge, Captions, Lock, Check } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

const VELOCIDADES = [
  { id: "vel_05", label: "0,5x", sub: "Bem devagar, quase pela metade" },
  { id: "vel_1", label: "1x", sub: "Normal, como o vídeo foi gravado" },
  { id: "vel_15", label: "1,5x", sub: "Um pouco mais rápido" },
  { id: "vel_2", label: "2x", sub: "Duas vezes mais rápido" },
];

// Configurações do vídeo: velocidade, legenda e tela de bloqueio
export default function VideoConfigView({ target, onTap }) {
  const [velocidade, setVelocidade] = useState("vel_1");
  const [legenda, setLegenda] = useState(false);
  const [bloqueio, setBloqueio] = useState(false);

  const escolher = (id) => {
    setVelocidade(id);
    onTap(id);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <h2 className="text-xl font-bold text-gray-900 pt-3">Configurações do vídeo</h2>
      <p className="text-base text-gray-700 mt-1 mb-4 leading-snug">
        Estas opções valem só para o vídeo que está aberto. Escolha e depois toque em Concluir.
      </p>

      <div className="flex items-center gap-2">
        <Gauge className="w-5 h-5 text-gray-900" />
        <p className="text-base font-bold text-gray-900">Velocidade de reprodução</p>
      </div>
      <p className="text-sm text-gray-600 mt-1 mb-2 leading-snug">
        Deixa o vídeo passar mais devagar ou mais rápido, sem mudar a voz de quem fala. É bom quando
        a pessoa fala muito rápido.
      </p>

      <div className="space-y-2">
        {VELOCIDADES.map((v) => (
          <Pulse key={v.id} active={target === v.id} className="w-full" ring="rounded-2xl">
            <button
              type="button"
              onClick={() => escolher(v.id)}
              className={`w-full flex items-center gap-3 rounded-2xl border-2 px-3 py-3 text-left ${
                velocidade === v.id ? "border-red-600 bg-red-50" : "border-gray-200"
              }`}
            >
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900">{v.label}</p>
                <p className="text-sm text-gray-600">{v.sub}</p>
              </div>
              {velocidade === v.id && <Check className="w-5 h-5 text-red-600 shrink-0" />}
            </button>
          </Pulse>
        ))}
      </div>

      <div className="mt-5 space-y-2">
        <button
          type="button"
          onClick={() => setLegenda(!legenda)}
          className="w-full flex items-center gap-3 rounded-2xl border border-gray-200 px-3 py-3 text-left"
        >
          <Captions className="w-5 h-5 text-gray-700 shrink-0" />
          <div className="flex-1">
            <p className="text-base font-medium text-gray-900">Legenda, o CC</p>
            <p className="text-sm text-gray-600">Escreve na tela o que as pessoas falam</p>
          </div>
          <span
            className={`w-12 h-7 rounded-full p-0.5 shrink-0 ${legenda ? "bg-red-600" : "bg-gray-300"}`}
          >
            <span className={`block w-6 h-6 rounded-full bg-white ${legenda ? "translate-x-5" : ""}`} />
          </span>
        </button>

        <button
          type="button"
          onClick={() => setBloqueio(!bloqueio)}
          className="w-full flex items-center gap-3 rounded-2xl border border-gray-200 px-3 py-3 text-left"
        >
          <Lock className="w-5 h-5 text-gray-700 shrink-0" />
          <div className="flex-1">
            <p className="text-base font-medium text-gray-900">Tela de bloqueio</p>
            <p className="text-sm text-gray-600">Evita tocar em algo sem querer dentro do vídeo</p>
          </div>
          <span
            className={`w-12 h-7 rounded-full p-0.5 shrink-0 ${bloqueio ? "bg-red-600" : "bg-gray-300"}`}
          >
            <span className={`block w-6 h-6 rounded-full bg-white ${bloqueio ? "translate-x-5" : ""}`} />
          </span>
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-700 leading-snug rounded-2xl bg-gray-50 px-3 py-3">
        Dica: dando dois toques rápidos na tela do vídeo, você avança 10 segundos de uma vez.
      </p>

      <div className="mt-5 flex justify-end">
        <Pulse active={target === "video_config_concluir"} ring="rounded-full">
          <button
            type="button"
            onClick={() => onTap("video_config_concluir")}
            className="px-6 py-3 rounded-full bg-red-600 text-white text-base font-bold"
          >
            Concluir
          </button>
        </Pulse>
      </div>
    </div>
  );
}