import React, { useState } from "react";
import { DollarSign, Check, Info } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";

const REQUISITOS = [
  { id: 1, label: "1.000 inscritos no canal", atual: "128 de 1.000", feito: false },
  { id: 2, label: "4.000 horas de vídeo assistidas", atual: "36 de 4.000 horas", feito: false },
  { id: 3, label: "Nenhuma advertência por quebra de regras", atual: "Tudo certo", feito: true },
  { id: 4, label: "Seguir as regras de conteúdo do YouTube", atual: "Tudo certo", feito: true },
];

// Monetização: quando o canal passa a ganhar dinheiro com os anúncios
export default function MonetizacaoView({ target, onTap }) {
  const [detalhes, setDetalhes] = useState(false);

  const verRequisitos = () => {
    setDetalhes(true);
    onTap("monet_requisitos");
  };

  return (
    <div className="mt-4 space-y-3">
      <div className="rounded-2xl border border-gray-200 px-4 py-4">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-700" />
          <p className="text-base font-bold text-gray-900">Ganhar dinheiro com os vídeos</p>
        </div>
        <p className="text-sm text-gray-700 mt-1 leading-snug">
          Quando o canal cresce, o YouTube coloca anúncios antes e durante os vídeos, e uma parte
          desse dinheiro vai para quem faz os vídeos. Isso se chama monetização.
        </p>

        <div className="mt-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-800">Seu canal</p>
            <p className="text-sm text-gray-600">128 de 1.000 inscritos</p>
          </div>
          <div className="mt-1 h-2.5 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full rounded-full bg-emerald-600" style={{ width: "13%" }} />
          </div>
          <p className="text-sm text-gray-600 mt-2 leading-snug">
            Ainda falta um pouco, e isso é normal no começo de todo canal. Continue publicando os seus
            vídeos.
          </p>
        </div>
      </div>

      <Pulse active={target === "monet_requisitos"} className="w-full" ring="rounded-2xl">
        <button
          type="button"
          onClick={verRequisitos}
          className="w-full flex items-center gap-3 rounded-2xl border-2 border-gray-200 px-4 py-3 text-left"
        >
          <Info className="w-5 h-5 text-gray-700 shrink-0" />
          <div className="flex-1">
            <p className="text-base font-semibold text-gray-900">Ver requisitos</p>
            <p className="text-sm text-gray-600 mt-0.5 leading-snug">
              A lista do que o canal precisa para poder ganhar dinheiro
            </p>
          </div>
        </button>
      </Pulse>

      {detalhes && (
        <>
          <div className="space-y-2">
            {REQUISITOS.map((r) => (
              <div
                key={r.id}
                className="flex items-start gap-3 rounded-2xl border border-gray-200 px-3 py-3"
              >
                {r.feito ? (
                  <Check className="w-5 h-5 text-emerald-700 shrink-0" />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-300 shrink-0 mt-2" />
                )}
                <div className="flex-1">
                  <p className="text-base font-medium text-gray-900 leading-snug">{r.label}</p>
                  <p className="text-sm text-gray-600">{r.atual}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-700 leading-snug rounded-2xl bg-gray-50 px-3 py-3">
            Quando o canal cumprir tudo, o YouTube avisa aqui dentro do Studio e você aceita os termos
            para receber. Enquanto isso o canal não ganha dinheiro, e isso é normal no começo.
          </p>
        </>
      )}
    </div>
  );
}