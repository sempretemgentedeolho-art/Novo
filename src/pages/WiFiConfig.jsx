import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Wifi, Lock, ChevronRight, RefreshCw, Plus, Eye, EyeOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

const networks = [
  { name: "Casa_WiFi", signal: 100, secured: true, connected: true, frequency: "5GHz" },
  { name: "Vizinho_5G", signal: 80, secured: true, connected: false, frequency: "5GHz" },
  { name: "NET_2.4GHz", signal: 60, secured: true, connected: false, frequency: "2.4GHz" },
  { name: "Tim_Fibra", signal: 40, secured: true, connected: false, frequency: "5GHz" },
  { name: "Cafe_Public", signal: 30, secured: false, connected: false, frequency: "2.4GHz" },
  { name: "Claro_WiFi", signal: 25, secured: true, connected: false, frequency: "2.4GHz" },
];

export default function WiFiConfig() {
  const navigate = useNavigate();
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [showPassword, setShowPasswordDialog] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [password, setPassword] = useState("");
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Configurações de Wi-Fi. Aqui você pode ativar ou desativar o Wi-Fi, conectar-se a redes disponíveis e gerenciar suas conexões salvas. Deslize para ver todas as redes disponíveis."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleWifiToggle = (enabled) => {
    setWifiEnabled(enabled);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        enabled ? "Wi-Fi ativado. Procurando redes disponíveis." : "Wi-Fi desativado."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
  };

  const handleNetworkClick = (network) => {
    if (network.connected) {
      const synth = window.speechSynthesis;
      if (synth) {
        synth.cancel();
        const utter = new SpeechSynthesisUtterance(
          `Você já está conectado à rede ${network.name}. Sinal ${network.signal} por cento.`
        );
        utter.lang = "pt-BR";
        utter.rate = 0.9;
        synth.speak(utter);
      }
      return;
    }

    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        network.secured 
          ? `Rede ${network.name} protegida. Digite a senha para conectar.`
          : `Conectando à rede ${network.name}.`
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }

    if (network.secured) {
      setSelectedNetwork(network.name);
      setShowPasswordDialog(true);
    } else {
      alert(`Conectando à rede ${network.name}...`);
    }
  };

  const handleConnect = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        `Conectando à rede ${selectedNetwork}. Aguarde um momento.`
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    
    setTimeout(() => {
      alert(`Conectado à rede ${selectedNetwork} com sucesso!`);
      setShowPasswordDialog(false);
      setPassword("");
    }, 1000);
  };

  const handleScan = () => {
    setScanning(true);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance("Procurando redes disponíveis.");
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    setTimeout(() => setScanning(false), 2000);
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-blue-500 text-white p-6 pb-4">
          <button onClick={() => navigate(createPageUrl("Configuracoes"))} className="mb-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Wi-Fi</h1>
              <p className="text-sm text-blue-100 mt-1">
                {wifiEnabled ? "Conectado" : "Desativado"}
              </p>
            </div>
            <Switch 
              checked={wifiEnabled} 
              onCheckedChange={handleWifiToggle}
              className="data-[state=checked]:bg-white"
            />
          </div>
        </div>

        {/* Explicação */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 m-4">
          <p className="text-sm text-blue-900">
            💡 <strong>Dica:</strong> Mantenha o Wi-Fi ativado para economizar dados móveis e ter acesso à internet de alta velocidade em casa ou no trabalho.
          </p>
        </div>

        {/* Lista de Redes */}
        <div className="flex-1 overflow-y-auto">
          {wifiEnabled ? (
            <>
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <p className="text-sm font-medium text-gray-600">Redes disponíveis</p>
                <button 
                  onClick={handleScan}
                  className="flex items-center gap-1 text-blue-600 text-sm font-medium"
                >
                  <RefreshCw className={`w-4 h-4 ${scanning ? 'animate-spin' : ''}`} />
                  Atualizar
                </button>
              </div>
              
              <div className="py-2">
                {networks.map((network, index) => (
                  <button
                    key={index}
                    onClick={() => handleNetworkClick(network)}
                    className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <Wifi 
                      className={`w-6 h-6 ${
                        network.signal > 70 ? 'text-green-500' : 
                        network.signal > 40 ? 'text-yellow-500' : 
                        'text-red-500'
                      }`} 
                    />
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{network.name}</h3>
                        {network.secured && <Lock className="w-3 h-3 text-gray-400" />}
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {network.frequency}
                        </span>
                      </div>
                      {network.connected ? (
                        <p className="text-sm text-blue-500 font-medium">Conectado</p>
                      ) : (
                        <p className="text-xs text-gray-500">
                          {network.secured ? "Protegida" : "Rede aberta"} • Sinal: {network.signal}%
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-0.5">
                      {[1, 2, 3, 4].map((bar) => (
                        <div
                          key={bar}
                          className={`w-1 rounded-full ${
                            bar * 25 <= network.signal ? 'bg-gray-700' : 'bg-gray-300'
                          }`}
                          style={{ height: `${bar * 3}px` }}
                        />
                      ))}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </div>

              {/* Adicionar Rede */}
              <button className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors border-t-2 border-gray-200 mt-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Plus className="w-5 h-5 text-blue-600" />
                </div>
                <span className="flex-1 text-left font-medium text-blue-600">
                  Adicionar rede manualmente
                </span>
              </button>

              {/* Configurações Avançadas */}
              <div className="px-6 py-4 bg-gray-50 mt-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">CONFIGURAÇÕES AVANÇADAS</h3>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 py-2">
                    • Wi-Fi Direct
                  </button>
                  <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 py-2">
                    • Preferências de rede
                  </button>
                  <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 py-2">
                    • Endereço MAC: XX:XX:XX:XX:XX:XX
                  </button>
                  <button className="w-full text-left text-sm text-gray-700 hover:text-blue-600 py-2">
                    • Endereço IP: 192.168.1.XXX
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 px-6">
              <Wifi className="w-16 h-16 mb-4 opacity-30" />
              <p className="text-lg font-medium mb-2">Wi-Fi desligado</p>
              <p className="text-sm text-center">
                Ative o Wi-Fi para ver redes disponíveis e conectar-se à internet sem usar seus dados móveis.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Dialog de Senha */}
      <Dialog open={showPassword} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Conectar à {selectedNetwork}</DialogTitle>
            <DialogDescription>
              Esta rede requer senha para acesso. Digite a senha para conectar.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Senha da rede</label>
              <div className="relative">
                <Input
                  type={showPasswordText ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite a senha"
                  className="pr-10"
                />
                <button
                  onClick={() => setShowPasswordText(!showPasswordText)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPasswordText ? (
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 A senha diferencia maiúsculas de minúsculas
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConnect} disabled={!password} className="bg-blue-500">
              Conectar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PhoneFrame>
  );
}