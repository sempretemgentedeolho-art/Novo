import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function ApagarConta() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Apagar conta. Atenção, ao apagar esta conta: A conta será apagada do WhatsApp e removida de todos os seus dispositivos. Seu histórico de mensagens será apagado. Você sairá de todos os seus grupos do WhatsApp. O backup salvo no armazenamento do Google será apagado. Apagar seu histórico de pagamentos e cancelar pagamentos pendentes. Os canais criados por você serão apagados. Todas as assinaturas de canais ativas associadas a esta conta serão canceladas. Se preferir, você pode mudar o número em vez de apagar. Para apagar sua conta, confirme o código do país e insira seu número de telefone. Clique na seta à sua esquerda acima para voltar."
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

        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
          <button onClick={() => navigate(createPageUrl("ContaWhatsApp"))}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Apagar conta</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-2">Ao apagar esta conta:</h3>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• A conta será apagada do WhatsApp e removida de todos os seus dispositivos.</li>
                  <li>• Seu histórico de mensagens será apagado.</li>
                  <li>• Você sairá de todos os seus grupos do WhatsApp.</li>
                  <li>• O backup salvo no armazenamento do Google será apagado.</li>
                  <li>• Apagar seu histórico de pagamentos e cancelar pagamentos pendentes</li>
                  <li>• Os canais criados por você serão apagados.</li>
                  <li>• Todas as assinaturas de canais ativas associadas a esta conta serão canceladas.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Prefere mudar o número?</h4>
              <button className="text-white bg-[#25D366] px-4 py-2 rounded-lg font-medium text-sm mt-2">
                Mudar número
              </button>
            </div>
          </div>

          <p className="text-gray-700 mb-4">
            Para apagar sua conta, confirme o código do país e insira seu número de telefone.
          </p>

          <div className="mb-4">
            <label className="text-gray-700 text-sm mb-2 block">País</label>
            <select className="w-full border-b-2 border-gray-300 py-2 outline-none">
              <option>Brasil</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="text-gray-700 text-sm mb-2 block">Telefone</label>
            <div className="flex gap-3">
              <input type="text" value="+ 55" readOnly className="w-20 border-b-2 border-gray-300 py-2 outline-none text-center"/>
              <input
                type="tel"
                placeholder="Número de telefone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 border-b-2 border-gray-300 py-2 outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}