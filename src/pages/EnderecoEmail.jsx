import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft } from "lucide-react";

export default function EnderecoEmail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Adicione seu e-mail. Com um email, podemos verificar sua conta ou entrar em contato com você sobre problemas de segurança ou de suporte. Seu email não é exibido para outras pessoas. Digite seu email no campo abaixo e clique em Avançar. Clique na seta à sua esquerda acima para voltar."
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
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Adicione seu e-mail</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
          </div>

          <p className="text-gray-600 text-center mb-2">
            Com um email, podemos verificar sua conta ou entrar em contato com você sobre problemas de segurança ou de suporte. Seu email não é exibido para outras pessoas.
          </p>
          
          <button className="text-[#00a884] font-medium text-center mb-6">Saiba mais</button>

          <div className="mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border-2 border-[#25D366] rounded-lg px-4 py-3 outline-none text-gray-900"
              autoFocus
            />
          </div>

          <div className="flex gap-2 mb-6 flex-wrap">
            <button className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">@gmail.com</button>
            <button className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">@outlook.com</button>
            <button className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">@hotmail.com</button>
          </div>

          <div className="flex-1" />

          <button
            disabled={!email}
            className={`w-full py-3 rounded-lg font-medium ${
              email ? "bg-[#25D366] text-white" : "bg-gray-200 text-gray-400"
            }`}
          >
            Avançar
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}