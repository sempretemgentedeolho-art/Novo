import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft } from "lucide-react";

export default function MudarNumero() {
  const navigate = useNavigate();
  const [oldNumber, setOldNumber] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Mudar número. A mudança do seu número de telefone resultará na transferência dos dados da sua conta, dos seus grupos e das suas configurações. Antes de prosseguir, verifique se seu novo número pode receber SMS ou ligações. Se você tem um dispositivo e número de telefone novos, primeiro mude seu número no dispositivo antigo. Digite seu número de telefone antigo e seu novo número de telefone. Depois clique em Avançar. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Mudar número</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-center mb-6">
            <svg className="w-32 h-24" viewBox="0 0 120 80" fill="none">
              <rect x="10" y="10" width="40" height="60" rx="4" fill="#25D366" opacity="0.3"/>
              <circle cx="30" cy="45" r="2" fill="#25D366"/>
              <path d="M40 40 L50 40 L55 45 L50 50 L40 50" stroke="#666" strokeWidth="2" fill="none"/>
              <rect x="70" y="10" width="40" height="60" rx="4" fill="#25D366" opacity="0.3"/>
              <circle cx="90" cy="45" r="2" fill="#25D366"/>
            </svg>
          </div>

          <p className="text-gray-700 mb-2">
            A mudança do seu número de telefone resultará na transferência dos dados da sua conta, dos seus grupos e das suas configurações.
          </p>

          <p className="text-gray-600 text-sm mb-4">
            Antes de prosseguir, verifique se seu novo número pode receber SMS ou ligações.
          </p>

          <p className="text-gray-600 text-sm mb-6">
            Se você tem um dispositivo e número de telefone novos, primeiro mude seu número no dispositivo antigo.
          </p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-gray-700 text-sm mb-2 block">Insira seu número de telefone antigo com o código do país:</label>
              <div className="flex gap-3">
                <input type="text" value="+ 55" readOnly className="w-20 border-b-2 border-red-500 py-2 outline-none text-center"/>
                <input
                  type="tel"
                  placeholder="Número de telefone"
                  value={oldNumber}
                  onChange={(e) => setOldNumber(e.target.value)}
                  className="flex-1 border-b-2 border-red-500 py-2 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700 text-sm mb-2 block">Insira seu novo número de telefone com o código do país:</label>
              <div className="flex gap-3">
                <input type="text" value="+ 55" readOnly className="w-20 border-b-2 border-red-500 py-2 outline-none text-center"/>
                <input
                  type="tel"
                  placeholder="Número de telefone"
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                  className="flex-1 border-b-2 border-red-500 py-2 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex-1" />

          <button
            disabled={!oldNumber || !newNumber}
            className={`w-full py-3 rounded-lg font-medium ${
              oldNumber && newNumber ? "bg-[#25D366] text-white" : "bg-gray-200 text-gray-400"
            }`}
          >
            Avançar
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}