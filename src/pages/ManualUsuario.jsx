import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, BookOpen, Smartphone, Settings, Shield, Battery, Wifi } from "lucide-react";

export default function ManualUsuario() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Bem-vindo ao Manual do Usuário do seu Samsung A56. Aqui você encontra todas as informações sobre o seu celular."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const topicos = [
    {
      icon: Smartphone,
      titulo: "Conhecendo o Aparelho",
      descricao: "Botões, portas e componentes",
      cor: "bg-blue-500",
      page: "ManualConhecendo"
    },
    {
      icon: Settings,
      titulo: "Teclas e Funções",
      descricao: "Como usar cada botão",
      cor: "bg-green-500",
      page: "ManualTeclas"
    },
    {
      icon: Battery,
      titulo: "Bateria e Carregamento",
      descricao: "Dicas para duração da bateria",
      cor: "bg-orange-500",
      page: "ManualBateria"
    },
    {
      icon: Wifi,
      titulo: "Chips e Conectividade",
      descricao: "Instalar chips e configurar rede",
      cor: "bg-purple-500",
      page: "ManualChips"
    },
    {
      icon: Shield,
      titulo: "Ligar e Desligar",
      descricao: "Como ligar e desligar o aparelho",
      cor: "bg-red-500",
      page: "ManualLigarDesligar"
    },
  ];

  return (
    <div className="h-[100dvh] bg-white overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 pt-8">
              <div className="flex items-center gap-4 mb-4">
                <button onClick={() => navigate(createPageUrl("AppDicas"))}>
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold">Manual do Usuário</h1>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="overflow-y-auto p-4" style={{ height: "calc(100% - 100px)" }}>
              {/* Bem-vindo */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white mb-6">
                <BookOpen className="w-12 h-12 mb-3" />
                <h2 className="text-2xl font-bold mb-2">Samsung A56</h2>
                <p className="text-sm opacity-90">
                  Manual completo para você aproveitar ao máximo o seu celular Samsung A56.
                </p>
              </div>

              {/* Lista de Tópicos */}
              <div className="space-y-3">
                {topicos.map((topico, idx) => {
                  const Icon = topico.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => navigate(createPageUrl(topico.page))}
                      className="w-full bg-gray-50 rounded-2xl p-4 flex items-center gap-4 hover:bg-gray-100 transition-colors shadow-sm"
                    >
                      <div className={`${topico.cor} w-14 h-14 rounded-xl flex items-center justify-center`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-gray-900 mb-1">{topico.titulo}</h3>
                        <p className="text-sm text-gray-600">{topico.descricao}</p>
                      </div>
                      <div className="text-gray-400">›</div>
                    </button>
                  );
                })}
              </div>

              {/* Informações do Aparelho */}
              <div className="mt-6 bg-gray-50 rounded-2xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Sobre o Aparelho</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Modelo:</strong> Samsung A56</p>
                  <p><strong>Tela:</strong> 6.6" Super AMOLED</p>
                  <p><strong>Câmera:</strong> 50MP Principal</p>
                  <p><strong>Bateria:</strong> 5000 mAh</p>
                  <p><strong>Memória:</strong> 8GB RAM / 256GB</p>
                </div>
              </div>
            </div>
    </div>
  );
}