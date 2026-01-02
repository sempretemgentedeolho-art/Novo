import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { 
  ArrowLeft, Wifi, Bluetooth, Volume2, Bell, Moon, Battery, 
  Smartphone, Lock, Shield, HardDrive, User, ChevronRight, Heart, AppWindow, Clock
} from "lucide-react";

const settings = [
  { icon: Wifi, label: "Wi-Fi", value: "Casa_WiFi", color: "text-blue-600", page: "WiFiConfig" },
  { icon: Bluetooth, label: "Bluetooth", value: "Desligado", color: "text-blue-500", page: "BluetoothConfig" },
  { icon: Volume2, label: "Som e vibração", color: "text-gray-700", page: "VolumeControl" },
  { icon: Bell, label: "Notificações", color: "text-red-500", page: "Notificacoes" },
  { icon: Clock, label: "Relógio", color: "text-indigo-600", page: "Relogio" },
  { icon: Moon, label: "Modo noturno", value: "Desligado", color: "text-indigo-600", page: "ModoNoturno" },
  { icon: Battery, label: "Bateria", value: "98%", color: "text-green-600" },
  { icon: Smartphone, label: "Tela", color: "text-gray-600", page: "TelaConfig" },
  { icon: Lock, label: "Bloqueio de tela", color: "text-gray-700", page: "BloqueioTela" },
  { icon: Shield, label: "Segurança", color: "text-teal-600", page: "Seguranca" },
  { icon: Heart, label: "Informações médicas", color: "text-red-600", page: "InfoMedicas" },
  { icon: HardDrive, label: "Armazenamento", value: "128 GB", color: "text-gray-600", page: "ArmazenamentoConfig" },
  { icon: AppWindow, label: "Aplicativos", color: "text-blue-600", page: "GerenciarApps" },
  { icon: User, label: "Contas", color: "text-gray-700", page: "ContasConfig" },
];

export default function Configuracoes() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Configurações do aparelho."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleSettingClick = (item) => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(item.label);
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    if (item.page) {
      setTimeout(() => {
        navigate(createPageUrl(item.page));
      }, 500);
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <button onClick={() => navigate(createPageUrl("Home"))} className="mb-2">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">Configurações</h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* User Profile */}
          <div className="p-6 border-b border-gray-200 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-2xl font-bold">
              U
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Usuário</h3>
              <p className="text-sm text-gray-500">usuario@email.com</p>
            </div>
          </div>

          {/* Settings List */}
          <div className="py-2">
            {settings.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSettingClick(item)}
                className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
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

          {/* Device Info */}
          <button
            onClick={() => {
              const synth = window.speechSynthesis;
              if (synth) {
                synth.cancel();
                const utter = new SpeechSynthesisUtterance(
                  "Sobre o dispositivo. Informações do seu celular"
                );
                utter.lang = "pt-BR";
                utter.rate = 0.80;
                synth.speak(utter);
              }
              setTimeout(() => navigate(createPageUrl("SobreDispositivo")), 500);
            }}
            className="w-full p-6 bg-gray-50 mt-4 text-left hover:bg-gray-100 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Sobre o dispositivo</h3>
            <p className="text-sm text-gray-600">Samsung Galaxy A54 · Android 14</p>
            <p className="text-xs text-gray-500 mt-1">Toque para ver detalhes e número do celular</p>
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}