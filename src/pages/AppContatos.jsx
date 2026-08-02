import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Search, UserPlus, Phone } from "lucide-react";

export default function AppContatos() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Este é o aplicativo Contatos. Aqui você pode ver todos os seus contatos salvos e ligar para eles."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const contatos = [
    { nome: "Maria Silva", telefone: "(11) 98765-4321", inicial: "M", cor: "bg-pink-500" },
    { nome: "João Santos", telefone: "(11) 97654-3210", inicial: "J", cor: "bg-blue-500" },
    { nome: "Ana Costa", telefone: "(11) 96543-2109", inicial: "A", cor: "bg-green-500" },
    { nome: "Pedro Oliveira", telefone: "(11) 95432-1098", inicial: "P", cor: "bg-purple-500" },
    { nome: "Carla Souza", telefone: "(11) 94321-0987", inicial: "C", cor: "bg-orange-500" },
  ];

  return (
    <div className="min-h-[100dvh] bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[50px] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-3xl z-10"></div>
          
          <div
            className="relative rounded-[46px] overflow-hidden bg-white"
            style={{ aspectRatio: "9/19.5" }}
          >
            {/* Header */}
            <div className="bg-orange-500 text-white p-4 pt-8">
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => navigate(createPageUrl("TelaInicial"))}>
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold flex-1 ml-4">Contatos</h1>
                <UserPlus className="w-6 h-6" />
              </div>
              
              <div className="bg-white/20 rounded-full px-4 py-2 flex items-center gap-2">
                <Search className="w-5 h-5" />
                <input
                  type="text"
                  placeholder="Pesquisar contatos"
                  className="bg-transparent placeholder:text-white/70 outline-none flex-1 text-white"
                />
              </div>
            </div>

            {/* Lista de Contatos */}
            <div className="overflow-y-auto" style={{ height: "calc(100% - 140px)" }}>
              {contatos.map((contato, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 border-b border-gray-200">
                  <div className={`w-12 h-12 rounded-full ${contato.cor} flex items-center justify-center text-white font-bold text-xl`}>
                    {contato.inicial}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{contato.nome}</h3>
                    <p className="text-sm text-gray-600">{contato.telefone}</p>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}