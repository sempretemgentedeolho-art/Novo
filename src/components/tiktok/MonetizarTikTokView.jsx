import React, { useState } from "react";
import { Check, CircleDollarSign, ShieldCheck } from "lucide-react";
import Pulse from "@/components/youtube/Pulse";
import { REQUISITOS } from "@/components/tiktok/tiktokData";

// Em que parte da monetização a pessoa está, de acordo com o passo falado
const ETAPAS = {
  monetizar_requisitos: "requisitos",
  monetizar_dados: "dados",
  monetizar_pagamento: "pagamento",
  monetizar_ativar: "pagamento",
  monetizar_pronto: "pronto",
};

const campo =
  "w-full rounded-2xl border-2 border-gray-300 px-4 py-4 text-base text-gray-900 outline-none focus:border-[#FE2C55]";

export default function MonetizarTikTokView({ target, onAvancar, onFechar }) {
  const etapa = ETAPAS[target] || "requisitos";
  const [cpf, setCpf] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [pix, setPix] = useState("");

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <CircleDollarSign className="w-6 h-6 text-[#FE2C55]" />
          <p className="text-lg font-bold text-gray-900">Configuração de Monetizar</p>
        </div>
        <p className="text-xs text-gray-600 mt-1 leading-snug">
          Monetizar quer dizer ganhar dinheiro com os seus vídeos. O TikTok paga quando os seus
          vídeos são bem vistos.
        </p>
      </div>

      <div className="px-4 py-4 space-y-4">
        {etapa === "requisitos" && (
          <>
            <p className="text-sm font-bold text-gray-900">O que o TikTok pede</p>
            <div className="space-y-2">
              {REQUISITOS.map((r) => (
                <div key={r.id} className="flex items-start gap-3 rounded-2xl border-2 border-gray-200 p-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{r.titulo}</p>
                    <p className="text-xs text-gray-600 leading-snug">{r.recado}</p>
                  </div>
                </div>
              ))}
            </div>
            <Pulse active={target === "monetizar_requisitos"} className="w-full" ring="rounded-2xl">
              <button
                onClick={() => onAvancar("monetizar_requisitos")}
                className="w-full rounded-2xl bg-[#FE2C55] px-4 py-4 text-sm font-bold text-white"
              >
                Já entendi
              </button>
            </Pulse>
          </>
        )}

        {etapa === "dados" && (
          <>
            <p className="text-sm text-gray-700 leading-snug">
              Agora o TikTok precisa saber quem é você. Digite com calma, do seu documento.
            </p>
            <input placeholder="Nome completo" className={campo} />
            <Pulse active={target === "monetizar_dados"} className="w-full" ring="rounded-2xl">
              <input
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                onFocus={() => onAvancar("monetizar_dados")}
                placeholder="Número do CPF"
                inputMode="numeric"
                className={campo}
              />
            </Pulse>
            <input
              value={nascimento}
              onChange={(e) => setNascimento(e.target.value)}
              placeholder="Data de nascimento"
              className={campo}
            />
            <button
              onClick={() => onAvancar("monetizar_pagamento")}
              className="w-full rounded-2xl bg-[#FE2C55] px-4 py-4 text-sm font-bold text-white"
            >
              Continuar
            </button>
          </>
        )}

        {etapa === "pagamento" && (
          <>
            <p className="text-sm font-bold text-gray-900">Como você quer receber o dinheiro?</p>
            <Pulse active={target === "monetizar_pagamento"} className="w-full" ring="rounded-2xl">
              <button
                onClick={() => onAvancar("monetizar_pagamento")}
                className="w-full rounded-2xl border-2 border-gray-300 px-4 py-4 text-left"
              >
                <span className="text-sm font-bold text-gray-900">Chave Pix</span>
                <span className="block text-xs text-gray-600 mt-0.5">
                  Cai na hora, no seu banco. É o mais fácil.
                </span>
              </button>
            </Pulse>
            <button className="w-full rounded-2xl border-2 border-gray-300 px-4 py-4 text-left">
              <span className="text-sm font-bold text-gray-900">Conta bancária</span>
              <span className="block text-xs text-gray-600 mt-0.5">Banco, agência e conta</span>
            </button>

            {target === "monetizar_ativar" && (
              <>
                <input
                  value={pix}
                  onChange={(e) => setPix(e.target.value)}
                  onFocus={() => onAvancar("monetizar_ativar")}
                  placeholder="Digite a sua chave Pix"
                  className={campo}
                />
                <Pulse active className="w-full" ring="rounded-2xl">
                  <button
                    onClick={() => onAvancar("monetizar_ativar")}
                    className="w-full rounded-2xl bg-[#FE2C55] px-4 py-4 text-sm font-bold text-white"
                  >
                    Ativar monetização
                  </button>
                </Pulse>
              </>
            )}
          </>
        )}

        {etapa === "pronto" && (
          <>
            <div className="flex flex-col items-center text-center py-2">
              <CircleDollarSign className="w-16 h-16 text-green-500" />
              <p className="text-lg font-bold text-gray-900 mt-3">Monetização enviada!</p>
              <p className="text-sm text-gray-700 mt-1 leading-snug">
                O TikTok vai analisar os seus dados e responde em alguns dias. Quando for aprovada,
                você acompanha aqui quanto os seus vídeos já renderam.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-amber-50 border-2 border-amber-300 p-3">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 leading-snug">
                Importante: nunca passe a sua senha nem o código que chega no celular para ninguém,
                nem por mensagem ou telefone. Quem pede isso está tentando aplicar um golpe.
              </p>
            </div>

            <Pulse active={target === "monetizar_pronto"} className="w-full" ring="rounded-2xl">
              <button
                onClick={() => onAvancar("monetizar_pronto")}
                className="w-full rounded-2xl bg-[#FE2C55] px-4 py-4 text-sm font-bold text-white"
              >
                Entendi
              </button>
            </Pulse>

            <Pulse active={target === "terminar"} className="w-full" ring="rounded-2xl">
              <button
                onClick={onFechar}
                className="w-full rounded-2xl bg-black px-4 py-4 text-sm font-bold text-white"
              >
                Voltar para a tela inicial
              </button>
            </Pulse>
          </>
        )}
      </div>
    </div>
  );
}