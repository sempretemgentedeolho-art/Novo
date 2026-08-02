import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Lock, Fingerprint, Eye, Shield, Smartphone, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function Seguranca() {
  const navigate = useNavigate();
  const [biometria, setBiometria] = useState(true);
  const [bloqueioAuto, setBloqueioAuto] = useState(true);

  const securityOptions = [
    { icon: Lock, label: "Tipo de bloqueio de tela", value: "Padrão", color: "bg-blue-100 text-blue-600" },
    { icon: Fingerprint, label: "Impressão digital", value: "2 impressões", color: "bg-green-100 text-green-600" },
    { icon: Eye, label: "Reconhecimento facial", value: "Não configurado", color: "bg-purple-100 text-purple-600" },
    { icon: Shield, label: "Samsung Knox", value: "Ativo", color: "bg-red-100 text-red-600" },
    { icon: Smartphone, label: "Localizar meu dispositivo", value: "Ativo", color: "bg-orange-100 text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
            {/* Header */}
            <div className="bg-teal-500 text-white p-6 pb-4">
              <button onClick={() => navigate(createPageUrl("Configuracoes"))} className="mb-4">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Segurança</h1>
            </div>

            {/* Conteúdo */}
            <div className="overflow-y-auto h-[calc(100%-100px)]">
              {/* Status de Segurança */}
              <div className="bg-green-50 border-l-4 border-green-500 p-6 m-4 rounded-r-xl">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">Dispositivo Protegido</h3>
                    <p className="text-sm text-green-700">Seu dispositivo está seguro</p>
                  </div>
                </div>
              </div>

              {/* Configurações Rápidas */}
              <div className="px-6 py-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-4">CONFIGURAÇÕES RÁPIDAS</h3>
                
                <div className="bg-gray-50 rounded-2xl p-4 mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Fingerprint className="w-5 h-5 text-teal-600" />
                      <span className="font-medium text-gray-900">Biometria</span>
                    </div>
                    <Switch checked={biometria} onCheckedChange={setBiometria} />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-teal-600" />
                      <span className="font-medium text-gray-900">Bloqueio automático</span>
                    </div>
                    <Switch checked={bloqueioAuto} onCheckedChange={setBloqueioAuto} />
                  </div>
                </div>
              </div>

              {/* Opções de Segurança */}
              <div className="px-6 py-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-4">CONFIGURAÇÕES AVANÇADAS</h3>
                
                {securityOptions.map((option, index) => (
                  <button
                    key={index}
                    className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors rounded-xl mb-2"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${option.color}`}>
                      <option.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-gray-900">{option.label}</h3>
                      <p className="text-sm text-gray-500">{option.value}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </div>

              {/* Dicas de Segurança */}
              <div className="p-6 bg-blue-50 m-4 rounded-xl">
                <h3 className="font-semibold text-blue-900 mb-2">💡 Dica de Segurança</h3>
                <p className="text-sm text-blue-700">
                  Use uma combinação de biometria e senha para máxima proteção do seu dispositivo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}