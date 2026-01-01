import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Globe, Check } from "lucide-react";

export default function IdiomaApp() {
  const navigate = useNavigate();

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Esta é a tela de Idioma do app. Aqui você escolhe em qual língua o WhatsApp vai aparecer. Por exemplo: português, espanhol, inglês."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.80;
      synth.speak(utter);

      setTimeout(() => {
        const utter2 = new SpeechSynthesisUtterance(
          "Normalmente o WhatsApp usa o mesmo idioma do seu celular. Mas aqui você pode trocar se preferir outro idioma. Basta tocar no idioma desejado."
        );
        utter2.lang = "pt-BR";
        utter2.rate = 0.80;
        synth.speak(utter2);
      }, 8000);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="bg-[#008069] text-white px-4 py-3 flex items-center gap-4">
          <button onClick={() => navigate(createPageUrl("ConfiguracoesWhatsApp"))}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-medium">Idioma do app</h2>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto">
          {/* Informação */}
          <div className="p-4 bg-blue-50 border-b border-blue-200">
            <div className="flex gap-3">
              <Globe className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Idioma do aplicativo</h3>
                <p className="text-sm text-blue-800">
                  Escolha em qual idioma o WhatsApp será exibido. Todos os menus, botões e mensagens aparecerão no idioma selecionado.
                </p>
              </div>
            </div>
          </div>

          {/* Idioma do dispositivo */}
          <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-xl">📱</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Idioma do dispositivo</h3>
                <p className="text-sm text-gray-600">Usar idioma do celular</p>
              </div>
            </div>
            <Check className="w-5 h-5 text-[#25D366]" strokeWidth={3} />
          </div>

          {/* Lista de idiomas */}
          <div className="px-4 py-2">
            <h3 className="text-sm text-gray-500 font-medium mb-2">Idiomas do app</h3>
          </div>

          {[
            { code: "pt-BR", name: "Português (Brasil)", flag: "🇧🇷" },
            { code: "en", name: "English", flag: "🇺🇸" },
            { code: "es", name: "Español", flag: "🇪🇸" },
            { code: "it", name: "Italiano", flag: "🇮🇹" },
            { code: "fr", name: "Français", flag: "🇫🇷" },
            { code: "de", name: "Deutsch", flag: "🇩🇪" },
            { code: "ru", name: "Русский", flag: "🇷🇺" },
            { code: "ar", name: "العربية", flag: "🇸🇦" },
            { code: "zh", name: "中文", flag: "🇨🇳" },
            { code: "ja", name: "日本語", flag: "🇯🇵" },
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                const synth = window.speechSynthesis;
                if (synth) {
                  synth.cancel();
                  const utter = new SpeechSynthesisUtterance(
                    `Você escolheu ${lang.name}. O WhatsApp será reiniciado e aparecerá neste idioma.`
                  );
                  utter.lang = "pt-BR";
                  utter.rate = 0.80;
                  synth.speak(utter);
                }
              }}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 border-b border-gray-100"
            >
              <span className="text-2xl">{lang.flag}</span>
              <span className="flex-1 text-left font-medium text-gray-900">{lang.name}</span>
              {lang.code === "pt-BR" && (
                <Check className="w-5 h-5 text-[#25D366]" strokeWidth={3} />
              )}
            </button>
          ))}

          {/* Dicas */}
          <div className="p-4 space-y-3 mt-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <h3 className="font-semibold text-green-900 mb-1">💡 Dica</h3>
              <p className="text-sm text-green-800">
                Se escolher outro idioma, o WhatsApp vai aparecer todo naquele idioma. Para voltar ao português, entre aqui novamente e selecione "Português (Brasil)".
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="font-semibold text-yellow-900 mb-1">⚠️ Atenção</h3>
              <p className="text-sm text-yellow-800">
                Mudar o idioma do WhatsApp não muda o idioma do seu celular. São configurações separadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}