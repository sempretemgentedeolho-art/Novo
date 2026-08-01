import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeft, Volume2, Check, Play } from "lucide-react";
import {
  getAvailableVoices,
  getPortugueseVoices,
  getSelectedVoiceURI,
  setSelectedVoiceURI,
} from "@/lib/speech";

export default function VozConfig() {
  const navigate = useNavigate();
  const [voices, setVoices] = useState([]);
  const [selectedURI, setSelectedURI] = useState(getSelectedVoiceURI());

  useEffect(() => {
    const loadVoices = () => {
      const all = getAvailableVoices();
      if (all.length > 0) {
        const pt = getPortugueseVoices();
        // Ordena: português primeiro, depois resto, alfabético
        const sorted = [...pt].sort((a, b) => a.name.localeCompare(b.name));
        setVoices(sorted);
      }
    };
    loadVoices();
    // Algumas plataformas carregam vozes assíncrono
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const handleSelect = (voice) => {
    setSelectedVoiceURI(voice.voiceURI);
    setSelectedURI(voice.voiceURI);
    // Toca uma amostra com a voz escolhida
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Olá! Esta é a voz que foi selecionada para a narração."
      );
      utter.lang = voice.lang || "pt-BR";
      utter.rate = 0.85;
      utter.voice = voice;
      synth.speak(utter);
    }
  };

  const handleTestDefault = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Esta é a voz padrão do aparelho."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleClear = () => {
    setSelectedVoiceURI(null);
    setSelectedURI(null);
    handleTestDefault();
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-white flex flex-col">
        <StatusBar variant="light" />

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <button onClick={() => navigate(createPageUrl("Configuracoes"))} className="mb-2">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <Volume2 className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-semibold text-gray-900">Voz da Narração</h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Escolha a voz usada nas narrações do app
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {voices.length === 0 ? (
            <div className="text-center py-12">
              <Volume2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                Nenhuma voz encontrada neste dispositivo.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                As vozes dependem do aparelho.
              </p>
            </div>
          ) : (
            <>
              {/* Voz padrão */}
              <button
                onClick={handleClear}
                className={`w-full p-4 flex items-center gap-3 mb-3 rounded-xl border-2 transition-colors ${
                  !selectedURI
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Play className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-gray-900">Voz padrão do aparelho</h3>
                  <p className="text-sm text-gray-500">Usa a voz automática do sistema</p>
                </div>
                {!selectedURI && (
                  <Check className="w-5 h-5 text-indigo-600" />
                )}
              </button>

              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 mb-2 mt-4">
                Vozes disponíveis ({voices.length})
              </div>

              {/* Lista de vozes */}
              <div className="space-y-2">
                {voices.map((voice) => (
                  <button
                    key={voice.voiceURI}
                    onClick={() => handleSelect(voice)}
                    className={`w-full p-4 flex items-center gap-3 rounded-xl border-2 transition-colors text-left ${
                      selectedURI === voice.voiceURI
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Play className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {voice.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {voice.lang}
                        {voice.localService ? " · Instalada" : " · Online"}
                      </p>
                    </div>
                    {selectedURI === voice.voiceURI && (
                      <Check className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <p className="text-sm text-amber-800">
                  💡 <strong>Dica:</strong> Toque em uma voz para ouvir uma amostra e selecioná-la.
                  A escolha é salva e usada em todas as narrações do app.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}