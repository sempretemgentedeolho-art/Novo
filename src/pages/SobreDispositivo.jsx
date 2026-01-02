import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Smartphone, Hash, HardDrive, Cpu, Battery, Calendar } from "lucide-react";

export default function SobreDispositivo() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Sobre o dispositivo. Aqui você encontra informações importantes do seu celular: número de telefone, modelo, versão do Android e muito mais."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Esta tela é importante para saber o número do seu celular quando alguém pedir, ou para verificar a versão do sistema."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.80;
        synth.speak(utter2);
      }, 7000);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-[#1976D2] text-white px-4 py-3 flex items-center gap-4">
          <button onClick={() => navigate(createPageUrl("Configuracoes"))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-medium">Sobre o telefone</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto">
          {/* Imagem do celular */}
          <div className="p-6 flex flex-col items-center border-b border-gray-200">
            <Smartphone className="w-24 h-24 text-gray-400 mb-3" />
            <h3 className="text-xl font-semibold text-gray-900">Samsung Galaxy A54</h3>
            <p className="text-sm text-gray-600">Forja da Consciência</p>
          </div>

          {/* Informações principais */}
          <div className="p-4 space-y-1">
            {/* Número do celular - DESTAQUE */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <Hash className="w-6 h-6 text-green-700" />
                <h3 className="font-semibold text-green-900 text-lg">Número do celular</h3>
              </div>
              <p className="text-3xl font-bold text-green-700 mb-2">+55 51 99999-9999</p>
              <p className="text-sm text-green-800">
                📱 Este é o seu número de telefone. Use para passar para outras pessoas ou quando precisar informar.
              </p>
              <button
                onClick={() => {
                  const synth = window.speechSynthesis;
                  if (synth) {
                    synth.cancel();
                    const utter = new SpeechSynthesisUtterance(
                      "Seu número é: mais cinco cinco, cinco um, nove nove nove nove nove, hífen, nove nove nove nove"
                    );
                    utter.lang = "pt-BR";
                    utter.rate = 0.70;
                    synth.speak(utter);
                  }
                }}
                className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg font-medium"
              >
                🔊 Ouvir meu número
              </button>
            </div>

            {/* Outras informações */}
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-1">
                  <Smartphone className="w-5 h-5 text-gray-600" />
                  <h4 className="font-medium text-gray-900">Modelo</h4>
                </div>
                <p className="text-sm text-gray-700">Samsung Galaxy A54 5G</p>
                <p className="text-xs text-gray-500">SM-A546B</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xl">🤖</span>
                  <h4 className="font-medium text-gray-900">Versão do Android</h4>
                </div>
                <p className="text-sm text-gray-700">Android 14</p>
                <p className="text-xs text-gray-500">One UI 6.0</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-1">
                  <HardDrive className="w-5 h-5 text-gray-600" />
                  <h4 className="font-medium text-gray-900">Armazenamento</h4>
                </div>
                <p className="text-sm text-gray-700">128 GB</p>
                <p className="text-xs text-gray-500">45 GB usados · 83 GB livres</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-1">
                  <Cpu className="w-5 h-5 text-gray-600" />
                  <h4 className="font-medium text-gray-900">Memória RAM</h4>
                </div>
                <p className="text-sm text-gray-700">8 GB</p>
                <p className="text-xs text-gray-500">3.2 GB em uso</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-1">
                  <Battery className="w-5 h-5 text-green-600" />
                  <h4 className="font-medium text-gray-900">Bateria</h4>
                </div>
                <p className="text-sm text-gray-700">5000 mAh</p>
                <p className="text-xs text-gray-500">Carga atual: 98%</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-1">
                  <Hash className="w-5 h-5 text-gray-600" />
                  <h4 className="font-medium text-gray-900">IMEI</h4>
                </div>
                <p className="text-sm text-gray-700">352894561234567</p>
                <p className="text-xs text-gray-500">Número de identificação único do aparelho</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-1">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <h4 className="font-medium text-gray-900">Status</h4>
                </div>
                <p className="text-sm text-gray-700">Sistema atualizado</p>
                <p className="text-xs text-gray-500">Última verificação: hoje</p>
              </div>
            </div>
          </div>

          {/* Quando usar */}
          <div className="p-4 space-y-3">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <h3 className="font-semibold text-blue-900 mb-2">💡 Quando consultar</h3>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Quando alguém pedir seu número de telefone</li>
                <li>• Para saber se o sistema está atualizado</li>
                <li>• Quando precisar do IMEI (roubo ou seguro)</li>
                <li>• Para verificar quanto espaço tem livre</li>
                <li>• Ao procurar ajuda técnica (precisam saber o modelo)</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="font-semibold text-green-900 mb-2">✓ Dica importante</h3>
              <p className="text-sm text-green-800">
                Tire uma foto desta tela ou anote seu número em um papel. Assim você sempre tem essa informação quando precisar!
              </p>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}