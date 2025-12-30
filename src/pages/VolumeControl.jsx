import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Volume2, VolumeX, Bell, Music, Phone, Vibrate, ChevronRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function VolumeControl() {
  const navigate = useNavigate();
  const [ringtone, setRingtone] = useState([80]);
  const [media, setMedia] = useState([60]);
  const [alarm, setAlarm] = useState([90]);
  const [notification, setNotification] = useState([70]);
  const [system, setSystem] = useState([50]);
  
  const [soundMode, setSoundMode] = useState("normal");

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Configurações de Som e Vibração. Aqui você controla todos os sons do seu celular. Mantenha seu celular sempre com som ativo para não perder ligações importantes."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
    return () => window.speechSynthesis.cancel();
  }, []);

  const soundModes = [
    {
      id: "normal",
      name: "Som",
      icon: Volume2,
      color: "bg-blue-500",
      description: "Som ativado",
      voiceMessage: "Som ativo. Mantenha seu celular sempre com som ativo para não perder ligações importantes. Você vai ouvir toques, notificações e todos os sons do aparelho. Esta é a melhor opção para o dia a dia."
    },
    {
      id: "vibrate",
      name: "Vibrar",
      icon: Vibrate,
      color: "bg-purple-500",
      description: "Apenas vibração",
      voiceMessage: "Modo Vibrar ativado. Seu celular vai apenas vibrar quando receber ligações e mensagens. Não vai fazer barulho, mas você vai sentir as vibrações no bolso ou na mesa. Útil para ambientes silenciosos como reuniões ou consultas médicas."
    },
    {
      id: "silent",
      name: "Silencioso",
      icon: Bell,
      color: "bg-orange-500",
      description: "Sem som, com vibração",
      voiceMessage: "Modo Silencioso ativado. Seu celular vai ficar no modo silencioso, sem fazer barulho, mas vai apenas vibrar. Você não vai ouvir nada, mas vai sentir quando alguém ligar ou mandar mensagem."
    },
    {
      id: "mute",
      name: "Mudo",
      icon: VolumeX,
      color: "bg-red-500",
      description: "Sem som e sem vibração",
      voiceMessage: "Modo Mudo ativado. Atenção! Seu celular vai ficar sem som e sem vibração. Você não vai ouvir nada e não vai sentir vibrações. Use apenas quando realmente não quiser ser incomodado, como na hora de dormir. Cuidado para não perder ligações importantes!"
    }
  ];

  const handleSoundModeChange = (modeId) => {
    setSoundMode(modeId);
    const mode = soundModes.find(m => m.id === modeId);
    
    const synth = window.speechSynthesis;
    if (synth && mode) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(mode.voiceMessage);
      utter.lang = "pt-BR";
      utter.rate = 0.9;
      synth.speak(utter);
    }
  };

  const advancedSettings = [
    { title: "Qualidade de som e efeitos", page: "QualidadeSom", icon: "🎵" },
    { title: "Som de aplicativo separado", page: "SomAplicativoSeparado", icon: "📱" },
    { title: "Dolby Atmos", page: "DolbyAtmos", icon: "🔊" },
    { title: "Dolby Atmos para jogos", page: "DolbyAtmosJogos", icon: "🎮" },
    { title: "Equalizador", page: "Equalizador", icon: "🎚️" },
    { title: "UHQ upscaler", page: "UHQUpscaler", icon: "⬆️" },
    { title: "Adapt sound", page: "AdaptSound", icon: "👂" },
    { title: "Áudio Dual (Bluetooth)", page: "AudioDual", icon: "🎧" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
            {/* Header */}
            <div className="bg-purple-500 text-white p-6 pb-4">
              <button onClick={() => navigate(createPageUrl("Configuracoes"))} className="mb-4">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Som e Vibração</h1>
            </div>

            {/* Conteúdo */}
            <div className="overflow-y-auto h-[calc(100%-100px)] p-6">
              {/* Modos de Som */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-600 mb-4">MODO DE SOM</h3>
                <div className="grid grid-cols-2 gap-3">
                  {soundModes.map((mode) => {
                    const Icon = mode.icon;
                    const isActive = soundMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => handleSoundModeChange(mode.id)}
                        className={`p-4 rounded-2xl border-2 transition-all ${
                          isActive 
                            ? `${mode.color} border-transparent text-white shadow-lg scale-105` 
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Icon className={`w-8 h-8 mx-auto mb-2 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                        <p className={`font-semibold mb-1 ${isActive ? 'text-white' : 'text-gray-900'}`}>
                          {mode.name}
                        </p>
                        <p className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                          {mode.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dica Importante */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-xl">
                <p className="text-sm text-blue-900">
                  💡 <strong>Dica:</strong> Mantenha sempre no modo "Som" para não perder ligações importantes de familiares e amigos!
                </p>
              </div>

              {/* Controles de Volume */}
              <div className={`mb-8 ${soundMode === "mute" || soundMode === "silent" ? 'opacity-40 pointer-events-none' : ''}`}>
                <h3 className="text-sm font-semibold text-gray-600 mb-4">VOLUME</h3>
                
                {/* Toque de Chamada */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Toque de Chamada</p>
                      <p className="text-xs text-gray-500">{ringtone[0]}%</p>
                    </div>
                  </div>
                  <Slider value={ringtone} onValueChange={setRingtone} max={100} step={1} />
                </div>

                {/* Mídia */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Music className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Mídia</p>
                      <p className="text-xs text-gray-500">{media[0]}%</p>
                    </div>
                  </div>
                  <Slider value={media} onValueChange={setMedia} max={100} step={1} />
                </div>

                {/* Notificações */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Bell className="w-5 h-5 text-purple-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Notificações</p>
                      <p className="text-xs text-gray-500">{notification[0]}%</p>
                    </div>
                  </div>
                  <Slider value={notification} onValueChange={setNotification} max={100} step={1} />
                </div>

                {/* Alarme */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl">⏰</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Alarme</p>
                      <p className="text-xs text-gray-500">{alarm[0]}%</p>
                    </div>
                  </div>
                  <Slider value={alarm} onValueChange={setAlarm} max={100} step={1} />
                </div>
              </div>

              {/* Configurações Avançadas */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-3">CONFIGURAÇÕES AVANÇADAS</h3>
                <div className="space-y-2">
                  {advancedSettings.map((setting, index) => (
                    <button
                      key={index}
                      onClick={() => navigate(createPageUrl(setting.page))}
                      className="w-full bg-gray-50 rounded-xl p-4 flex items-center gap-3 hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-2xl">{setting.icon}</span>
                      <span className="flex-1 text-left font-medium text-gray-900">{setting.title}</span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}