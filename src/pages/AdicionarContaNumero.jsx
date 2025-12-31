import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft } from "lucide-react";

export default function AdicionarContaNumero() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Insira seu número de telefone. O WhatsApp precisa confirmar seu número de telefone. Esta ação está sujeita a cobranças da sua operadora. Digite seu número de telefone no campo abaixo. Depois de digitar, clique em Avançar. Clique na seta à sua esquerda acima para voltar."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(createPageUrl("AdicionarConta"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Insira seu número de telefone</h1>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-gray-600 mb-2">
            O WhatsApp precisa confirmar seu número de telefone. Essa ação está sujeita a cobranças da sua operadora.
          </p>
          
          <button className="text-[#00a884] font-medium mb-6 text-sm">
            Qual é o meu número de telefone?
          </button>

          {/* Seletor de país */}
          <div className="mb-4">
            <select className="w-full border-b-2 border-[#25D366] py-3 outline-none text-gray-900 bg-transparent">
              <option>Brasil</option>
            </select>
          </div>

          {/* Campos de telefone */}
          <div className="flex gap-3 mb-8">
            <div className="w-20">
              <input
                type="text"
                value="+ 55"
                readOnly
                className="w-full border-b-2 border-[#25D366] py-3 outline-none text-gray-900 text-center"
              />
            </div>
            <div className="flex-1">
              <input
                type="tel"
                placeholder="Número de telefone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border-b-2 border-[#25D366] py-3 outline-none text-gray-900"
                autoFocus
              />
            </div>
          </div>

          {/* Info */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <p className="text-sm text-gray-700">
              Quando você tocar em "Avançar", o WhatsApp enviará um código de verificação por SMS. Taxas de dados e mensagens podem ser aplicadas.
            </p>
          </div>

          <div className="flex-1" />

          {/* Botão */}
          <div className="fixed bottom-6 left-6 right-6">
            <button
              disabled={!phoneNumber}
              className={`w-full py-3 rounded-lg font-medium text-lg ${
                phoneNumber
                  ? "bg-[#25D366] text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              Avançar
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}