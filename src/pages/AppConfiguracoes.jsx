import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  ArrowLeft, 
  Wifi, 
  Bluetooth, 
  Volume2, 
  Bell, 
  Moon, 
  Battery, 
  Smartphone,
  Lock,
  Shield,
  HardDrive,
  User,
  ChevronRight,
  Heart,
  AppWindow
} from "lucide-react";

export default function AppConfiguracoes() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Estas são as configurações do seu Samsung A56. Aqui você pode ajustar Wi-Fi, som, tela, segurança e muito mais."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const settings = [
    { icon: Wifi, label: "Wi-Fi", value: "Casa_WiFi", color: "text-blue-500", page: "WiFiConfig" },
    { icon: Bluetooth, label: "Bluetooth", value: "Desligado", color: "text-blue-600" },
    { icon: Volume2, label: "Som e vibração", color: "text-purple-500", page: "VolumeControl" },
    { icon: Bell, label: "Notificações", color: "text-red-500" },
    { icon: Moon, label: "Modo noturno", value: "Desligado", color: "text-indigo-600" },
    { icon: Battery, label: "Bateria", value: "98%", color: "text-green-500" },
    { icon: Smartphone, label: "Tela", color: "text-orange-500" },
    { icon: Lock, label: "Bloqueio de tela", color: "text-gray-600" },
    { icon: Shield, label: "Segurança", color: "text-teal-500", page: "Seguranca" },
    { icon: Heart, label: "Informações médicas", color: "text-red-600", page: "InfoMedicas" },
    { icon: HardDrive, label: "Armazenamento", value: "128 GB", color: "text-pink-500" },
    { icon: AppWindow, label: "Aplicativos", color: "text-indigo-500", page: "GerenciarApps" },
    { icon: User, label: "Contas", color: "text-cyan-500" },
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[50px] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-b-3xl z-10"></div>
          
          <div
            className="relative rounded-[46px] overflow-hidden bg-white"
            style={{ aspectRatio: "9/19.5" }}
          >
            {/* Header */}
            <div className="bg-gray-600 text-white p-4 pt-8">
              <div className="flex items-center gap-4 mb-4">
                <button onClick={() => navigate(createPageUrl("TelaInicial"))}>
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-bold">Configurações</h1>
              </div>
            </div>

            {/* Lista de Configurações */}
            <div className="overflow-y-auto" style={{ height: "calc(100% - 100px)" }}>
              {/* Perfil do Usuário */}
              <div className="p-6 border-b border-gray-200 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                  U
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Usuário Samsung</h3>
                  <p className="text-sm text-gray-500">usuario@samsung.com</p>
                </div>
              </div>

              {/* Itens de Configuração */}
              <div className="py-2">
                {settings.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => item.page && navigate(createPageUrl(item.page))}
                    className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-gray-900">{item.label}</h3>
                      {item.value && (
                        <p className="text-sm text-gray-500">{item.value}</p>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </div>

              {/* Informações do Sistema */}
              <div className="p-6 bg-gray-50 mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Sobre o dispositivo</h3>
                <p className="text-sm text-gray-600">Samsung A56</p>
                <p className="text-sm text-gray-600">One UI 6.0</p>
                <p className="text-sm text-gray-600">Versão: 6.0.1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}