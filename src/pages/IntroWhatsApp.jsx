import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { 
  ArrowLeft, MessageCircle, Phone, Video, Users, Shield, 
  Lock, Clock, Eye, Camera, Mic, Image, FileText, HelpCircle
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    id: 'messages',
    title: 'Envie mensagens',
    icon: MessageCircle,
    color: 'bg-green-500',
    description: 'Converse com amigos e família',
    audio: 'Envie mensagens de texto. Digite sua mensagem e toque no botão verde para enviar. Suas conversas são privadas e protegidas com criptografia de ponta a ponta.'
  },
  {
    id: 'voice',
    title: 'Mensagens de voz',
    icon: Mic,
    color: 'bg-blue-500',
    description: 'Grave e envie áudios',
    audio: 'Envie mensagens de voz. Segure o botão do microfone para gravar sua voz. Quando terminar, solte o botão para enviar. É mais rápido do que digitar!'
  },
  {
    id: 'calls',
    title: 'Ligações de voz',
    icon: Phone,
    color: 'bg-orange-500',
    description: 'Ligue gratuitamente',
    audio: 'Faça ligações de voz gratuitas. Toque no ícone de telefone no topo da conversa para ligar. Funciona com internet Wi-Fi ou dados móveis.'
  },
  {
    id: 'video',
    title: 'Chamadas de vídeo',
    icon: Video,
    color: 'bg-purple-500',
    description: 'Veja quem você ama',
    audio: 'Faça chamadas de vídeo. Toque no ícone de câmera no topo da conversa para iniciar uma videochamada. Veja seus amigos e família em tempo real!'
  },
  {
    id: 'photos',
    title: 'Fotos e vídeos',
    icon: Camera,
    color: 'bg-pink-500',
    description: 'Compartilhe momentos',
    audio: 'Envie fotos e vídeos. Toque no clipe ao lado do campo de mensagem e escolha Câmera para tirar uma foto nova, ou Galeria para enviar fotos do seu celular.'
  },
  {
    id: 'documents',
    title: 'Documentos',
    icon: FileText,
    color: 'bg-indigo-500',
    description: 'Compartilhe arquivos',
    audio: 'Envie documentos e arquivos. Toque no clipe e escolha Documento. Você pode enviar PDFs, planilhas, apresentações e outros tipos de arquivo.'
  },
  {
    id: 'groups',
    title: 'Grupos',
    icon: Users,
    color: 'bg-teal-500',
    description: 'Converse com vários contatos',
    audio: 'Crie grupos para conversar com várias pessoas ao mesmo tempo. Toque no botão verde com o sinal de mais e escolha Novo Grupo. Adicione até 256 participantes!'
  },
  {
    id: 'privacy',
    title: 'Privacidade',
    icon: Shield,
    color: 'bg-red-500',
    description: 'Suas conversas estão seguras',
    audio: 'Suas conversas são privadas e seguras. O WhatsApp usa criptografia de ponta a ponta. Isso significa que somente você e quem recebe pode ler as mensagens. Nem o WhatsApp consegue ver!'
  },
  {
    id: 'encryption',
    title: 'Criptografia',
    icon: Lock,
    color: 'bg-yellow-600',
    description: 'Proteção total',
    audio: 'Criptografia de ponta a ponta. Suas mensagens, fotos, vídeos e ligações são protegidas com um cadeado especial. Somente você e o destinatário têm a chave para abrir.'
  },
  {
    id: 'temporary',
    title: 'Mensagens temporárias',
    icon: Clock,
    color: 'bg-cyan-500',
    description: 'Mensagens que desaparecem',
    audio: 'Mensagens temporárias. Configure mensagens para desaparecer automaticamente após 24 horas, 7 dias ou 90 dias. Útil para manter conversas mais privadas.'
  },
  {
    id: 'viewonce',
    title: 'Visualização única',
    icon: Eye,
    color: 'bg-rose-500',
    description: 'Fotos que desaparecem',
    audio: 'Visualização única. Envie fotos ou vídeos que desaparecem depois de serem vistos uma vez. Perfeito para coisas que não precisam ficar guardadas.'
  }
];

export default function IntroWhatsApp() {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature.id);
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(feature.audio);
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleStartTutorial = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Bem-vindo ao WhatsApp! Vou te ensinar a usar todos os recursos. " +
        "Toque em cada cartão colorido abaixo para aprender sobre uma funcionalidade. " +
        "Você pode tocar quantas vezes quiser para ouvir novamente."
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
    }
  };

  const handleFinish = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(
        "Parabéns! Agora você conhece todos os recursos do WhatsApp. Vamos começar a usar!"
      );
      utter.lang = "pt-BR";
      utter.rate = 0.85;
      synth.speak(utter);
      
      setTimeout(() => {
        navigate(createPageUrl("WhatsApp"));
      }, 3000);
    } else {
      navigate(createPageUrl("WhatsApp"));
    }
  };

  return (
    <PhoneFrame>
      <div className="h-full bg-gradient-to-br from-green-50 to-green-100 flex flex-col overflow-hidden">
        <StatusBar variant="dark" />

        {/* Header */}
        <div className="bg-[#008069] text-white px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(createPageUrl("Home"))}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-medium flex-1 ml-4">Aprenda a usar o WhatsApp</h1>
            <button onClick={handleStartTutorial} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="px-4 py-6 bg-white border-b border-gray-200">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Bem-vindo ao WhatsApp!
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Toque em cada cartão abaixo para aprender sobre os recursos. 
                Ouça a explicação de cada funcionalidade.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="grid grid-cols-2 gap-3 pb-24">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              const isSelected = selectedFeature === feature.id;
              
              return (
                <motion.button
                  key={feature.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleFeatureClick(feature)}
                  className={`relative bg-white rounded-2xl p-4 shadow-md border-2 transition-all ${
                    isSelected ? 'border-[#25D366] ring-2 ring-[#25D366] ring-opacity-50' : 'border-transparent'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-3 mx-auto`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-500 text-center leading-tight">
                    {feature.description}
                  </p>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-xs font-bold">✓</span>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Bottom Button */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <button
            onClick={handleFinish}
            className="w-full bg-[#25D366] hover:bg-[#20BD5F] text-white font-semibold py-4 rounded-full shadow-lg transition-colors"
          >
            Começar a usar o WhatsApp
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}